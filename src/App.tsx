import { FC, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Vector3 } from 'three'
import { Scene, Controls, ParticleControls } from './components'
import { SSAOConfig, ParticleConfig } from './types'
import './App.css'

/**
 * Main application component featuring a 3D scene with lighting, SSAO, and particle system controls
 */
const App: FC = () => {
  const [lightColor, setLightColor] = useState<string>('#ffffff')
  const [lightPosition, setLightPosition] = useState<Vector3>(new Vector3(10, 10, 10))
  const [ssaoConfig, setSsaoConfig] = useState<SSAOConfig>({
    intensity: 0.5,
    radius: 0.1,
    bias: 0.025,
    samples: 16
  })
  const [particleConfig, setParticleConfig] = useState<ParticleConfig>({
    maxParticles: 1000,
    emissionRate: 50,
    burstCount: 10,
    emitterPosition: new Vector3(0, 2, 0),
    emitterRadius: 0.5,
    particleLifetime: 3,
    startSpeed: 5,
    startSize: 0.5,
    endSize: 0.1,
    startColor: '#ff6b35',
    endColor: '#4ecdc4',
    gravity: 5,
    wind: new Vector3(0, 0, 0),
    drag: 0.5,
    fadeIn: 0.2,
    fadeOut: 0.3,
    turbulence: 2
  })

  const handleLightColorChange = (color: string) => {
    setLightColor(color)
  }

  const handleLightPositionChange = (position: Vector3) => {
    setLightPosition(position)
  }

  const handleSSAOChange = (config: SSAOConfig) => {
    setSsaoConfig(config)
  }

  const handleParticleConfigChange = (config: ParticleConfig) => {
    setParticleConfig(config)
  }

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas>
        <Scene 
          lightColor={lightColor} 
          lightPosition={lightPosition} 
          ssaoConfig={ssaoConfig}
          particleConfig={particleConfig}
        />
      </Canvas>
      
      <Controls
        lightColor={lightColor}
        lightPosition={lightPosition}
        ssaoConfig={ssaoConfig}
        onLightColorChange={handleLightColorChange}
        onLightPositionChange={handleLightPositionChange}
        onSSAOChange={handleSSAOChange}
      />
      
      <ParticleControls
        config={particleConfig}
        onConfigChange={handleParticleConfigChange}
      />
    </div>
  )
}

export default App
