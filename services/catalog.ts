// data/catalog.ts
import { ICatalog } from '@/config/types'
import { categories } from './categories'

export const veritasCatalog: ICatalog = {
  id: 'veritas-menu',
  title: '✨ Menú Veritas ✨',
  subtitle: 'Donde cada bocado es una experiencia',
  categories: categories,
}

// Exportar también por categorías específicas si se necesita
export { categories }