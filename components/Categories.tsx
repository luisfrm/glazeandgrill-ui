'use client'

import Category from './Category'
import useCategoryStore from '@/stores/useCategory'
import { ICategory } from '@/config/types'

export default function Categories() {
  const { categories, selectCategory } = useCategoryStore();

  return (
    <section className="flex flex-wrap justify-center gap-6 md:gap-12">
      {categories.map((category: ICategory) => {
        if (category.id !== "combos" && category.id !== "snacks") {
          return (
            <Category
              key={category.id}
              icon={category.icon}
              title={category.title}
              color={category.color}
              onClick={() => selectCategory(category.id)}
            />
          )
        }
      }
      )}
    </section>
  )
}