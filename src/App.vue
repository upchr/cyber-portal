<template>
  <div class="portal">
    <!-- 粒子背景 -->
    <ParticleBackground />
    
    <!-- 扫描线 -->
    <div class="scan-line"></div>
    
    <!-- 主内容 -->
    <main class="main-content">
      <!-- 顶部标题 -->
      <header class="header">
        <h1 class="title glitch neon-text">CYBER_PORTAL</h1>
        <p class="subtitle">// SYSTEM v1.0.0</p>
      </header>
      
      <!-- 时钟模块 -->
      <CyberClock />
      
      <!-- 主面板 -->
      <div class="dashboard">
        <!-- 系统状态 -->
        <SystemStats />
        
        <!-- 快捷链接 -->
        <QuickLinks />
        
        <!-- 格言 -->
        <QuoteCard />
        
        <!-- GitHub 卡片 -->
        <GitHubCard />
      </div>
      
      <!-- 底部 -->
      <footer class="footer">
        <p>POWERED BY <span class="neon-text">CYBER_SYSTEM</span> // {{ year }}</p>
      </footer>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ParticleBackground from './components/ParticleBackground.vue'
import CyberClock from './components/CyberClock.vue'
import SystemStats from './components/SystemStats.vue'
import QuickLinks from './components/QuickLinks.vue'
import QuoteCard from './components/QuoteCard.vue'
import GitHubCard from './components/GitHubCard.vue'

const year = ref(new Date().getFullYear())
</script>

<style scoped>
.portal {
  min-height: 100vh;
  position: relative;
  padding: 20px;
}

.scan-line {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(to bottom, transparent, var(--cyber-cyan), transparent);
  opacity: 0.5;
  animation: scan 8s linear infinite;
  pointer-events: none;
  z-index: 1000;
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.header {
  text-align: center;
  margin-bottom: 40px;
  padding-top: 40px;
}

.title {
  font-size: 3rem;
  font-weight: 900;
  letter-spacing: 8px;
  color: var(--cyber-cyan);
}

.subtitle {
  color: var(--cyber-magenta);
  font-size: 0.9rem;
  margin-top: 10px;
  opacity: 0.8;
}

.dashboard {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.footer {
  text-align: center;
  padding: 20px;
  color: rgba(0, 255, 249, 0.5);
  font-size: 0.8rem;
}

@media (max-width: 768px) {
  .title {
    font-size: 2rem;
    letter-spacing: 4px;
  }
  
  .dashboard {
    grid-template-columns: 1fr;
  }
}
</style>
