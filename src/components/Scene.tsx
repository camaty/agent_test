import { FC } from 'react'
import { OrbitControls } from '@react-three/drei'
import { EffectComposer, SSAO } from '@react-three/postprocessing'
import { SceneProps, ParticleConfig, AnimationState, SkinShaderConfig } from '../types'
import { ComplexScene } from './ComplexScene'
import { ParticleSystem } from './ParticleSystem'
import { AnimatedCharacter } from './AnimatedCharacter'
import { SkinShaderRenderer } from './SkinShaderRenderer'

/**
 * Main 3D scene component with lighting and post-processing effects
 */
export const Scene: FC<SceneProps & { 
  particleConfig: ParticleConfig
  animationState: AnimationState
  skinShaderConfig: SkinShaderConfig
  onAnimationUpdate: (currentTime: number, duration: number) => void
}> = ({ 
  lightColor, 
  lightPosition, 
  ssaoConfig, 
  particleConfig,
  animationState,
  skinShaderConfig,
  onAnimationUpdate
}) => {
  return (
    <>
      <directionalLight position={lightPosition} color={lightColor} intensity={1} />
      <ambientLight intensity={0.2} />
      <ComplexScene />
      <ParticleSystem config={particleConfig} />
      <AnimatedCharacter 
        animationState={animationState}
        onAnimationUpdate={onAnimationUpdate}
      />
      <SkinShaderRenderer
        position={[skinShaderConfig.position.x, skinShaderConfig.position.y, skinShaderConfig.position.z]}
        renderMode={skinShaderConfig.renderMode}
        skinColor={skinShaderConfig.skinColor}
        subsurfaceScattering={skinShaderConfig.subsurfaceScattering}
        roughness={skinShaderConfig.roughness}
        metalness={skinShaderConfig.metalness}
      />
      <OrbitControls />
      <EffectComposer>
        <SSAO 
          intensity={ssaoConfig.intensity}
          radius={ssaoConfig.radius}
          bias={ssaoConfig.bias}
          samples={ssaoConfig.samples}
        />
      </EffectComposer>
    </>
  )
}