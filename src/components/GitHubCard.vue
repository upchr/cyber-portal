<template>
  <div class="github-card neon-box">
    <h3 class="card-title">// GITHUB_PROFILE</h3>
    <div v-if="loading" class="loading">
      <span class="loading-text">LOADING...</span>
    </div>
    <div v-else-if="error" class="error">
      <span>{{ error }}</span>
    </div>
    <div v-else class="github-content">
      <div class="github-header">
        <a :href="profile.html_url" target="_blank" class="avatar-link">
          <img :src="profile.avatar_url" :alt="profile.login" class="avatar" />
          <div class="status-dot"></div>
        </a>
        <div class="user-info">
          <a :href="profile.html_url" target="_blank" class="username">@{{ profile.login }}</a>
          <span class="name">{{ profile.name || 'Developer' }}</span>
        </div>
      </div>
      <div class="stats">
        <div class="stat">
          <span class="stat-num">{{ profile.public_repos || 0 }}</span>
          <span class="stat-label">REPOS</span>
        </div>
        <div class="stat">
          <span class="stat-num">{{ profile.followers || 0 }}</span>
          <span class="stat-label">FOLLOWERS</span>
        </div>
        <div class="stat">
          <span class="stat-num">{{ profile.following || 0 }}</span>
          <span class="stat-label">FOLLOWING</span>
        </div>
      </div>
      <div class="contribution-graph">
        <div class="graph-title">CONTRIBUTION_ACTIVITY</div>
        <div class="grid-container">
          <div v-for="(row, i) in contributionGrid" :key="i" class="grid-row">
            <div v-for="(cell, j) in row" 
                 :key="j" 
                 :class="['grid-cell', cell]"
                 :style="{ animationDelay: `${(i * 7 + j) * 0.01}s` }">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 配置：修改这里为你的 GitHub 用户名
const GITHUB_USERNAME = 'upchr'

const profile = ref({})
const contributionGrid = ref([])
const loading = ref(true)
const error = ref(null)

const generateContributionGrid = () => {
  // 生成随机贡献图（实际 GitHub API 需要认证才能获取真实数据）
  const grid = []
  for (let i = 0; i < 7; i++) {
    const row = []
    for (let j = 0; j < 20; j++) {
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
}

onMounted(async () => {
  try {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`)
    if (!response.ok) {
      throw new Error('Failed to fetch profile')
    }
    profile.value = await response.json()
    generateContributionGrid()
  } catch (e) {
    error.value = '无法加载 GitHub 数据'
    console.error(e)
  } finally {
    loading.value = false
  }
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

.loading, .error {
  padding: 40px;
  text-align: center;
  color: var(--cyber-cyan);
}

.loading-text {
  animation: pulse 1s infinite;
}

.error {
  color: var(--cyber-red);
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

.avatar-link {
  position: relative;
  text-decoration: none;
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px solid var(--cyber-cyan);
  box-shadow: 0 0 15px rgba(0, 255, 249, 0.3);
  transition: all 0.3s;
}

.avatar:hover {
  box-shadow: 0 0 25px rgba(0, 255, 249, 0.5);
  transform: scale(1.05);
}

.status-dot {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 14px;
  height: 14px;
  background: var(--cyber-green);
  border-radius: 50%;
  border: 2px solid var(--cyber-dark);
  animation: pulse 2s infinite;
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.username {
  font-size: 1.1rem;
  color: var(--cyber-cyan);
  text-decoration: none;
  transition: all 0.3s;
}

.username:hover {
  color: var(--cyber-magenta);
  text-shadow: 0 0 10px var(--cyber-magenta);
}

.name {
  font-size: 0.85rem;
  color: rgba(0, 255, 249, 0.6);
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
  padding: 10px;
  background: rgba(0, 255, 249, 0.02);
  border-radius: 4px;
}

.graph-title {
  font-size: 0.65rem;
  color: var(--cyber-magenta);
  margin-bottom: 10px;
  letter-spacing: 1px;
}

.grid-container {
  display: flex;
  flex-direction: column;
  gap: 3px;
  overflow-x: auto;
}

.grid-row {
  display: flex;
  gap: 3px;
}

.grid-cell {
  width: 10px;
  height: 10px;
  min-width: 10px;
  border-radius: 2px;
  animation: fadeIn 0.3s ease forwards;
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
