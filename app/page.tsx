import Categories from '@/components/Categories';
import Hero from '@/components/Hero';
import Menu from '@/components/Menu';
import { cn } from '@/helper/helper';

export default function Home() {
  return (
    <section className={cn('min-h-screen bg-cream')}>
      <main className="max-w-5xl flex flex-col mx-auto px-6 pt-28 pb-8 space-y-12">
        <Hero />
        <Categories />
        <Menu />
      </main>
    </section>
  );
}
