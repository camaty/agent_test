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

// Particle System Types
export interface ParticleConfig {
  // Emitter properties
  maxParticles: number
  emissionRate: number
  burstCount: number
  emitterPosition: Vector3
  emitterRadius: number
  
  // Particle properties
  particleLifetime: number
  startSpeed: number
  startSize: number
  endSize: number
  startColor: string
  endColor: string
  
  // Physics
  gravity: number
  wind: Vector3
  drag: number
  
  // Behavior
  fadeIn: number
  fadeOut: number
  turbulence: number
}

export interface ParticleSystemProps {
  config: ParticleConfig
}

export interface ParticleControlsProps {
  config: ParticleConfig
  onConfigChange: (config: ParticleConfig) => void
}

export type ParticleParameter = keyof ParticleConfig

// Animation System Types
export interface AnimationState {
  isPlaying: boolean
  isReversed: boolean
  currentTime: number
  duration: number
  loop: boolean
}

export interface AnimationControlsProps {
  animationState: AnimationState
  onPlay: () => void
  onPause: () => void
  onStop: () => void
  onReverse: () => void
  onRestart: () => void
  onTimeChange: (time: number) => void
}

export interface AnimatedCharacterProps {
  animationState: AnimationState
  onAnimationUpdate: (currentTime: number, duration: number) => void
}