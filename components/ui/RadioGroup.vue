<template>
  <div class="field" :class="{ error: meta.touched && !meta.valid }">
    <UiLabel :text="label" :required="required" />

    <div class="radio-group">
      <div
        v-for="option in options"
        :key="option.value"
        class="radio"
        :class="{ selected: value === option.value }"
        @click="select(option.value)"
      >
        <span class="circle">
          <span v-if="value === option.value" class="dot" />
        </span>
        <span class="text">{{ option.text }}</span>
      </div>
    </div>

    <UiErrorMessage :name="name" />
  </div>
</template>

<script setup lang="ts">
import { useField } from "vee-validate"

const props = defineProps<{
  name: string
  label: string
  options: { value: string; text: string }[]
  required?: boolean
}>()

const { value, meta } = useField<string>(props.name)

const select = (val: string) => {
  value.value = val
}
</script>

<style scoped>
.field {
  display: flex;
  flex-direction: column;
}
.radio-group {
  display: flex;
  gap: 8px;
	flex-wrap: wrap;
}
.radio {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
}
.circle {
  width: 18px;
  height: 18px;
  border: 1px solid var(--c-grey);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.dot {
  width: 8px;
  height: 8px;
  background: var(--c-black);
  border-radius: 50%;
}
.selected .circle {
  border-color: var(--c-black);
}
.field.error .radio .circle {
  border-color: var(--c-red);
}
</style>
