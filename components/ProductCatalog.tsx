// components/catalog/ProductCatalog.tsx
'use client'

import { useState } from 'react'
import { IProduct, ICatalog } from '@/config/types'
import ProductCard from './ProductCard'
import ProductDetail from './ProductDetail'
import { cn } from '@/helper/helper'

interface ProductCatalogProps {
    catalog: ICatalog
}

export default function ProductCatalog({ catalog }: ProductCatalogProps) {
    const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null)

    const handleSelectProduct = (product: IProduct) => {
        setSelectedProduct(product)
    }

    const handleBack = () => {
        setSelectedProduct(null)
    }

    return (
        <div className="w-full h-full">
            {/* Vista de Catálogo (Grid) */}
            {!selectedProduct && (
                <div className="w-full h-full flex flex-col">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {catalog.products.map((product: IProduct) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onSelect={handleSelectProduct}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Vista de Detalle */}
            {selectedProduct && (
                <ProductDetail product={selectedProduct} onBack={handleBack} />
            )}
        </div>
    )
}