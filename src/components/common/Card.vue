<script lang="ts" setup>
const { light } = defineProps({
  light: { type: Boolean, default: false },
});
</script>
<template>
  <div :class="{ card: true, light }">
    <slot />
  </div>
</template>
