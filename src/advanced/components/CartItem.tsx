import { Product } from '../types';
import { ButtonGroup } from './ButtonGroup';

interface CartItemProps {
  product: Product;
  quantity: number;
  onChangeQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

export const CartItem = ({
  product,
  quantity,
  onChangeQuantity,
  onRemove,
}: CartItemProps) => {
  return (
    <div className="flex justify-between items-center mb-2">
      <span>
        {product.name} - {product.price.toLocaleString()}원 x {quantity}
      </span>

      <ButtonGroup
        productId={product.id}
        onChangeQuantity={onChangeQuantity}
        onRemove={onRemove}
      />
    </div>
  );
};
