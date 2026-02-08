import { create } from 'zustand'
import { ICategory } from '@/config/types'
import { INITIAL_CATEGORIES } from '@/config/constant'

interface CategoryState {
  categories: ICategory[]
}

interface CategoryAction {
  toggleCategory: (id: number) => void
}

const useCategoryStore = create<CategoryState & CategoryAction>((set) => ({
  categories: INITIAL_CATEGORIES,
  toggleCategory: (id: number) => set((state) => ({
    categories: state.categories.map((category) =>
      category.id === id
        ? { ...category, selected: !category.selected }
        : { ...category, selected: false }
    )
  })),
}))

export type CategoryStore = ReturnType<typeof useCategoryStore>

export default useCategoryStore