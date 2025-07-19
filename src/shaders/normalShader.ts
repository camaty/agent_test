// Normal shader - renders normals in screen space
export const normalVertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vWorldNormal;
  varying vec4 vWorldPosition;
  
  void main() {
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    
    // Transform normal to world space
    vWorldNormal = normalize(normalMatrix * normal);
    vNormal = normal;
    vWorldPosition = worldPosition;
    
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`;

export const normalFragmentShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vWorldNormal;
  varying vec4 vWorldPosition;
  
  void main() {
    // Normalize the interpolated normal
    vec3 worldNormal = normalize(vWorldNormal);
    
    // Convert normals from [-1,1] range to [0,1] range for visualization
    vec3 normalColor = worldNormal * 0.5 + 0.5;
    
    // Output world space normals as RGB colors
    gl_FragColor = vec4(normalColor, 1.0);
  }
`;