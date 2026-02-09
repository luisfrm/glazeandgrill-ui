import { ICategory } from "./types";

export enum colors {
  sweet = 'sweet',
  orange = 'orange',
  amber = 'amber',
  emerald = 'emerald',
  rose = 'rose',
}

export const INITIAL_CATEGORIES: ICategory[] = [
  { id: 1, icon: 'cake', label: 'Postres', color: colors.sweet, selected: false },
  { id: 2, icon: 'burger', label: 'Burgers', color: colors.orange, selected: false },
  { id: 3, icon: 'bakery', label: 'Panes', color: colors.amber, selected: false },
  { id: 4, icon: 'local_bar', label: 'Bebidas', color: colors.emerald, selected: false },
  { id: 5, icon: 'icecream', label: 'Helados', color: colors.rose, selected: false },
];