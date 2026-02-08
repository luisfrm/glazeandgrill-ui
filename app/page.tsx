import Categories from '@/components/Categories';
import Hero from '@/components/Hero';

export default function Home() {
	return (
		<section className='min-h-screen bg-cream'>
			<main className="max-w-5xl flex flex-col mx-auto px-6 pt-28 pb-8 space-y-12">
				<Hero />
        <Categories />
			</main>
		</section>
	);
}
