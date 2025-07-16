import { FC, ChangeEvent, useState } from 'react'
import { Vector3 } from 'three'
import { ControlsProps, Axis, SSAOParameter } from '../types'

/**
 * Control panel for adjusting light and SSAO parameters
 */
export const Controls: FC<ControlsProps> = ({
  lightColor,
  lightPosition,
  ssaoConfig,
  onLightColorChange,
  onLightPositionChange,
  onSSAOChange
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const handlePositionChange = (axis: Axis, value: string) => {
    const newPosition = new Vector3(...lightPosition.toArray())
    const axisIndex = axis === 'x' ? 0 : axis === 'y' ? 1 : 2
    newPosition.setComponent(axisIndex, parseFloat(value))
    onLightPositionChange(newPosition)
  }

  const handleSSAOChange = (parameter: SSAOParameter, value: string) => {
    const newConfig = {
      ...ssaoConfig,
      [parameter]: parseFloat(value)
    }
    onSSAOChange(newConfig)
  }

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    onLightColorChange(e.target.value)
  }

  return (
    <div className="controls">
      <div className="panel-header">
        <h3>Light & SSAO</h3>
        <button 
          className="collapse-button" 
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? '▼' : '▲'}
        </button>
      </div>
      
      {!isCollapsed && (
        <div className="panel-content">
          <div className="control-group">
            <label>Light Color:</label>
            <input
              type="color"
              value={lightColor}
              onChange={handleColorChange}
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
                  value={lightPosition.x}
                  onChange={(e) => handlePositionChange('x', e.target.value)}
                />
                <span>{lightPosition.x.toFixed(1)}</span>
              </div>
              <div className="axis-control">
                <label>Y:</label>
                <input
                  type="range"
                  min="-20"
                  max="20"
                  step="0.1"
                  value={lightPosition.y}
                  onChange={(e) => handlePositionChange('y', e.target.value)}
                />
                <span>{lightPosition.y.toFixed(1)}</span>
              </div>
              <div className="axis-control">
                <label>Z:</label>
                <input
                  type="range"
                  min="-20"
                  max="20"
                  step="0.1"
                  value={lightPosition.z}
                  onChange={(e) => handlePositionChange('z', e.target.value)}
                />
                <span>{lightPosition.z.toFixed(1)}</span>
              </div>
            </div>
          </div>
          
          <div className="control-group">
            <label>SSAO Settings:</label>
            <div className="position-controls">
              <div className="axis-control">
                <label>Intensity:</label>
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.01"
                  value={ssaoConfig.intensity}
                  onChange={(e) => handleSSAOChange('intensity', e.target.value)}
                />
                <span>{ssaoConfig.intensity.toFixed(2)}</span>
              </div>
              <div className="axis-control">
                <label>Radius:</label>
                <input
                  type="range"
                  min="0.01"
                  max="0.5"
                  step="0.01"
                  value={ssaoConfig.radius}
                  onChange={(e) => handleSSAOChange('radius', e.target.value)}
                />
                <span>{ssaoConfig.radius.toFixed(2)}</span>
              </div>
              <div className="axis-control">
                <label>Bias:</label>
                <input
                  type="range"
                  min="0.001"
                  max="0.1"
                  step="0.001"
                  value={ssaoConfig.bias}
                  onChange={(e) => handleSSAOChange('bias', e.target.value)}
                />
                <span>{ssaoConfig.bias.toFixed(3)}</span>
              </div>
              <div className="axis-control">
                <label>Samples:</label>
                <input
                  type="range"
                  min="4"
                  max="32"
                  step="1"
                  value={ssaoConfig.samples}
                  onChange={(e) => handleSSAOChange('samples', e.target.value)}
                />
                <span>{ssaoConfig.samples}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}