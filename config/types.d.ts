export interface ICategory {
  id: number
  icon: string
  label: string
  color: 'sweet' | 'orange' | 'amber' | 'emerald' | 'rose'
  selected: boolean
}

export interface IProduct {
  id: string
  name: string
  description: string
  price: number
  image: string
  badge?: string
  badgeColor?: 'primary' | 'emerald' | 'orange'
  rating?: number
  calories?: number
  ingredients: string[]
}

export interface ICatalog {
  id: string
  title: string
  subtitle: string
  products: Product[]
}