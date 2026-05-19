<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type { Icon } from '../data/iconSets';
import BaseNumberInput from './base/BaseNumberInput.vue';

const props = defineProps<{
  visible: boolean;
  icon: Icon | null;
  setName?: string;
  setId?: string;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const previewSize = ref(48);
const previewColor = ref('#94a3b8');
const previewColor2 = ref('#764ba2');

watch(() => props.icon, (newIcon) => {
  if (newIcon) {
    previewSize.value = 48;
    const matches = newIcon.svg.match(/stop-color:#[0-9A-Fa-f]{3,6}/g);
    if (matches && matches.length >= 2) {
      const start = matches[0].slice(11);
      const end = matches[1].slice(11);
      previewColor.value = start;
      previewColor2.value = end;
    } else {
      const fillMatch = newIcon.svg.match(/fill="([^"]+)"/);
      const strokeMatch = newIcon.svg.match(/stroke="([^"]+)"/);
      
      if (fillMatch && fillMatch[1] && !fillMatch[1].includes('none') && !fillMatch[1].includes('currentColor')) {
        previewColor.value = fillMatch[1];
      } else if (strokeMatch && strokeMatch[1] && !strokeMatch[1].includes('none') && !strokeMatch[1].includes('currentColor')) {
        previewColor.value = strokeMatch[1];
      } else {
        previewColor.value = '#94a3b8';
      }
      previewColor2.value = '#764ba2';
    }
  }
});

const previewSvg = computed(() => {
  if (!props.icon) return '';
  let svg = props.icon.svg;

  if (props.setId === 'gradient') {
    const gradientId = `g-${previewColor.value.replace('#', '')}-${previewColor2.value.replace('#', '')}`;
    svg = svg.replace(/id="g\d+"/g, `id="${gradientId}"`);
    svg = svg.replace(/url\(#g\d+\)/g, `url(#${gradientId})`);

    let stopIndex = 0;
    svg = svg.replace(
      /stop-color:#[0-9A-Fa-f]{3,6}/g,
      () => `stop-color:${++stopIndex === 1 ? previewColor.value : previewColor2.value}`,
    );
  } else {
    svg = svg.replace(
      /(fill|stroke)="(?!none|currentColor|url|#fff\b|#ffffff\b)(#[0-9A-Fa-f]{3,6})"/g,
      '$1="currentColor"',
    );
  }

  return svg
    .replace(/width="[^"]*"/, `width="${previewSize.value}"`)
    .replace(/height="[^"]*"/, `height="${previewSize.value}"`);
});

const downloadSvgData = computed(() => {
  if (!props.icon) return '';
  let svg = props.icon.svg;

  if (props.setId === 'gradient') {
    const gradientId = `g-${previewColor.value.replace('#', '')}-${previewColor2.value.replace('#', '')}`;
    svg = svg.replace(/id="g\d+"/g, `id="${gradientId}"`);
    svg = svg.replace(/url\(#g\d+\)/g, `url(#${gradientId})`);

    let stopIndex = 0;
    svg = svg.replace(
      /stop-color:#[0-9A-Fa-f]{3,6}/g,
      () => `stop-color:${++stopIndex === 1 ? previewColor.value : previewColor2.value}`,
    );
  } else {
    svg = svg
      .replace(
        /(fill|stroke)="(?!none|currentColor|url|#fff\b|#ffffff\b)(#[0-9A-Fa-f]{3,6})"/g,
        `$1="${previewColor.value}"`,
      )
      .replace(/currentColor/g, previewColor.value);
  }

  return svg
    .replace(/width="[^"]*"/, `width="${previewSize.value}"`)
    .replace(/height="[^"]*"/, `height="${previewSize.value}"`);
});

const downloadSvg = () => {
  if (!props.icon) return;
  const data = downloadSvgData.value;
  const blob = new Blob([data], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${props.icon.name}.svg`;
  a.click();
  URL.revokeObjectURL(url);
};

const downloadPng = async () => {
  if (!props.icon) return;
  const data = previewSvg.value;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  canvas.width = previewSize.value * 4;
  canvas.height = previewSize.value * 4;

  const img = new Image();
  img.onload = () => {
    ctx.scale(4, 4);
    ctx.fillStyle = 'transparent';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);

    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `${props.icon!.name}.png`;
    a.click();
  };
  img.src = `data:image/svg+xml;base64,${btoa(data)}`;
};

const copySvg = () => {
  if (!props.icon) return;
  navigator.clipboard.writeText(downloadSvgData.value);
};

const closeModal = () => {
  emit('close');
};
</script>

<template>
  <Teleport to="body">
    <div v-if="visible" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button class="close-btn" @click="closeModal">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
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

        <div v-if="icon" class="modal-body">
          <div
            class="modal-icon-preview"
            :style="{ color: previewColor }"
            :key="previewSvg"
            v-html="previewSvg"
          ></div>

          <h2 class="modal-title">
            {{ icon.chineseName || icon.name }}
          </h2>
          <div class="modal-meta">
            <span class="modal-set">{{ setName }}</span>
            <span class="modal-category">{{ icon.category }}</span>
          </div>

          <div class="preview-controls">
            <div class="preview-size-control">
              <label>尺寸</label>
              <BaseNumberInput v-model="previewSize" :min="16" :max="256" />
            </div>
            <template v-if="setId === 'gradient'">
              <div class="preview-color-control">
                <label>渐变起点</label>
                <input
                  type="color"
                  v-model="previewColor"
                  class="color-picker"
                />
              </div>
              <div class="preview-color-control">
                <label>渐变终点</label>
                <input
                  type="color"
                  v-model="previewColor2"
                  class="color-picker"
                />
              </div>
            </template>
            <div v-else class="preview-color-control">
              <label>颜色</label>
              <input
                type="color"
                v-model="previewColor"
                class="color-picker"
              />
            </div>
          </div>

          <div class="action-buttons">
            <button class="action-btn primary" @click="downloadSvg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" x2="12" y1="15" y2="3" />
              </svg>
              下载 SVG
            </button>
            <button class="action-btn secondary" @click="downloadPng">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <circle cx="16.5" cy="16.5" r="1.5" />
              </svg>
              下载 PNG
            </button>
          </div>

          <div class="code-preview">
            <div class="code-header">
              <label>SVG 代码</label>
              <button class="copy-code-btn" @click="copySvg">
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
                  <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                </svg>
              </button>
            </div>
            <pre class="code-content">{{ downloadSvgData }}</pre>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
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
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border: 1px solid rgba(102, 126, 234, 0.3);
  border-radius: 20px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(102, 126, 234, 0.1);
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  animation: slideUp 0.3s ease;
  position: relative;
}

@keyframes slideUp {
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.close-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  transform: rotate(90deg);
}

.modal-body {
  padding: 40px;
}

.modal-icon-preview {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  margin-bottom: 24px;
  color: #94a3b8;
}

.modal-icon-preview :deep(svg) {
  width: 100%;
  height: 100%;
  max-width: 150px;
  max-height: 150px;
}

.modal-title {
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 12px 0;
  text-align: center;
}

.modal-meta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 24px;
}

.modal-set,
.modal-category {
  padding: 6px 12px;
  background: rgba(102, 126, 234, 0.1);
  border: 1px solid rgba(102, 126, 234, 0.2);
  border-radius: 8px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 500;
}

.preview-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.preview-size-control,
.preview-color-control {
  display: flex;
  align-items: center;
  gap: 8px;
}

.preview-size-control label,
.preview-color-control label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 500;
}

.color-picker {
  width: 40px;
  height: 40px;
  border: 2px solid rgba(102, 126, 234, 0.3);
  border-radius: 8px;
  cursor: pointer;
  background: transparent;
  transition: all 0.3s ease;
}

.color-picker:hover {
  border-color: rgba(102, 126, 234, 0.5);
  transform: scale(1.05);
}

.action-buttons {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
}

.action-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 20px;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-btn.primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.action-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
}

.action-btn.secondary {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
}

.action-btn.secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.code-preview {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  overflow: hidden;
}

.code-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.code-header label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 500;
}

.copy-code-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 6px 12px;
  background: rgba(102, 126, 234, 0.1);
  border: 1px solid rgba(102, 126, 234, 0.2);
  border-radius: 6px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 11px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.copy-code-btn:hover {
  background: rgba(102, 126, 234, 0.2);
  color: rgba(255, 255, 255, 0.8);
}

.code-content {
  padding: 16px;
  margin: 0;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.7);
  font-family: 'Courier New', monospace;
  line-height: 1.6;
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-all;
}
</style>
