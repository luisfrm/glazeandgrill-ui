'use client  '

// components/cards/CategoryCard.tsx
import Icon from './Icon'
import { cn } from '@/helper/helper'

interface CategoryCardProps {
  icon: string
  label: string
  color: 'sweet' | 'orange' | 'amber' | 'emerald' | 'rose',
  selected: boolean,
  onClick?: () => void
}

const colorClasses = {
  sweet: {
    bg: 'bg-pink-200 border-pink-200',
    text: 'text-pink-500',
    hover: 'group-hover:bg-pink-300/50 group-hover:border-pink-500',
    selected: 'bg-pink-300/50 border-pink-500',
  },
  orange: {
    bg: 'bg-orange-100 border-orange-100',
    text: 'text-orange-500',
    hover: 'group-hover:bg-orange-100/20 group-hover:border-orange-500',
    selected: 'bg-orange-100/20 border-orange-500',
  },
  amber: {
    bg: 'bg-amber-100 border-amber-100',
    text: 'text-amber-600',
    hover: 'group-hover:bg-amber-100/10 group-hover:border-amber-600',
    selected: 'bg-amber-100/10 border-amber-600',
  },
  emerald: {
    bg: 'bg-emerald-100 border-emerald-100',
    text: 'text-emerald-600',
    hover: 'group-hover:bg-emerald-100/50 group-hover:border-emerald-600',
    selected: 'bg-emerald-100/50 border-emerald-600',
  },
  rose: {
    bg: 'bg-rose-100 border-rose-100',
    text: 'text-rose-500',
    hover: 'group-hover:bg-rose-100/50 group-hover:border-rose-500',
    selected: 'bg-rose-100/50 border-rose-500',
  },
}

export default function Category({ icon, label, color, selected = false, onClick }: CategoryCardProps) {
  const colors = colorClasses[color]

  return (
    <div className="flex flex-col items-center gap-3 group cursor-pointer" onClick={onClick}>
      <div
        className={cn(
          'w-20 h-20 rounded-full border-2 flex items-center justify-center transition-all duration-300',
          colors.bg,
          colors.hover,
          selected ? colors.selected : '',
        )}
      >
        <Icon className={`text-3xl ${colors.text}`}>{icon}</Icon>
      </div>
      <span className="font-bold text-sm">{label}</span>
    </div>
  )
}