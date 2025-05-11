<template>
  <div
    class="field"
    :class="{ error: meta.touched && !meta.valid }"
    ref="selectWrapper"
  >
    <UiLabel :text="label" :required="required" />

    <div class="select" @click="toggle">
      <span>{{ selectedLabel || placeholder }}</span>
      <ul v-if="open" class="dropdown">
        <li
          v-for="option in options"
          :key="option.value"
          @click.stop="select(option.value)"
          :class="{ selected: value === option.value }"
        >
          {{ option.text }}
        </li>
      </ul>
    </div>
    <UiErrorMessage :name="name" />
  </div>
</template>

<script setup lang="ts">
import { useField } from "vee-validate";
import { useClickOutside } from "@/composables/useClickOutside";

const selectWrapper = ref<HTMLElement | null>(null);

const props = defineProps<{
  name: string;
  label: string;
  options: { value: string; text: string }[];
  placeholder: string;
  required?: boolean;
}>();

const open = ref(false);
const toggle = () => (open.value = !open.value);
const close = () => (open.value = false);
useClickOutside(selectWrapper, close);

const { value, meta } = useField<string>(props.name);

const selectedLabel = computed(() => {
  return props.options.find((o) => o.value === value.value)?.text || "";
});

function select(val: string) {
  value.value = val;
  close();
}
</script>

<style scoped lang="scss">
.field {
  display: flex;
  flex-direction: column;
}
.select {
  border: 1px solid var(--c-grey);
  padding: 8px;
  position: relative;
  cursor: pointer;
  user-select: none;
}
.dropdown {
  position: absolute;
  left: 0;
  top: 100%;
  background: var(--c-white);
  border: 1px solid var(--c-grey);
  width: 100%;
  z-index: 10;
  margin-top: 4px;
}
.dropdown li {
  padding: 8px;
}
.dropdown li:hover {
  background: #f0f0f0;
}

// error
.field.error .select {
  border-color: var(--c-red);
}
</style>
