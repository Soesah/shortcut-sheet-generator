import { createStore, Store, useStore as baseUseStore } from 'vuex';
import { drawerStore } from './stores/drawer.store';
import { modalStore } from './stores/modal.store';
// models
import { Sheet } from './models/sheet.model';
import { Notification } from './models/notification.model';
// services
import sheetService from './services/sheet.service';

export interface SSGState {
  sheets: Sheet[];
  notifications: Notification[];
}

export enum Mutations {
  SetSheets = 'setSheets',
  ShowNotification = 'showNotification',
  DismissNotification = 'dismissNotification',
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
    notifications: [],
  },
  mutations: {
    [Mutations.SetSheets]: (state: SSGState, sheets: Sheet[]) => {
      state.sheets = sheets;
    },
    [Mutations.ShowNotification]: (
      state: SSGState,
      notification: Notification,
    ) => {
      state.notifications = [...state.notifications, notification];
    },
    [Mutations.DismissNotification]: (state: SSGState, id: Number) => {
      state.notifications = [...state.notifications.filter((n) => n.id !== id)];
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
