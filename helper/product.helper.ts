// utils/productHelpers.ts
import { ICategory, IProduct, ProductCategory } from '@/config/types'
import { allProducts } from '@/services/products'

// Obtener producto por ID numérico
export const getProductById = (id: number): IProduct | undefined => {
  return allProducts.find(product => product.id === id)
}

// Obtener producto por internal ID
export const getProductByInternalId = (internalId: string): IProduct | undefined => {
  return allProducts.find(product => product.internalId === internalId)
}

// Obtener productos por múltiples categorías
export const getProductsByCategories = (categories: ProductCategory[]): IProduct[] => {
  return allProducts.filter(product => categories.includes(product.category))
}

// Buscar productos por nombre
export const searchProducts = (query: string): IProduct[] => {
  const lowerQuery = query.toLowerCase()
  return allProducts.filter(product =>
    product.name.toLowerCase().includes(lowerQuery) ||
    product.description.toLowerCase().includes(lowerQuery)
  )
}

// Obtener productos destacados (con badge)
export const getFeaturedProducts = (): IProduct[] => {
  return allProducts.filter(product => product.badge !== undefined)
}

// Obtener productos por rango de precio
export const getProductsByPriceRange = (min: number, max: number): IProduct[] => {
  return allProducts.filter(product => product.price >= min && product.price <= max)
}

export const getSelectedCategory = (categories: ICategory[]): ICategory | null => {
  const selectedCategory = categories.filter(category => category.selected)
  return selectedCategory[0] || null
}