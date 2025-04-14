import { calculateCartSummary } from './calculateCartSummary';
import { updateCartItemText, getQuantity } from './utils';
import { createCartElement } from '../components/index.js';

// 장바구니에 상품 추가
export const handleAddToCart = (
  select,
  cartItemsContainer,
  total,
  stockInfo,
  lastSelectedItem,
  products
) => {
  const selectItem = select.value;

  const itemToAdd = products.find(product => {
    return product.id === selectItem;
  });

  if (itemToAdd && itemToAdd.quantity > 0) {
    const item = document.querySelector(`#${itemToAdd.id}`);

    if (item) {
      const newQuantity = getQuantity(item) + 1;

      if (newQuantity > itemToAdd.quantity) {
        alert('재고가 부족합니다.');
        return;
      }

      updateCartItemText(item, itemToAdd.name, itemToAdd.price, newQuantity);
    } else {
      const newItem = createCartElement(itemToAdd);
      cartItemsContainer.appendChild(newItem);
    }

    // 상품 수량 감소 한 번만
    itemToAdd.quantity--;

    calculateCartSummary(
      total,
      cartItemsContainer.children,
      products,
      stockInfo
    );

    lastSelectedItem = selectItem;
  }
};

// 장바구니 상품 클릭 이벤트 처리
export const handleCartItemClick = (
  event,
  cartItemsContainer,
  total,
  stockInfo,
  products
) => {
  const target = event.target;

  if (
    target.classList.contains('quantity-change') &&
    target.classList.contains('remove-item')
  ) {
    return;
  }

  const productId = target.dataset.productId;
  const itemElement = document.querySelector(`#${productId}`);
  const prod = products.find(product => {
    return product.id === productId;
  });

  const currentQuantity = getQuantity(itemElement);

  if (target.classList.contains('quantity-change')) {
    const quantityChange = parseInt(target.dataset.change);
    const newQuantity = currentQuantity + quantityChange;

    if (newQuantity > 0 && newQuantity <= prod.quantity + currentQuantity) {
      updateCartItemText(itemElement, prod.name, prod.price, newQuantity);
      prod.quantity -= quantityChange;
    } else if (newQuantity <= 0) {
      itemElement.remove();
      prod.quantity -= quantityChange;
    } else {
      alert('재고가 부족합니다.');
    }
  }

  if (target.classList.contains('remove-item')) {
    prod.quantity += currentQuantity;
    itemElement.remove();
  }

  calculateCartSummary(total, cartItemsContainer.children, products, stockInfo);
};
