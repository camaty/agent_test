import { FC } from 'react'
import { Vector3 } from 'three'
import { ParticleControlsProps, ParticleParameter, Axis } from '../types'

/**
 * Control panel for adjusting particle system parameters
 */
export const ParticleControls: FC<ParticleControlsProps> = ({ config, onConfigChange }) => {
  const handleNumberChange = (parameter: ParticleParameter, value: string) => {
    const newConfig = {
      ...config,
      [parameter]: parseFloat(value)
    }
    onConfigChange(newConfig)
  }

  const handleColorChange = (parameter: ParticleParameter, value: string) => {
    const newConfig = {
      ...config,
      [parameter]: value
    }
    onConfigChange(newConfig)
  }

  const handleVectorChange = (parameter: ParticleParameter, axis: Axis, value: string) => {
    const currentVector = config[parameter] as Vector3
    const newVector = new Vector3(...currentVector.toArray())
    const axisIndex = axis === 'x' ? 0 : axis === 'y' ? 1 : 2
    newVector.setComponent(axisIndex, parseFloat(value))
    
    const newConfig = {
      ...config,
      [parameter]: newVector
    }
    onConfigChange(newConfig)
  }

  return (
    <div className="particle-controls">
      <h3>Particle System</h3>
      
      {/* Emitter Properties */}
      <div className="control-group">
        <label>Emitter Properties:</label>
        <div className="position-controls">
          <div className="axis-control">
            <label>Max Particles:</label>
            <input
              type="range"
              min="100"
              max="5000"
              step="100"
              value={config.maxParticles}
              onChange={(e) => handleNumberChange('maxParticles', e.target.value)}
            />
            <span>{config.maxParticles}</span>
          </div>
          <div className="axis-control">
            <label>Emission Rate:</label>
            <input
              type="range"
              min="1"
              max="500"
              step="1"
              value={config.emissionRate}
              onChange={(e) => handleNumberChange('emissionRate', e.target.value)}
            />
            <span>{config.emissionRate}</span>
          </div>
          <div className="axis-control">
            <label>Emitter Radius:</label>
            <input
              type="range"
              min="0"
              max="5"
              step="0.1"
              value={config.emitterRadius}
              onChange={(e) => handleNumberChange('emitterRadius', e.target.value)}
            />
            <span>{config.emitterRadius.toFixed(1)}</span>
          </div>
        </div>
      </div>

      {/* Emitter Position */}
      <div className="control-group">
        <label>Emitter Position:</label>
        <div className="position-controls">
          <div className="axis-control">
            <label>X:</label>
            <input
              type="range"
              min="-10"
              max="10"
              step="0.1"
              value={config.emitterPosition.x}
              onChange={(e) => handleVectorChange('emitterPosition', 'x', e.target.value)}
            />
            <span>{config.emitterPosition.x.toFixed(1)}</span>
          </div>
          <div className="axis-control">
            <label>Y:</label>
            <input
              type="range"
              min="-10"
              max="10"
              step="0.1"
              value={config.emitterPosition.y}
              onChange={(e) => handleVectorChange('emitterPosition', 'y', e.target.value)}
            />
            <span>{config.emitterPosition.y.toFixed(1)}</span>
          </div>
          <div className="axis-control">
            <label>Z:</label>
            <input
              type="range"
              min="-10"
              max="10"
              step="0.1"
              value={config.emitterPosition.z}
              onChange={(e) => handleVectorChange('emitterPosition', 'z', e.target.value)}
            />
            <span>{config.emitterPosition.z.toFixed(1)}</span>
          </div>
        </div>
      </div>

      {/* Particle Properties */}
      <div className="control-group">
        <label>Particle Properties:</label>
        <div className="position-controls">
          <div className="axis-control">
            <label>Lifetime:</label>
            <input
              type="range"
              min="0.5"
              max="10"
              step="0.1"
              value={config.particleLifetime}
              onChange={(e) => handleNumberChange('particleLifetime', e.target.value)}
            />
            <span>{config.particleLifetime.toFixed(1)}s</span>
          </div>
          <div className="axis-control">
            <label>Start Speed:</label>
            <input
              type="range"
              min="0"
              max="20"
              step="0.1"
              value={config.startSpeed}
              onChange={(e) => handleNumberChange('startSpeed', e.target.value)}
            />
            <span>{config.startSpeed.toFixed(1)}</span>
          </div>
          <div className="axis-control">
            <label>Start Size:</label>
            <input
              type="range"
              min="0.1"
              max="2"
              step="0.1"
              value={config.startSize}
              onChange={(e) => handleNumberChange('startSize', e.target.value)}
            />
            <span>{config.startSize.toFixed(1)}</span>
          </div>
          <div className="axis-control">
            <label>End Size:</label>
            <input
              type="range"
              min="0.1"
              max="2"
              step="0.1"
              value={config.endSize}
              onChange={(e) => handleNumberChange('endSize', e.target.value)}
            />
            <span>{config.endSize.toFixed(1)}</span>
          </div>
        </div>
      </div>

      {/* Colors */}
      <div className="control-group">
        <label>Colors:</label>
        <div className="color-controls">
          <div className="axis-control">
            <label>Start Color:</label>
            <input
              type="color"
              value={config.startColor}
              onChange={(e) => handleColorChange('startColor', e.target.value)}
            />
          </div>
          <div className="axis-control">
            <label>End Color:</label>
            <input
              type="color"
              value={config.endColor}
              onChange={(e) => handleColorChange('endColor', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Physics */}
      <div className="control-group">
        <label>Physics:</label>
        <div className="position-controls">
          <div className="axis-control">
            <label>Gravity:</label>
            <input
              type="range"
              min="0"
              max="20"
              step="0.1"
              value={config.gravity}
              onChange={(e) => handleNumberChange('gravity', e.target.value)}
            />
            <span>{config.gravity.toFixed(1)}</span>
          </div>
          <div className="axis-control">
            <label>Drag:</label>
            <input
              type="range"
              min="0"
              max="5"
              step="0.1"
              value={config.drag}
              onChange={(e) => handleNumberChange('drag', e.target.value)}
            />
            <span>{config.drag.toFixed(1)}</span>
          </div>
          <div className="axis-control">
            <label>Turbulence:</label>
            <input
              type="range"
              min="0"
              max="10"
              step="0.1"
              value={config.turbulence}
              onChange={(e) => handleNumberChange('turbulence', e.target.value)}
            />
            <span>{config.turbulence.toFixed(1)}</span>
          </div>
        </div>
      </div>

      {/* Wind */}
      <div className="control-group">
        <label>Wind:</label>
        <div className="position-controls">
          <div className="axis-control">
            <label>X:</label>
            <input
              type="range"
              min="-5"
              max="5"
              step="0.1"
              value={config.wind.x}
              onChange={(e) => handleVectorChange('wind', 'x', e.target.value)}
            />
            <span>{config.wind.x.toFixed(1)}</span>
          </div>
          <div className="axis-control">
            <label>Y:</label>
            <input
              type="range"
              min="-5"
              max="5"
              step="0.1"
              value={config.wind.y}
              onChange={(e) => handleVectorChange('wind', 'y', e.target.value)}
            />
            <span>{config.wind.y.toFixed(1)}</span>
          </div>
          <div className="axis-control">
            <label>Z:</label>
            <input
              type="range"
              min="-5"
              max="5"
              step="0.1"
              value={config.wind.z}
              onChange={(e) => handleVectorChange('wind', 'z', e.target.value)}
            />
            <span>{config.wind.z.toFixed(1)}</span>
          </div>
        </div>
      </div>

      {/* Behavior */}
      <div className="control-group">
        <label>Behavior:</label>
        <div className="position-controls">
          <div className="axis-control">
            <label>Fade In:</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={config.fadeIn}
              onChange={(e) => handleNumberChange('fadeIn', e.target.value)}
            />
            <span>{config.fadeIn.toFixed(2)}</span>
          </div>
          <div className="axis-control">
            <label>Fade Out:</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={config.fadeOut}
              onChange={(e) => handleNumberChange('fadeOut', e.target.value)}
            />
            <span>{config.fadeOut.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}