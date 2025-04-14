import { calculateCartSummary } from './calculateCartSummary';
import { updateCartItemText, getQuantity } from './utils';
import { createCartElement } from '../components/index.js';

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

      if (newQuantity <= itemToAdd.quantity) {
        updateCartItemText(item, itemToAdd.name, itemToAdd.price, newQuantity);

        itemToAdd.quantity--;
      } else {
        alert('재고가 부족합니다.');
      }
    } else {
      const newItem = createCartElement(itemToAdd);
      cartItemsContainer.appendChild(newItem);

      itemToAdd.quantity--;
    }

    calculateCartSummary(
      total,
      cartItemsContainer.children,
      products,
      stockInfo
    );

    lastSelectedItem = selectItem;
  }
};

export const handleCartItemClick = (
  event,
  cartItemsContainer,
  total,
  stockInfo,
  products
) => {
  const tgt = event.target;

  if (
    tgt.classList.contains('quantity-change') ||
    tgt.classList.contains('remove-item')
  ) {
    const productId = tgt.dataset.productId;
    const itemElement = document.querySelector(`#${productId}`);

    const prod = products.find(product => {
      return product.id === productId;
    });

    if (tgt.classList.contains('quantity-change')) {
      const qtyChange = parseInt(tgt.dataset.change);
      const newQuantity = getQuantity(itemElement) + qtyChange;

      if (
        newQuantity > 0 &&
        newQuantity <= prod.quantity + getQuantity(itemElement)
      ) {
        updateCartItemText(itemElement, prod.name, prod.price, newQuantity);
        prod.quantity -= qtyChange;
      } else if (newQuantity <= 0) {
        itemElement.remove();
        prod.quantity -= qtyChange;
      } else {
        alert('재고가 부족합니다.');
      }
    } else if (tgt.classList.contains('remove-item')) {
      const remQty = getQuantity(itemElement);
      prod.quantity += remQty;
      itemElement.remove();
    }

    calculateCartSummary(
      total,
      cartItemsContainer.children,
      products,
      stockInfo
    );
  }
};
