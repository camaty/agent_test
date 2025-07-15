import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useState } from 'react'
import './App.css'

function ComplexScene() {
  return (
    <group>
      {/* Main complex geometry - TorusKnot for self-intersecting surfaces */}
      <mesh position={[0, 0, 0]}>
        <torusKnotGeometry args={[1, 0.4, 128, 32]} />
        <meshStandardMaterial color="#ff6b35" roughness={0.3} metalness={0.1} />
      </mesh>
      
      {/* Multiple spheres at different depths for occlusion testing */}
      <mesh position={[-3, 1, 2]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#4ecdc4" roughness={0.4} metalness={0.2} />
      </mesh>
      
      <mesh position={[3, -1, 1]}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial color="#45b7d1" roughness={0.5} metalness={0.3} />
      </mesh>
      
      <mesh position={[2, 2, -1]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial color="#f9ca24" roughness={0.3} metalness={0.1} />
      </mesh>
      
      <mesh position={[-2, -2, 0]}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial color="#6c5ce7" roughness={0.4} metalness={0.2} />
      </mesh>
      
      {/* Ground plane for depth reference */}
      <mesh position={[0, -3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#2d3436" roughness={0.8} metalness={0.1} />
      </mesh>
      
      {/* Additional complex geometry - Torus for more surface variations */}
      <mesh position={[0, 2, -2]}>
        <torusGeometry args={[1, 0.4, 16, 32]} />
        <meshStandardMaterial color="#a29bfe" roughness={0.3} metalness={0.4} />
      </mesh>
      
      {/* Icosahedron for angular surfaces */}
      <mesh position={[-1, 0, 3]}>
        <icosahedronGeometry args={[0.8, 1]} />
        <meshStandardMaterial color="#fd79a8" roughness={0.2} metalness={0.5} />
      </mesh>
    </group>
  )
}

function Scene({ lightColor, lightPosition }) {
  return (
    <>
      <directionalLight position={lightPosition} color={lightColor} intensity={1} />
      <ambientLight intensity={0.2} />
      <ComplexScene />
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
