<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { DrawerActions, DrawerInfo } from '@/stores/drawer.store';

const store = useStore();
const drawer = computed<DrawerInfo | null>(() => store.state.ds.drawer);
const open = ref<boolean>(false); // needed to keep showing content while drawer closes

watch(drawer, (drawer: DrawerInfo | null) => {
  if (drawer) {
    open.value = true;
  }
});

const close = () => {
  open.value = false;
  store.dispatch(DrawerActions.CloseDrawer);
};
</script>
<template>
  <div class="drawer-container" v-click-outside="close">
    <section class="drawer" :class="{ open }">
      <component
        v-if="drawer"
        :is="drawer.drawer"
        @close="close"
        :data="drawer.data"
      ></component>
      <div class="drawer-close">
        <button class="cancel icononly" @click="close">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 768 768"
          >
            <path
              d="M607.5 205.5l-178.5 178.5 178.5 178.5-45 45-178.5-178.5-178.5 178.5-45-45 178.5-178.5-178.5-178.5 45-45 178.5 178.5 178.5-178.5z"
            ></path>
          </svg>
        </button>
      </div>
    </section>
  </div>
</template>
