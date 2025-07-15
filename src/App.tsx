import { FC, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Vector3 } from 'three'
import { Scene, Controls } from './components'
import { SSAOConfig } from './types'
import './App.css'

/**
 * Main application component featuring a 3D scene with lighting and SSAO controls
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

  const handleLightColorChange = (color: string) => {
    setLightColor(color)
  }

  const handleLightPositionChange = (position: Vector3) => {
    setLightPosition(position)
  }

  const handleSSAOChange = (config: SSAOConfig) => {
    setSsaoConfig(config)
  }

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas>
        <Scene 
          lightColor={lightColor} 
          lightPosition={lightPosition} 
          ssaoConfig={ssaoConfig} 
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
    </div>
  )
}

export default App
