<template>
  <div class="data-panel">
    <div class="panel-header">
      <span class="panel-title">{{ title }}</span>
      <span class="panel-line" />
    </div>
    <div class="panel-content">
      <slot />
    </div>
    <div class="panel-decoration">
      <span class="corner top-left" />
      <span class="corner top-right" />
      <span class="corner bottom-left" />
      <span class="corner bottom-right" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.data-panel {
  position: relative;
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.85), rgba(30, 41, 59, 0.7));
  border: 1px solid rgba(248, 113, 113, 0.2);
  border-radius: 8px;
  padding: 8px;
  overflow: hidden;
}

.panel-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
  padding-bottom: 6px;
  border-bottom: 1px solid rgba(248, 113, 113, 0.15);
}

.panel-title {
  font-size: 13px;
  font-weight: bold;
  color: #f87171;
  text-shadow: 0 0 8px rgba(248, 113, 113, 0.3);
  white-space: nowrap;
}

.panel-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, rgba(248, 113, 113, 0.5), transparent);
}

.panel-content {
  position: relative;
  z-index: 1;
}

.panel-decoration .corner {
  position: absolute;
  width: 8px;
  height: 8px;
  border: 1px solid rgba(248, 113, 113, 0.4);
}

.panel-decoration .top-left {
  top: 4px;
  left: 4px;
  border-right: none;
  border-bottom: none;
}

.panel-decoration .top-right {
  top: 4px;
  right: 4px;
  border-left: none;
  border-bottom: none;
}

.panel-decoration .bottom-left {
  bottom: 4px;
  left: 4px;
  border-right: none;
  border-top: none;
}

.panel-decoration .bottom-right {
  bottom: 4px;
  right: 4px;
  border-left: none;
  border-top: none;
}
</style>
