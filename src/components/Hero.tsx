import { Dumbbell } from 'lucide-react';

export function Hero() {
  const scrollToForm = () => {
    document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative bg-gradient-to-br from-orange-500 via-red-500 to-red-600 text-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 bg-white/10 backdrop-blur-sm p-4 rounded-2xl">
            <Dumbbell className="w-16 h-16" />
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Спортивное Питание<br />
            <span className="text-yellow-300">Премиум Качества</span>
          </h1>

          <p className="text-xl md:text-2xl mb-4 max-w-2xl text-white/90">
            Достигай своих целей быстрее с профессиональными добавками
          </p>

          <div className="bg-yellow-400 text-red-600 font-bold text-2xl px-8 py-4 rounded-lg mb-8 shadow-2xl transform rotate-1">
            🔥 АКЦИЯ: Скидка до 40%
          </div>

          <button
            onClick={scrollToForm}
            className="bg-white text-red-600 font-bold text-lg px-12 py-4 rounded-full hover:bg-yellow-400 hover:text-red-700 transition-all duration-300 shadow-2xl transform hover:scale-105"
          >
            Заказать со скидкой
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
}
