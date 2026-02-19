// Enum para las categorías
export enum ProductCategory {
  BURGER = 'BURGER',
  DESSERT = 'DESSERT',
  BREAD = 'BREAD',
  DRINK = 'DRINK',
  ICECREAM = 'ICECREAM',
  COMBO = 'COMBO',
  SNACK = 'SNACK',
}

// Enum para colores de categorías
export enum CategoryColor {
  SWEET = 'sweet',
  ORANGE = 'orange',
  AMBER = 'amber',
  EMERALD = 'emerald',
  ROSE = 'rose',
}

// Enum para colores de badges
export enum BadgeColor {
  PRIMARY = 'primary',
  EMERALD = 'emerald',
  ORANGE = 'orange',
}

// Interfaz del Producto
export interface IProduct {
  id: number // ID numérico
  internalId: string // ID string para referencias
  category: ProductCategory // Categoría del producto
  name: string
  description: string
  price: number
  image: string
  badge?: string
  badgeColor?: BadgeColor
  rating?: number
  calories?: number
  ingredients: string[]
}

// Interfaz de Categoría
export interface ICategory {
  id: string
  name: ProductCategory // Nombre de la categoría (enum)
  icon: string // Icono Lucide React
  title: string // Título visible
  subtitle: string
  color: CategoryColor
  products: IProduct[] // Se llenará con filter
}

// Interfaz del Catálogo
export interface ICatalog {
  id: string
  title: string
  subtitle: string
  categories: ICategory[]
}