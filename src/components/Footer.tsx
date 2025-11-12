import { Dumbbell, Phone, Mail, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Dumbbell className="w-8 h-8 text-orange-500" />
              <span className="text-xl font-bold">FitPro</span>
            </div>
            <p className="text-gray-400">
              Профессиональное спортивное питание и биодобавки для достижения ваших целей
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Контакты</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400">
                <Phone className="w-5 h-5 text-orange-500" />
                <span>+7 (495) 642-87-39</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Mail className="w-5 h-5 text-orange-500" />
                <span>order@fitpro.ru</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <MapPin className="w-5 h-5 text-orange-500" />
                <span>Москва, ул. Ленинская Слобода, 19</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Режим работы</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Пн-Пт: 9:00 - 21:00</li>
              <li>Сб-Вс: 10:00 - 20:00</li>
              <li className="text-orange-500 font-semibold">Онлайн заказы 24/7</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2024 FitPro. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}
