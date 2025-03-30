<template>
  <div class="main-container">
    <div class="product-container">
      <!-- 左側圖片區域 -->
      <div class="product-image">
        <!-- 上部區域：主圖片預覽和左右切換 -->
        <div class="image-preview">
          <button @click="prevImage" class="nav-button">←</button>
          <img :src="currentImage" alt="主圖片" />
          <button @click="nextImage" class="nav-button">→</button>
        </div>

        <!-- 下部區域：縮略圖和上傳按鈕 -->
        <div class="image-thumbnails">
          <div class="thumbnails-wrapper">
            <div
              v-for="(image, index) in visibleThumbnails"
              :key="index"
              class="thumbnail"
              @click="setCurrentImage(index + thumbnailStartIndex)"
            >
              <img :src="image" alt="縮略圖" />
            </div>
            <!-- 顯示上傳按鈕（當圖片數量小於 10 時） -->
            <div
              v-for="index in Math.max(0, 10 - images.length)"
              :key="'upload-' + index"
              class="thumbnail upload-icon"
              @click="uploadImage"
            >
              +
            </div>
          </div>
        </div>
      </div>
      <!-- 右側商品資訊區域 -->
      <div class="product-info">
        <div class="form-group">
          <input-text label="商品名稱" v-model="contentData.name" />
        </div>
        <div class="form-group">
          <input-number label="商品價格" v-model="contentData.price" />
        </div>
        <div class="form-group">
          <input-text label="商品分類" v-model="contentData.category" />
        </div>
        <div class="form-group">
          <InputArea label="商品簡介" v-model="contentData.description" />
        </div>
      </div>
    </div>
    <div>
      <ckeditor
        v-if="ClassicEditor && config"
        v-model="contentData.content"
        :editor="ClassicEditor"
        :config="config"
      />
    </div>
    <!-- 操作按鈕 -->
    <div class="product-actions">
      <div class="button-wrapper">
        <button-component
          @click="handleSumbit(contentData)"
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
import { ref, computed, onMounted, defineProps, reactive } from "vue";
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
import { InputText, InputNumber, InputArea, ButtonComponent } from "./Basics";
import { Product } from "@/types/Product";
import {
  handleSumbit,
  handleDelete,
  clickPrev,
  clickNext,
} from "@/store/EditProductStore";

const isLayoutReady = ref(false);

const props = defineProps<Product>();
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

// Reactive data for images
const images = ref<string[]>([
  "https://via.placeholder.com/300", // Example image URLs
  "https://via.placeholder.com/300",
  "https://via.placeholder.com/300",
  "https://via.placeholder.com/300",
  "https://via.placeholder.com/300",
]);

const currentImageIndex = ref(0);
const thumbnailStartIndex = ref(0);
const thumbnailsPerPage = 3; // Number of thumbnails to display at a time

// Computed property for the currently displayed image
const currentImage = computed(() => images.value[currentImageIndex.value]);

// Computed property for visible thumbnails
const visibleThumbnails = computed(() =>
  images.value.slice(
    thumbnailStartIndex.value,
    thumbnailStartIndex.value + thumbnailsPerPage
  )
);

// Methods for navigation and image management
const prevImage = () => {
  currentImageIndex.value = clickPrev(currentImageIndex.value, images.value);
};

const nextImage = () => {
  currentImageIndex.value = clickNext(currentImageIndex.value, images.value);
};

const setCurrentImage = (index: number) => {
  currentImageIndex.value = index;
};

const uploadImage = () => {
  if (images.value.length < 10) {
    // Simulate an image upload
    images.value.push("https://via.placeholder.com/300");
  }
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
  margin: 10px 0; /* 上下間距 */
  display: flex;
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

  .image-preview,
  .image-thumbnails {
    width: 100%; /* 寬度相同，填滿父容器 */
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .image-preview {
    height: 90%; /* 高度占父容器的 90% */
    margin-bottom: 10px;

    img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }

    .nav-button {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background-color: rgba(0, 0, 0, 0.5);
      color: #fff;
      border: none;
      padding: 5px 10px;
      cursor: pointer;
    }

    .nav-button:first-of-type {
      left: 10px;
    }

    .nav-button:last-of-type {
      right: 10px;
    }
  }

  .image-thumbnails {
    height: 10%; /* 高度占父容器的 10% */
    gap: 5px;

    .thumbnail-nav-button {
      background-color: rgba(0, 0, 0, 0.5);
      color: #fff;
      border: none;
      padding: 5px 10px;
      cursor: pointer;
      font-size: 16px;
      border-radius: 5px;
    }

    .thumbnails-wrapper {
      display: flex;
      flex-wrap: nowrap;
      gap: 5px;
      overflow: hidden;
    }

    .thumbnail {
      width: 50px;
      height: 50px;
      border: 1px solid #ccc;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      img {
        max-width: 100%;
        max-height: 100%;
        object-fit: cover;
      }

      &.upload-icon {
        background-color: #f0f0f0;
        font-size: 24px;
        font-weight: bold;
        color: #888;
        justify-content: center;
        align-items: center;
      }
    }
  }
}

.product-info {
  flex: 1; /* 右側商品資訊區域占 2 比例 */
  padding: 10px;
  width: 33.33%; /* 寬度設置為網頁的 1/3 */
  max-width: 400px;

  .form-group {
    display: flex; /* 使用 flexbox 將標題和輸入框並列 */
    align-items: center; /* 垂直居中 */
    margin-bottom: 10px;
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
