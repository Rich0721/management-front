<template>
  <button class="button" @click="onClick">
    <slot></slot>
  </button>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "ButtonComponent",
  props: {
    onClick: {
      type: Function as PropType<() => void>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.button {
  position: absolute; /* 絕對定位 */
  bottom: 20px; /* 距離容器底部 20px */
  right: 20px; /* 距離容器右側 20px */
  padding: 10px 20px;
  background-color: #38bdf8; /* 按鈕背景色 */
  color: #ffffff; /* 按鈕文字顏色 */
  border: none;
  border-radius: 5px; /* 圓角 */
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0ea5e9; /* 懸停時的背景色 */
  }
}
</style>
