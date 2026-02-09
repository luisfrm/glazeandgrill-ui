'use client';

import { cn } from '@/helper/helper';
import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';
import { useRipple } from '@/hooks/useRipple';

interface MenuCardProps {
	image: string;
	alt: string;
	title: string;
	subtitle?: string;
	badge?: string;
	badgeType?: 'primary' | 'glass';
	cta?: string;
	variant: 'small' | 'large' | 'extra-large';
}

const variantClasses = {
	small: '',
	large: 'md:row-span-2',
	'extra-large': 'md:col-span-2',
};

const overlayClasses = {
	small: 'bg-black/40',
	large: 'bg-gradient-to-t from-black/80 via-transparent to-transparent',
	'extra-large': 'bg-gradient-to-r from-black/80 to-transparent',
};

const contentPositionClasses = {
	small: 'justify-end p-6',
	large: 'justify-end p-8',
	'extra-large': 'justify-center p-12',
};

export default function MenuCard({
	image,
	alt,
	title,
	subtitle,
	badge,
	badgeType = 'primary',
	cta,
	variant,
}: MenuCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { rippleHandlers, RippleEffect } = useRipple(cardRef)

	return (
		<div
			ref={cardRef}
			className={cn('relative min-h-58 group overflow-hidden rounded-2xl h-full cursor-pointer', variantClasses[variant])}
			{...rippleHandlers}
		>
			<Image
				src={image}
				fill
				alt={alt}
				className="w-full h-full object-cover transition-transform duration-700 group-active:scale-110 group-hover:scale-110 pointer-events-none"
			/>

			<RippleEffect />

			{/* Overlay con contenido */}
			<div
				className={cn(
					'absolute inset-0 flex flex-col pointer-events-none',
					overlayClasses[variant],
					contentPositionClasses[variant],
				)}
			>
				{badge && variant === 'extra-large' && (
					<span className="bg-primary text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full w-fit mb-4">
						{badge}
					</span>
				)}

				{/* Título */}
				{variant === 'extra-large' ? (
					<h4 className="text-4xl font-800 text-white mb-6 leading-tight">
						Family <br />
						Combos
					</h4>
				) : (
					<h4 className={cn('font-bold text-white', variant === 'large' ? 'text-2xl mb-1' : 'text-xl')}>{title}</h4>
				)}

				{/* Subtítulo (solo para large) */}
				{subtitle && variant === 'large' && (
					<p className="text-white/70 text-sm uppercase tracking-widest font-bold">{subtitle}</p>
				)}

				{/* Badge inferior (para small con tipo glass) */}
				{badge && variant === 'small' && badgeType === 'glass' && (
					<span className="bg-white/20 backdrop-blur-md text-white text-[10px] px-3 py-1 rounded-full w-fit mt-2">
						{badge}
					</span>
				)}

				{/* CTA (solo para extra-large) */}
				{cta && variant === 'extra-large' && (
					<Link
						href="#"
						className="text-white font-bold underline underline-offset-8 hover:text-primary transition-colors pointer-events-auto"
					>
						{cta}
					</Link>
				)}
			</div>
		</div>
	);
}
