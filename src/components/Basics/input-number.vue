<template>
  <div class="input-group">
    <input
      type="number"
      min="1"
      v-model="message"
      class="input-group-input"
      @blur="emitValue"
      required
    />
    <label class="input-group-lable">{{ label }}</label>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, defineEmits, watch } from "vue";

const props = defineProps<{
  content?: number;
  label: string;
}>();

const message = ref(props.content || 1);
// 定義 emits
const emit = defineEmits<{
  (e: "update:modelValue", value: number): void;
}>();

// 當輸入框失去焦點時觸發
const emitValue = () => {
  emit("update:modelValue", message.value);
};

watch(
  () => props.content,
  (newValue) => {
    message.value = newValue || 1;
  }
);
</script>

<style scoped lang="scss">
@import "@/assets/scss/input.scss";
</style>
