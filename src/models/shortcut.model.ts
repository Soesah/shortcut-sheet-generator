export interface ShortCut {
  id: number;
  controlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  commandKey?: boolean;
  key: string;
  description: string;
  location?: string;
}
