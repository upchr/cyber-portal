<template>
  <div class="quote-card neon-box">
    <h3 class="card-title">// SYSTEM_LOG</h3>
    <div class="quote-content">
      <p class="quote-text">"{{ currentQuote.text }}"</p>
      <p class="quote-author">— {{ currentQuote.author }}</p>
    </div>
    <div class="terminal-line">
      <span class="prompt">$</span>
      <span class="command typing">{{ commandText }}</span>
      <span class="cursor">_</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const quotes = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
  { text: "Stay hungry, stay foolish.", author: "Steve Jobs" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
  { text: "The best way to predict the future is to create it.", author: "Peter Drucker" },
  { text: "Code is poetry.", author: "WordPress" },
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
  { text: "Any sufficiently advanced technology is indistinguishable from magic.", author: "Arthur C. Clarke" },
]

const commands = [
  'initializing_system...',
  'loading_modules...',
  'scanning_network...',
  'decrypting_data...',
  'optimizing_performance...',
  'synchronizing_clock...',
]

const currentQuote = ref(quotes[0])
const commandText = ref('')

let timer = null
let cmdTimer = null
let cmdIndex = 0
let charIndex = 0

const changeQuote = () => {
  const randomIndex = Math.floor(Math.random() * quotes.length)
  currentQuote.value = quotes[randomIndex]
}

const typeCommand = () => {
  const currentCmd = commands[cmdIndex]
  
  if (charIndex < currentCmd.length) {
    commandText.value += currentCmd[charIndex]
    charIndex++
    setTimeout(typeCommand, 50 + Math.random() * 50)
  } else {
    setTimeout(() => {
      commandText.value = ''
      charIndex = 0
      cmdIndex = (cmdIndex + 1) % commands.length
      typeCommand()
    }, 2000)
  }
}

onMounted(() => {
  changeQuote()
  timer = setInterval(changeQuote, 30000)
  typeCommand()
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.quote-card {
  padding: 20px;
  background: rgba(10, 10, 18, 0.8);
}

.card-title {
  font-size: 0.8rem;
  color: var(--cyber-magenta);
  margin-bottom: 15px;
  letter-spacing: 2px;
}

.quote-content {
  margin-bottom: 20px;
  min-height: 80px;
}

.quote-text {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--cyber-cyan);
  font-style: italic;
  margin-bottom: 10px;
}

.quote-author {
  font-size: 0.8rem;
  color: var(--cyber-purple);
  text-align: right;
}

.terminal-line {
  font-family: 'Courier New', monospace;
  font-size: 0.85rem;
  color: var(--cyber-green);
  display: flex;
  gap: 8px;
  padding: 10px;
  background: rgba(0, 255, 136, 0.05);
  border: 1px solid rgba(0, 255, 136, 0.2);
}

.prompt {
  color: var(--cyber-magenta);
}

.command {
  color: var(--cyber-green);
}

.cursor {
  animation: pulse 1s infinite;
  color: var(--cyber-green);
}

@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}
</style>
