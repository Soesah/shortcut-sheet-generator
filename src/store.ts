import { createStore, Store, useStore as baseUseStore } from 'vuex';
import { drawerStore } from './stores/drawer.store';
import { modalStore } from './stores/modal.store';
// models
// services
import sheetService from './services/sheet.service';
import { Sheet } from './models/sheet.model';

export interface SSGState {
  sheets: Sheet[];
}

export enum Mutations {
  SetSheets = 'setSheets',
}

export enum Actions {
  GetSheets = 'getSheets',
}

export const store = createStore<SSGState>({
  modules: {
    ds: drawerStore,
    ms: modalStore,
  },
  state: {
    sheets: [],
  },
  mutations: {
    [Mutations.SetSheets]: (state: SSGState, sheets: Sheet[]) => {
      state.sheets = sheets;
    },
  },
  actions: {
    [Actions.GetSheets]: async ({ commit }) => {
      const res = await sheetService.getList();

      commit(Mutations.SetSheets, res.data);
    },
  },
  getters: {},
});
