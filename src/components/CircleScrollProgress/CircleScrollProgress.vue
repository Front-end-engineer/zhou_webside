<template>
  <div
    class="circle-scroll-progress"
    :style="containerStyle"
    @click="scrollToTop"
    v-show="isShow"
    :class="{ 'fade-in': isShow, 'fade-out': !isShow }"
  >
    <svg viewBox="0 0 100 100">
      <circle class="progress-bg" cx="50" cy="50" :r="radius" />
      <!-- 初始固定段 -->
      <circle
        class="progress-initial"
        cx="50"
        cy="50"
        :r="radius"
        :style="initialStyle"
      />
      <!-- 动态进度段 -->
      <circle
        class="progress-fill"
        cx="50"
        cy="50"
        :r="radius"
        :style="dynamicStyle"
      />
    </svg>
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="syn-scroll-to-top-arrow"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M17.7276 11.4003C17.3487 11.8021 16.7158 11.8207 16.314 11.4419L13 8.31726L13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17L11 8.31726L7.68601 11.4419C7.28417 11.8207 6.65128 11.8021 6.27241 11.4003C5.89353 10.9985 5.91215 10.3656 6.31398 9.9867L11.314 5.27241C11.6992 4.9092 12.3008 4.9092 12.686 5.27241L17.686 9.9867C18.0878 10.3656 18.1065 10.9985 17.7276 11.4003Z"
        fill="white"
      ></path>
    </svg>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

const isShow = defineModel({
  type: Boolean,
  default: false,
});

const props = defineProps({
  // 初始显示百分比 (0-1)
  initialPercent: {
    type: Number,
    default: 0.1,
    validator: (value) => value >= 0 && value <= 1,
  },
  // 进度条半径
  radius: {
    type: Number,
    default: 45,
  },
  // 进度条宽度
  strokeWidth: {
    type: Number,
    default: 4,
  },
  // 初始段颜色
  initialColor: {
    type: String,
    default: "#4285f4",
  },
  // 动态段颜色
  dynamicColor: {
    type: String,
    default: "white",
  },
  // 背景颜色
  bgColor: {
    type: String,
    default: "rgb(229, 231, 235, 0.3)",
  },
  // 箭头颜色
  arrowColor: {
    type: String,
    default: "#555",
  },
  // 悬停时箭头颜色
  arrowHoverColor: {
    type: String,
    default: "#00bfbf",
  },
  // 位置
  position: {
    type: String,
    default: "bottom-right",
    validator: (value) =>
      ["top-left", "top-right", "bottom-left", "bottom-right"].includes(value),
  },
  // 距离边缘的间距
  offset: {
    type: Number,
    default: 24,
  },
  offsetbottom: {
    type: String,
    default: "20%",
  },
  // 容器大小
  size: {
    type: Number,
    default: 42,
  },
});

const emit = defineEmits(["click"]);

// 计算属性
const circumference = computed(() => 2 * Math.PI * props.radius);
const initialOffset = computed(
  () => circumference.value * (1 - props.initialPercent)
);

// 容器样式
const containerStyle = computed(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
  [props.position.includes("top") ? "top" : "bottom"]: `${props.offsetbottom}`,
  [props.position.includes("left") ? "left" : "right"]: `${props.offset}px`,
}));

// 初始段样式
const initialStyle = computed(() => ({
  strokeDasharray: circumference.value,
  strokeDashoffset: circumference.value * (1 - props.initialPercent),
  stroke: props.initialColor,
  strokeWidth: props.strokeWidth,
}));

// 动态段样式
const dynamicStyle = ref({
  strokeDasharray: circumference.value,
  strokeDashoffset: circumference.value,
  stroke: props.dynamicColor,
  strokeWidth: props.strokeWidth,
});

// 更新进度条（确保100%填满）
const updateProgress = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const windowHeight = window.innerHeight;
  const docHeight = document.documentElement.scrollHeight;

  // 计算滚动百分比（0-1）
  let scrollPercent = scrollTop / (docHeight - windowHeight);

  // 确保在0-1范围内
  scrollPercent = Math.max(0, Math.min(1, scrollPercent));

  // 关键修改：计算动态段进度（从初始段之后开始）
  const dynamicPercent = scrollPercent * (1 - props.initialPercent);

  // 确保完全填满
  const offset = circumference.value - dynamicPercent * circumference.value;

  dynamicStyle.value = {
    ...dynamicStyle.value,
    strokeDashoffset: Math.max(0, offset), // 确保不小于0
  };

  requestAnimationFrame(updateProgress);
};

// 返回顶部
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  emit("click");
};

onMounted(() => {
  updateProgress(); // 立即执行一次初始化
});

onUnmounted(() => {
  // 清理工作可以在这里进行
});
</script>

<style lang="less" scoped>
.circle-scroll-progress {
  position: fixed;
  cursor: pointer;
  z-index: 1000;
  transition: transform 0.2s;
}

.circle-scroll-progress:hover {
  transform: scale(1.1);
  .syn-scroll-to-top-arrow path {
    fill: var(--operator-bg) !important;
  }
}

.progress-bg {
  fill: none;
  stroke: v-bind("props.bgColor");
  stroke-width: v-bind("props.strokeWidth");
}

.progress-initial {
  fill: none;
  stroke-linecap: round;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
}

.progress-fill {
  fill: none;
  stroke-linecap: round;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
  transition: stroke-dashoffset 0.1s ease-out;
}

.arrow-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  fill: v-bind("props.arrowColor");
  transition: fill 0.2s;
}

.circle-scroll-progress:hover .arrow-icon {
  fill: v-bind("props.arrowHoverColor");
}

@media screen and (max-width: 900px) {
  .circle-scroll-progress {
    display: none;
  }
}
</style>
