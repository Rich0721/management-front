<template>
  <div class="main-container">
    <div class="product-container">
      <!-- 左側圖片區域 -->
      <div class="product-image">
        <image-show
          :images="contentData.images"
          @updateImage="(val) => (contentData.images = val)"
        />
      </div>
      <!-- 右側商品資訊區域 -->
      <div class="product-info">
        <input-text label="商品名稱" :content="contentData.name" />
        <input-number label="商品價格" :content="contentData.price" />
        <input-text label="商品分類" :content="contentData.category" />
        <InputArea label="商品簡介" :content="contentData.description" />
      </div>
    </div>

    <ckeditor
      v-if="ClassicEditor && config"
      v-model="contentData.content"
      :editor="ClassicEditor"
      :config="config"
    />

    <!-- 操作按鈕 -->
    <div class="product-actions">
      <div class="button-wrapper">
        <button-component
          @click="clickSubmit(contentData)"
          backgroundColor="#38bdf8"
          hoverColor="#0ea5e9"
        >
          儲存
        </button-component>
      </div>
      <div class="button-wrapper">
        <button-component
          @click="handleDelete"
          backgroundColor="#ef4444"
          hoverColor="#dc2626"
        >
          取消
        </button-component>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  ref,
  computed,
  onMounted,
  defineProps,
  reactive,
  defineEmits,
} from "vue";
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
import { Ckeditor } from "@ckeditor/ckeditor5-vue";
import {
  InputText,
  InputNumber,
  InputArea,
  ButtonComponent,
  ImageShow,
} from "./Basics";
import { Product } from "@/types/Product";
import { handleSumbit, handleDelete } from "@/store/EditProductStore";

const isLayoutReady = ref(false);

const props = defineProps<Product>();
console.log(props);
const emits = defineEmits<{
  sumbit: [data: Product];
  delete: [index: number];
}>();
const contentData = reactive({ ...props });

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

const clickSubmit = (data: Product) => {
  handleSumbit(data);
  emits("sumbit", data);
};
</script>

<style lang="scss" scoped>
@import "ckeditor5/ckeditor5.css";
@import url("https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;1,400;1,700&display=swap");
@media print {
  body {
    margin: 0 !important;
  }
}

.main-container {
  display: flex;
  flex-direction: column; /* 垂直排列 */
  align-items: center; /* 水平置中 */
  justify-content: flex-start;
  width: 100%; /* 父容器寬度 */
  min-height: 100vh; /* 讓內容至少占滿視窗高度 */
  padding: 20px; /* 添加內邊距 */
  box-sizing: border-box; /* 確保 padding 不影響寬度 */
}

.product-container {
  width: 66.67%; /* 寬度設置為網頁的 2/3 */
  max-width: 1200px; /* 設置最大寬度，避免過大 */
  margin: 10px 0; /* 上下間距 */
  display: flex;
  border: 1px solid #ccc; /* 添加邊框，方便查看佈局 */
  border-radius: 10px; /* 添加圓角 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 添加陰影 */
  background-color: #fff; /* 背景色 */
}

.editor-container {
  width: 66.67%; /* 寬度設置為網頁的 2/3 */
  max-width: 1200px; /* 設置最大寬度，避免過大 */
  height: 400px; /* 固定高度 */
  margin: 30px 0; /* 上下間距 */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box; /* 確保 padding 不影響寬度和高度 */
  background-color: #fff; /* 背景色 */
  border: 1px solid #ccc; /* 添加邊框 */
  border-radius: 10px; /* 添加圓角 */
}
.ck-editor__editable {
  height: 100%; /* 讓編輯區域填滿父容器的高度 */
  overflow-y: auto; /* 如果內容超出，顯示滾動條 */
}

.product-container {
  display: flex; /* 使用 flexbox 進行水平排列 */
}

.product-image {
  width: 66.67%; /* 寬度設置為網頁的 2/3 */
  max-width: 800px;
  display: flex;
  flex-direction: column; /* 垂直排列 */
  justify-content: space-between;
  padding: 10px;
  border-right: 1px solid #ccc;
}

.product-info {
  flex: 1; /* 右側商品資訊區域占 2 比例 */
  padding: 10px;
  width: 33.33%; /* 寬度設置為網頁的 1/3 */
  max-width: 400px;
}

/* 操作按鈕區域 */
.product-actions {
  display: flex; /* 使用 flexbox 排列按鈕 */
  justify-content: center; /* 按鈕居中對齊 */
  align-items: center; /* 垂直居中 */
  gap: 20px; /* 按鈕之間的間距 */
  margin-top: 20px; /* 與上方內容保持間距 */
  width: 100%; /* 填滿父容器寬度 */
  z-index: 10; /* 確保按鈕不會被其他內容覆蓋 */
  position: relative; /* 確保 z-index 生效 */

  .button-wrapper {
    flex: 1; /* 每個按鈕區域占據 50% 的寬度 */
    display: flex;
    justify-content: flex-end; /* 按鈕靠右對齊 */
  }

  .button-wrapper:last-of-type {
    justify-content: flex-start; /* 右側按鈕靠左對齊 */
  }
}
</style>
