<script lang="ts" setup>
const { value, controlKey } = defineProps({
  value: { type: String, required: true },
  controlKey: { type: Boolean, default: false },
});
</script>
<template>
  <div :class="{ key: true, controlKey }">{{ value }}</div>
</template>
