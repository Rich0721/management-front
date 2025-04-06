<template>
  <button
    class="button"
    :style="{
      '--hover-color': props.hoverColor,
      '--background-color': props.backgroundColor,
    }"
    @click="onClick"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { PropsButtonComponent } from "@/types/PropsButtonComponent";

const props = defineProps<PropsButtonComponent>();
</script>

<style lang="scss" scoped>
.button {
  scale: 0.5;
  padding: 0 20px;
  width: auto;
  max-width: 200px;
  height: 64px;
  background: var(--background-color, black);
  color: white;
  border: none;
  border-radius: 32px;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  overflow: hidden;
  z-index: 1;
}

.button:hover {
  color: white;
}

.button:after {
  content: "";
  background: var(--hover-color, white);
  position: absolute;
  z-index: -1;
  left: -20%;
  right: -20%;
  top: 0;
  bottom: 0;
  transform: skewX(-45deg) scale(0, 1);
  transition: all 0.5s;
}

.button:hover:after {
  transform: skewX(-45deg) scale(1, 1);
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
}
</style>
