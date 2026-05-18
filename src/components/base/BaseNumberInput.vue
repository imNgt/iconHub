<script setup lang="ts">
import { computed, watch } from "vue";

const props = defineProps<{
  modelValue: number;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: number): void;
}>();

const stepValue = computed(() => props.step || 1);

const inputValue = computed({
  get: () => props.modelValue.toString(),
  set: (value) => {
    let num = parseInt(value) || 0;
    if (props.min !== undefined && num < props.min) num = props.min;
    if (props.max !== undefined && num > props.max) num = props.max;
    emit("update:modelValue", num);
  },
});

const increase = () => {
  if (props.disabled) return;
  const newValue = props.modelValue + stepValue.value;
  if (props.max !== undefined && newValue > props.max) return;
  emit("update:modelValue", newValue);
};

const decrease = () => {
  if (props.disabled) return;
  const newValue = props.modelValue - stepValue.value;
  if (props.min !== undefined && newValue < props.min) return;
  emit("update:modelValue", newValue);
};

watch(
  () => props.modelValue,
  (newVal) => {
    if (props.min !== undefined && newVal < props.min) {
      emit("update:modelValue", props.min);
    }
    if (props.max !== undefined && newVal > props.max) {
      emit("update:modelValue", props.max);
    }
  }
);
</script>

<template>
  <div class="base-number-input">
    <button
      class="number-btn decrease"
      @click="decrease"
      :disabled="disabled || (min !== undefined && modelValue <= min)"
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
        <line x1="5" x2="19" y1="12" y2="12" />
      </svg>
    </button>
    <input
      type="text"
      :value="inputValue"
      @input="inputValue = ($event.target as HTMLInputElement).value"
      @keydown.up="increase"
      @keydown.down="decrease"
      @keydown.enter="($event.target as HTMLInputElement).blur()"
      :placeholder="placeholder"
      :disabled="disabled"
      class="number-input"
    />
    <button
      class="number-btn increase"
      @click="increase"
      :disabled="disabled || (max !== undefined && modelValue >= max)"
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
        <line x1="12" x2="12" y1="5" y2="19" />
        <line x1="5" x2="19" y1="12" y2="12" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.base-number-input {
  display: inline-flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.base-number-input:focus-within {
  border-color: rgba(102, 126, 234, 0.5);
  background: rgba(255, 255, 255, 0.1);
}

.base-number-input:has(:disabled) {
  opacity: 0.5;
  cursor: not-allowed;
}

.number-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: all 0.2s ease;
}

.number-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.9);
}

.number-btn:active:not(:disabled) {
  background: rgba(102, 126, 234, 0.3);
}

.number-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.number-input {
  width: 60px;
  height: 36px;
  padding: 0 8px;
  border: none;
  background: transparent;
  color: white;
  font-size: 0.9rem;
  text-align: center;
  outline: none;
}

.number-input::placeholder {
  color: rgba(255, 255, 255, 0.3);
}

.number-input:disabled {
  cursor: not-allowed;
}
</style>
