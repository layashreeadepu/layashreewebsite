"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Animation variants
const titleVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
}

const subtitleVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, delay: 0.3 }
  }
}

const buttonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.6 }
  }
}

export function HeroSection({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Particle animation
  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setCanvasDimensions()
    window.addEventListener('resize', setCanvasDimensions)

    // Create particles
    const particlesArray: Particle[] = []
    const numberOfParticles = Math.min(100, Math.floor(window.innerWidth / 20))

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5

        // Purple/violet color palette with varying opacity
        const hue = 250 + Math.random() * 40
        const sat = 70 + Math.random() * 30
        const light = 50 + Math.random() * 20
        const alpha = 0.3 + Math.random() * 0.4
        this.color = `hsla(${hue}, ${sat}%, ${light}%, ${alpha})`
      }

      update(mouseX: number, mouseY: number) {
        this.x += this.speedX
        this.y += this.speedY

        // Boundary check
        if (this.x > canvas.width || this.x < 0) {
          this.speedX = -this.speedX
        }
        if (this.y > canvas.height || this.y < 0) {
          this.speedY = -this.speedY
        }

        // Mouse interaction
        const dx = mouseX - this.x
        const dy = mouseY - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = 100

        if (distance < maxDistance) {
          const forceFactor = (maxDistance - distance) / maxDistance
          this.speedX += (dx / distance) * forceFactor * 0.2
          this.speedY += (dy / distance) * forceFactor * 0.2

          // Limit max speed
          const maxSpeed = 2
          const currentSpeed = Math.sqrt(this.speedX * this.speedX + this.speedY * this.speedY)
          if (currentSpeed > maxSpeed) {
            this.speedX = (this.speedX / currentSpeed) * maxSpeed
            this.speedY = (this.speedY / currentSpeed) * maxSpeed
          }
        }
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
      }
    }

    // Initialize particles
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle())
    }

    // Animation loop
    let animationFrameId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections between particles
      ctx.strokeStyle = 'rgba(140, 90, 250, 0.1)'
      ctx.lineWidth = 0.3
      for (let i = 0; i < particlesArray.length; i++) {
        for (let j = i + 1; j < particlesArray.length; j++) {
          const dx = particlesArray[i].x - particlesArray[j].x
          const dy = particlesArray[i].y - particlesArray[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.beginPath()
            ctx.moveTo(particlesArray[i].x, particlesArray[i].y)
            ctx.lineTo(particlesArray[j].x, particlesArray[j].y)
            ctx.stroke()
          }
        }
      }

      // Update and draw particles
      for (const particle of particlesArray) {
        particle.update(mousePosition.x, mousePosition.y)
        particle.draw()
      }

      animationFrameId = requestAnimationFrame(animate)
    }
    animate()

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasDimensions)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [mousePosition]) // Add mousePosition as a dependency

  return (
    <section id="home" className={cn("relative min-h-screen flex items-center overflow-hidden", className)}>
      {/* Animated background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 -z-10"
        style={{
          width: '100%',
          height: '100%'
        }}
      />

      <div className="container mx-auto px-4 z-10">
        <div className="max-w-4xl">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-4"
            initial="hidden"
            animate="visible"
            variants={titleVariants}
          >
            <span className="text-gradient">Hello, I'm Layashree</span>
          </motion.h1>

          <motion.h2
            className="text-2xl md:text-3xl mb-6 text-muted-foreground"
            initial="hidden"
            animate="visible"
            variants={subtitleVariants}
          >
            Data Engineer & Analytics Professional
          </motion.h2>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={buttonVariants}
          >
            <Button asChild size="lg" className="interactive-item">
              <a href="#contact">
                Get In Touch
              </a>
            </Button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{
            y: [0, 10, 0],
            opacity: [0.4, 1, 0.4]
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 2
          }}
        >
          <ArrowDown className="h-8 w-8 text-primary animate-bounce" />
        </motion.div>
      </div>
    </section>
  )
}
