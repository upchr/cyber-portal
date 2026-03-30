<template>
  <div class="github-card neon-box">
    <h3 class="card-title">// GITHUB_STATUS</h3>
    <div class="github-content">
      <div class="github-header">
        <div class="avatar-container">
          <div class="avatar-placeholder">🐙</div>
          <div class="status-dot"></div>
        </div>
        <div class="user-info">
          <span class="username">@developer</span>
          <span class="status">ACTIVE</span>
        </div>
      </div>
      <div class="stats">
        <div class="stat">
          <span class="stat-num">{{ repos }}</span>
          <span class="stat-label">REPOS</span>
        </div>
        <div class="stat">
          <span class="stat-num">{{ followers }}</span>
          <span class="stat-label">FOLLOWERS</span>
        </div>
        <div class="stat">
          <span class="stat-num">{{ contributions }}</span>
          <span class="stat-label">COMMITS</span>
        </div>
      </div>
      <div class="contribution-graph">
        <div v-for="(row, i) in contributionGrid" :key="i" class="grid-row">
          <div v-for="(cell, j) in row" 
               :key="j" 
               :class="['grid-cell', cell]"
               :style="{ animationDelay: `${(i * 7 + j) * 0.02}s` }">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const repos = ref(42)
const followers = ref(128)
const contributions = ref(1024)

const contributionGrid = ref([])

onMounted(() => {
  // 生成贡献图
  const grid = []
  for (let i = 0; i < 7; i++) {
    const row = []
    for (let j = 0; j < 14; j++) {
      const rand = Math.random()
      if (rand < 0.3) row.push('level-0')
      else if (rand < 0.5) row.push('level-1')
      else if (rand < 0.7) row.push('level-2')
      else if (rand < 0.9) row.push('level-3')
      else row.push('level-4')
    }
    grid.push(row)
  }
  contributionGrid.value = grid
  
  // 动态数字
  const interval = setInterval(() => {
    contributions.value += Math.floor(Math.random() * 3)
  }, 5000)
})
</script>

<style scoped>
.github-card {
  padding: 20px;
  background: rgba(10, 10, 18, 0.8);
}

.card-title {
  font-size: 0.8rem;
  color: var(--cyber-magenta);
  margin-bottom: 15px;
  letter-spacing: 2px;
}

.github-content {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.github-header {
  display: flex;
  align-items: center;
  gap: 15px;
}

.avatar-container {
  position: relative;
}

.avatar-placeholder {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, var(--cyber-cyan), var(--cyber-purple));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.status-dot {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 12px;
  height: 12px;
  background: var(--cyber-green);
  border-radius: 50%;
  border: 2px solid var(--cyber-dark);
  animation: pulse 2s infinite;
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.username {
  font-size: 1rem;
  color: var(--cyber-cyan);
}

.status {
  font-size: 0.7rem;
  color: var(--cyber-green);
  letter-spacing: 2px;
}

.stats {
  display: flex;
  justify-content: space-around;
  padding: 15px 0;
  border-top: 1px solid rgba(0, 255, 249, 0.1);
  border-bottom: 1px solid rgba(0, 255, 249, 0.1);
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.stat-num {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--cyber-cyan);
  text-shadow: 0 0 10px var(--cyber-cyan);
}

.stat-label {
  font-size: 0.65rem;
  color: var(--cyber-magenta);
  letter-spacing: 1px;
}

.contribution-graph {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 10px;
  background: rgba(0, 255, 249, 0.02);
  border-radius: 4px;
}

.grid-row {
  display: flex;
  gap: 3px;
}

.grid-cell {
  width: 10px;
  height: 10px;
  border-radius: 2px;
  animation: fadeIn 0.5s ease forwards;
  opacity: 0;
}

@keyframes fadeIn {
  to { opacity: 1; }
}

.level-0 { background: rgba(0, 255, 249, 0.05); }
.level-1 { background: rgba(0, 255, 249, 0.2); }
.level-2 { background: rgba(0, 255, 249, 0.4); }
.level-3 { background: rgba(0, 255, 249, 0.6); box-shadow: 0 0 5px var(--cyber-cyan); }
.level-4 { background: var(--cyber-cyan); box-shadow: 0 0 8px var(--cyber-cyan); }
</style>
