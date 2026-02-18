// components/catalog/ProductCard.tsx
'use client'

import { IProduct } from '@/config/types'
import Image from 'next/image'
import { Plus } from 'lucide-react'
import { cn } from '@/helper/helper'

interface ProductCardProps {
    product: IProduct
    onSelect: (product: IProduct) => void
}

const badgeColors = {
    primary: 'bg-primary text-white',
    emerald: 'bg-emerald-500 text-white',
    orange: 'bg-orange-500 text-white',
}

export default function ProductCard({ product, onSelect }: ProductCardProps) {
    return (
        <div
            className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer"
            onClick={() => onSelect(product)}
        >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {product.badge && (
                    <div className="absolute top-2 right-2">
                        <span
                            className={cn(
                                'text-[10px] font-bold px-2 py-1 rounded-full shadow-sm',
                                badgeColors[product.badgeColor || 'primary']
                            )}
                        >
                            {product.badge}
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-1">
                <h5 className="font-800 text-gray-900 mb-1">{product.name}</h5>
                <p className="text-xs text-gray-500 mb-4 line-clamp-2">
                    {product.description}
                </p>

                <div className="mt-auto flex items-center justify-between">
                    <span className="text-primary font-800">${product.price.toFixed(2)}</span>
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            // Handle add to cart
                        }}
                        className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center hover:scale-110 transition-transform"
                    >
                        <Plus size={16} />
                    </button>
                </div>
            </div>
        </div>
    )
}