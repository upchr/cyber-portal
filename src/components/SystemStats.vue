<template>
  <div class="stats-card neon-box">
    <h3 class="card-title">// CLIENT_INFO</h3>
    <div class="stats-grid">
      <div class="stat-item">
        <div class="stat-label">BROWSER</div>
        <div class="stat-value">{{ browser }}</div>
      </div>
      <div class="stat-item">
        <div class="stat-label">PLATFORM</div>
        <div class="stat-value">{{ platform }}</div>
      </div>
      <div class="stat-item">
        <div class="stat-label">SCREEN</div>
        <div class="stat-value">{{ screen }}</div>
      </div>
      <div class="stat-item">
        <div class="stat-label">LANGUAGE</div>
        <div class="stat-value">{{ language }}</div>
      </div>
      <div class="stat-item">
        <div class="stat-label">TIMEZONE</div>
        <div class="stat-value">{{ timezone }}</div>
      </div>
      <div class="stat-item">
        <div class="stat-label">ONLINE</div>
        <div class="stat-value online">{{ online ? 'CONNECTED' : 'OFFLINE' }}</div>
      </div>
    </div>
    <div class="wave-container">
      <canvas ref="waveCanvas" class="wave-canvas"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const browser = ref('Unknown')
const platform = ref('Unknown')
const screen = ref('0x0')
const language = ref('en')
const timezone = ref('UTC')
const online = ref(true)

let waveCtx = null
let waveOffset = 0
const waveCanvas = ref(null)

const detectBrowser = () => {
  const ua = navigator.userAgent
  if (ua.includes('Firefox')) return 'Firefox'
  if (ua.includes('Edg/')) return 'Edge'
  if (ua.includes('Chrome')) return 'Chrome'
  if (ua.includes('Safari')) return 'Safari'
  if (ua.includes('Opera') || ua.includes('OPR')) return 'Opera'
  return 'Unknown'
}

const detectPlatform = () => {
  const platform = navigator.platform || navigator.userAgentData?.platform || 'Unknown'
  if (platform.includes('Win')) return 'Windows'
  if (platform.includes('Mac')) return 'macOS'
  if (platform.includes('Linux')) return 'Linux'
  if (platform.includes('iPhone') || platform.includes('iPad')) return 'iOS'
  if (platform.includes('Android')) return 'Android'
  return platform
}

const drawWave = () => {
  if (!waveCtx) return
  
  const canvas = waveCanvas.value
  const width = canvas.width
  const height = canvas.height
  
  waveCtx.clearRect(0, 0, width, height)
  
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
  browser.value = detectBrowser()
  platform.value = detectPlatform()
  screen.value = `${window.screen.width}x${window.screen.height}`
  language.value = navigator.language || 'en'
  timezone.value = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'
  online.value = navigator.onLine
  
  window.addEventListener('online', () => online.value = true)
  window.addEventListener('offline', () => online.value = false)
  
  const canvas = waveCanvas.value
  canvas.width = canvas.offsetWidth * 2
  canvas.height = 60
  waveCtx = canvas.getContext('2d')
  
  drawWave()
})

onUnmounted(() => {
  window.removeEventListener('online', () => {})
  window.removeEventListener('offline', () => {})
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
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 10px;
  background: rgba(0, 255, 249, 0.03);
  border: 1px solid rgba(0, 255, 249, 0.1);
}

.stat-label {
  font-size: 0.65rem;
  color: var(--cyber-magenta);
  opacity: 0.8;
}

.stat-value {
  font-size: 0.85rem;
  color: var(--cyber-cyan);
  font-weight: 500;
}

.stat-value.online {
  color: var(--cyber-green);
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
