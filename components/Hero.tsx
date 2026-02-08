import Image from 'next/image';
import hero_bg from '@/assets/hero_bg.png';

const hero = {
	special_text: 'Especiales de hoy',
	order_now_text: 'Ordena ahora',
	title: ['Sabor', 'Extraordinario'],
  subtitle: 'Descubre delicias irresistibles hechas con pasión y los mejores ingredientes.',
};

const Hero = () => {
	return (
		<section className="relative w-full h-100 rounded-2xl overflow-hidden shadow-2xl">
			<Image src={hero_bg} alt="Exquisite layered cake with roses" fill className="object-cover" priority />
			<div className="absolute inset-0 bg-black/30 flex flex-col justify-center px-8 md:px-16">
				{/* Contenido del hero */}
				<span className="inline-block bg-sweet text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full w-fit mb-6">
					{hero.special_text}
				</span>
				<h2 className="text-2xl md:text-3xl font-800 text-white mb-6 leading-tight max-w-2xl">
					{hero.title.map((line, idx) => (
						<span key={idx}>
							{line}
							{idx < hero.title.length - 1 && <br />}
						</span>
					))}
				</h2>
        <p className="text-lg md:text-xl text-white/90 mb-10 max-w-lg">
          {hero.subtitle}
        </p>
				<button className="bg-sweet hover:bg-sweet/90 text-white font-bold px-10 py-4 rounded-full w-fit transition-all duration-200 shadow-lg">
					<span>{hero.order_now_text}</span>
				</button>
			</div>
		</section>
	);
};

export default Hero;
