import { FC } from 'react'
import { OrbitControls } from '@react-three/drei'
import { EffectComposer, SSAO } from '@react-three/postprocessing'
import { SceneProps, ParticleConfig, AnimationState } from '../types'
import { ComplexScene } from './ComplexScene'
import { ParticleSystem } from './ParticleSystem'
import { AnimatedCharacter } from './AnimatedCharacter'

/**
 * Main 3D scene component with lighting and post-processing effects
 */
export const Scene: FC<SceneProps & { 
  particleConfig: ParticleConfig
  animationState: AnimationState
  onAnimationUpdate: (currentTime: number, duration: number) => void
}> = ({ 
  lightColor, 
  lightPosition, 
  ssaoConfig, 
  particleConfig,
  animationState,
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