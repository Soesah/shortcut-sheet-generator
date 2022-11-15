import { createStore, Store, useStore as baseUseStore } from 'vuex';
import { drawerStore } from './stores/drawer.store';
import { modalStore } from './stores/modal.store';
// models
import { Sheet } from './models/sheet.model';
import { Notification } from './models/notification.model';
// services
import sheetService from './services/sheet.service';
import { ShortCut } from './models/shortcut.model';

export interface SSGState {
  sheet: Sheet | null;
  sheets: Sheet[];
  notifications: Notification[];
}

export enum Mutations {
  SetSheet = 'setSheet',
  SetSheets = 'setSheets',
  ShowNotification = 'showNotification',
  DismissNotification = 'dismissNotification',
}

export enum Actions {
  GetSheets = 'getSheets',
  GetSheet = 'getSheet',
  CreateShortcut = 'createShortcut',
  UpdateShortcut = 'updateShortcut',
}

export const store = createStore<SSGState>({
  modules: {
    ds: drawerStore,
    ms: modalStore,
  },
  state: {
    sheet: null,
    sheets: [],
    notifications: [],
  },
  mutations: {
    [Mutations.SetSheet]: (state: SSGState, sheet: Sheet | null) => {
      state.sheet = sheet
        ? {
            ...sheet,
            shortcuts: [
              ...sheet.shortcuts.sort((a, b) => (a.key > b.key ? 1 : -1)),
            ],
          }
        : null;
    },
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
    [Actions.GetSheet]: async ({ state, commit }, id: number) => {
      if (state.sheets.length === 0) {
        const res = await sheetService.getList();

        commit(Mutations.SetSheets, res.data);
      }
      commit(
        Mutations.SetSheet,
        state.sheets.find((sheet) => sheet.id === id) || null,
      );
    },
    [Actions.GetSheets]: async ({ commit }) => {
      const res = await sheetService.getList();

      commit(Mutations.SetSheets, res.data);
    },
    [Actions.CreateShortcut]: async ({ state, commit }, shortCut: ShortCut) => {
      const res = await sheetService.postShortCut(state.sheet!, shortCut);
      commit(Mutations.SetSheet, res.data);
    },
    [Actions.UpdateShortcut]: async ({ state, commit }, shortCut: ShortCut) => {
      const res = await sheetService.putShortCut(state.sheet!, shortCut);
      commit(Mutations.SetSheet, res.data);
    },
  },
  getters: {},
});
