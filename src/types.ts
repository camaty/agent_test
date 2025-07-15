import { Vector3 } from 'three'

export interface SSAOConfig {
  intensity: number
  radius: number
  bias: number
  samples: number
}

export interface SceneProps {
  lightColor: string
  lightPosition: Vector3
  ssaoConfig: SSAOConfig
}

export interface ControlsProps {
  lightColor: string
  lightPosition: Vector3
  ssaoConfig: SSAOConfig
  onLightColorChange: (color: string) => void
  onLightPositionChange: (position: Vector3) => void
  onSSAOChange: (config: SSAOConfig) => void
}

export type Axis = 'x' | 'y' | 'z'
export type SSAOParameter = keyof SSAOConfig