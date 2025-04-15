import React, { useState } from 'react';
import { ProductSelect } from './components/ProductSelect';
import { CartList } from './components/CartList';
import { Summary } from './components/Summary';
import { Product, CartItem } from './types';

const mockProducts: Product[] = [
  { id: 'p1', name: '상품1', price: 10000, quantity: 50 },
  { id: 'p2', name: '상품2', price: 20000, quantity: 30 },
  { id: 'p3', name: '상품3', price: 30000, quantity: 20 },
  { id: 'p4', name: '상품4', price: 15000, quantity: 0 },
  { id: 'p5', name: '상품5', price: 25000, quantity: 10 },
];

const App = () => {
  //   const [products, setProducts] = useState<Product[]>(mockProducts);
  //   const [cartItems, setCartItems] = useState<CartItem[]>([]);
  //   const [selectedProductId, setSelectedProductId] = useState<string>('');

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-6">
      <h1 className="text-2xl font-bold text-center">장바구니</h1>

      {/* <ProductSelect />

      <CartList />

      <Summary /> */}
    </div>
  );
};

export default App;
