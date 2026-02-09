'use client';

import useCategoryStore from '@/stores/useCategory';
import Link from 'next/link';
import Icon from './Icon';
import MenuCard from './MenuCard';

const Menu = () => {
	const { categories } = useCategoryStore();
	const selectedCategory = categories.find(category => category.selected) || categories[0];

	return (
		<section className="flex flex-col gap-6">
			<div className="flex justify-between items-end">
				<h3 className="text-3xl font-800">Explora nuestro menu</h3>
				<Link href="#" className="text-primary font-bold flex items-center gap-1 hover:gap-2 transition-all">
					View All <Icon>arrow_forward</Icon>
				</Link>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-auto md:h-150">
				{/* Card 1 - Burgers (Grande - 2 filas) */}
				<MenuCard
					image="https://lh3.googleusercontent.com/aida-public/AB6AXuBdfcZ28n1UP8eiyxAl2jy_A04xnpDf9U1agZtuDh4m5xHyHAHVQFDXAeoIuZ-HUamnM3ZXo01awMIsQumH9BVeEGbTNH9YfMeGp5owjvrY2u49iM9GNkLM5Ldn5v4u4QwuzG-tXTTSjQJzEc219T-szOOPlI61GnznGEcHY0OIvfMNm6MMXKdRLrvIXVgb7CFaL8Us4gi_1lMtHDywL5yL_hTi1Jwxd2K9rvrEp-AkRN8Zur9Nt_qAn5SxFzdiWAogOhhk4Fo0h58"
					alt="Delicious double cheese burger"
					title="Burgers"
					subtitle="Gourmet Selection"
					variant="large"
				/>

				{/* Card 2 - Daily Breads (Pequeña con badge glass) */}
				<MenuCard
					image="https://lh3.googleusercontent.com/aida-public/AB6AXuBAE4WCpVRjJ2w-l1NNUfUgnZ41Iq2fn70OTDZIabS_HeHvdkF17H9kEDCljZp-h0uc8VtR6eCtR5S6z9uWh7YifjIbKJppX7dt568Ilk9nyKudMsIDUO6a_Ok5AJQphhFIOM4qyHzfd2OyhV67XB-BnoGK0jLuXHsnLs-nIJ_xEM92I3g76hPZGbnaWyK9b1D6eGwbIPitwi69HPFzuF7nGGKywwhhSK7u6Fvp4jZeKMY4R-fAIvvtkski1eqAcVa8cAZY8p9DFGg"
					alt="Fresh artisan sourdough bread"
					title="Daily Breads"
					badge="Organic"
					badgeType="glass"
					variant="small"
				/>

				{/* Card 3 - Iced Drinks (Pequeña sin badge) */}
				<MenuCard
					image="https://lh3.googleusercontent.com/aida-public/AB6AXuBj96tFGgGXpZy3HDhjeG2DaUDWXuqcDuhPKrKkxgPOGSAT-tN6B6zJObd5E87RUnk8iXuyJTrG2aGO59vZVaC7mAUkkso3dXISA64emclE7BbFFvYN1C_U9x8tE39vlcqgZp4lh8iI6ZGwUgizCl2CPLnHvT9uiuuCcqWkO6t6rPBcUPB5SH4UDl9vB3sK9_1k7pqiI_nQkRFYnNnHi3AzrFZqi7pXEI4W0B4yMwC3mgTTpjk0bg9i0qTY99STLL0W8UlDuByZhEU"
					alt="Refreshing iced mint drink"
					title="Iced Drinks"
					variant="small"
				/>

				{/* Card 4 - Family Combos (Extra grande - 2 columnas) */}
				<MenuCard
					image="https://lh3.googleusercontent.com/aida-public/AB6AXuAEoXzrL31KpXUK9BybW0mvI-3RxWZWNKh_q9CEzNSeRjzu4YLao4idxgN_HG-SghYBsqw20np-65QsUgjI-uJUrm6rprj7--xkKpcx25-6Zpfe1E6Kl87chyXTWhw1yprO7raYD-7nHjQMh6frJQ8Ci_9lAxvrLqX-2nlncSrlj_Szos-EolFrWWkD_TDO4NIMspwGH8DhMGdEVXAIFc_KjVxwfq-iLe0tPeQn4zPJwXZZJLzhD09bUsmtxKldYgiMyv4xkXDPlTg"
					alt="Family meal with burgers, fries and nuggets"
					title="Family Combos"
					badge="Value Deals"
					badgeType="primary"
					cta="Browse Offers"
					variant="extra-large"
				/>
			</div>
		</section>
	);
};

export default Menu;
