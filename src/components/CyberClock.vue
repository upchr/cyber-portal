<template>
  <div class="clock-container">
    <div class="clock neon-box">
      <div class="time">
        <span class="hours">{{ hours }}</span>
        <span class="separator">:</span>
        <span class="minutes">{{ minutes }}</span>
        <span class="separator">:</span>
        <span class="seconds">{{ seconds }}</span>
      </div>
      <div class="date-info">
        <span class="date">{{ dateStr }}</span>
        <span class="day">{{ dayStr }}</span>
      </div>
    </div>
    <div class="binary-time">
      <span v-for="(bit, i) in binaryTime" :key="i" 
            :class="['bit', { active: bit === '1' }]">{{ bit }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const hours = ref('00')
const minutes = ref('00')
const seconds = ref('00')
const dateStr = ref('')
const dayStr = ref('')
const binaryTime = ref('00000000:00000000:00000000')

let timer = null

const pad = (n) => n.toString().padStart(2, '0')
const toBinary = (n) => n.toString(2).padStart(8, '0')

const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

const updateTime = () => {
  const now = new Date()
  hours.value = pad(now.getHours())
  minutes.value = pad(now.getMinutes())
  seconds.value = pad(now.getSeconds())
  
  dateStr.value = `${now.getFullYear()}.${pad(now.getMonth() + 1)}.${pad(now.getDate())}`
  dayStr.value = days[now.getDay()]
  
  binaryTime.value = `${toBinary(now.getHours())}:${toBinary(now.getMinutes())}:${toBinary(now.getSeconds())}`
}

onMounted(() => {
  updateTime()
  timer = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.clock-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
}

.clock {
  padding: 30px 50px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.time {
  font-size: 4rem;
  font-weight: 100;
  letter-spacing: 5px;
  color: var(--cyber-cyan);
  text-shadow: 
    0 0 10px var(--cyber-cyan),
    0 0 20px var(--cyber-cyan),
    0 0 40px var(--cyber-cyan);
}

.separator {
  animation: pulse 1s infinite;
}

.date-info {
  margin-top: 10px;
  display: flex;
  gap: 20px;
  color: var(--cyber-magenta);
  font-size: 0.9rem;
}

.binary-time {
  margin-top: 15px;
  font-size: 0.7rem;
  letter-spacing: 2px;
  color: rgba(0, 255, 249, 0.3);
}

.bit {
  display: inline-block;
  width: 8px;
  text-align: center;
  transition: all 0.3s;
}

.bit.active {
  color: var(--cyber-green);
  text-shadow: 0 0 5px var(--cyber-green);
}

@media (max-width: 768px) {
  .time {
    font-size: 2.5rem;
  }
  
  .clock {
    padding: 20px 30px;
  }
}
</style>
