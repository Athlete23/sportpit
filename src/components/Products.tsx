import { Flame, Zap, Shield, Heart } from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'Протеин Whey Premium',
    description: 'Высококачественный сывороточный протеин для роста мышц',
    price: 2499,
    oldPrice: 3999,
    discount: '-38%',
    icon: Flame,
    features: ['25г белка', 'Быстрое усвоение', 'Без сахара']
  },
  {
    id: 2,
    name: 'BCAA Energy Boost',
    description: 'Аминокислоты для восстановления и энергии',
    price: 1799,
    oldPrice: 2999,
    discount: '-40%',
    icon: Zap,
    features: ['2:1:1 формула', 'Повышает энергию', 'Ускоряет восстановление']
  },
  {
    id: 3,
    name: 'Креатин Моногидрат',
    description: 'Увеличивает силу и выносливость',
    price: 1299,
    oldPrice: 1999,
    discount: '-35%',
    icon: Shield,
    features: ['Чистый моногидрат', 'Проверенная формула', 'Без добавок']
  },
  {
    id: 4,
    name: 'Витамины Omega-3',
    description: 'Поддержка сердца и общего здоровья',
    price: 999,
    oldPrice: 1599,
    discount: '-38%',
    icon: Heart,
    features: ['EPA & DHA', 'Очищенное масло', '90 капсул']
  }
];

interface ProductsProps {
  onProductSelect: (productName: string, price: number) => void;
}

export function Products({ onProductSelect }: ProductsProps) {
  const handleOrder = (productName: string, price: number) => {
    onProductSelect(productName, price);
    document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Хиты продаж по акции
          </h2>
          <p className="text-xl text-gray-600">
            Лучшие продукты для ваших спортивных целей
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => {
            const Icon = product.icon;
            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
              >
                <div className="bg-gradient-to-br from-orange-400 to-red-500 p-8 text-white">
                  <div className="flex justify-between items-start mb-4">
                    <Icon className="w-12 h-12" />
                    <span className="bg-yellow-400 text-red-600 font-bold px-3 py-1 rounded-full text-sm">
                      {product.discount}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                  <p className="text-sm text-white/90">{product.description}</p>
                </div>

                <div className="p-6">
                  <ul className="space-y-2 mb-6">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="mb-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-gray-900">
                        {product.price}₽
                      </span>
                      <span className="text-lg text-gray-400 line-through">
                        {product.oldPrice}₽
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleOrder(product.name, product.price)}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-3 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Заказать
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
