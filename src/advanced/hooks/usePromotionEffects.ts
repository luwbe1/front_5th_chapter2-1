import { useEffect } from 'react';
import { Product } from '../types';

interface UsePromotionEffectsProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  lastSelectedProductId: string;
}

export const usePromotionEffects = ({
  products,
  setProducts,
  lastSelectedProductId,
}: UsePromotionEffectsProps) => {
  // 번개세일
  useEffect(() => {
    const delay = Math.random() * 10000;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setProducts(prev => {
          const index = Math.floor(Math.random() * prev.length);
          const luckyItem = prev[index];

          if (Math.random() < 0.3 && luckyItem.quantity > 0) {
            alert(`번개세일! ${luckyItem.name}이(가) 20% 할인 중입니다!`);
            const updated = [...prev];
            updated[index] = {
              ...luckyItem,
              price: Math.round(luckyItem.price * 0.8),
            };
            return updated;
          }

          return prev;
        });
      }, 30000);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [setProducts]);

  // 추천세일
  useEffect(() => {
    if (!lastSelectedProductId) return;

    const delay = Math.random() * 20000;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setProducts(prev => {
          const suggestion = prev.find(
            p => p.id !== lastSelectedProductId && p.quantity > 0
          );

          if (suggestion) {
            alert(
              `${suggestion.name}은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!`
            );
            return prev.map(p =>
              p.id === suggestion.id
                ? { ...p, price: Math.round(p.price * 0.95) }
                : p
            );
          }

          return prev;
        });
      }, 60000);
    }, delay);

    return () => clearTimeout(timer);
  }, [lastSelectedProductId, setProducts]);
};
