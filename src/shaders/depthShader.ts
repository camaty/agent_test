// Depth shader - renders depth values in screen space
export const depthVertexShader = /* glsl */ `
  varying vec4 vWorldPosition;
  varying float vViewZ;
  
  void main() {
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * worldPosition;
    
    vWorldPosition = worldPosition;
    vViewZ = viewPosition.z;
    
    gl_Position = projectionMatrix * viewPosition;
  }
`;

export const depthFragmentShader = /* glsl */ `
  uniform float cameraNear;
  uniform float cameraFar;
  
  varying vec4 vWorldPosition;
  varying float vViewZ;
  
  // Linear depth encoding
  float getLinearDepth(float z) {
    return (2.0 * cameraNear) / (cameraFar + cameraNear - z * (cameraFar - cameraNear));
  }
  
  void main() {
    // Convert view space z to normalized device coordinates
    float depth = gl_FragCoord.z;
    float linearDepth = getLinearDepth(depth);
    
    // Output depth as grayscale
    gl_FragColor = vec4(vec3(linearDepth), 1.0);
  }
`;