<template>
  <button
    class="button"
    :style="flux.buttonStyle"
    @click="onClick"
    @mouseover="flux.applyHoverColor()"
    @mouseleave="flux.removeHoverColor"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { defineProps, reactive, ref } from "vue";
import { PropsButtonComponent } from "@/types/PropsButtonComponent";

const props = defineProps<PropsButtonComponent>();

const flux = reactive({
  buttonStyle: {
    backgroundColor: props.backgroundColor || "#38bdf8",
    color: "#ffffff",
  },
  applyHoverColor() {
    flux.buttonStyle.backgroundColor = props.hoverColor || "#0ea5e9";
  },
  removeHoverColor() {
    flux.buttonStyle.backgroundColor = props.backgroundColor || "#38bdf8";
  },
});
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
