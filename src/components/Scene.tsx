import { FC } from 'react'
import { OrbitControls } from '@react-three/drei'
import { EffectComposer, SSAO } from '@react-three/postprocessing'
import { SceneProps } from '../types'
import { ComplexScene } from './ComplexScene'

/**
 * Main 3D scene component with lighting and post-processing effects
 */
export const Scene: FC<SceneProps> = ({ lightColor, lightPosition, ssaoConfig }) => {
  return (
    <>
      <directionalLight position={lightPosition} color={lightColor} intensity={1} />
      <ambientLight intensity={0.2} />
      <ComplexScene />
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