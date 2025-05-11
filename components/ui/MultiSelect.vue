<template>
  <div class="field" :class="{ error: meta.touched && !meta.valid }" ref="wrapper">
    <UiLabel :text="label" :required="required" />

    <div class="select" @click="toggle">
      <span v-if="!value.length">{{ placeholder }}</span>
      <div v-else class="tags">
        <span v-for="val in value" :key="val" class="tag">
          {{ getLabel(val) }}
          <button type="button" @click.stop="remove(val)">×</button>
        </span>
      </div>
    </div>

    <ul v-if="open" class="dropdown">
      <li
        v-for="option in options"
        :key="option.value"
        :class="{ selected: value.includes(option.value) }"
        @click.stop="toggleSelection(option.value)"
      >
        {{ option.text }}
      </li>
    </ul>

    <UiErrorMessage :name="name" />
  </div>
</template>

<script setup lang="ts">
import { useField } from "vee-validate";
import { useClickOutside } from "@/composables/useClickOutside";

const props = defineProps<{
  name: string;
  label: string;
  options: { value: string; text: string }[];
  placeholder: string;
  required?: boolean;
}>();

const wrapper = ref<HTMLElement | null>(null);
const open = ref(false);

const toggle = () => (open.value = !open.value);
const close = () => (open.value = false);

useClickOutside(wrapper, close);

const { value, meta } = useField<string[]>(props.name, undefined, {
  initialValue: [],
});

const getLabel = (val: string) =>
  props.options.find((o) => o.value === val)?.text || val;

const toggleSelection = (val: string) => {
  const selected = value.value.slice();

  const index = selected.indexOf(val);

  if (index >= 0) selected.splice(index, 1);
  else selected.push(val);

  value.value = selected;
};

const remove = (val: string) => {
  value.value = value.value.filter((v) => v !== val);
};
</script>

<style scoped lang="scss">
.field {
  display: flex;
  flex-direction: column;
	position: relative;
}
.select {
  border: 1px solid var(--c-grey);
  padding: 8px;
  cursor: pointer;
  user-select: none;
  position: relative;
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}
.tag {
  background: #eee;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 14px;
}
.tag button {
  background: transparent;
  border: none;
  margin-left: 4px;
  cursor: pointer;
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
.dropdown li:hover, .selected {
  background: #f0f0f0;
}

// error
.field.error .select {
  border-color: var(--c-red);
}
</style>
