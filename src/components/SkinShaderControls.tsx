import { FC } from 'react'
import { SkinShaderControlsProps, RenderMode } from '../types'

/**
 * Controls component for skin shader parameters
 */
export const SkinShaderControls: FC<SkinShaderControlsProps> = ({
  config,
  onConfigChange
}) => {
  const handleRenderModeChange = (mode: RenderMode) => {
    onConfigChange({ ...config, renderMode: mode })
  }

  const handleSkinColorChange = (color: string) => {
    onConfigChange({ ...config, skinColor: color })
  }

  const handleSubsurfaceChange = (value: number) => {
    onConfigChange({ ...config, subsurfaceScattering: value })
  }

  const handleRoughnessChange = (value: number) => {
    onConfigChange({ ...config, roughness: value })
  }

  const handleMetalnessChange = (value: number) => {
    onConfigChange({ ...config, metalness: value })
  }

  const handlePositionChange = (axis: 'x' | 'y' | 'z', value: number) => {
    const newPosition = config.position.clone()
    newPosition[axis] = value
    onConfigChange({ ...config, position: newPosition })
  }

  return (
    <div className="control-panel">
      <h3>Skin Shader Controls</h3>
      
      {/* Render Mode Selection */}
      <div className="control-group">
        <label>Render Mode:</label>
        <div className="button-group">
          {(['depth', 'normal', 'skin', 'combined'] as RenderMode[]).map((mode) => (
            <button
              key={mode}
              className={config.renderMode === mode ? 'active' : ''}
              onClick={() => handleRenderModeChange(mode)}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Skin Color */}
      <div className="control-group">
        <label htmlFor="skinColor">Skin Color:</label>
        <input
          id="skinColor"
          type="color"
          value={config.skinColor}
          onChange={(e) => handleSkinColorChange(e.target.value)}
        />
        <span className="value">{config.skinColor}</span>
      </div>

      {/* Subsurface Scattering */}
      <div className="control-group">
        <label htmlFor="subsurface">Subsurface Scattering:</label>
        <input
          id="subsurface"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={config.subsurfaceScattering}
          onChange={(e) => handleSubsurfaceChange(parseFloat(e.target.value))}
        />
        <span className="value">{config.subsurfaceScattering.toFixed(2)}</span>
      </div>

      {/* Roughness */}
      <div className="control-group">
        <label htmlFor="roughness">Roughness:</label>
        <input
          id="roughness"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={config.roughness}
          onChange={(e) => handleRoughnessChange(parseFloat(e.target.value))}
        />
        <span className="value">{config.roughness.toFixed(2)}</span>
      </div>

      {/* Metalness */}
      <div className="control-group">
        <label htmlFor="metalness">Metalness:</label>
        <input
          id="metalness"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={config.metalness}
          onChange={(e) => handleMetalnessChange(parseFloat(e.target.value))}
        />
        <span className="value">{config.metalness.toFixed(2)}</span>
      </div>

      {/* Position Controls */}
      <div className="control-group">
        <h4>Head Position</h4>
        {(['x', 'y', 'z'] as const).map((axis) => (
          <div key={axis} className="axis-control">
            <label htmlFor={`position-${axis}`}>{axis.toUpperCase()}:</label>
            <input
              id={`position-${axis}`}
              type="range"
              min="-5"
              max="5"
              step="0.1"
              value={config.position[axis]}
              onChange={(e) => handlePositionChange(axis, parseFloat(e.target.value))}
            />
            <span className="value">{config.position[axis].toFixed(1)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}