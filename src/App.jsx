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
    const axisIndex = axis === 'x' ? 0 : axis === 'y' ? 1 : 2
    newPosition[axisIndex] = parseFloat(value)
    setLightPosition(newPosition)
  }

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas>
        <Scene lightColor={lightColor} lightPosition={lightPosition} />
      </Canvas>
      
      <div className="controls">
        <div className="control-group">
          <label>Light Color:</label>
          <input
            type="color"
            value={lightColor}
            onChange={(e) => setLightColor(e.target.value)}
          />
        </div>
        
        <div className="control-group">
          <label>Light Position:</label>
          <div className="position-controls">
            <div className="axis-control">
              <label>X:</label>
              <input
                type="range"
                min="-20"
                max="20"
                step="0.1"
                value={lightPosition[0]}
                onChange={(e) => handlePositionChange('x', e.target.value)}
              />
              <span>{lightPosition[0].toFixed(1)}</span>
            </div>
            <div className="axis-control">
              <label>Y:</label>
              <input
                type="range"
                min="-20"
                max="20"
                step="0.1"
                value={lightPosition[1]}
                onChange={(e) => handlePositionChange('y', e.target.value)}
              />
              <span>{lightPosition[1].toFixed(1)}</span>
            </div>
            <div className="axis-control">
              <label>Z:</label>
              <input
                type="range"
                min="-20"
                max="20"
                step="0.1"
                value={lightPosition[2]}
                onChange={(e) => handlePositionChange('z', e.target.value)}
              />
              <span>{lightPosition[2].toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
