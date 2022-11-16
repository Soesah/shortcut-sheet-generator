<script lang="ts" setup>
import { computed, onMounted, markRaw } from 'vue';
import { useStore } from 'vuex';
import { Actions } from '@/store';
import Card from '@/components/common/Card.vue';
import SheetForm from './SheetForm.vue';
import { DrawerMutations } from '@/stores/drawer.store';

const store = useStore();

const sheets = computed(() => store.state.sheets);

onMounted(() => {
  store.dispatch(Actions.GetSheets);
});

const addSheet = () => {
  store.commit(DrawerMutations.OpenDrawer, {
    drawer: markRaw(SheetForm),
    data: {
      sheet: {
        description: '',
        shortcuts: [],
      },
      isAdd: true,
    },
  });
};
</script>
<template>
  <Card>
    <h2>Sheets</h2>
    <ul>
      <li v-for="sheet in sheets" :key="sheet.id">
        <RouterLink :to="`/sheets/${sheet.id}`">{{
          sheet.description
        }}</RouterLink>
      </li>
    </ul>

    <button class="option" type="button" @click="addSheet">Add sheet</button>
  </Card>
</template>
