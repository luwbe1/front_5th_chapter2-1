import { Product } from '../types';

interface ProductSelectProps {
  products: Product[];
  selectedId: string;
  onChange: (id: string) => void;
  onAddToCart: (id: string) => void;
}

export const ProductSelect = ({
  products,
  selectedId,
  onChange,
  onAddToCart,
}: ProductSelectProps) => {
  return (
    <div>
      <select
        value={selectedId}
        onChange={e => onChange(e.target.value)}
        className="border rounded p-2 flex-1 mr-2"
      >
        <option value="">상품 선택</option>
        {products.map(p => (
          <option key={p.id} value={p.id} disabled={p.quantity === 0}>
            {p.name} - {p.quantity === 0 ? '품절' : `${p.price}원`}
          </option>
        ))}
      </select>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => onAddToCart(selectedId)}
        disabled={!selectedId}
      >
        추가
      </button>
    </div>
  );
};
