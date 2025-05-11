<template>
  <div
    class="checkbox"
    @click="toggle"
    :class="{ checked: value, error: meta.touched && !meta.valid }"
  >
    <div class="wrap">
      <div class="box">
        <span v-if="value">✔</span>
      </div>
      <UiLabel :text="label" :required="required" />
    </div>

    <UiErrorMessage :name="name" />
  </div>
</template>

<script setup lang="ts">
import { useField } from "vee-validate";

const props = defineProps<{
  name: string;
  label: string;
  required?: boolean;
}>();

const { value, meta } = useField<boolean>(props.name, undefined, {
  initialValue: false,
});

const toggle = () => {
  value.value = !value.value;
};
</script>

<style scoped lang="scss">
.checkbox:deep(.label) {
  margin-bottom: 0;
}
.wrap {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
}
.box {
  width: 20px;
  height: 20px;
  border: 1px solid var(--c-grey);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  background: var(--c-white);
}
.checked .box {
  background: var(--c-black);
  color: var(--c-white);
  border-color: var(--c-black);
}

// error
.checkbox.error .box {
	border-color: var(--c-red);
}
</style>
