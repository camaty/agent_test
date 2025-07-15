import { FC, ChangeEvent } from 'react'
import { AnimationControlsProps } from '../types'

/**
 * Timeline controls component for animation playback
 */
export const TimelineControls: FC<AnimationControlsProps> = ({
  animationState,
  onPlay,
  onPause,
  onStop,
  onReverse,
  onRestart,
  onTimeChange
}) => {
  const handleTimelineChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value)
    onTimeChange(newTime)
  }

  const formatTime = (time: number) => {
    return time.toFixed(2) + 's'
  }

  return (
    <div className="timeline-controls">
      <div className="timeline-header">
        <h3>Animation Timeline</h3>
        <div className="timeline-info">
          <span>Time: {formatTime(animationState.currentTime)} / {formatTime(animationState.duration)}</span>
        </div>
      </div>
      
      <div className="timeline-track">
        <div className="timeline-labels">
          <span>0s</span>
          <span>{formatTime(animationState.duration)}</span>
        </div>
        <input
          type="range"
          min="0"
          max={animationState.duration}
          step="0.01"
          value={animationState.currentTime}
          onChange={handleTimelineChange}
          className="timeline-slider"
        />
        <div className="timeline-progress">
          <div 
            className="timeline-progress-bar"
            style={{ 
              width: `${(animationState.currentTime / animationState.duration) * 100}%` 
            }}
          />
        </div>
      </div>
      
      <div className="timeline-buttons">
        <button 
          onClick={onRestart}
          className="timeline-button"
          title="Restart"
        >
          ⏮️
        </button>
        
        <button 
          onClick={animationState.isReversed ? () => { onReverse(); } : onReverse}
          className={`timeline-button ${animationState.isReversed ? 'active' : ''}`}
          title="Reverse"
        >
          ⏪
        </button>
        
        <button 
          onClick={onPlay}
          className="timeline-button play"
          title="Play"
          disabled={animationState.isPlaying}
        >
          ▶️
        </button>
        
        <button 
          onClick={onPause}
          className="timeline-button pause"
          title="Pause"
          disabled={!animationState.isPlaying}
        >
          ⏸️
        </button>
        
        <button 
          onClick={onStop}
          className="timeline-button"
          title="Stop"
        >
          ⏹️
        </button>
        
        <div className="timeline-status">
          <span className={`status-indicator ${animationState.isPlaying ? 'playing' : 'paused'}`}>
            {animationState.isPlaying ? 'Playing' : 'Paused'}
          </span>
          {animationState.isReversed && (
            <span className="status-indicator reversed">Reversed</span>
          )}
          <span className="status-indicator loop">
            Loop: {animationState.loop ? 'On' : 'Off'}
          </span>
        </div>
      </div>
    </div>
  )
}