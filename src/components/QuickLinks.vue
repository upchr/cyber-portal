<template>
  <div class="links-card neon-box">
    <h3 class="card-title">// QUICK_ACCESS</h3>
    <div class="links-grid">
      <a v-for="link in links" 
         :key="link.name"
         :href="link.url" 
         target="_blank"
         class="link-item">
        <span class="link-icon">{{ link.icon }}</span>
        <span class="link-name">{{ link.name }}</span>
        <span class="link-arrow">→</span>
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const links = ref([
  { name: 'GitHub', url: 'https://github.com', icon: '⚡' },
  { name: 'Google', url: 'https://google.com', icon: '🔍' },
  { name: 'YouTube', url: 'https://youtube.com', icon: '▶' },
  { name: 'Twitter', url: 'https://twitter.com', icon: '🐦' },
  { name: 'Reddit', url: 'https://reddit.com', icon: '📄' },
  { name: 'HackerNews', url: 'https://news.ycombinator.com', icon: '🔬' },
])
</script>

<style scoped>
.links-card {
  padding: 20px;
  background: rgba(10, 10, 18, 0.8);
}

.card-title {
  font-size: 0.8rem;
  color: var(--cyber-magenta);
  margin-bottom: 15px;
  letter-spacing: 2px;
}

.links-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.link-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 15px;
  background: rgba(0, 255, 249, 0.05);
  border: 1px solid rgba(0, 255, 249, 0.2);
  text-decoration: none;
  color: var(--cyber-cyan);
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
}

.link-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(0, 255, 249, 0.1), transparent);
  transition: left 0.5s;
}

.link-item:hover::before {
  left: 100%;
}

.link-item:hover {
  background: rgba(0, 255, 249, 0.1);
  border-color: var(--cyber-cyan);
  box-shadow: 0 0 15px rgba(0, 255, 249, 0.3);
  transform: translateX(5px);
}

.link-icon {
  font-size: 1.2rem;
}

.link-name {
  flex: 1;
  font-size: 0.9rem;
}

.link-arrow {
  opacity: 0;
  transition: all 0.3s;
}

.link-item:hover .link-arrow {
  opacity: 1;
  transform: translateX(5px);
}
</style>
