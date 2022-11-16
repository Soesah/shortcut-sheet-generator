<script lang="ts" setup>
import { computed, markRaw, onMounted } from 'vue';
import { Actions } from '@/store';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import Card from '@/components/common/Card.vue';
import ShortcutItem from '@/components/ShortcutItem.vue';
import SheetForm from '@/components/SheetForm.vue';
import ShortcutForm from '@/components/ShortcutForm.vue';
import { DrawerMutations } from '@/stores/drawer.store';

const store = useStore();
const route = useRoute();

const sheet = computed(() => store.state.sheet);

onMounted(() => {
  store.dispatch(Actions.GetSheet, parseInt(`${route.params.id}`));
});

const editSheet = () => {
  store.commit(DrawerMutations.OpenDrawer, {
    drawer: markRaw(SheetForm),
    data: {
      sheet,
    },
  });
};

const addShortCut = () => {
  store.commit(DrawerMutations.OpenDrawer, {
    drawer: markRaw(ShortcutForm),
    data: {
      shortCut: {
        description: '',
        key: '',
        location: '',
      },
      isAdd: true,
    },
  });
};
</script>
<template>
  <Card v-if="sheet">
    <h2 @click="editSheet">{{ sheet.description }}</h2>
    <ul class="flat">
      <li v-for="shortCut in sheet.shortcuts" :key="shortCut.id">
        <ShortcutItem :shortCut="shortCut" />
      </li>
    </ul>
    <button class="option" type="button" @click="addShortCut">
      Add shortcut
    </button>
  </Card>
</template>
