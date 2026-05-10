<template>
  <div class="stat-card" :class="type">
    <div class="stat-icon">
      <slot name="icon">
        <span class="icon-default">{{ icon }}</span>
      </slot>
    </div>
    <div class="stat-content">
      <div class="stat-label">{{ label }}</div>
      <div class="stat-value">
        <span class="value">{{ value }}</span>
        <span class="unit" v-if="unit">{{ unit }}</span>
      </div>
      <div class="stat-trend" v-if="trend">
        <span class="trend-icon" :class="trend > 0 ? 'up' : 'down'">
          {{ trend > 0 ? '↑' : '↓' }}
        </span>
        <span class="trend-value">{{ Math.abs(trend) }}%</span>
      </div>
    </div>
    <div class="stat-border"></div>
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    default: ''
  },
  value: {
    type: [String, Number],
    default: 0
  },
  unit: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: '📊'
  },
  trend: {
    type: Number,
    default: null
  },
  type: {
    type: String,
    default: 'default' // default, success, warning, danger
  }
})
</script>

<style scoped>
.stat-card {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.7));
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(248, 113, 113, 0.3);
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #f87171, transparent);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { opacity: 0.5; }
  50% { opacity: 1; }
  100% { opacity: 0.5; }
}

.stat-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  font-size: 24px;
  flex-shrink: 0;
}

.stat-card.default .stat-icon {
  background: linear-gradient(135deg, rgba(248, 113, 113, 0.2), rgba(248, 113, 113, 0.1));
}

.stat-card.success .stat-icon {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(34, 197, 94, 0.1));
}

.stat-card.warning .stat-icon {
  background: linear-gradient(135deg, rgba(234, 179, 8, 0.2), rgba(234, 179, 8, 0.1));
}

.stat-card.danger .stat-icon {
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(239, 68, 68, 0.1));
}

.stat-content {
  flex: 1;
  min-width: 0;
}

.stat-label {
  font-size: 12px;
  color: rgba(226, 232, 240, 0.7);
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.stat-value {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.value {
  font-size: 24px;
  font-weight: bold;
  color: #f87171;
  text-shadow: 0 0 10px rgba(248, 113, 113, 0.5);
  line-height: 1.2;
}

.unit {
  font-size: 12px;
  color: rgba(226, 232, 240, 0.6);
}

.stat-trend {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 4px;
  font-size: 12px;
}

.trend-icon.up {
  color: #22c55e;
}

.trend-icon.down {
  color: #ef4444;
}

.trend-value {
  color: rgba(226, 232, 240, 0.8);
}

.stat-border {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(180deg, #f87171, transparent);
  opacity: 0.6;
}

/* 动态数字动画 */
@keyframes countUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.value {
  animation: countUp 0.6s ease-out;
}
</style>
