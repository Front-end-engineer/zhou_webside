import { ref, watch } from 'vue'

export const useNumberAnimation = ({ duration = 2000, frameRate = 30, decimalPlaces = 1 })=> {
  const targetValue = ref(0)
  const displayedValue = ref(0)

  const startAnimation =(to) => {
    targetValue.value = to
  }

  watch(targetValue, (newTarget) => {
    if (typeof newTarget !== 'number') return

    const from = displayedValue.value || 0
    const range = newTarget - from
    const totalFrames = (duration / 1000) * frameRate
    const step = range / totalFrames

    let currentFrame = 0
    const timer = setInterval(() => {
      currentFrame++
      let current = from + step * currentFrame
      if (currentFrame >= totalFrames) {
        clearInterval(timer)
        current = newTarget
      }

      // 控制小数位数
      displayedValue.value = parseFloat(current.toFixed(decimalPlaces))
    }, 1000 / frameRate)
  })

  return {
    displayedValue,
    startAnimation
  }
}