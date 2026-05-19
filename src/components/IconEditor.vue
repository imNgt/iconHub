<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed } from "vue";
import * as fabric from "fabric";
import type { Icon } from "../data/iconSets";

const props = defineProps<{
  icon: Icon;
}>();

const emit = defineEmits<{
  (e: "update", svg: string): void;
}>();

const canvasRef = ref<HTMLCanvasElement | null>(null);
let canvas: fabric.Canvas | null = null;

const size = ref(48);
const rotation = ref(0);
const flipH = ref(false);
const flipV = ref(false);
const opacity = ref(1);
const strokeWidth = ref(2);
const color = ref("#94a3b8");

const history = ref<fabric.Object[]>([]);
const historyIndex = ref(-1);

interface Preset {
  name: string;
  size: number;
  rotation: number;
  flipH: boolean;
  flipV: boolean;
  opacity: number;
  strokeWidth: number;
  color: string;
}

const presets = ref<Preset[]>([
  {
    name: "默认",
    size: 48,
    rotation: 0,
    flipH: false,
    flipV: false,
    opacity: 1,
    strokeWidth: 2,
    color: "#94a3b8",
  },
  {
    name: "大号",
    size: 128,
    rotation: 0,
    flipH: false,
    flipV: false,
    opacity: 1,
    strokeWidth: 2,
    color: "#94a3b8",
  },
  {
    name: "旋转90°",
    size: 48,
    rotation: 90,
    flipH: false,
    flipV: false,
    opacity: 1,
    strokeWidth: 2,
    color: "#94a3b8",
  },
  {
    name: "水平翻转",
    size: 48,
    rotation: 0,
    flipH: true,
    flipV: false,
    opacity: 1,
    strokeWidth: 2,
    color: "#94a3b8",
  },
]);

const canUndo = computed(() => historyIndex.value > 0);
const canRedo = computed(() => historyIndex.value < history.value.length - 1);

onMounted(() => {
  if (canvasRef.value) {
    canvas = new fabric.Canvas(canvasRef.value, {
      width: 300,
      height: 300,
      backgroundColor: "transparent",
      selection: false,
      preserveObjectStacking: true,
    });

    loadIconToCanvas();
  }
});

onUnmounted(() => {
  if (canvas) {
    canvas.dispose();
  }
});

watch(
  () => props.icon,
  () => {
    reset();
    loadIconToCanvas();
  },
);

const sanitizeSVG = (svgString: string): string => {
  let sanitized = svgString;

  // 移除 animate 标签（fabric.js 不支持）
  sanitized = sanitized.replace(/<animate[^>]*>/g, "");
  sanitized = sanitized.replace(/<\/animate>/g, "");

  // 移除 animateTransform 标签
  sanitized = sanitized.replace(/<animateTransform[^>]*>/g, "");
  sanitized = sanitized.replace(/<\/animateTransform>/g, "");

  // 移除 fill-opacity 的动画属性
  sanitized = sanitized.replace(/fill-opacity="[^"]*"/g, "");

  // 移除 stroke-dashoffset 属性（可能导致解析问题）
  sanitized = sanitized.replace(/stroke-dashoffset="[^"]*"/g, "");

  // 移除 stroke-dasharray 属性（可能导致解析问题）
  sanitized = sanitized.replace(/stroke-dasharray="[^"]*"/g, "");

  // 移除 animate 属性
  sanitized = sanitized.replace(/animate[^=]*="[^"]*"/g, "");

  // 移除 begin 属性
  sanitized = sanitized.replace(/begin="[^"]*"/g, "");

  // 移除 dur 属性
  sanitized = sanitized.replace(/dur="[^"]*"/g, "");

  // 移除 repeatCount 属性
  sanitized = sanitized.replace(/repeatCount="[^"]*"/g, "");

  // 移除 keyTimes 属性
  sanitized = sanitized.replace(/keyTimes="[^"]*"/g, "");

  // 移除 values 属性
  sanitized = sanitized.replace(/values="[^"]*"/g, "");

  // 移除 fill="freeze"
  sanitized = sanitized.replace(/fill="freeze"/g, "");

  return sanitized;
};

const loadIconToCanvas = () => {
  if (!canvas || !props.icon) return;

  canvas.clear();

  // 预处理 SVG，移除不支持的元素
  const sanitizedSVG = sanitizeSVG(props.icon.svg);

  fabric.loadSVGFromString(sanitizedSVG, (objects: any, options: any) => {
    // 确保 objects 是一个有效的数组
    if (!objects || !Array.isArray(objects) || objects.length === 0) {
      console.error("Failed to parse SVG: objects is not an array", {
        originalSVG: props.icon.svg.substring(0, 100) + "...",
      });
      return;
    }

    // 过滤掉无效的对象
    const validObjects = objects.filter(
      (obj: any) =>
        obj && typeof obj === "object" && !obj.type?.includes("hidden"),
    );

    if (validObjects.length === 0) {
      console.error("No valid objects found in SVG");
      return;
    }

    try {
      const group = new fabric.Group(validObjects, {
        ...options,
        originX: "center",
        originY: "center",
        left: 150,
        top: 150,
      });

      canvas?.add(group);
      canvas?.renderAll();

      saveState();
    } catch (error) {
      console.error("Failed to create fabric.Group:", error);
    }
  });
};

const saveState = () => {
  if (!canvas) return;

  const objects = canvas.getObjects();
  if (objects.length > 0) {
    const json = canvas.toJSON();
    history.value = history.value.slice(0, historyIndex.value + 1);
    history.value.push(json as any);
    historyIndex.value = history.value.length - 1;
  }
};

const undo = () => {
  if (historyIndex.value > 0) {
    historyIndex.value--;
    restoreState(history.value[historyIndex.value]);
  }
};

const redo = () => {
  if (historyIndex.value < history.value.length - 1) {
    historyIndex.value++;
    restoreState(history.value[historyIndex.value]);
  }
};

const restoreState = (state: any) => {
  if (!canvas) return;

  canvas.loadFromJSON(state, () => {
    canvas?.renderAll();
  });
};

watch(size, (newSize) => {
  if (!canvas) return;
  const activeObject = canvas.getObjects()[0];
  if (activeObject) {
    const currentSize = activeObject.getScaledWidth();
    const scale = newSize / currentSize;
    activeObject.scale(scale);
    canvas.renderAll();
    saveState();
  }
});

watch(rotation, (newRotation) => {
  if (!canvas) return;
  const activeObject = canvas.getObjects()[0];
  if (activeObject) {
    activeObject.set("angle", newRotation);
    canvas.renderAll();
    saveState();
  }
});

watch([flipH, flipV], () => {
  if (!canvas) return;
  const activeObject = canvas.getObjects()[0];
  if (activeObject) {
    activeObject.set("scaleX", flipH.value ? -1 : 1);
    activeObject.set("scaleY", flipV.value ? -1 : 1);
    canvas.renderAll();
    saveState();
  }
});

watch(opacity, (newOpacity) => {
  if (!canvas) return;
  const activeObject = canvas.getObjects()[0];
  if (activeObject) {
    activeObject.set("opacity", newOpacity);
    canvas.renderAll();
    saveState();
  }
});

watch(strokeWidth, (newWidth) => {
  if (!canvas) return;
  const activeObject = canvas.getObjects()[0];
  if (activeObject && "getObjects" in activeObject) {
    const objects = (activeObject as any).getObjects();
    objects.forEach((obj: any) => {
      if (obj.strokeWidth) {
        obj.set("strokeWidth", newWidth);
      }
    });
    canvas.renderAll();
    saveState();
  }
});

watch(color, (newColor) => {
  if (!canvas) return;
  const activeObject = canvas.getObjects()[0];
  if (activeObject && "getObjects" in activeObject) {
    const objects = (activeObject as any).getObjects();
    objects.forEach((obj: any) => {
      if (obj.fill && obj.fill !== "transparent" && obj.fill !== "none") {
        obj.set("fill", newColor);
      }
      if (obj.stroke && obj.stroke !== "transparent" && obj.stroke !== "none") {
        obj.set("stroke", newColor);
      }
    });
    canvas.renderAll();
    saveState();
  }
});

const applyPreset = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const index = target.selectedIndex;
  const preset = presets.value[index];
  if (preset) {
    size.value = preset.size;
    rotation.value = preset.rotation;
    flipH.value = preset.flipH;
    flipV.value = preset.flipV;
    opacity.value = preset.opacity;
    strokeWidth.value = preset.strokeWidth;
    color.value = preset.color;
  }
};

const exportSVG = () => {
  if (!canvas) return;
  const svg = canvas.toSVG({
    width: String(size.value),
    height: String(size.value),
  });
  const blob = new Blob([svg], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${props.icon.name}.svg`;
  a.click();
  URL.revokeObjectURL(url);
};

const exportPNG = () => {
  if (!canvas) return;
  const dataURL = canvas.toDataURL({ format: "png", multiplier: 2 });
  const a = document.createElement("a");
  a.href = dataURL;
  a.download = `${props.icon.name}.png`;
  a.click();
};

const reset = () => {
  size.value = 48;
  rotation.value = 0;
  flipH.value = false;
  flipV.value = false;
  opacity.value = 1;
  strokeWidth.value = 2;
  color.value = "#94a3b8";
  history.value = [];
  historyIndex.value = -1;
};
</script>

<template>
  <div class="icon-editor">
    <div class="preview-area">
      <canvas ref="canvasRef" width="300" height="300"></canvas>
    </div>

    <div class="controls-panel">
      <div class="control-group">
        <label>尺寸</label>
        <input type="range" v-model.number="size" min="16" max="256" />
        <span>{{ size }}px</span>
      </div>

      <div class="control-group">
        <label>旋转</label>
        <input type="range" v-model.number="rotation" min="0" max="360" />
        <span>{{ rotation }}°</span>
      </div>

      <div class="control-group">
        <label>翻转</label>
        <div class="flip-controls">
          <label>
            <input type="checkbox" v-model="flipH" />
            水平
          </label>
          <label>
            <input type="checkbox" v-model="flipV" />
            垂直
          </label>
        </div>
      </div>

      <div class="control-group">
        <label>透明度</label>
        <input
          type="range"
          v-model.number="opacity"
          min="0"
          max="1"
          step="0.1"
        />
        <span>{{ Math.round(opacity * 100) }}%</span>
      </div>

      <div class="control-group">
        <label>描边粗细</label>
        <input
          type="range"
          v-model.number="strokeWidth"
          min="0"
          max="10"
          step="0.5"
        />
        <span>{{ strokeWidth }}px</span>
      </div>

      <div class="control-group">
        <label>颜色</label>
        <input type="color" v-model="color" />
      </div>

      <div class="control-group">
        <label>预设</label>
        <select @change="applyPreset($event)">
          <option v-for="preset in presets" :key="preset.name">
            {{ preset.name }}
          </option>
        </select>
      </div>
    </div>

    <div class="action-bar">
      <button @click="reset">重置</button>
      <button @click="undo" :disabled="!canUndo">撤销</button>
      <button @click="redo" :disabled="!canRedo">重做</button>
      <button @click="exportSVG">下载 SVG</button>
      <button @click="exportPNG">下载 PNG</button>
    </div>
  </div>
</template>

<style scoped>
.icon-editor {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.preview-area {
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 20px;
}

.controls-panel {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.control-group label {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
}

.control-group input[type="range"] {
  width: 100%;
  cursor: pointer;
}

.control-group input[type="checkbox"] {
  cursor: pointer;
}

.control-group input[type="color"] {
  width: 100%;
  height: 40px;
  border: 2px solid rgba(102, 126, 234, 0.3);
  border-radius: 8px;
  cursor: pointer;
  background: transparent;
}

.control-group select {
  width: 100%;
  padding: 10px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  cursor: pointer;
}

.control-group select:hover {
  border-color: rgba(102, 126, 234, 0.3);
}

.control-group span {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
}

.flip-controls {
  display: flex;
  gap: 12px;
}

.flip-controls label {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}

.action-bar {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.action-bar button {
  flex: 1;
  min-width: 80px;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  background: rgba(102, 126, 234, 0.2);
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-bar button:hover {
  background: rgba(102, 126, 234, 0.3);
  transform: translateY(-2px);
}

.action-bar button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}
</style>
