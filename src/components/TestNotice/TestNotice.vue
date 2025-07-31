<template>
  <div class="notice-overlay">
    <div class="notice-content" v-if="showNotice">测试站点，请勿付款</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const showNotice = ref(false);
const route = useRoute();

onMounted(() => {
  const currentPage = route.path;
  const key = `hasShownTestNotice_${currentPage}`;

  if (!sessionStorage.getItem(key)) {
    showNotice.value = true;

    setTimeout(() => {
      closeNotice();
    }, 3000);

    sessionStorage.setItem(key, "true");
  }
});

function closeNotice() {
  showNotice.value = false;
}
</script>

<style scoped>
.notice-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; /* 默认不阻挡点击 */
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.notice-content {
  background-color: rgba(0, 0, 0, 0.7);
  color: red;
  font-size: 20px;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  pointer-events: auto; /* 弹窗内容可点击 */
}
</style>
