<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { iconSetsList, getIconsBySet, type IconSetInfo, type Icon } from '../data/iconSets';

const router = useRouter();
const searchQuery = ref('');

const allIcons = computed<Icon[]>(() => {
  return iconSetsList.flatMap((set) => getIconsBySet(set.id));
});

const filteredIcons = ref<Icon[]>([]);

const isSearching = computed(() => searchQuery.value.trim().length > 0);

const totalIcons = computed(() =>
  iconSetsList.reduce((sum, set) => sum + set.totalIcons, 0)
);

const getPreviewIcons = (setId: string) => {
  const icons = getIconsBySet(setId);
  return icons.slice(0, 8);
};

const filterIcons = () => {
  if (!searchQuery.value.trim()) {
    filteredIcons.value = [];
    return;
  }
  const query = searchQuery.value.toLowerCase();
  filteredIcons.value = allIcons.value.filter(
    (icon) =>
      icon.name.toLowerCase().includes(query) ||
      (icon.chineseName && icon.chineseName.toLowerCase().includes(query)) ||
      icon.category.toLowerCase().includes(query)
  );
};

const goToIconSet = (set: IconSetInfo) => {
  router.push(`/icons/${set.id}`);
};

const getIconSetName = (iconName: string): string => {
  for (const set of iconSetsList) {
    const icons = getIconsBySet(set.id);
    if (icons.some((i) => i.name === iconName)) {
      return set.id;
    }
  }
  return '';
};

const goToIconDetail = (icon: Icon) => {
  const setId = getIconSetName(icon.name);
  if (setId) {
    router.push(`/icons/${setId}?icon=${icon.name}`);
  }
};
</script>

<template>
  <div class="home-container">
    <div class="bg-decoration"></div>
    <div class="bg-decoration-secondary"></div>
    <div class="bg-grid"></div>

    <header class="header">
      <div class="logo">
        <div class="logo-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
            <line x1="12" x2="12" y1="22.08" y2="12"/>
          </svg>
        </div>
        <div class="logo-text">
          <h1>IconHub</h1>
          <span class="logo-badge">BETA</span>
        </div>
      </div>
      <p class="subtitle">精选免费 SVG 图标库，为您的项目增添灵感</p>
    </header>

    <div class="stats-bar">
      <div class="stat-card">
        <div class="stat-icon sets">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
          </svg>
        </div>
        <div class="stat-info">
          <span class="stat-value">{{ iconSetsList.length }}</span>
          <span class="stat-label">图标库</span>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon icons">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
          </svg>
        </div>
        <div class="stat-info">
          <span class="stat-value">{{ totalIcons }}</span>
          <span class="stat-label">图标总数</span>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon categories">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/>
            <line x1="12" x2="12" y1="22" y2="15.5"/>
            <polyline points="22 8.5 12 15.5 2 8.5"/>
          </svg>
        </div>
        <div class="stat-info">
          <span class="stat-value">免费</span>
          <span class="stat-label">开源许可</span>
        </div>
      </div>
    </div>

    <div class="search-bar">
      <div class="search-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="search-icon">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          v-model="searchQuery"
          @input="filterIcons"
          type="text"
          placeholder="搜索图标..."
          class="search-input"
        />
        <button v-if="searchQuery" @click="searchQuery = ''; filterIcons()" class="clear-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6 6 18"/>
            <path d="m6 6 12 12"/>
          </svg>
        </button>
      </div>
    </div>

    <div v-if="!isSearching" class="icon-sets-grid">
      <div
        v-for="set in iconSetsList"
        :key="set.id"
        class="icon-set-card"
        @click="goToIconSet(set)"
      >
        <div class="card-border-glow"></div>
        <div class="card-glow"></div>

        <div class="card-content">
          <div class="card-header">
            <div class="card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
              </svg>
            </div>
            <div class="card-title-group">
              <h3>{{ set.name }}</h3>
              <span class="card-count">{{ set.totalIcons }} 个图标</span>
            </div>
          </div>

          <div class="icons-preview">
            <div
              v-for="icon in getPreviewIcons(set.id)"
              :key="icon.name"
              class="icon-item"
              :title="icon.chineseName || icon.name"
              @click.stop="goToIconDetail(icon)"
            >
              <div v-html="icon.svg"></div>
            </div>
          </div>

          <div class="tags-row">
            <div class="categories">
              <span
                v-for="category in set.categories.slice(0, 3)"
                :key="category"
                class="category-tag"
              >
                {{ category }}
              </span>
              <span v-if="set.categories.length > 3" class="category-tag more">
                +{{ set.categories.length - 3 }}
              </span>
            </div>
          </div>

          <div class="card-footer">
            <span class="card-license">{{ set.license }}</span>
            <button class="view-set-btn" @click="goToIconSet(set)">
              <span>前往图标库</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isSearching" class="search-results">
      <div class="search-results-header">
        <span>找到 {{ filteredIcons.length }} 个图标</span>
      </div>
      <div class="icons-grid">
        <div
          v-for="icon in filteredIcons"
          :key="icon.name"
          class="icon-card"
          @click="goToIconDetail(icon)"
          :title="`${icon.chineseName || icon.name} - 点击查看所属图标库`"
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
    </div>

    <div v-if="isSearching && filteredIcons.length === 0" class="empty-state">
      <div class="empty-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>
      </div>
      <h3>未找到匹配的图标</h3>
      <p>尝试使用其他关键词搜索</p>
    </div>

    <footer class="footer">
      <div class="footer-content">
        <div class="footer-brand">
          <span class="footer-logo">IconHub</span>
          <span class="footer-dot">·</span>
          <span>精选图标资源平台</span>
        </div>
        <p>所有图标均遵循其原始开源许可证</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.home-container {
  min-height: 100vh;
  background: linear-gradient(160deg, #0a0a14 0%, #111128 30%, #0f1a2e 60%, #0d1525 100%);
  position: relative;
  overflow: hidden;
}

.bg-decoration {
  position: fixed;
  top: -15%;
  right: -8%;
  width: 700px;
  height: 700px;
  background: radial-gradient(circle, rgba(102, 126, 234, 0.12) 0%, transparent 65%);
  border-radius: 50%;
  pointer-events: none;
  animation: bgFloat 20s ease-in-out infinite;
}

.bg-decoration-secondary {
  position: fixed;
  bottom: -20%;
  left: -12%;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(118, 75, 162, 0.08) 0%, transparent 65%);
  border-radius: 50%;
  pointer-events: none;
  animation: bgFloat 25s ease-in-out infinite reverse;
}

@keyframes bgFloat {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -20px) scale(1.05); }
  66% { transform: translate(-20px, 15px) scale(0.95); }
}

.bg-grid {
  position: fixed;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 60px 60px;
  pointer-events: none;
  mask-image: radial-gradient(ellipse at 50% 0%, black 30%, transparent 70%);
}

.header {
  text-align: center;
  padding: 80px 20px 20px;
  color: white;
  position: relative;
  z-index: 1;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 20px;
}

.logo-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.35), inset 0 1px 0 rgba(255,255,255,0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.logo-icon:hover {
  transform: scale(1.05) rotate(-5deg);
  box-shadow: 0 12px 40px rgba(102, 126, 234, 0.5), inset 0 1px 0 rgba(255,255,255,0.2);
}

.logo-icon svg {
  width: 34px;
  height: 34px;
}

.logo-text {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-text h1 {
  font-size: 3rem;
  font-weight: 800;
  margin: 0;
  background: linear-gradient(135deg, #ffffff 0%, #c4b5fd 50%, #a78bfa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
}

.logo-badge {
  font-size: 0.65rem;
  font-weight: 700;
  padding: 3px 8px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.3), rgba(118, 75, 162, 0.3));
  border: 1px solid rgba(167, 139, 250, 0.3);
  border-radius: 6px;
  color: #c4b5fd;
  letter-spacing: 0.05em;
  margin-top: 4px;
}

.subtitle {
  font-size: 1.1rem;
  margin: 0;
  color: rgba(255, 255, 255, 0.55);
  font-weight: 400;
  letter-spacing: 0.02em;
}

.stats-bar {
  display: flex;
  justify-content: center;
  gap: 16px;
  max-width: 600px;
  margin: 32px auto 40px;
  position: relative;
  z-index: 1;
  padding: 0 20px;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 22px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.stat-card:hover {
  background: rgba(255, 255, 255, 0.07);
  border-color: rgba(255, 255, 255, 0.12);
  transform: translateY(-2px);
}

.stat-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-icon.sets {
  background: rgba(102, 126, 234, 0.2);
  color: #a5b4fc;
}

.stat-icon.icons {
  background: rgba(167, 139, 250, 0.2);
  color: #c4b5fd;
}

.stat-icon.categories {
  background: rgba(52, 211, 153, 0.2);
  color: #6ee7b7;
}

.stat-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.stat-value {
  font-size: 1.1rem;
  font-weight: 700;
  color: white;
  line-height: 1;
}

.stat-label {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.45);
  line-height: 1;
}

.search-bar {
  max-width: 560px;
  margin: 0 auto 56px;
  position: relative;
  z-index: 1;
  padding: 0 20px;
}

.search-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input {
  width: 100%;
  padding: 16px 56px 16px 50px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  font-size: 0.95rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  color: white;
  transition: all 0.3s ease;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
}

.search-input:focus {
  outline: none;
  border-color: rgba(102, 126, 234, 0.4);
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 4px 32px rgba(102, 126, 234, 0.15), 0 0 0 3px rgba(102, 126, 234, 0.08);
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.35);
}

.search-icon {
  position: absolute;
  left: 18px;
  color: rgba(255, 255, 255, 0.35);
  pointer-events: none;
}

.clear-btn {
  position: absolute;
  right: 12px;
  background: rgba(255, 255, 255, 0.06);
  border: none;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  padding: 6px;
  border-radius: 8px;
  transition: all 0.2s;
  display: flex;
}

.clear-btn:hover {
  background: rgba(255, 255, 255, 0.12);
  color: white;
}

.icon-sets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 24px;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 24px 100px;
  position: relative;
  z-index: 1;
}

.icon-set-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 28px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 1px solid rgba(255, 255, 255, 0.06);
  position: relative;
  overflow: hidden;
}

.card-border-glow {
  position: absolute;
  inset: -1px;
  border-radius: 24px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.3), transparent 40%, transparent 60%, rgba(118, 75, 162, 0.3));
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
  z-index: 0;
}

.icon-set-card:hover .card-border-glow {
  opacity: 1;
}

.card-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.06) 100%);
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.icon-set-card:hover {
  transform: translateY(-4px);
  border-color: rgba(102, 126, 234, 0.2);
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3), 0 0 40px rgba(102, 126, 234, 0.08);
}

.icon-set-card:hover .card-glow {
  opacity: 1;
}

.card-content {
  position: relative;
  z-index: 1;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 22px;
}

.card-icon {
  width: 44px;
  height: 44px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2));
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #a78bfa;
  flex-shrink: 0;
}

.card-icon svg {
  width: 22px;
  height: 22px;
}

.card-title-group {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.card-title-group h3 {
  margin: 0;
  font-size: 1.2rem;
  color: white;
  font-weight: 600;
  line-height: 1.2;
}

.card-count {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.4);
}

.icons-preview {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-bottom: 20px;
  padding: 18px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.04);
}

.icon-item {
  width: 100%;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.65);
  transition: all 0.25s ease;
  border-radius: 10px;
  padding: 6px;
}

.icon-item:hover {
  transform: scale(1.25);
  color: #c4b5fd;
  background: rgba(102, 126, 234, 0.15);
}

.icon-item :deep(svg) {
  width: 100%;
  height: 100%;
}

.tags-row {
  margin-bottom: 18px;
}

.categories {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.category-tag {
  padding: 5px 12px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.06);
  transition: all 0.2s ease;
}

.category-tag:hover {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
}

.category-tag.more {
  background: rgba(102, 126, 234, 0.15);
  color: #a78bfa;
  border-color: rgba(102, 126, 234, 0.2);
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 18px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.card-license {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.35);
  font-weight: 500;
}

.view-set-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: rgba(102, 126, 234, 0.1);
  border: 1px solid rgba(102, 126, 234, 0.2);
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.icon-set-card:hover .view-set-btn {
  background: rgba(102, 126, 234, 0.2);
  color: #667eea;
  border-color: rgba(102, 126, 234, 0.4);
  transform: translateX(4px);
}

.empty-state {
  text-align: center;
  padding: 100px 20px;
  color: rgba(255, 255, 255, 0.5);
  position: relative;
  z-index: 1;
}

.empty-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 24px;
  opacity: 0.25;
}

.empty-state h3 {
  margin: 0 0 8px;
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 600;
}

.empty-state p {
  margin: 0;
  font-size: 0.95rem;
}

.search-results {
  position: relative;
  z-index: 1;
  padding: 0 20px 80px;
  max-width: 1200px;
  margin: 0 auto;
}

.search-results-header {
  margin-bottom: 24px;
  padding: 0 4px;
}

.search-results-header span {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 500;
}

.icons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 14px;
}

.icon-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 14px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.icon-card:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(102, 126, 234, 0.3);
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.12);
}

.icon-preview {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-preview :deep(svg) {
  width: 100%;
  height: 100%;
}

.icon-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  text-align: center;
}

.icon-name {
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  line-height: 1.2;
  word-break: break-all;
}

.icon-category {
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.35);
  padding: 2px 8px;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 10px;
}

.footer {
  text-align: center;
  padding: 40px 20px;
  position: relative;
  z-index: 1;
  border-top: 1px solid rgba(255, 255, 255, 0.04);
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 6px;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.9rem;
  font-weight: 500;
}

.footer-logo {
  color: rgba(255, 255, 255, 0.7);
  font-weight: 700;
}

.footer-dot {
  color: rgba(255, 255, 255, 0.2);
}

.footer p {
  margin: 0;
  color: rgba(255, 255, 255, 0.3);
  font-size: 0.8rem;
}

@media (max-width: 768px) {
  .logo-text h1 {
    font-size: 2.25rem;
  }

  .subtitle {
    font-size: 0.95rem;
  }

  .stats-bar {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }

  .stat-card {
    justify-content: center;
  }

  .icon-sets-grid {
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 0 16px 80px;
  }

  .icons-preview {
    grid-template-columns: repeat(4, 1fr);
  }

  .header {
    padding: 60px 16px 16px;
  }
}
</style>