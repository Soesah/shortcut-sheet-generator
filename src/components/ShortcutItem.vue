<script lang="ts" setup>
import { markRaw, PropType } from 'vue';
import { useStore } from 'vuex';
import { ShortCut } from '@/models/shortcut.model';
import Key from '@/components/Key.vue';
import ShortcutForm from '@/components/ShortcutForm.vue';
import { DrawerMutations } from '@/stores/drawer.store';

const store = useStore();

const { shortCut } = defineProps({
  shortCut: { type: Object as PropType<ShortCut>, required: true },
});

const editShortCut = () => {
  store.commit(DrawerMutations.OpenDrawer, {
    drawer: markRaw(ShortcutForm),
    data: {
      shortCut,
    },
  });
};
</script>
<template>
  <div class="shortcut-item">
    <div class="keys" @click="editShortCut">
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
