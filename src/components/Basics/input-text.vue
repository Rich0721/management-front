<template>
  <div class="input-group">
    <input
      type="text"
      v-model="message"
      class="input-group-input"
      @blur="emitValue"
      required
    />
    <label class="input-group-lable">{{ label }}</label>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, defineEmits } from "vue";

const message = ref("");

defineProps<{
  label: string;
}>();

// 定義 emits
const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

// 當輸入框失去焦點時觸發
const emitValue = () => {
  emit("update:modelValue", message.value);
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/input.scss";
</style>
