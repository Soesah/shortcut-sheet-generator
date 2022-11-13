import { createStore, Store, useStore as baseUseStore } from 'vuex';
import { drawerStore } from './stores/drawer.store';
import { modalStore } from './stores/modal.store';
// models
// services

export interface SSGState {}

export enum Mutations {}

export enum Actions {}

export const store = createStore<SSGState>({
  modules: {
    ds: drawerStore,
    ms: modalStore,
  },
  state: {},
  mutations: {},
  actions: {},
  getters: {},
});
