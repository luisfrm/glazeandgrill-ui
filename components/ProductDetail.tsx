// components/catalog/ProductDetail.tsx
'use client'

import { useState } from 'react'
import { IProduct } from '@/config/types'
import Image from 'next/image'
import { ArrowLeft, Heart, Minus, Plus, ShoppingCart, X } from 'lucide-react'
import { cn } from '@/helper/helper'

interface ProductDetailProps {
    product: IProduct
    onBack: () => void
}

const badgeColors = {
    primary: 'bg-orange-100 text-orange-600',
    emerald: 'bg-emerald-100 text-emerald-600',
    orange: 'bg-orange-100 text-orange-600',
}

export default function ProductDetail({ product, onBack }: ProductDetailProps) {
    const [quantity, setQuantity] = useState(1)
    const [isFavorite, setIsFavorite] = useState(false)

    const handleIncrement = () => setQuantity((prev) => prev + 1)
    const handleDecrement = () => setQuantity((prev) => Math.max(1, prev - 1))

    return (
        <div className="w-full h-full flex flex-col md:flex-row">
            {/* Image Section */}
            <div className="w-full md:w-1/2 relative bg-gray-100 h-64 md:h-auto">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                />
                <button
                    onClick={onBack}
                    className="absolute top-6 left-6 bg-white/80 backdrop-blur-md p-2 rounded-full hover:bg-white transition-colors"
                >
                    <ArrowLeft size={20} className="text-gray-800" />
                </button>
            </div>

            {/* Content Section */}
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            {product.badge && (
                                <span
                                    className={cn(
                                        'text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter',
                                        badgeColors[product.badgeColor || 'primary']
                                    )}
                                >
                                    {product.badge}
                                </span>
                            )}
                            {product.rating && (
                                <div className="flex items-center">
                                    <span className="text-yellow-400 text-sm">★</span>
                                    <span className="text-sm font-semibold ml-1">
                                        {product.rating}
                                    </span>
                                </div>
                            )}
                        </div>
                        <h2 className="text-4xl font-800 text-gray-900 mb-2 leading-tight">
                            {product.name}
                        </h2>
                        <p className="text-primary text-2xl font-bold">
                            ${product.price.toFixed(2)}
                        </p>
                    </div>

                    <button
                        onClick={() => setIsFavorite(!isFavorite)}
                        className="p-2 rounded-full border border-gray-200 hover:bg-gray-50"
                    >
                        <Heart
                            size={20}
                            className={cn(
                                'text-gray-500',
                                isFavorite ? 'fill-red-500 text-red-500' : ''
                            )}
                        />
                    </button>
                </div>

                {/* Ingredients */}
                <div className="mb-8">
                    <h3 className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-widest">
                        Ingredientes
                    </h3>
                    <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                        {product.ingredients.map((ingredient, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                                <span className="text-sm text-gray-600">{ingredient}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quantity */}
                <div className="mb-8">
                    <h3 className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-widest">
                        Cantidad
                    </h3>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center bg-gray-100 rounded-full px-2 py-1">
                            <button
                                onClick={handleDecrement}
                                className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-primary transition-colors"
                            >
                                <Minus size={18} />
                            </button>
                            <span className="w-10 text-center font-bold text-gray-900">
                                {quantity}
                            </span>
                            <button
                                onClick={handleIncrement}
                                className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-primary transition-colors"
                            >
                                <Plus size={18} />
                            </button>
                        </div>
                        {product.calories && (
                            <p className="text-xs text-gray-500">
                                Calorias:{' '}
                                <span className="font-semibold text-gray-700">
                                    {product.calories} kcal
                                </span>
                            </p>
                        )}
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-auto flex gap-4">
                    <button className="flex-1 bg-sweet hover:bg-primary/90 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-all transform active:scale-[0.98] shadow-lg shadow-primary/20">
                        <ShoppingCart size={20} />
                        Agregar al carrito
                    </button>
                    <button
                        onClick={onBack}
                        className="bg-gray-100 hover:bg-gray-200 p-4 rounded-xl flex items-center justify-center transition-colors"
                    >
                        <X size={20} className="text-gray-700" />
                    </button>
                </div>
            </div>
        </div>
    )
}