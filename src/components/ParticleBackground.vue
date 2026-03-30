<template>
  <canvas ref="canvas" class="particle-canvas"></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvas = ref(null)
let ctx = null
let particles = []
let animationId = null
let mouse = { x: null, y: null }

class Particle {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.size = Math.random() * 2 + 1
    this.speedX = Math.random() * 2 - 1
    this.speedY = Math.random() * 2 - 1
    this.color = this.getRandomColor()
    this.life = 1
    this.decay = Math.random() * 0.01 + 0.001
  }

  getRandomColor() {
    const colors = [
      'rgba(0, 255, 249, ',    // cyan
      'rgba(255, 0, 255, ',    // magenta
      'rgba(180, 0, 255, ',    // purple
      'rgba(0, 255, 136, ',    // green
    ]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  update() {
    this.x += this.speedX
    this.y += this.speedY
    
    if (this.size > 0.1) this.size -= 0.01
    this.life -= this.decay
    
    // 鼠标交互
    if (mouse.x !== null && mouse.y !== null) {
      const dx = mouse.x - this.x
      const dy = mouse.y - this.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 100) {
        this.speedX += dx * 0.0005
        this.speedY += dy * 0.0005
      }
    }
  }

  draw(ctx) {
    ctx.fillStyle = this.color + this.life + ')'
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
    
    // 发光效果
    ctx.shadowBlur = 15
    ctx.shadowColor = this.color + '1)'
  }
}

onMounted(() => {
  const cvs = canvas.value
  ctx = cvs.getContext('2d')
  
  const resize = () => {
    cvs.width = window.innerWidth
    cvs.height = window.innerHeight
  }
  
  resize()
  window.addEventListener('resize', resize)
  
  // 鼠标事件
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX
    mouse.y = e.clientY
  })
  
  window.addEventListener('mouseout', () => {
    mouse.x = null
    mouse.y = null
  })
  
  // 创建初始粒子
  for (let i = 0; i < 100; i++) {
    particles.push(new Particle(
      Math.random() * cvs.width,
      Math.random() * cvs.height
    ))
  }
  
  // 动画循环
  const animate = () => {
    ctx.fillStyle = 'rgba(5, 5, 8, 0.1)'
    ctx.fillRect(0, 0, cvs.width, cvs.height)
    
    // 添加新粒子
    if (particles.length < 150) {
      particles.push(new Particle(
        Math.random() * cvs.width,
        Math.random() * cvs.height
      ))
    }
    
    // 更新和绘制粒子
    particles = particles.filter(p => p.life > 0)
    particles.forEach(p => {
      p.update()
      p.draw(ctx)
    })
    
    // 绘制连线
    ctx.strokeStyle = 'rgba(0, 255, 249, 0.05)'
    ctx.lineWidth = 0.5
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 100) {
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.stroke()
        }
      }
    }
    
    animationId = requestAnimationFrame(animate)
  }
  
  animate()
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
})
</script>

<style scoped>
.particle-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}
</style>
