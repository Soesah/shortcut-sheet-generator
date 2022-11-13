import mitt from 'mitt';

export enum Event {}
export type Events = {};

const eventStore = mitt<Events>();

export const useEvents = () => {
  return eventStore;
};
