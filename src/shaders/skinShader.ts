// Skin shader - combines depth and normal information for realistic skin rendering
export const skinVertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vWorldNormal;
  varying vec4 vWorldPosition;
  varying vec2 vUv;
  varying float vViewZ;
  varying vec4 vScreenPosition;
  
  void main() {
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * worldPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    
    // Pass data to fragment shader
    vWorldNormal = normalize(normalMatrix * normal);
    vNormal = normal;
    vWorldPosition = worldPosition;
    vUv = uv;
    vViewZ = viewPosition.z;
    vScreenPosition = projectedPosition;
    
    gl_Position = projectedPosition;
  }
`;

export const skinFragmentShader = /* glsl */ `
  uniform vec3 lightDirection;
  uniform vec3 lightColor;
  uniform vec3 skinColor;
  uniform float subsurfaceScattering;
  uniform float roughness;
  uniform float metalness;
  uniform float cameraNear;
  uniform float cameraFar;
  
  // Multi-rendering textures
  uniform sampler2D depthTexture;
  uniform sampler2D normalTexture;
  
  varying vec3 vNormal;
  varying vec3 vWorldNormal;
  varying vec4 vWorldPosition;
  varying vec2 vUv;
  varying float vViewZ;
  varying vec4 vScreenPosition;
  
  // Simple subsurface scattering approximation
  vec3 getSubsurfaceScattering(vec3 normal, vec3 lightDir, vec3 viewDir, vec2 screenUV) {
    // Sample depth texture for thickness approximation
    float depthSample = texture2D(depthTexture, screenUV).r;
    
    // Approximation of light penetration through surface
    float backLight = max(0.0, dot(-lightDir, normal));
    float thickness = 1.0 - depthSample; // Simple thickness estimation
    float subsurface = pow(backLight, 2.0) * subsurfaceScattering * thickness;
    
    return vec3(subsurface);
  }
  
  void main() {
    vec3 worldNormal = normalize(vWorldNormal);
    vec3 viewDir = normalize(cameraPosition - vWorldPosition.xyz);
    vec3 lightDir = normalize(lightDirection);
    
    // Screen space UV for sampling render targets
    vec2 screenUV = (vScreenPosition.xy / vScreenPosition.w) * 0.5 + 0.5;
    screenUV.y = 1.0 - screenUV.y; // Flip Y for correct sampling
    
    // Basic diffuse lighting
    float NdotL = max(dot(worldNormal, lightDir), 0.0);
    vec3 diffuse = skinColor * lightColor * NdotL;
    
    // Simple Fresnel approximation
    float fresnel = pow(1.0 - max(dot(worldNormal, viewDir), 0.0), 2.0);
    
    // Subsurface scattering using depth information
    vec3 subsurface = getSubsurfaceScattering(worldNormal, lightDir, viewDir, screenUV);
    
    // Sample normal texture for additional detail (if available)
    vec3 normalSample = texture2D(normalTexture, screenUV).rgb;
    if (length(normalSample) > 0.1) {
      // Use normal map for additional surface detail
      vec3 normalDetail = normalize(normalSample * 2.0 - 1.0);
      worldNormal = mix(worldNormal, normalDetail, 0.3);
    }
    
    // Enhanced lighting calculation
    float enhancedNdotL = max(dot(worldNormal, lightDir), 0.0);
    vec3 enhancedDiffuse = skinColor * lightColor * enhancedNdotL;
    
    // Combine all lighting
    vec3 finalColor = enhancedDiffuse + subsurface * skinColor + fresnel * 0.1;
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;