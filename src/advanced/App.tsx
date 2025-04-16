import { useState } from 'react';
import { ProductSelect } from './components/ProductSelect';
import { CartList } from './components/CartList';
import { Summary } from './components/Summary';
import { Product, CartItem } from './types';
import { usePromotionEffects } from './hooks/usePromotionEffects';

const mockProducts: Product[] = [
  { id: 'p1', name: '상품1', price: 10000, quantity: 50 },
  { id: 'p2', name: '상품2', price: 20000, quantity: 30 },
  { id: 'p3', name: '상품3', price: 30000, quantity: 20 },
  { id: 'p4', name: '상품4', price: 15000, quantity: 0 },
  { id: 'p5', name: '상품5', price: 25000, quantity: 10 },
];

const App = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string>('');

  usePromotionEffects({
    products,
    setProducts,
    lastSelectedProductId: selectedProductId,
  });

  const getStockInfoMessage = (products: Product[]) => {
    return products
      .filter(p => p.quantity <= 5)
      .map(
        p =>
          `${p.name}: ${
            p.quantity > 0 ? `재고 부족 (${p.quantity}개 남음)` : '품절'
          }`
      )
      .join('\n');
  };

  const handleAddToCart = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existing = cartItems.find(item => item.productId === productId);

    if (existing) {
      if (product.quantity <= 0) {
        alert('재고가 부족합니다.');
        return;
      }

      setCartItems(prev =>
        prev.map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems(prev => [...prev, { productId, quantity: 1 }]);
    }

    // 재고 감소
    setProducts(prev =>
      prev.map(p =>
        p.id === productId ? { ...p, quantity: p.quantity - 1 } : p
      )
    );

    setSelectedProductId('');
  };

  const handleChangeQuantity = (productId: string, delta: number) => {
    const product = products.find(p => p.id === productId);
    const cartItem = cartItems.find(item => item.productId === productId);

    if (!product || !cartItem) return;

    const newQuantity = cartItem.quantity + delta;

    // 수량 증가 시, 재고 확인
    if (delta > 0 && product.quantity < 1) {
      alert('재고가 부족합니다.');
      return;
    }

    if (newQuantity <= 0) {
      handleRemoveItem(productId);
      return;
    }

    // 수량 변경
    setCartItems(prev =>
      prev.map(item =>
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      )
    );

    // 재고 복구 또는 감소
    setProducts(prev =>
      prev.map(p =>
        p.id === productId ? { ...p, quantity: p.quantity - delta } : p
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    const cartItem = cartItems.find(item => item.productId === productId);
    if (!cartItem) return;

    // 장바구니에서 제거
    setCartItems(prev => prev.filter(item => item.productId !== productId));

    // 재고 복구
    setProducts(prev =>
      prev.map(p =>
        p.id === productId
          ? { ...p, quantity: p.quantity + cartItem.quantity }
          : p
      )
    );
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
      <h1 className="text-2xl font-bold mb-4">장바구니</h1>

      <CartList
        cartItems={cartItems}
        products={products}
        onChangeQuantity={handleChangeQuantity}
        onRemoveItem={handleRemoveItem}
      />

      <Summary cartItems={cartItems} products={products} />

      <ProductSelect
        products={products}
        selectedId={selectedProductId}
        onChange={setSelectedProductId}
        onAddToCart={handleAddToCart}
      />
      <div className="text-sm text-gray-500 mt-2">
        {getStockInfoMessage(products)}
      </div>
    </div>
  );
};

export default App;
