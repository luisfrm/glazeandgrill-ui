'use client  '

import { cn } from '@/helper/helper'
import { useRef } from 'react';
import { useRipple } from '@/hooks/useRipple';
import { Cake, Croissant, Hamburger, IceCreamCone, Martini } from 'lucide-react';

interface CategoryCardProps {
  icon: string
  title: string
  color: 'sweet' | 'orange' | 'amber' | 'emerald' | 'rose',
  selected?: boolean,
  onClick?: () => void
}

const colorClasses = {
  sweet: {
    bg: 'bg-pink-200 border-pink-200',
    text: 'text-pink-500',
    hover: 'group-hover:bg-pink-300/50 group-hover:border-pink-500',
  },
  orange: {
    bg: 'bg-orange-100 border-orange-100',
    text: 'text-orange-500',
    hover: 'group-hover:bg-orange-100/20 group-hover:border-orange-500',
  },
  amber: {
    bg: 'bg-amber-100 border-amber-100',
    text: 'text-amber-600',
    hover: 'group-hover:bg-amber-100/10 group-hover:border-amber-600',
  },
  emerald: {
    bg: 'bg-emerald-100 border-emerald-100',
    text: 'text-emerald-600',
    hover: 'group-hover:bg-emerald-100/50 group-hover:border-emerald-600',
  },
  rose: {
    bg: 'bg-rose-100 border-rose-100',
    text: 'text-rose-500',
    hover: 'group-hover:bg-rose-100/50 group-hover:border-rose-500',
  },
}

export default function Category({ icon, title, color, onClick }: CategoryCardProps) {
  const colors = colorClasses[color]

  const categoryRef = useRef<HTMLDivElement>(null)
  const { rippleHandlers, RippleEffect } = useRipple(categoryRef)

  const icons = {
    cake: <Cake className={colors.text} />,
    burger: <Hamburger className={colors.text} />,
    bakery: <Croissant className={colors.text} />,
    local_bar: <Martini className={colors.text} />,
    icecream: <IceCreamCone className={colors.text} />,
  }

  return (
    <div className="flex flex-col items-center gap-3 group cursor-pointer" onClick={onClick}>
      <div
        ref={categoryRef}
        className={cn(
          'relative overflow-hidden w-20 h-20 rounded-full border-2 flex items-center justify-center transition-all duration-300',
          'group-active:scale-95',
          colors.bg,
          colors.hover,
        )}
        {...rippleHandlers}
      >
        {icons[icon as keyof typeof icons]}
        <RippleEffect />
      </div>
      <span className="font-bold text-sm">{title}</span>
    </div>
  )
}