<script lang="ts" setup>
const { width, height } = defineProps({
  width: { type: Number, default: 16 },
  height: { type: Number, default: 16 },
});
</script>
<template>
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    viewBox="0 0 768 768"
  >
    <path
      d="M319.5 544.5l288-288-45-46.5-243 243-114-114-45 45zM607.5 96c36 0 64.5 30 64.5 64.5v447c0 34.5-28.5 64.5-64.5 64.5h-447c-36 0-64.5-30-64.5-64.5v-447c0-34.5 28.5-64.5 64.5-64.5h447z"
    ></path>
  </svg>
</template>
