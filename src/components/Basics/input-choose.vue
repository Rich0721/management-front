<template>
  <div class="input-group">
    <select
      v-model="message"
      class="input-group-input"
      @blur="emitValue"
      required
    >
      <option v-for="(item, index) in options" :key="index" :value="item.value">
        {{ item.label }}
      </option>
    </select>
    <label class="input-group-lable">{{ label }}</label>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, defineEmits, watch } from "vue";
const props = defineProps<{
  content?: string;
  label: string;
  options: { label: string; value: string }[];
}>();
const message = ref(props.content || props.options[0].value);

// 定義 emits
const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();
// 當輸入框失去焦點時觸發
const emitValue = () => {
  emit("update:modelValue", message.value);
};
watch(
  () => props.content,
  (newValue) => {
    message.value = newValue || props.options[0].value;
  }
);
watch(
  () => props.options,
  (newValue) => {
    if (!newValue.some((item) => item.value === message.value)) {
      message.value = newValue[0].value;
    }
  }
);
</script>

<style scoped lang="scss">
@import "@/assets/scss/input.scss";
</style>
