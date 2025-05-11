<template>
  <Field :name="name" v-slot="{ field, meta }">
    <div class="field" :class="{ error: meta.touched && !meta.valid }">
      <UiLabel :forId="name" :text="label" :required="required" />
      <textarea
        v-bind="field"
        :id="name"
        :placeholder="placeholder"
        class="textarea"
      />
      <UiErrorMessage :name="name" />
    </div>
  </Field>
</template>

<script setup lang="ts">
import { Field } from "vee-validate";

defineProps<{
  name: string;
  label: string;
  placeholder: string;
  required?: boolean;
}>();
</script>

<style scoped lang="scss">
.field {
  display: flex;
  flex-direction: column;
}
.textarea {
  padding: 8px;
  border: 1px solid var(--c-grey);
  min-height: 100px;
}

// error
.field.error .textarea {
  border-color: var(--c-red);
}
</style>
