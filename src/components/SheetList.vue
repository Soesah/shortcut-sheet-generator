<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { Actions } from '@/store';
import Card from '@/components/common/Card.vue';

const store = useStore();

const sheets = computed(() => store.state.sheets);

onMounted(() => {
  store.dispatch(Actions.GetSheets);
});
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
  </Card>
</template>
