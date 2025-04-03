<template>
  <ckeditor
    v-if="ClassicEditor && config"
    v-model="message"
    :editor="ClassicEditor"
    :config="config"
    @blur="emitValue"
  />
</template>

<script setup lang="ts">
import { Ckeditor } from "@ckeditor/ckeditor5-vue";
import { ref, onMounted, computed, defineProps, defineEmits, watch } from "vue";
import {
  ClassicEditor,
  Essentials,
  Paragraph,
  Bold,
  Italic,
  Alignment,
  Autoformat,
  AutoImage,
  AutoLink,
  Autosave,
  BalloonToolbar,
  Base64UploadAdapter,
  BlockToolbar,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  GeneralHtmlSupport,
  Heading,
  HorizontalLine,
  ImageBlock,
  ImageCaption,
  ImageEditing,
  ImageInline,
  ImageInsert,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  ImageUtils,
  Indent,
  IndentBlock,
  Link,
  LinkImage,
  List,
  ListProperties,
  TextTransformation,
  TodoList,
  Underline,
  Highlight,
} from "ckeditor5";

const isLayoutReady = ref(false);
const props = defineProps<{
  content?: string;
}>();

const message = ref(props.content || "");

// 定義 emits
const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

// 當輸入框失去焦點時觸發
const emitValue = () => {
  emit("update:modelValue", message.value);
};

const config = computed(() => {
  if (!isLayoutReady.value) {
    return null;
  }
  return {
    licenseKey: "GPL", //Or 'GPL'.
    plugins: [
      Alignment,
      Autoformat,
      AutoImage,
      AutoLink,
      Autosave,
      BalloonToolbar,
      Base64UploadAdapter,
      BlockToolbar,
      Bold,
      Essentials,
      FontBackgroundColor,
      FontColor,
      FontFamily,
      FontSize,
      GeneralHtmlSupport,
      Heading,
      Highlight,
      HorizontalLine,
      ImageBlock,
      ImageCaption,
      ImageEditing,
      ImageInline,
      ImageInsert,
      ImageInsertViaUrl,
      ImageResize,
      ImageStyle,
      ImageTextAlternative,
      ImageToolbar,
      ImageUpload,
      ImageUtils,
      Indent,
      IndentBlock,
      Italic,
      Link,
      LinkImage,
      List,
      ListProperties,
      Paragraph,
      TextTransformation,
      TodoList,
      Underline,
    ],
    toolbar: {
      items: [
        "heading",
        "|",
        "fontSize",
        "fontFamily",
        "fontColor",
        "fontBackgroundColor",
        "|",
        "bold",
        "italic",
        "underline",
        "|",
        "horizontalLine",
        "link",
        "insertImage",
        "highlight",
        "|",
        "alignment",
        "|",
        "bulletedList",
        "numberedList",
        "todoList",
        "outdent",
        "indent",
      ],
      shouldNotGroupWhenFull: false,
    },
    balloonToolbar: [
      "bold",
      "italic",
      "|",
      "link",
      "insertImage",
      "|",
      "bulletedList",
      "numberedList",
    ],
    blockToolbar: [
      "fontSize",
      "fontColor",
      "fontBackgroundColor",
      "|",
      "bold",
      "italic",
      "|",
      "link",
      "insertImage",
      "|",
      "bulletedList",
      "numberedList",
      "outdent",
      "indent",
    ],
    fontFamily: {
      supportAllValues: true,
    },
    fontSize: {
      options: [10, 12, 14, "default", 18, 20, 22],
      supportAllValues: true,
    },
    language: "zh",
  };
});

onMounted(() => {
  isLayoutReady.value = true;
});

watch(
  () => props.content,
  (newValue) => {
    message.value = newValue || "";
  }
);
</script>

<style lang="scss" scoped>
@import "ckeditor5/ckeditor5.css";
@import url("https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;1,400;1,700&display=swap");
@media print {
  body {
    margin: 0 !important;
  }
}
</style>
