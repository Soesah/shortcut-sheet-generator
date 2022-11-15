<script lang="ts" setup>
import { PropType } from 'vue';
import { ShortCut } from '@/models/shortcut.model';
import Key from '@/components/Key.vue';

const { shortCut } = defineProps({
  shortCut: { type: Object as PropType<ShortCut>, required: true },
});
</script>
<template>
  <div class="shortcut-item">
    <div class="keys">
      <Key v-if="shortCut.controlKey" value="CTRL" />
      <Key v-if="shortCut.altKey" value="ALT" />
      <Key v-if="shortCut.shiftKey" value="SHIFT" />
      <Key v-if="shortCut.commandKey" value="CMD" />
      {{
        shortCut.controlKey ||
        shortCut.altKey ||
        shortCut.shiftKey ||
        shortCut.commandKey
          ? '+'
          : ''
      }}
      <Key :value="shortCut.key" />
    </div>
    <h4>{{ shortCut.description }}</h4>
  </div>
</template>
