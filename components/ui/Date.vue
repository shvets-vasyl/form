<template>
  <Field :name="name" v-slot="{ value, meta, setTouched, setValue }">
    <div class="field" :class="{ error: meta.touched && !meta.valid }">
      <UiLabel :text="label" :required="required" />

      <Datepicker
        :model-value="value"
        @update:model-value="setValue"
        @blur="setTouched(true)"
        :placeholder="placeholder"
        :id="name"
				:name="name"
        :format="format"
        :enable-time="false"
        :teleport="true"
        auto-apply
        class="datepicker"
      />

      <UiErrorMessage :name="name" />
    </div>
  </Field>
</template>

<script setup lang="ts">
import { Field } from "vee-validate";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

defineProps<{
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
}>();

const format = (date: Date) =>
  date.toLocaleDateString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
</script>

<style scoped>
.field {
  display: flex;
  flex-direction: column;
}
.datepicker:deep(.dp__input) {
	border-radius: 0;
	border: 1px solid var(--c-grey);
}
.field.error .datepicker:deep(.dp__input) {
  border-color: var(--c-red);
}
</style>
