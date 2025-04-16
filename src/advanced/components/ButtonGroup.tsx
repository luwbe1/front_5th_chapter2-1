interface ButtonGroupProps {
  productId: string;
  onChangeQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

export const ButtonGroup = ({
  productId,
  onChangeQuantity,
  onRemove,
}: ButtonGroupProps) => {
  return (
    <div>
      <button
        className="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
        onClick={() => onChangeQuantity(productId, -1)}
      >
        -
      </button>
      <button
        className="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
        onClick={() => onChangeQuantity(productId, 1)}
      >
        +
      </button>
      <button
        className="remove-item bg-red-500 text-white px-2 py-1 rounded"
        onClick={() => onRemove(productId)}
      >
        삭제
      </button>
    </div>
  );
};
