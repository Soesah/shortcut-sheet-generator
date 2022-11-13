import { Module } from 'vuex';
import { SSGState } from '@/store';

export interface ModalInfo {
  modal: Object;
  data: any;
}

export interface ModalStore {
  modal: ModalInfo | null;
}

export enum ModalMutations {
  OpenModal = 'ms/OpenModal',
  CloseModal = 'ms/CloseModal',
}

export const stripNamespace = (action: ModalMutations): string =>
  action.replace(/ms\//g, '');

export const modalStore: Module<ModalStore, SSGState> = {
  namespaced: true,
  state: {
    modal: null,
  },
  mutations: {
    [stripNamespace(ModalMutations.OpenModal)](state, modal: ModalInfo) {
      state.modal = modal;
    },
    [stripNamespace(ModalMutations.CloseModal)](state) {
      state.modal = null;
    },
  },
};
