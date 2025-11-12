import { useState } from 'react';
import { ShoppingCart, CheckCircle, XCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface OrderFormProps {
  selectedProduct: string;
  selectedPrice: number;
}

export function OrderForm({ selectedProduct, selectedPrice }: OrderFormProps) {
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    product: selectedProduct,
    quantity: 1,
    notes: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) || 1 : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const totalPrice = selectedPrice * formData.quantity;

    try {
      const { error } = await supabase
        .from('orders')
        .insert({
          customer_name: formData.customerName,
          phone: formData.phone,
          email: formData.email,
          product: formData.product || selectedProduct,
          quantity: formData.quantity,
          total_price: totalPrice,
          notes: formData.notes,
          status: 'new'
        });

      if (error) throw error;

      setStatus('success');
      setFormData({
        customerName: '',
        phone: '',
        email: '',
        product: selectedProduct,
        quantity: 1,
        notes: ''
      });

      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    } catch (error) {
      setStatus('error');
      setErrorMessage('Произошла ошибка при отправке заказа. Попробуйте еще раз.');
      console.error('Error submitting order:', error);
    }
  };

  const totalPrice = selectedPrice * formData.quantity;

  return (
    <section id="order-form" className="py-20 px-4 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full mb-4">
            <ShoppingCart className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Оформить заказ
          </h2>
          <p className="text-xl text-gray-600">
            Заполните форму и получите скидку до 40%
          </p>
        </div>

        {status === 'success' && (
          <div className="mb-8 bg-green-50 border-2 border-green-500 rounded-xl p-6 flex items-start gap-4">
            <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-green-900 mb-2">
                Заказ успешно оформлен!
              </h3>
              <p className="text-green-700">
                Наш менеджер свяжется с вами в ближайшее время для подтверждения заказа.
              </p>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="mb-8 bg-red-50 border-2 border-red-500 rounded-xl p-6 flex items-start gap-4">
            <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-red-900 mb-2">
                Ошибка
              </h3>
              <p className="text-red-700">{errorMessage}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-gray-50 rounded-2xl shadow-xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="customerName" className="block text-sm font-semibold text-gray-700 mb-2">
                Имя и Фамилия *
              </label>
              <input
                type="text"
                id="customerName"
                name="customerName"
                required
                value={formData.customerName}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-orange-500 focus:outline-none transition-colors"
                placeholder="Иван Иванов"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                Телефон *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-orange-500 focus:outline-none transition-colors"
                placeholder="+7 (999) 123-45-67"
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-orange-500 focus:outline-none transition-colors"
              placeholder="ivan@example.com"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="product" className="block text-sm font-semibold text-gray-700 mb-2">
                Товар *
              </label>
              <input
                type="text"
                id="product"
                name="product"
                required
                value={formData.product}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-orange-500 focus:outline-none transition-colors"
                placeholder="Название товара"
              />
            </div>

            <div>
              <label htmlFor="quantity" className="block text-sm font-semibold text-gray-700 mb-2">
                Количество *
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                required
                min="1"
                max="99"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-orange-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="notes" className="block text-sm font-semibold text-gray-700 mb-2">
              Комментарий к заказу
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={4}
              value={formData.notes}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-orange-500 focus:outline-none transition-colors resize-none"
              placeholder="Дополнительные пожелания..."
            />
          </div>

          <div className="bg-white rounded-xl p-6 mb-6 border-2 border-orange-200">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700">Цена за единицу:</span>
              <span className="font-semibold text-gray-900">{selectedPrice}₽</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700">Количество:</span>
              <span className="font-semibold text-gray-900">{formData.quantity}</span>
            </div>
            <div className="border-t-2 border-gray-200 pt-2 mt-2">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">Итого:</span>
                <span className="text-2xl font-bold text-orange-600">{totalPrice}₽</span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-lg py-4 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]"
          >
            {status === 'loading' ? 'Отправка...' : 'Оформить заказ'}
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            * Обязательные поля для заполнения
          </p>
        </form>
      </div>
    </section>
  );
}
