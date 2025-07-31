<template>
  <span>{{ displayValue }}</span>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";

const props = defineProps({
  targetValue: {
    type: [Number, String],
    required: true,
    default: 0,
  },
  duration: {
    type: Number,
    default: 1000,
  },
  decimalPlaces: {
    type: Number,
    default: 2,
  },
  autoPlay: {
    type: Boolean,
    default: true,
  },
  triggerPlay: {
    type: Boolean,
    default: null,
  },
});

const displayValue = ref(0);
const animationFrame = ref(null);
let lastTrigger = false;

// 格式化显示值（仅用于显示）
function formatValue(val) {
  const num = Number(val);
  return isNaN(num) ? 0 : Number(num.toFixed(props.decimalPlaces));
}

// 安全获取数字
function getSafeNumber(value) {
  const num = Number(value);
  return isNaN(num) || !isFinite(num) ? 0 : Math.max(0, num);
}

// 自增动画函数：从 0 开始
function animateTo(target) {
  // ★★★ 确保 start 和 target 都是合法正数
  const start = 0;
  const safeTarget = getSafeNumber(target);

  const startTime = performance.now();

  function step(timestamp) {
    const elapsed = timestamp - startTime;
    let progress = Math.min(elapsed / props.duration, 1);
    progress = Math.max(0, progress); // ★★★ 强制限制 progress ≥ 0

    const currentValue = start + (safeTarget - start) * progress;

    // ★★★ 最关键一步：确保当前值非负
    const nonNegativeValue = Math.max(0, currentValue);

    displayValue.value = formatValue(nonNegativeValue);

    if (progress < 1) {
      animationFrame.value = requestAnimationFrame(step);
    } else {
      displayValue.value = formatValue(safeTarget);
      cancelAnimationFrame(animationFrame.value);
    }
  }

  // 清除旧动画
  cancelAnimationFrame(animationFrame.value);
  animationFrame.value = requestAnimationFrame(step);
}

// 监听 triggerPlay 变化，手动触发动画
watch(
  () => props.triggerPlay,
  (newVal) => {
    if (newVal !== lastTrigger) {
      animateTo(props.targetValue);
      lastTrigger = newVal;
    }
  }
);

// 监听 targetValue 变化，自动播放动画
watch(
  () => props.targetValue,
  (newVal) => {
    if (props.autoPlay) {
      animateTo(newVal);
    }
  }
);

onMounted(() => {
  const value = getSafeNumber(props.targetValue);
  if (props.autoPlay) {
    animateTo(value);
  } else {
    displayValue.value = formatValue(value);
  }
});
</script>
