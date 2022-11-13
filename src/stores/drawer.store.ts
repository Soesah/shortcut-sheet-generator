import { Module } from 'vuex';
import { SSGState } from '@/store';

export interface DrawerInfo {
  drawer: Object;
  data: any;
}

export interface DrawerStore {
  drawer: DrawerInfo | null;
}

export enum DrawerMutations {
  OpenDrawer = 'ds/OpenDrawer',
  CloseDrawer = 'ds/CloseDrawer',
}

export enum DrawerActions {
  CloseDrawer = 'ds/CloseDrawer',
}

const sn = (str: DrawerActions | DrawerMutations): string =>
  str.replace(/ds\//g, '');

const DRAWER_TRANSITION_TIME = 400;

export const drawerStore: Module<DrawerStore, SSGState> = {
  namespaced: true,
  state: {
    drawer: null,
  },
  mutations: {
    [sn(DrawerMutations.OpenDrawer)](state, drawer: DrawerInfo) {
      state.drawer = drawer;
    },
    [sn(DrawerMutations.CloseDrawer)](state) {
      state.drawer = null;
    },
  },
  actions: {
    async [sn(DrawerActions.CloseDrawer)]({ state, commit }) {
      if (state.drawer) {
        setTimeout(
          () => commit(sn(DrawerMutations.CloseDrawer)),
          DRAWER_TRANSITION_TIME,
        );
      }
    },
  },
};
