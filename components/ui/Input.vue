<template>
  <Field :name="name" v-slot="{ field, meta }">
    <div class="field" :class="{ error: meta.touched && !meta.valid }">
      <UiLabel :forId="name" :text="label" :required="required" />
      <input
        v-bind="field"
        :id="name"
        :type="type"
        :placeholder="placeholder"
        autocomplete="on"
        class="input"
				@input="onInput($event, field)"
      />
      <UiErrorMessage :name="name" />
    </div>
  </Field>
</template>

<script setup lang="ts">
import { Field } from "vee-validate";

const props = defineProps<{
  name: string;
  type: string;
  label: string;
  placeholder: string;
  required?: boolean;
}>();

function onInput(e: Event, field: any) {
  const input = e.target as HTMLInputElement

	if (props.type === "tel") {
 		const digits = input.value.replace(/\D/g, "")
  	field.onChange(digits)
	}
}
</script>

<style lang="scss" scoped>
.field {
  display: flex;
  flex-direction: column;
}
.input {
  padding: 8px;
  border: 1px solid var(--c-grey);
}

// error
.field.error .input {
  border-color: var(--c-red);
}
</style>
