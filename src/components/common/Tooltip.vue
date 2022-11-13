<script lang="ts" setup>
import { ref } from 'vue';

const { highlight, inline, containerStyle, text } = defineProps({
  text: { type: String, default: '' },
  highlight: { type: Boolean, default: false },
  inline: { type: Boolean, default: false },
  containerStyle: { type: String, default: '' },
});

const visible = ref<boolean>(false);

const toggle = () => {
  visible.value = !visible.value;
};
</script>
<template>
  <div
    class="tooltip-container"
    :class="[{ highlight: visible && highlight, inline }, containerStyle]"
    @mouseover="toggle"
    @mouseout="toggle"
  >
    <slot></slot>
    <div class="tooltip tooltip-top" v-if="visible">
      <div class="tooltip-text" v-text="text"></div>
    </div>
  </div>
</template>
