<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { Actions } from '@/store';

const store = useStore();

const sheets = computed(() => store.state.sheets);

onMounted(() => {
  store.dispatch(Actions.GetSheets);
});
</script>
<template>
  <div>
    <h2>Sheets</h2>
    <ul>
      <li v-for="sheet in sheets" :key="sheet.id">
        <RouterLink :to="`/sheets/${sheet.id}`">{{
          sheet.description
        }}</RouterLink>
      </li>
    </ul>
  </div>
</template>
