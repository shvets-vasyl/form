<template>
  <button class="button">{{ text }}</button>
</template>
<script setup lang="ts">
defineProps<{ text: string }>();
</script>
<style scoped lang="scss">
.button {
  width: 100%;
  padding: 8px;
  background: var(--c-black);
  color: var(--c-white);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
