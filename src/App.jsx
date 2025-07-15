import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useState } from 'react'
import './App.css'

function Box() {
  return (
    <mesh>
      <boxGeometry />
      <meshStandardMaterial color="orange" />
    </mesh>
  )
}

function Scene({ lightColor, lightPosition }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={lightPosition} color={lightColor} />
      <Box />
      <OrbitControls />
    </>
  )
}

function App() {
  const [lightColor, setLightColor] = useState('#ffffff')
  const [lightPosition, setLightPosition] = useState([10, 10, 10])

  const handlePositionChange = (axis, value) => {
    const newPosition = [...lightPosition]
    newPosition[axis] = value
    setLightPosition(newPosition)
  }

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <Canvas>
        <Scene lightColor={lightColor} lightPosition={lightPosition} />
      </Canvas>
      
      {/* UI Controls */}
      <div style={{ 
        position: 'absolute', 
        top: 20, 
        left: 20, 
        background: 'rgba(255, 255, 255, 0.9)', 
        padding: '20px', 
        borderRadius: '8px',
        fontFamily: 'Arial, sans-serif',
        fontSize: '14px'
      }}>
        <h3 style={{ margin: '0 0 15px 0' }}>Directional Light Controls</h3>
        
        {/* Light Color Control */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Light Color:
          </label>
          <input
            type="color"
            value={lightColor}
            onChange={(e) => setLightColor(e.target.value)}
            style={{ width: '100%', height: '30px', border: 'none', borderRadius: '4px' }}
          />
        </div>

        {/* Light Position Controls */}
        <div>
          <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
            Light Position:
          </label>
          
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '2px' }}>X: {lightPosition[0]}</label>
            <input
              type="range"
              min="-20"
              max="20"
              step="0.5"
              value={lightPosition[0]}
              onChange={(e) => handlePositionChange(0, parseFloat(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>
          
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '2px' }}>Y: {lightPosition[1]}</label>
            <input
              type="range"
              min="-20"
              max="20"
              step="0.5"
              value={lightPosition[1]}
              onChange={(e) => handlePositionChange(1, parseFloat(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>
          
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '2px' }}>Z: {lightPosition[2]}</label>
            <input
              type="range"
              min="-20"
              max="20"
              step="0.5"
              value={lightPosition[2]}
              onChange={(e) => handlePositionChange(2, parseFloat(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
