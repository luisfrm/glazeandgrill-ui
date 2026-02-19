import { CategoryColor, ICategory, ProductCategory } from "./types";

export const INITIAL_CATEGORIES: (ICategory & { selected: boolean })[] = [
  { id: 1, icon: 'cake', title: 'Postres', color: CategoryColor.SWEET, selected: false, name: ProductCategory.DESSERT, subtitle: '', products: [] },
  { id: 2, icon: 'burger', title: 'Burgers', color: CategoryColor.ORANGE, selected: false, name: ProductCategory.BURGER, subtitle: '', products: [] },
  { id: 3, icon: 'bakery', title: 'Panes', color: CategoryColor.AMBER, selected: false, name: ProductCategory.BREAD, subtitle: '', products: [] },
  { id: 4, icon: 'local_bar', title: 'Bebidas', color: CategoryColor.EMERALD, selected: false, name: ProductCategory.DRINK, subtitle: '', products: [] },
  { id: 5, icon: 'icecream', title: 'Helados', color: CategoryColor.ROSE, selected: false, name: ProductCategory.ICECREAM, subtitle: '', products: [] },
];