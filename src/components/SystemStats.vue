<template>
  <div class="stats-card neon-box">
    <h3 class="card-title">// SYSTEM_STATUS</h3>
    <div class="stats-grid">
      <div class="stat-item">
        <div class="stat-label">CPU_LOAD</div>
        <div class="stat-bar">
          <div class="stat-fill" :style="{ width: cpuUsage + '%' }"></div>
        </div>
        <div class="stat-value">{{ cpuUsage.toFixed(1) }}%</div>
      </div>
      <div class="stat-item">
        <div class="stat-label">MEM_USAGE</div>
        <div class="stat-bar">
          <div class="stat-fill mem" :style="{ width: memUsage + '%' }"></div>
        </div>
        <div class="stat-value">{{ memUsage.toFixed(1) }}%</div>
      </div>
      <div class="stat-item">
        <div class="stat-label">NET_TRAFFIC</div>
        <div class="stat-bar">
          <div class="stat-fill net" :style="{ width: netUsage + '%' }"></div>
        </div>
        <div class="stat-value">{{ netTraffic }} KB/s</div>
      </div>
    </div>
    <div class="wave-container">
      <canvas ref="waveCanvas" class="wave-canvas"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const cpuUsage = ref(0)
const memUsage = ref(0)
const netUsage = ref(0)
const netTraffic = ref(0)
const waveCanvas = ref(null)

let timer = null
let waveCtx = null
let waveOffset = 0

const updateStats = () => {
  // 模拟数据
  cpuUsage.value = 30 + Math.random() * 40
  memUsage.value = 50 + Math.random() * 30
  netUsage.value = Math.random() * 100
  netTraffic.value = Math.floor(Math.random() * 1000)
}

const drawWave = () => {
  if (!waveCtx) return
  
  const canvas = waveCanvas.value
  const width = canvas.width
  const height = canvas.height
  
  waveCtx.clearRect(0, 0, width, height)
  
  // 绘制多条波形
  const waves = [
    { color: 'rgba(0, 255, 249, 0.3)', amplitude: 20, frequency: 0.02, speed: 0.05 },
    { color: 'rgba(255, 0, 255, 0.2)', amplitude: 15, frequency: 0.03, speed: 0.03 },
    { color: 'rgba(180, 0, 255, 0.15)', amplitude: 10, frequency: 0.04, speed: 0.07 },
  ]
  
  waves.forEach((wave, index) => {
    waveCtx.beginPath()
    waveCtx.strokeStyle = wave.color
    waveCtx.lineWidth = 2
    
    for (let x = 0; x < width; x++) {
      const y = height / 2 + 
        Math.sin((x * wave.frequency) + (waveOffset * wave.speed * (index + 1))) * wave.amplitude +
        Math.sin((x * wave.frequency * 2) + (waveOffset * wave.speed * 0.5)) * (wave.amplitude / 2)
      
      if (x === 0) {
        waveCtx.moveTo(x, y)
      } else {
        waveCtx.lineTo(x, y)
      }
    }
    
    waveCtx.stroke()
  })
  
  waveOffset++
  requestAnimationFrame(drawWave)
}

onMounted(() => {
  updateStats()
  timer = setInterval(updateStats, 2000)
  
  const canvas = waveCanvas.value
  canvas.width = canvas.offsetWidth * 2
  canvas.height = 60
  waveCtx = canvas.getContext('2d')
  
  drawWave()
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.stats-card {
  padding: 20px;
  background: rgba(10, 10, 18, 0.8);
}

.card-title {
  font-size: 0.8rem;
  color: var(--cyber-magenta);
  margin-bottom: 15px;
  letter-spacing: 2px;
}

.stats-grid {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.stat-item {
  display: grid;
  grid-template-columns: 100px 1fr 60px;
  align-items: center;
  gap: 10px;
}

.stat-label {
  font-size: 0.7rem;
  color: var(--cyber-cyan);
  opacity: 0.7;
}

.stat-bar {
  height: 8px;
  background: rgba(0, 255, 249, 0.1);
  border-radius: 4px;
  overflow: hidden;
}

.stat-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--cyber-cyan), var(--cyber-green));
  border-radius: 4px;
  transition: width 0.5s ease;
  box-shadow: 0 0 10px var(--cyber-cyan);
}

.stat-fill.mem {
  background: linear-gradient(90deg, var(--cyber-magenta), var(--cyber-purple));
  box-shadow: 0 0 10px var(--cyber-magenta);
}

.stat-fill.net {
  background: linear-gradient(90deg, var(--cyber-yellow), var(--cyber-green));
  box-shadow: 0 0 10px var(--cyber-yellow);
}

.stat-value {
  font-size: 0.75rem;
  color: var(--cyber-green);
  text-align: right;
}

.wave-container {
  margin-top: 20px;
  height: 30px;
  overflow: hidden;
}

.wave-canvas {
  width: 100%;
  height: 100%;
}
</style>
