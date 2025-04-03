<template>
  <!-- 上部區域：主圖片預覽和左右切換 -->
  <div class="image-preview">
    <button @click="prevImage" class="nav-button">←</button>
    <img :src="currentImage" />
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
        @contextmenu.prevent="removeImage(index + thumbnailStartIndex)"
      >
        <img :src="image" alt="縮略圖" />
      </div>
      <div
        v-if="images.length < 10"
        class="thumbnail upload-icon"
        @click="uploadImage"
      >
        +
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, defineProps, defineEmits, watch } from "vue";
import { clickPrev, clickNext } from "./image-show";
import { ImageShowProps } from "./image-show";

const props = defineProps<ImageShowProps>();

const emit = defineEmits<{
  updateImage: [images: string[]];
}>();

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

// Reactive data for images
const images = ref<string[]>(props.images || []);

const currentImageIndex = ref(0);
const thumbnailStartIndex = ref(0);
const thumbnailsPerPage = 10; // Number of thumbnails to display at a time

// Computed property for the currently displayed image
const currentImage = computed(() => images.value[currentImageIndex.value]);

// Computed property for visible thumbnails
const visibleThumbnails = computed(() => {
  return images.value.slice(
    thumbnailStartIndex.value,
    thumbnailStartIndex.value + thumbnailsPerPage
  );
});

const uploadImage = () => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.onchange = (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (images.value.length < 10) {
          images.value.push(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  input.click();
  emit("updateImage", images.value);
};

// Method to remove an image
const removeImage = (index: number) => {
  if (confirm("確定要移除這張圖片嗎？")) {
    images.value.splice(index, 1);
    currentImageIndex.value = clickPrev(currentImageIndex.value, images.value);
    emit("updateImage", images.value);
  }
};

watch(
  () => props.images,
  (newImages) => {
    images.value = newImages || [];
  }
);
</script>

<style lang="scss" scoped>
.image-preview,
.image-thumbnails {
  width: 100%; /* 寬度相同，填滿父容器 */
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.image-preview {
  height: 300px; /* 固定高度 */
  margin-bottom: 10px;

  img {
    width: 100%; /* 固定寬度 */
    height: 100%; /* 固定高度 */
    object-fit: contain; /* 確保圖片適應容器 */
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
  height: 80px; /* 固定高度 */
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
      width: 100%; /* 固定寬度 */
      height: 100%; /* 固定高度 */
      object-fit: cover; /* 確保圖片適應容器 */
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
</style>
