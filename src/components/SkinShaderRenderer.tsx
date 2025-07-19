import { FC, useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { 
  ShaderMaterial, 
  Mesh, 
  WebGLRenderTarget, 
  Vector3, 
  Color,
  SphereGeometry,
  WebGLRenderer,
  RGBAFormat,
  UnsignedByteType,
  LinearFilter
} from 'three'
import { depthVertexShader, depthFragmentShader } from '../shaders/depthShader'
import { normalVertexShader, normalFragmentShader } from '../shaders/normalShader'
import { skinVertexShader, skinFragmentShader } from '../shaders/skinShader'

export type RenderMode = 'depth' | 'normal' | 'skin' | 'combined'

interface SkinShaderRendererProps {
  position?: [number, number, number]
  renderMode?: RenderMode
  skinColor?: string
  subsurfaceScattering?: number
  roughness?: number
  metalness?: number
}

/**
 * Skin Shader Renderer component for Lee Perry Smith style head rendering
 * Supports multiple rendering modes: depth, normal, skin, and combined
 * Features multi-rendering with separate render targets for depth and normal passes
 */
export const SkinShaderRenderer: FC<SkinShaderRendererProps> = ({
  position = [0, 0, 0],
  renderMode = 'skin',
  skinColor = '#ffdbcc',
  subsurfaceScattering = 0.3,
  roughness = 0.4,
  metalness = 0.1
}) => {
  const meshRef = useRef<Mesh>(null)
  const { camera, gl, scene } = useThree()
  
  // Create render targets for multi-rendering (depth and normal passes)
  const renderTargets = useMemo(() => ({
    depth: new WebGLRenderTarget(512, 512, {
      format: RGBAFormat,
      type: UnsignedByteType,
      generateMipmaps: false,
      minFilter: LinearFilter,
      magFilter: LinearFilter
    }),
    normal: new WebGLRenderTarget(512, 512, {
      format: RGBAFormat,
      type: UnsignedByteType,
      generateMipmaps: false,
      minFilter: LinearFilter,
      magFilter: LinearFilter
    })
  }), [])
  
  // Create detailed head geometry (substitute for Lee Perry Smith model)
  const headGeometry = useMemo(() => {
    // Create a more detailed sphere to represent a head
    const geometry = new SphereGeometry(1, 64, 64)
    
    // Modify vertices to create a more head-like shape
    const positions = geometry.attributes.position
    const vertex = new Vector3()
    
    for (let i = 0; i < positions.count; i++) {
      vertex.fromBufferAttribute(positions, i)
      
      // Create basic head proportions
      const y = vertex.y
      
      // Flatten top and bottom slightly
      if (y > 0.7) {
        vertex.y *= 0.9
      } else if (y < -0.8) {
        vertex.y *= 0.7
      }
      
      // Make face area flatter
      if (vertex.z > 0.3) {
        vertex.z *= 0.7
      }
      
      // Narrow the sides slightly
      if (Math.abs(vertex.x) > 0.7 && Math.abs(y) < 0.3) {
        vertex.x *= 0.8
      }
      
      positions.setXYZ(i, vertex.x, vertex.y, vertex.z)
    }
    
    geometry.computeVertexNormals()
    return geometry
  }, [])
  
  // Depth material
  const depthMaterial = useMemo(() => {
    return new ShaderMaterial({
      vertexShader: depthVertexShader,
      fragmentShader: depthFragmentShader,
      uniforms: {
        cameraNear: { value: camera.near },
        cameraFar: { value: camera.far }
      }
    })
  }, [camera.near, camera.far])
  
  // Normal material
  const normalMaterial = useMemo(() => {
    return new ShaderMaterial({
      vertexShader: normalVertexShader,
      fragmentShader: normalFragmentShader,
      uniforms: {}
    })
  }, [])
  
  // Skin material with multi-rendering support
  const skinMaterial = useMemo(() => {
    return new ShaderMaterial({
      vertexShader: skinVertexShader,
      fragmentShader: skinFragmentShader,
      uniforms: {
        lightDirection: { value: new Vector3(1, 1, 1).normalize() },
        lightColor: { value: new Color('#ffffff') },
        skinColor: { value: new Color(skinColor) },
        subsurfaceScattering: { value: subsurfaceScattering },
        roughness: { value: roughness },
        metalness: { value: metalness },
        cameraNear: { value: camera.near },
        cameraFar: { value: camera.far },
        // Add render target textures for combined mode
        depthTexture: { value: renderTargets.depth.texture },
        normalTexture: { value: renderTargets.normal.texture }
      }
    })
  }, [camera.near, camera.far, skinColor, subsurfaceScattering, roughness, metalness, renderTargets])
  
  // Multi-rendering effect - render to different targets
  useFrame(() => {
    if (!meshRef.current) return
    
    const renderer = gl as WebGLRenderer
    const currentRenderTarget = renderer.getRenderTarget()
    
    // Store original material
    const originalMaterial = meshRef.current.material
    
    try {
      // First pass: Render depth to depth target
      meshRef.current.material = depthMaterial
      renderer.setRenderTarget(renderTargets.depth)
      renderer.render(scene, camera)
      
      // Second pass: Render normals to normal target
      meshRef.current.material = normalMaterial
      renderer.setRenderTarget(renderTargets.normal)
      renderer.render(scene, camera)
      
      // Restore render target
      renderer.setRenderTarget(currentRenderTarget)
      
      // Set material based on render mode for final display
      switch (renderMode) {
        case 'depth':
          meshRef.current.material = depthMaterial
          break
        case 'normal':
          meshRef.current.material = normalMaterial
          break
        case 'skin':
          meshRef.current.material = skinMaterial
          break
        case 'combined':
          // Use skin material with access to depth and normal textures
          meshRef.current.material = skinMaterial
          break
        default:
          meshRef.current.material = skinMaterial
      }
    } catch {
      // Restore original material on error
      meshRef.current.material = originalMaterial
    }
    
    // Update uniforms
    depthMaterial.uniforms.cameraNear.value = camera.near
    depthMaterial.uniforms.cameraFar.value = camera.far
    skinMaterial.uniforms.cameraNear.value = camera.near
    skinMaterial.uniforms.cameraFar.value = camera.far
    skinMaterial.uniforms.skinColor.value.setStyle(skinColor)
    skinMaterial.uniforms.subsurfaceScattering.value = subsurfaceScattering
    skinMaterial.uniforms.roughness.value = roughness
    skinMaterial.uniforms.metalness.value = metalness
  })
  
  // Cleanup render targets
  useEffect(() => {
    return () => {
      renderTargets.depth.dispose()
      renderTargets.normal.dispose()
    }
  }, [renderTargets])
  
  // Select initial material based on render mode
  const initialMaterial = useMemo(() => {
    switch (renderMode) {
      case 'depth':
        return depthMaterial
      case 'normal':
        return normalMaterial
      case 'skin':
        return skinMaterial
      default:
        return skinMaterial
    }
  }, [renderMode, depthMaterial, normalMaterial, skinMaterial])
  
  return (
    <mesh 
      ref={meshRef} 
      position={position} 
      geometry={headGeometry} 
      material={initialMaterial}
    />
  )
}