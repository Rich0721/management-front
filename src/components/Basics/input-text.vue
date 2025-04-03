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
import { defineProps, ref, defineEmits, watch } from "vue";

const props = defineProps<{
  content?: string;
  label: string;
}>();

const message = ref(props.content || "");
// 定義 emits
const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

// 監聽 props.content 的變化，並更新 localContent
watch(
  () => props.content,
  (newValue) => {
    message.value = newValue || "";
  }
);

// 當輸入框失去焦點時觸發
const emitValue = () => {
  emit("update:modelValue", message.value);
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/input.scss";
</style>
