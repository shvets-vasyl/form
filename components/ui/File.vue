<template>
  <Field :name="name" v-slot="{ value, handleChange, meta }">
    <div class="field" :class="{ error: meta.touched && !meta.valid }">
      <UiLabel :text="label" :required="required" />

      <label :for="name" class="button">
        {{
          multiple
            ? value?.length
              ? `${value.length} file(s)`
              : placeholder
            : value?.name || placeholder
        }}
        <input
          :id="name"
          type="file"
          class="hidden"
          :accept="accept"
          :multiple="multiple"
          @change="onFileInput($event, handleChange)"
        />
      </label>

      <div v-if="multiple ? value?.length : value" class="preview-list">
        <div
          v-for="(file, index) in multiple ? value : [value]"
          :key="index"
          class="preview"
        >
          <img
            v-if="file?.type?.startsWith('image/')"
            :src="getFileUrl(file)"
            alt="Preview"
          />
          <div v-else class="file-name">{{ file?.name }}</div>
          <button
            class="remove"
            type="button"
            @click="removeFile(index, handleChange, value)"
          >
            ×
          </button>
        </div>
      </div>

      <UiErrorMessage :name="name" />
    </div>
  </Field>
</template>

<script setup lang="ts">
import { Field } from "vee-validate";

const props = defineProps<{
  name: string;
  label: string;
  placeholder?: string;
  accept?: string;
  required?: boolean;
  multiple?: boolean;
}>();

function onFileInput(e: Event, handleChange: (v: any) => void) {
  const input = e.target as HTMLInputElement;
  const files = input.files;

  if (!files) return;

  if (props.multiple) {
    handleChange(Array.from(files));
  } else {
    handleChange(files[0] ?? null);
  }
}

function removeFile(
  index: number,
  handleChange: (v: any) => void,
  value: File[] | File | null
) {
  const input = document.querySelector(
    `input[name="${props.name}"]`
  ) as HTMLInputElement;
  if (input) input.value = "";

  if (props.multiple && Array.isArray(value)) {
    const copy = [...value];
    copy.splice(index, 1);
    handleChange(copy);
  } else {
    handleChange(null);
  }
}

function getFileUrl(file: File): string {
  return URL.createObjectURL(file);
}
</script>

<style scoped>
.field {
  display: flex;
  flex-direction: column;
}
.button {
  padding: 8px 12px;
  border: 1px solid var(--c-grey);
  cursor: pointer;
}
.hidden {
  display: none;
}
.preview-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
}
.preview {
  display: flex;
  align-items: center;
  gap: 8px;
}
.preview img {
  width: 80px;
}
.field.error .button {
  border-color: var(--c-red);
}
</style>
