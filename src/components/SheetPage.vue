<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import { Actions } from '@/store';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import Card from '@/components/common/Card.vue';
import ShortcutItem from '@/components/ShortcutItem.vue';

const store = useStore();
const route = useRoute();

const sheet = computed(() => store.state.sheet);

onMounted(() => {
  store.dispatch(Actions.GetSheet, parseInt(`${route.params.id}`));
});
</script>
<template>
  <Card v-if="sheet">
    <h2>{{ sheet.description }}</h2>
    <ul class="flat">
      <li v-for="shortCut in sheet.shortcuts" :key="shortCut.id">
        <ShortcutItem :shortCut="shortCut" />
      </li>
    </ul>
  </Card>
</template>
