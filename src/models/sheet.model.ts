import { ShortCut } from './shortcut.model';

export interface Sheet {
  id: number;
  description: string;
  shortcuts: ShortCut[];
}
