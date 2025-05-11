<template>
	<component
    :is="forId ? 'label' : 'div'"
    :for="forId"
    class="label"
  >
    <span>{{ text }}</span>
    <span v-if="required" class="required">*</span>
  </component>
</template>

<script setup lang="ts">
defineProps<{
  text: string
  forId?: string
  required?: boolean
}>()
</script>

<style scoped lang="scss">
.label {
  font-weight: 500;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
}
.required {
  color: var(--c-red);
}
</style>
