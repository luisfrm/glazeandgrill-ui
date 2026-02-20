import { create } from 'zustand'
import { ICatalog, ICategory, IProduct } from '@/config/types'
import { allProducts as InitialProducts } from '@/services/products'
import { categories as InitialCategories } from '@/services/categories'
import { veritasCatalog as InitialCatalog } from '@/services/catalog'

interface CategoryState {
  categories: ICategory[],
  products: IProduct[],
  catalog: ICatalog,
  selectedCategory: ICategory | null,
}

interface CategoryAction {
  selectCategory: (id: string) => void
  unSelectCategory: () => void
}

const useCategoryStore = create<CategoryState & CategoryAction>((set) => ({
  products: InitialProducts,
  categories: InitialCategories,
  catalog: InitialCatalog,
  selectedCategory: null,
  selectCategory: (id: string) => {
    set((state) => ({
      selectedCategory: state.categories.find((category) => category.id === id),
    }))
  },
  unSelectCategory: () => {
    set(() => ({
      selectedCategory: null,
    }))
  },
}))

export type CategoryStore = ReturnType<typeof useCategoryStore>

export default useCategoryStore