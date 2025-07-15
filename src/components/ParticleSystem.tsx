import { FC, useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points, BufferGeometry, BufferAttribute, Color, Vector3 } from 'three'
import { ParticleSystemProps } from '../types'

interface Particle {
  position: Vector3
  velocity: Vector3
  life: number
  maxLife: number
  size: number
  color: Color
  alpha: number
}

/**
 * Niagara-style particle system component
 */
export const ParticleSystem: FC<ParticleSystemProps> = ({ config }) => {
  const pointsRef = useRef<Points>(null)
  const particlesRef = useRef<Particle[]>([])
  const timeRef = useRef(0)
  const emissionTimeRef = useRef(0)

  // Initialize particles array
  useMemo(() => {
    particlesRef.current = []
  }, [])

  // Create a new particle
  const createParticle = (position: Vector3): Particle => {
    const angle = Math.random() * Math.PI * 2
    const speed = config.startSpeed + (Math.random() - 0.5) * config.startSpeed * 0.5
    const velocity = new Vector3(
      Math.cos(angle) * speed,
      (Math.random() - 0.5) * speed * 0.5,
      Math.sin(angle) * speed
    )

    return {
      position: position.clone(),
      velocity,
      life: config.particleLifetime,
      maxLife: config.particleLifetime,
      size: config.startSize,
      color: new Color(config.startColor),
      alpha: 1
    }
  }

  // Update particle system
  useFrame((state, delta) => {
    if (!pointsRef.current) return

    const particles = particlesRef.current
    timeRef.current += delta
    emissionTimeRef.current += delta

    // Emit new particles
    const emissionInterval = 1 / config.emissionRate
    while (emissionTimeRef.current >= emissionInterval && particles.length < config.maxParticles) {
      const angle = Math.random() * Math.PI * 2
      const radius = Math.random() * config.emitterRadius
      const emitPos = new Vector3(
        config.emitterPosition.x + Math.cos(angle) * radius,
        config.emitterPosition.y,
        config.emitterPosition.z + Math.sin(angle) * radius
      )
      
      particles.push(createParticle(emitPos))
      emissionTimeRef.current -= emissionInterval
    }

    // Update existing particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const particle = particles[i]
      
      // Update life
      particle.life -= delta
      
      // Remove dead particles
      if (particle.life <= 0) {
        particles.splice(i, 1)
        continue
      }

      // Update position
      particle.position.add(particle.velocity.clone().multiplyScalar(delta))
      
      // Apply gravity
      particle.velocity.y -= config.gravity * delta
      
      // Apply wind
      particle.velocity.add(config.wind.clone().multiplyScalar(delta))
      
      // Apply drag
      particle.velocity.multiplyScalar(1 - config.drag * delta)
      
      // Apply turbulence
      if (config.turbulence > 0) {
        particle.velocity.add(new Vector3(
          (Math.random() - 0.5) * config.turbulence * delta,
          (Math.random() - 0.5) * config.turbulence * delta,
          (Math.random() - 0.5) * config.turbulence * delta
        ))
      }

      // Update size
      const lifeRatio = 1 - (particle.life / particle.maxLife)
      particle.size = config.startSize + (config.endSize - config.startSize) * lifeRatio

      // Update color
      const startColor = new Color(config.startColor)
      const endColor = new Color(config.endColor)
      particle.color.lerpColors(startColor, endColor, lifeRatio)

      // Update alpha (fade in/out)
      if (lifeRatio < config.fadeIn) {
        particle.alpha = lifeRatio / config.fadeIn
      } else if (lifeRatio > (1 - config.fadeOut)) {
        particle.alpha = (1 - lifeRatio) / config.fadeOut
      } else {
        particle.alpha = 1
      }
    }

    // Update buffer attributes
    const geometry = pointsRef.current.geometry as BufferGeometry
    const positions = new Float32Array(particles.length * 3)
    const colors = new Float32Array(particles.length * 3)
    const sizes = new Float32Array(particles.length)
    const alphas = new Float32Array(particles.length)

    for (let i = 0; i < particles.length; i++) {
      const particle = particles[i]
      
      positions[i * 3] = particle.position.x
      positions[i * 3 + 1] = particle.position.y
      positions[i * 3 + 2] = particle.position.z
      
      colors[i * 3] = particle.color.r
      colors[i * 3 + 1] = particle.color.g
      colors[i * 3 + 2] = particle.color.b
      
      sizes[i] = particle.size
      alphas[i] = particle.alpha
    }

    geometry.setAttribute('position', new BufferAttribute(positions, 3))
    geometry.setAttribute('color', new BufferAttribute(colors, 3))
    geometry.setAttribute('size', new BufferAttribute(sizes, 1))
    geometry.setAttribute('alpha', new BufferAttribute(alphas, 1))
    
    geometry.attributes.position.needsUpdate = true
    geometry.attributes.color.needsUpdate = true
    geometry.attributes.size.needsUpdate = true
    geometry.attributes.alpha.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={0}
          array={new Float32Array(0)}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={0}
          array={new Float32Array(0)}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={0}
          array={new Float32Array(0)}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-alpha"
          count={0}
          array={new Float32Array(0)}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={1}
        sizeAttenuation={true}
        vertexColors={true}
        transparent={true}
        opacity={0.8}
        blending={2} // AdditiveBlending
      />
    </points>
  )
}