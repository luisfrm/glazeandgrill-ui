// components/catalog/ProductCatalog.tsx
'use client'

import { useState, useRef, useEffect } from 'react'
import { IProduct, ICatalog, ICategory } from '@/config/types'
import ProductCard from './ProductCard'
import ProductDetail from './ProductDetail'
import { cn } from '@/helper/helper'
import { Beef, Cake, Croissant, Hamburger, IceCream, Martini, Pizza } from 'lucide-react'
import useCategoryStore from '@/stores/useCategory'

interface ProductCatalogProps {
  catalog: ICatalog
  showCatalogHeader?: boolean // Nueva prop opcional
}

const icons: Record<string, React.ReactNode> = {
  burger: <Hamburger />,
  cake: <Cake />,
  bakery: <Croissant />,
  local_bar: <Martini />,
  icecream: <IceCream />,
  restaurant: <Beef />,
  fastfood: <Pizza />,
}

export default function ProductCatalog({
  catalog,
  showCatalogHeader = false
}: ProductCatalogProps) {
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { selectedCategory } = useCategoryStore();

  useEffect(() => {
    if (containerRef.current) {
      const scrollableParent = containerRef.current.closest('.overflow-y-auto')
      if (scrollableParent) {
        scrollableParent.scrollTo({ top: 0, behavior: 'instant' })
      }
    }
  }, [selectedProduct])

  const handleSelectProduct = (product: IProduct) => {
    setSelectedProduct(product)
  }

  const handleBack = () => {
    setSelectedProduct(null)
  }

  return (
    <div ref={containerRef} className="w-full h-full">
      {/* Vista de Catálogo */}
      {!selectedProduct && (
        <div className="w-full h-full flex flex-col space-y-12">
          {/* Header del Catálogo (Opcional) */}
          {showCatalogHeader && (
            <div className="text-center pb-6 border-b border-gray-200">
              <h2 className="text-3xl font-800 text-gray-900 mb-2">
                {catalog.title}
              </h2>
              <p className="text-gray-600">
                {catalog.subtitle}
              </p>
            </div>
          )}

          {/* Categorías */}
          {
            selectedCategory ? (
              <ProductCatalogItem key={selectedCategory.id} category={selectedCategory} index={0} handleSelectProduct={handleSelectProduct} />
            ) : (
              catalog.categories.map((category: ICategory, index: number) => (
                <ProductCatalogItem key={category.id} category={category} index={index} handleSelectProduct={handleSelectProduct} />
              ))
            )
          }

          {/* Estado vacío */}
          {catalog.categories.length === 0 && (
            <div className="flex flex-col items-center justify-center h-64 space-y-4">
              <span className="material-symbols-outlined text-gray-300 text-6xl">
                shopping_cart
              </span>
              <p className="text-gray-400 text-lg">
                No hay categorías disponibles
              </p>
            </div>
          )}
        </div>
      )}

      {/* Vista de Detalle */}
      {selectedProduct && (
        <ProductDetail product={selectedProduct} onBack={handleBack} />
      )}
    </div>
  )
}

interface ProductCatalogItemProps {
  category: ICategory
  index: number
  handleSelectProduct: (product: IProduct) => void
}

const ProductCatalogItem = ({ category, index, handleSelectProduct }: ProductCatalogItemProps) => {

  return (
    <section
      key={category.id}
      className={cn(
        'space-y-6',
        index > 0 && 'pt-6 border-t border-gray-100'
      )}
    >
      {/* Header de la Categoría */}
      <div className="flex items-center gap-4">
        <div className={cn(
          'w-12 h-12 rounded-full flex items-center justify-center shrink-0',
          category.color === 'sweet' && 'bg-pink-100 text-pink-500',
          category.color === 'orange' && 'bg-orange-100 text-orange-500',
          category.color === 'amber' && 'bg-amber-100 text-amber-600',
          category.color === 'emerald' && 'bg-emerald-100 text-emerald-600',
          category.color === 'rose' && 'bg-rose-100 text-rose-500',
        )}>
          <span className="text-2xl">
            {
              icons[category.icon]
            }
          </span>
        </div>
        <div>
          <h3 className="text-2xl font-800 text-gray-900">
            {category.title}
          </h3>
          <p className="text-sm text-gray-500">
            {category.subtitle}
          </p>
        </div>
      </div>

      {/* Grid de Productos */}
      {category.products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {category.products.map((product: IProduct) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={handleSelectProduct}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-sm italic">
          No hay productos disponibles en esta categoría
        </p>
      )}
    </section>
  )
}