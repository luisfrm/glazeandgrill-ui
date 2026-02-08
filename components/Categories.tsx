'use client'

import Category from './Category'
import useCategoryStore from '@/stores/useCategory'
import { ICategory } from '@/config/types'

export default function Categories() {
  const { categories, toggleCategory } = useCategoryStore();

  return (
    <section className="flex flex-wrap justify-center gap-6 md:gap-12">
      {categories.map((category: ICategory) => (
        <Category
          key={category.label}
          icon={category.icon}
          label={category.label}
          color={category.color}
          selected={category.selected}
          onClick={() => {
            toggleCategory(category.id)
          }}
        />
      ))}
    </section>
  )
}