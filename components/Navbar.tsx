'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/helper/helper';
import Icon from './Icon';

const navItems = [
	{ label: 'Inicio', href: '#', active: true },
	{ label: 'Menu', href: '#', active: false },
	{ label: 'Ofertas', href: '#', active: false },
	{ label: 'Sobre nosotros', href: '#', active: false },
];

const header = {
	title: 'Restaurante Veritas',
};

export default function Navbar() {
	const [cartCount] = useState(2);

	return (
		<header className="fixed top-0 w-full z-50 bg-cream/80 backdrop-blur-md px-6 py-4 flex items-center justify-between">
			{/* Left Section */}
			<div className="flex items-center gap-4">
				<button className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full lg:hidden cursor-pointer">
					<Icon changeOnHover>menu</Icon>
				</button>
				<Link href="/" className="text-xl font-bold">
          <h1 className="text-2xl font-800 tracking-tight text-gray-900 cursor-pointer">{header.title}</h1>
        </Link>
			</div>

			{/* Center Navigation - Desktop */}
			<nav className="hidden lg:flex items-center gap-8 font-medium">
				{navItems.map(item => (
					<NavItem item={item} key={item.label} />
				))}
			</nav>

			{/* Right Section */}
			<div className="flex items-center gap-4">
				<button className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full cursor-pointer">
					<Icon changeOnHover>search</Icon>
				</button>

				<button className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full relative cursor-pointer">
					<Icon changeOnHover>shopping_bag</Icon>
					{cartCount > 0 && (
						<span className="absolute top-1 right-1 bg-black text-white dark:bg-primary text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
							{cartCount}
						</span>
					)}
				</button>

				<button className="hidden md:flex items-center gap-2 p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full cursor-pointer">
					<Icon changeOnHover>account_circle</Icon>
				</button>
			</div>
		</header>
	);
}

const NavItem = ({ item }: { item: { label: string; href: string; active: boolean } }) => {
	return (
		<Link
			key={item.label}
			href={item.href}
			className={
        cn(
          "hover:scale-105 transition-all",
          item.active ? "underline underline-offset-6 text-sweet hover:text-sweet/70" : "text-gray-900 hover:text-gray-700"
        )
			}
		>
			{item.label}
		</Link>
	);
};
