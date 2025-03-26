<template>
  <div class="main-container">
    <div class="product-container">
      <!-- 左側圖片區域 -->
      <div class="product-image">圖片</div>

      <!-- 右側商品資訊區域 -->
      <div class="product-info">
        <div class="form-group">
          <input type="text" placeholder="商品名稱" />
        </div>
        <div class="form-group">
          <input
            type="number"
            placeholder="商品價格"
            min="1"
            @input="validatePrice"
          />
        </div>
        <div class="form-group">
          <input type="text" placeholder="商品種類" />
        </div>
        <div class="form-group">
          <textarea placeholder="商品簡介"></textarea>
        </div>
      </div>
    </div>
    <div>
      <ckeditor
        v-if="ClassicEditor && config"
        v-model="data"
        :editor="ClassicEditor"
        :config="config"
      />
    </div>
    <!-- 操作按鈕 -->
    <div class="product-actions">
      <button-component
        @click="handleEdit"
        backgroundColor="#38bdf8"
        hoverColor="#0ea5e9"
      >
        儲存
      </button-component>
      <button-component
        @click="handleDelete"
        backgroundColor="#ef4444"
        hoverColor="#dc2626"
      >
        取消
      </button-component>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
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
import ButtonComponent from "./ButtonComponent.vue";

const isLayoutReady = ref(false);

const data = ref("<p>Hello world!</p>");

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
  justify-content: center; /* 垂直置中 */
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
  margin: 10px 0; /* 上下間距 */
  display: flex;
}

.product-container {
  display: flex; /* 使用 flexbox 進行水平排列 */
}

.product-image {
  flex: 2; /* 左側圖片區域占 1 比例 */
  border-right: 1px solid #ccc; /* 添加右側邊框 */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
}

.product-info {
  flex: 1; /* 右側商品資訊區域占 2 比例 */
  padding: 10px;

  .form-group {
    display: flex; /* 使用 flexbox 將標題和輸入框並列 */
    align-items: center; /* 垂直居中 */
    margin-bottom: 10px;

    h3 {
      flex: 0 0 100px; /* 固定標題寬度 */
      margin: 0;
    }

    input,
    textarea {
      flex: 1; /* 輸入框占據剩餘空間 */
      padding: 5px;
      box-sizing: border-box; /* 確保 padding 不影響寬度 */
    }

    textarea {
      height: 300px; /* 設置初始高度為 300px */
      resize: vertical; /* 允許用戶垂直調整大小 */
    }
  }
}

.editor-container {
  display: flex; /* 確保內部佈局正常 */
  align-items: center;
  justify-content: center;
  padding: 20px;
}

/* 操作按鈕區域 */
.product-actions {
  display: flex; /* 使用 flexbox 排列按鈕 */
  justify-content: flex-end; /* 按鈕靠右對齊 */
  align-items: center; /* 垂直居中 */
  gap: 10px; /* 按鈕之間的間距 */
  margin-top: 20px; /* 與上方內容保持間距 */
}
</style>
