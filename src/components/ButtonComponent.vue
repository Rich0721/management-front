<template>
  <button
    class="button"
    :style="buttonStyle"
    @click="onClick"
    @mouseover="applyHoverColor"
    @mouseleave="removeHoverColor"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { defineProps, ref } from "vue";

const props = defineProps<{
  onClick: () => void;
  backgroundColor?: string;
  hoverColor?: string;
}>();

const buttonStyle = ref({
  backgroundColor: props.backgroundColor || "#38bdf8",
  color: "#ffffff",
});

const applyHoverColor = () => {
  buttonStyle.value.backgroundColor = props.hoverColor || "#0ea5e9";
};

const removeHoverColor = () => {
  buttonStyle.value.backgroundColor = props.backgroundColor || "#38bdf8";
};
</script>

<style lang="scss" scoped>
.button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px; /* 圓角 */
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  transition: background-color 0.3s ease;
}
</style>
