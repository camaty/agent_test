import { FC, useRef, useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group, AnimationMixer, AnimationClip, KeyframeTrack, LoopRepeat, LoopOnce, AnimationAction } from 'three'
import { AnimatedCharacterProps } from '../types'

/**
 * Animated character component using Three.js Animation Mixer
 */
export const AnimatedCharacter: FC<AnimatedCharacterProps> = ({ 
  animationState, 
  onAnimationUpdate 
}) => {
  const characterRef = useRef<Group>(null)
  const mixerRef = useRef<AnimationMixer | null>(null)
  const actionRef = useRef<AnimationAction | null>(null)

  // Create animation clips
  const animationClips = useMemo(() => {
    // Create a simple bouncing animation
    const bounceTrack = new KeyframeTrack(
      '.position[y]',
      [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4], // times
      [0, 0.5, 1, 1.5, 1, 0.5, 0, 0.5, 0] // values
    )

    // Create a rotation animation
    const rotationTrack = new KeyframeTrack(
      '.rotation[y]',
      [0, 1, 2, 3, 4], // times
      [0, Math.PI * 0.5, Math.PI, Math.PI * 1.5, Math.PI * 2] // values
    )

    // Create a scaling animation
    const scaleTrack = new KeyframeTrack(
      '.scale[x]',
      [0, 1, 2, 3, 4], // times
      [1, 1.2, 1, 1.2, 1] // values
    )

    const scaleTrackY = new KeyframeTrack(
      '.scale[y]',
      [0, 1, 2, 3, 4], // times
      [1, 0.8, 1, 0.8, 1] // values
    )

    const scaleTrackZ = new KeyframeTrack(
      '.scale[z]',
      [0, 1, 2, 3, 4], // times
      [1, 1.2, 1, 1.2, 1] // values
    )

    // Create animation clip
    const clip = new AnimationClip('character-bounce', 4, [
      bounceTrack,
      rotationTrack,
      scaleTrack,
      scaleTrackY,
      scaleTrackZ
    ])

    return [clip]
  }, [])

  // Initialize mixer and action
  useEffect(() => {
    if (characterRef.current && animationClips.length > 0) {
      mixerRef.current = new AnimationMixer(characterRef.current)
      actionRef.current = mixerRef.current.clipAction(animationClips[0])
      
      // Set loop mode
      actionRef.current.setLoop(animationState.loop ? LoopRepeat : LoopOnce, Infinity)
      actionRef.current.clampWhenFinished = true
      
      // Update duration
      onAnimationUpdate(0, animationClips[0].duration)
      
      // Start playing if needed
      if (animationState.isPlaying) {
        actionRef.current.play()
      }
    }

    return () => {
      if (mixerRef.current) {
        mixerRef.current.stopAllAction()
        mixerRef.current = null
      }
    }
  }, [animationClips, animationState.loop, animationState.isPlaying, onAnimationUpdate])

  // Handle animation state changes
  useEffect(() => {
    if (actionRef.current) {
      if (animationState.isPlaying) {
        actionRef.current.paused = false
        actionRef.current.play()
      } else {
        actionRef.current.paused = true
      }
      
      // Set playback rate for reverse
      actionRef.current.setEffectiveTimeScale(animationState.isReversed ? -1 : 1)
    }
  }, [animationState.isPlaying, animationState.isReversed])

  // Handle time changes
  useEffect(() => {
    if (actionRef.current && mixerRef.current) {
      actionRef.current.time = animationState.currentTime
      mixerRef.current.update(0) // Update with 0 delta to apply time change
    }
  }, [animationState.currentTime])

  // Animation update loop
  useFrame((state, delta) => {
    if (mixerRef.current && actionRef.current) {
      if (animationState.isPlaying) {
        mixerRef.current.update(delta)
        
        // Update current time
        const currentTime = actionRef.current.time
        const duration = animationClips[0]?.duration || 4
        
        onAnimationUpdate(currentTime, duration)
      }
    }
  })

  return (
    <group ref={characterRef} position={[0, 0, 0]}>
      {/* Simple character made of basic geometries */}
      <group>
        {/* Head */}
        <mesh position={[0, 2, 0]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color="#ffcc99" />
        </mesh>
        
        {/* Body */}
        <mesh position={[0, 1, 0]}>
          <boxGeometry args={[0.4, 0.8, 0.3]} />
          <meshStandardMaterial color="#4a90e2" />
        </mesh>
        
        {/* Arms */}
        <mesh position={[-0.35, 1.2, 0]}>
          <boxGeometry args={[0.15, 0.6, 0.15]} />
          <meshStandardMaterial color="#ffcc99" />
        </mesh>
        <mesh position={[0.35, 1.2, 0]}>
          <boxGeometry args={[0.15, 0.6, 0.15]} />
          <meshStandardMaterial color="#ffcc99" />
        </mesh>
        
        {/* Legs */}
        <mesh position={[-0.15, 0.1, 0]}>
          <boxGeometry args={[0.15, 0.8, 0.15]} />
          <meshStandardMaterial color="#2c3e50" />
        </mesh>
        <mesh position={[0.15, 0.1, 0]}>
          <boxGeometry args={[0.15, 0.8, 0.15]} />
          <meshStandardMaterial color="#2c3e50" />
        </mesh>
        
        {/* Feet */}
        <mesh position={[-0.15, -0.35, 0.1]}>
          <boxGeometry args={[0.15, 0.1, 0.3]} />
          <meshStandardMaterial color="#34495e" />
        </mesh>
        <mesh position={[0.15, -0.35, 0.1]}>
          <boxGeometry args={[0.15, 0.1, 0.3]} />
          <meshStandardMaterial color="#34495e" />
        </mesh>
      </group>
    </group>
  )
}