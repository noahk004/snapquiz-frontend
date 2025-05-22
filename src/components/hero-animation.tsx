"use client"

import { useEffect, useRef } from "react"
import { FileText } from "lucide-react"

export default function HeroAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const parent = canvas.parentElement
      if (!parent) return

      canvas.width = parent.clientWidth
      canvas.height = parent.clientHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Animation variables
    let animationFrameId: number
    const particles: Particle[] = []
    const documentIcons: DocumentIcon[] = []
    const questionBubbles: QuestionBubble[] = []

    // Create document icons
    for (let i = 0; i < 3; i++) {
      documentIcons.push(new DocumentIcon(canvas, i))
    }

    // Create question bubbles
    for (let i = 0; i < 5; i++) {
      questionBubbles.push(new QuestionBubble(canvas, i))
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw and update document icons
      documentIcons.forEach((icon) => {
        icon.update()
        icon.draw(ctx)
      })

      // Draw and update question bubbles
      questionBubbles.forEach((bubble) => {
        bubble.update()
        bubble.draw(ctx)
      })

      // Draw and update particles
      particles.forEach((particle, index) => {
        particle.update()
        particle.draw(ctx)

        // Remove dead particles
        if (particle.alpha <= 0) {
          particles.splice(index, 1)
        }
      })

      // Create new particles
      if (Math.random() < 0.1 && particles.length < 50) {
        particles.push(new Particle(canvas))
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="relative w-full h-[400px] md:h-[500px]">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full"></canvas>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-600/20 mb-4">
            <FileText className="w-8 h-8 text-purple-400" />
          </div>
          <div className="text-2xl font-bold mb-2">AI-Powered</div>
          <div className="text-slate-300">Document → Exam</div>
        </div>
      </div>
    </div>
  )
}

// Particle class for background effects
class Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
  alpha: number
  canvas: HTMLCanvasElement

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.x = Math.random() * canvas.width
    this.y = Math.random() * canvas.height
    this.size = Math.random() * 3 + 1
    this.speedX = (Math.random() - 0.5) * 0.5
    this.speedY = (Math.random() - 0.5) * 0.5

    const colors = ["#8b5cf6", "#06b6d4", "#3b82f6"]
    this.color = colors[Math.floor(Math.random() * colors.length)]
    this.alpha = 0.7
  }

  update() {
    this.x += this.speedX
    this.y += this.speedY

    if (this.alpha > 0.1) {
      this.alpha -= 0.005
    }

    if (this.size > 0.2) {
      this.size -= 0.02
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save()
    ctx.globalAlpha = this.alpha
    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }
}

// Document icon class
class DocumentIcon {
  x: number
  y: number
  size: number
  angle: number
  rotationSpeed: number
  canvas: HTMLCanvasElement
  index: number

  constructor(canvas: HTMLCanvasElement, index: number) {
    this.canvas = canvas
    this.index = index
    this.size = 30

    // Position based on index
    const centerX = canvas.width * 0.3
    const centerY = canvas.height * 0.5
    const radius = 80
    const angle = (index / 3) * Math.PI * 2

    this.x = centerX + Math.cos(angle) * radius
    this.y = centerY + Math.sin(angle) * radius
    this.angle = 0
    this.rotationSpeed = 0.01 + Math.random() * 0.01
  }

  update() {
    this.angle += this.rotationSpeed
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.angle)

    // Draw document icon
    ctx.fillStyle = "rgba(139, 92, 246, 0.3)"
    ctx.strokeStyle = "rgba(139, 92, 246, 0.8)"
    ctx.lineWidth = 2

    // Document shape
    ctx.beginPath()
    ctx.moveTo(-this.size / 2, -this.size / 2)
    ctx.lineTo(this.size / 2, -this.size / 2)
    ctx.lineTo(this.size / 2, this.size / 2)
    ctx.lineTo(-this.size / 2, this.size / 2)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    // Document lines
    ctx.strokeStyle = "rgba(139, 92, 246, 0.5)"
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(-this.size / 3, -this.size / 4)
    ctx.lineTo(this.size / 3, -this.size / 4)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(-this.size / 3, 0)
    ctx.lineTo(this.size / 3, 0)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(-this.size / 3, this.size / 4)
    ctx.lineTo(this.size / 3, this.size / 4)
    ctx.stroke()

    ctx.restore()
  }
}

// Question bubble class
class QuestionBubble {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  canvas: HTMLCanvasElement
  type: "A" | "B" | "C" | "D"
  correct: boolean

  constructor(canvas: HTMLCanvasElement, index: number) {
    this.canvas = canvas
    this.size = 20 + Math.random() * 10

    // Position based on index
    const centerX = canvas.width * 0.7
    const centerY = canvas.height * 0.5
    const radius = 100
    const angle = (index / 5) * Math.PI * 2

    this.x = centerX + Math.cos(angle) * radius
    this.y = centerY + Math.sin(angle) * radius

    this.speedX = (Math.random() - 0.5) * 0.5
    this.speedY = (Math.random() - 0.5) * 0.5

    const types: Array<"A" | "B" | "C" | "D"> = ["A", "B", "C", "D"]
    this.type = types[Math.floor(Math.random() * types.length)]
    this.correct = Math.random() > 0.7
  }

  update() {
    // Bounce off walls
    if (this.x <= this.size || this.x >= this.canvas.width - this.size) {
      this.speedX = -this.speedX
    }

    if (this.y <= this.size || this.y >= this.canvas.height - this.size) {
      this.speedY = -this.speedY
    }

    this.x += this.speedX
    this.y += this.speedY
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save()

    // Draw bubble
    ctx.fillStyle = this.correct ? "rgba(16, 185, 129, 0.2)" : "rgba(239, 68, 68, 0.2)"
    ctx.strokeStyle = this.correct ? "rgba(16, 185, 129, 0.8)" : "rgba(239, 68, 68, 0.8)"
    ctx.lineWidth = 2

    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()

    // Draw letter
    ctx.fillStyle = this.correct ? "rgba(16, 185, 129, 1)" : "rgba(239, 68, 68, 1)"
    ctx.font = `${this.size}px sans-serif`
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(this.type, this.x, this.y)

    ctx.restore()
  }
}
