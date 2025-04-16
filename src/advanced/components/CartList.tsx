import { Product, CartItem as CartItemType } from '../types';
import { CartItem } from './CartItem';

interface CartListProps {
  cartItems: CartItemType[];
  products: Product[];
  onChangeQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
}

export const CartList = ({
  cartItems,
  products,
  onChangeQuantity,
  onRemoveItem,
}: CartListProps) => {
  return (
    <div className="space-y-2">
      {cartItems.length === 0 ? (
        <p className="text-gray-400">장바구니가 비어 있습니다.</p>
      ) : (
        cartItems.map(item => {
          const product = products.find(p => p.id === item.productId);

          if (!product) return null;

          return (
            <CartItem
              key={item.productId}
              product={product}
              quantity={item.quantity}
              onChangeQuantity={onChangeQuantity}
              onRemove={onRemoveItem}
            />
          );
        })
      )}
    </div>
  );
};
