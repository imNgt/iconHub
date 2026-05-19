<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { iconSetsList, getIconsBySet, type Icon } from "../data/iconSets";
import BaseNumberInput from "../components/base/BaseNumberInput.vue";
import IconDetailModal from "../components/IconDetailModal.vue";

const route = useRoute();
const router = useRouter();
const setId = computed(() => route.params.setId as string);

const iconSet = computed(() =>
  iconSetsList.find((set) => set.id === setId.value),
);

const allIcons = ref<Icon[]>([]);
const filteredIcons = ref<Icon[]>([]);
const searchQuery = ref("");
const selectedCategory = ref("全部");
const showModal = ref(false);
const selectedIcon = ref<Icon | null>(null);

const categories = computed(() => {
  const cats = new Set<string>();
  cats.add("全部");
  allIcons.value.forEach((icon) => {
    if (icon.category) cats.add(icon.category);
  });
  return Array.from(cats);
});

const filterIcons = () => {
  let result = allIcons.value;

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      (icon) =>
        icon.name.toLowerCase().includes(query) ||
        (icon.chineseName && icon.chineseName.includes(query)),
    );
  }

  if (selectedCategory.value !== "全部") {
    result = result.filter((icon) => icon.category === selectedCategory.value);
  }

  filteredIcons.value = result;
};

const openIconModal = (icon: Icon) => {
  selectedIcon.value = icon;
  showModal.value = true;
};

const goBack = () => {
  router.push("/");
};

const goToOtherSet = (otherSetId: string) => {
  router.push(`/icons/${otherSetId}`);
};

onMounted(() => {
  if (iconSet.value) {
    allIcons.value = getIconsBySet(setId.value);
    filteredIcons.value = allIcons.value;
  }

  // 检查 URL 参数中是否有 icon 参数，自动打开图标详情
  const iconName = route.query.icon;
  if (iconName && typeof iconName === "string") {
    const icon = allIcons.value.find((i) => i.name === iconName);
    if (icon) {
      setTimeout(() => {
        openIconModal(icon);
      }, 300);
    }
  }
});
</script>

<template>
  <div class="detail-container">
    <div class="bg-decoration"></div>
    <div class="bg-decoration-secondary"></div>
    <div class="bg-grid"></div>

    <header class="header">
      <button class="back-btn" @click="goBack">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
        <span>返回</span>
      </button>
      <div class="logo" @click="goBack">
        <div class="logo-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <text
              x="12"
              y="16"
              text-anchor="middle"
              font-size="16"
              font-weight="bold"
              fill="currentColor"
            >
              IH
            </text>
          </svg>
        </div>
        <span>IconHub</span>
      </div>
    </header>

    <div v-if="iconSet" class="content">
      <div class="set-header">
        <div class="set-header-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
            />
          </svg>
        </div>
        <div class="set-info">
          <h1>{{ iconSet.name }}</h1>
          <div class="set-meta">
            <span class="icon-count">{{ iconSet.totalIcons }} 个图标</span>
            <span class="meta-divider">·</span>
            <span class="set-license">{{ iconSet.license }}</span>
            <span class="meta-divider">·</span>
            <span class="set-author">{{ iconSet.author }}</span>
          </div>
        </div>
      </div>

      <div class="filters">
        <div class="search-wrapper">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="search-icon"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            v-model="searchQuery"
            @input="filterIcons"
            type="text"
            placeholder="搜索图标..."
            class="search-input"
          />
          <button
            v-if="searchQuery"
            @click="
              searchQuery = '';
              filterIcons();
            "
            class="clear-btn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
        <div class="category-filter">
          <select
            v-model="selectedCategory"
            @change="filterIcons"
            class="category-select"
          >
            <option v-for="cat in categories" :key="cat" :value="cat">
              {{ cat }}
            </option>
          </select>
        </div>
      </div>

      <div class="icons-grid">
        <div
          v-for="icon in filteredIcons"
          :key="icon.name"
          class="icon-card"
          @click="openIconModal(icon)"
          :title="`点击查看详情`"
        >
          <div class="icon-preview">
            <div v-html="icon.svg"></div>
          </div>
          <div class="icon-info">
            <span class="icon-name">{{ icon.chineseName || icon.name }}</span>
            <span class="icon-category">{{ icon.category }}</span>
          </div>
        </div>
      </div>

      <div v-if="filteredIcons.length === 0" class="empty-state">
        <div class="empty-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </div>
        <h3>未找到匹配的图标</h3>
        <p>尝试使用其他关键词搜索</p>
      </div>

      <div class="other-sets">
        <h3>浏览其他图标库</h3>
        <div class="other-sets-list">
          <button
            v-for="set in iconSetsList.filter((s) => s.id !== setId)"
            :key="set.id"
            class="other-set-btn"
            @click="goToOtherSet(set.id)"
          >
            <div class="set-mini-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
                />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" x2="12" y1="22.08" y2="12" />
              </svg>
            </div>
            <div class="set-btn-info">
              <span class="set-btn-name">{{ set.name }}</span>
              <span class="set-btn-count">{{ set.totalIcons }} 图标</span>
            </div>
          </button>
        </div>
      </div>
    </div>

    <div v-else class="not-found">
      <div class="not-found-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="80"
          height="80"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M9.172 16.172a4 4 0 0 1 5.656 0" />
          <circle cx="12" cy="12" r="10" />
          <path d="m9 9 6 6" />
          <path d="m15 9-6 6" />
        </svg>
      </div>
      <h2>图标库未找到</h2>
      <p>您访问的图标库不存在</p>
      <button @click="goBack">返回首页</button>
    </div>

    <IconDetailModal
      :visible="showModal"
      :icon="selectedIcon"
      :set-name="iconSet?.name"
      :set-id="setId"
      @close="showModal = false"
    />
  </div>
</template>

<style scoped>
.detail-container {
  min-height: 100vh;
  background: linear-gradient(
    160deg,
    #0a0a14 0%,
    #111128 30%,
    #0f1a2e 60%,
    #0d1525 100%
  );
  position: relative;
  overflow: hidden;
}

.bg-decoration {
  position: fixed;
  top: -15%;
  right: -8%;
  width: 600px;
  height: 600px;
  background: radial-gradient(
    circle,
    rgba(102, 126, 234, 0.1) 0%,
    transparent 65%
  );
  border-radius: 50%;
  pointer-events: none;
  animation: bgFloat 20s ease-in-out infinite;
}

.bg-decoration-secondary {
  position: fixed;
  bottom: -20%;
  left: -12%;
  width: 500px;
  height: 500px;
  background: radial-gradient(
    circle,
    rgba(118, 75, 162, 0.07) 0%,
    transparent 65%
  );
  border-radius: 50%;
  pointer-events: none;
  animation: bgFloat 25s ease-in-out infinite reverse;
}

@keyframes bgFloat {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -20px) scale(1.05);
  }
  66% {
    transform: translate(-20px, 15px) scale(0.95);
  }
}

.bg-grid {
  position: fixed;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px);
  background-size: 60px 60px;
  pointer-events: none;
  mask-image: radial-gradient(ellipse at 50% 0%, black 30%, transparent 70%);
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 24px;
  background: rgba(10, 10, 20, 0.8);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  position: sticky;
  top: 0;
  z-index: 100;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.back-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(102, 126, 234, 0.3);
  color: white;
}

.back-btn svg {
  width: 18px;
  height: 18px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: opacity 0.2s;
}

.logo:hover {
  opacity: 0.8;
}

.logo-icon {
  width: 34px;
  height: 34px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.3);
}

.logo-icon svg {
  width: 18px;
  height: 18px;
}

.content {
  max-width: 1300px;
  margin: 0 auto;
  padding: 32px 24px;
  position: relative;
  z-index: 1;
}

.set-header {
  display: flex;
  align-items: center;
  gap: 20px;
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 28px 32px;
  margin-bottom: 28px;
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.set-header-icon {
  width: 56px;
  height: 56px;
  background: linear-gradient(
    135deg,
    rgba(102, 126, 234, 0.25),
    rgba(118, 75, 162, 0.25)
  );
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #a78bfa;
  flex-shrink: 0;
}

.set-header-icon svg {
  width: 28px;
  height: 28px;
}

.set-info h1 {
  margin: 0 0 8px;
  font-size: 1.6rem;
  color: white;
  font-weight: 700;
}

.set-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.icon-count {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
}

.meta-divider {
  color: rgba(255, 255, 255, 0.2);
}

.set-license {
  font-size: 0.85rem;
  color: rgba(167, 139, 250, 0.7);
  font-weight: 500;
}

.set-author {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.4);
}

.filters {
  display: flex;
  gap: 14px;
  margin-bottom: 28px;
  flex-wrap: wrap;
}

.search-wrapper {
  position: relative;
  flex: 1;
  min-width: 240px;
  max-width: 420px;
}

.search-input {
  width: 100%;
  padding: 13px 44px 13px 40px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  font-size: 0.9rem;
  background: rgba(255, 255, 255, 0.04);
  color: white;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: rgba(102, 126, 234, 0.4);
  background: rgba(255, 255, 255, 0.07);
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.08);
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.3);
}

.search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.3);
  pointer-events: none;
}

.clear-btn {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.06);
  border: none;
  color: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  padding: 5px;
  border-radius: 6px;
  transition: all 0.2s;
  display: flex;
}

.clear-btn:hover {
  background: rgba(255, 255, 255, 0.12);
  color: white;
}

.category-filter {
  flex-shrink: 0;
}

.category-select {
  padding: 13px 36px 13px 16px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  font-size: 0.9rem;
  background: rgba(255, 255, 255, 0.04);
  color: white;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  transition: all 0.3s ease;
}

.category-select:focus {
  outline: none;
  border-color: rgba(102, 126, 234, 0.4);
}

.category-select option {
  background: #111128;
  color: white;
}

.icons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 14px;
}

.icon-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 20px 14px 16px;
  text-align: center;
  cursor: pointer;
  transition: all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;
  overflow: hidden;
}

.icon-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(102, 126, 234, 0.08),
    rgba(118, 75, 162, 0.06)
  );
  opacity: 0;
  transition: opacity 0.35s ease;
  pointer-events: none;
}

.icon-card:hover {
  transform: translateY(-4px);
  border-color: rgba(102, 126, 234, 0.25);
  background: rgba(255, 255, 255, 0.06);
  box-shadow:
    0 12px 40px rgba(0, 0, 0, 0.25),
    0 0 20px rgba(102, 126, 234, 0.06);
}

.icon-card:hover::before {
  opacity: 1;
}

.icon-preview {
  width: 52px;
  height: 52px;
  margin: 0 auto 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
}

.icon-card:hover .icon-preview {
  color: #c4b5fd;
  background: rgba(102, 126, 234, 0.12);
}

.icon-preview :deep(svg) {
  width: 100%;
  height: 100%;
}

.icon-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  position: relative;
  z-index: 1;
}

.icon-name {
  font-size: 0.8rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.85);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.icon-category {
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.35);
}

.empty-state {
  text-align: center;
  padding: 80px 20px;
  color: rgba(255, 255, 255, 0.5);
}

.empty-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 20px;
  opacity: 0.25;
}

.empty-state h3 {
  margin: 0 0 8px;
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 600;
}

.empty-state p {
  margin: 0;
  font-size: 0.9rem;
}

.other-sets {
  margin-top: 56px;
  padding-top: 32px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.other-sets h3 {
  margin: 0 0 20px;
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 600;
}

.other-sets-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 12px;
}

.other-set-btn {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.75);
  font-size: 0.9rem;
  transition: all 0.3s ease;
  text-align: left;
}

.other-set-btn:hover {
  border-color: rgba(102, 126, 234, 0.3);
  background: rgba(102, 126, 234, 0.08);
  transform: translateY(-2px);
}

.set-mini-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(
    135deg,
    rgba(102, 126, 234, 0.2),
    rgba(118, 75, 162, 0.2)
  );
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #a78bfa;
  flex-shrink: 0;
}

.set-mini-icon svg {
  width: 18px;
  height: 18px;
}

.set-btn-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.set-btn-name {
  font-weight: 600;
  color: white;
}

.set-btn-count {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.4);
}

.not-found {
  text-align: center;
  padding: 120px 20px;
  color: rgba(255, 255, 255, 0.5);
  position: relative;
  z-index: 1;
}

.not-found-icon {
  width: 100px;
  height: 100px;
  margin: 0 auto 24px;
  opacity: 0.25;
}

.not-found h2 {
  margin: 0 0 10px;
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 700;
}

.not-found p {
  margin: 0 0 28px;
  font-size: 1rem;
}

.not-found button {
  padding: 14px 36px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 14px;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 24px rgba(102, 126, 234, 0.35);
}

.not-found button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.5);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal-content {
  background: linear-gradient(160deg, #151530 0%, #111128 50%, #0f1a2e 100%);
  border-radius: 24px;
  width: 100%;
  max-width: 520px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow:
    0 25px 80px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(255, 255, 255, 0.08);
  animation: modalIn 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes modalIn {
  from {
    opacity: 0;
    transform: scale(0.92) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.close-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 36px;
  height: 36px;
  border: none;
  background: rgba(255, 255, 255, 0.06);
  cursor: pointer;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.5);
  transition: all 0.2s ease;
  z-index: 1;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.12);
  color: white;
}

.modal-body {
  padding: 48px 36px 36px;
  text-align: center;
}

.modal-icon-preview {
  width: 140px;
  height: 140px;
  margin: 0 auto 24px;
  color: white;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.modal-icon-preview :deep(svg) {
  max-width: 100%;
  max-height: 100%;
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 12px;
  color: white;
}

.modal-meta {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-bottom: 28px;
}

.modal-set {
  display: inline-flex;
  align-items: center;
  padding: 5px 14px;
  background: linear-gradient(
    135deg,
    rgba(102, 126, 234, 0.3),
    rgba(118, 75, 162, 0.3)
  );
  border-radius: 20px;
  font-size: 0.8rem;
  color: #c4b5fd;
  font-weight: 500;
}

.modal-category {
  display: inline-flex;
  align-items: center;
  padding: 5px 14px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 20px;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.55);
}

.preview-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 28px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.preview-size-control,
.preview-color-control {
  display: flex;
  align-items: center;
  gap: 10px;
}

.preview-size-control label,
.preview-color-control label {
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.55);
  white-space: nowrap;
  font-weight: 500;
}

.color-picker {
  width: 34px;
  height: 34px;
  border: 2px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  cursor: pointer;
  background: transparent;
  padding: 2px;
  transition: border-color 0.2s ease;
}

.color-picker:hover {
  border-color: rgba(102, 126, 234, 0.5);
}

.color-picker::-webkit-color-swatch-wrapper {
  padding: 0;
}

.color-picker::-webkit-color-swatch {
  border: none;
  border-radius: 4px;
}

.action-buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 28px;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 11px 22px;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.action-btn svg {
  width: 15px;
  height: 15px;
}

.action-btn.primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.35);
}

.action-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 28px rgba(102, 126, 234, 0.5);
}

.action-btn.secondary {
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.action-btn.secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(102, 126, 234, 0.3);
  transform: translateY(-2px);
}

.code-preview {
  text-align: left;
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.code-preview label {
  display: block;
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.4);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-weight: 600;
}

.copy-code-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.78rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
}

.copy-code-btn:hover {
  background: rgba(102, 126, 234, 0.15);
  color: #a78bfa;
  border-color: rgba(102, 126, 234, 0.25);
}

.code-preview pre {
  background: rgba(0, 0, 0, 0.35);
  color: #cbd5e1;
  padding: 18px;
  border-radius: 14px;
  font-size: 0.65rem;
  line-height: 1.5;
  overflow-x: auto;
  overflow-y: auto;
  max-height: 150px;
  white-space: pre-wrap;
  word-break: break-all;
  border: 1px solid rgba(255, 255, 255, 0.04);
}

@media (max-width: 768px) {
  .set-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    padding: 24px;
  }

  .set-info h1 {
    font-size: 1.35rem;
  }

  .icons-grid {
    grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
    gap: 10px;
  }

  .icon-card {
    padding: 16px 10px 12px;
  }

  .icon-preview {
    width: 40px;
    height: 40px;
  }

  .modal-body {
    padding: 40px 20px 24px;
  }

  .action-buttons {
    flex-direction: column;
  }

  .action-btn {
    width: 100%;
    justify-content: center;
  }

  .other-sets-list {
    grid-template-columns: 1fr;
  }
}
</style>
