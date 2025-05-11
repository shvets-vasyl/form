<template>
  <ErrorMessage :name="name" v-slot="{ message }">
    <div v-if="message" class="error">
      ⚠️ {{ message }}
    </div>
  </ErrorMessage>
</template>

<script setup lang="ts">
import { ErrorMessage } from "vee-validate";

defineProps<{
  name: string;
}>();
</script>

<style scoped lang="scss">
.error {
  color: var(--c-red);
  font-size: 14px;
  margin-top: 4px;
  font-style: italic;
}
</style>
