import {
  applyLoyaltyPoints,
  updateLowStockNotice,
  updateCartSummary,
} from '../components/index.js';

// 상품 할인율 계산
const getItemDiscountRate = (itemId, quantity) => {
  if (quantity < 10) {
    return 0;
  }

  switch (itemId) {
    case 'p1':
      return 0.1;
    case 'p2':
      return 0.15;
    case 'p3':
      return 0.2;
    case 'p4':
      return 0.05;
    case 'p5':
      return 0.25;
    default:
      return 0;
  }
};

// 장바구니 상품의 총액과 수량 계산
const getItemTotal = (cartItems, products) => {
  let itemCount = 0,
    totalAmount = 0,
    subTotal = 0;

  for (let item of cartItems) {
    // 상품 ID로 상품 정보 찾기
    const product = products.find(product => product.id === item.id);

    if (!product) {
      console.error(`상품 ID ${item.id}를 찾을 수 없습니다.`);
      continue;
    }

    const q = parseInt(item.querySelector('span').textContent.split('x ')[1]);
    const itemTotal = product.price * q;
    const discount = getItemDiscountRate(product.id, q);

    itemCount += q;
    subTotal += itemTotal;
    totalAmount += itemTotal * (1 - discount);
  }

  return {
    itemCount,
    totalAmount,
    subTotal,
  };
};

// 대량 구매 및 화요일 할인 적용 후 총액/할인율 계산
const getBulkDiscountRate = (itemCount, subTotal, totalAmount) => {
  let discountRate = 0;
  const bulkDiscount = totalAmount * 0.25;
  const itemDiscount = subTotal - totalAmount;

  if (itemCount >= 30) {
    if (bulkDiscount > itemDiscount) {
      totalAmount = subTotal * (1 - 0.25);
      discountRate = 0.25;
    } else {
      discountRate = itemDiscount / subTotal;
    }
  } else {
    discountRate = itemDiscount / subTotal;
  }

  // 화요일
  const isTuesday = new Date().getDay() === 2;

  // 화요일 할인 적용
  if (isTuesday) {
    totalAmount *= 1 - 0.1;
    discountRate = Math.max(discountRate, 0.1);
  }

  return { discountRate, totalAmount };
};

// 장바구니 요약 계산
export const calculateCartSummary = (
  total,
  cartItemsChildren,
  products,
  stockInfo
) => {
  // 장바구니 상품의 총액과 수량 계산
  const { itemCount, totalAmount, subTotal } = getItemTotal(
    cartItemsChildren,
    products
  );

  // 대량 구매 및 화요일 할인 적용 후 총액/할인율 계산
  const { discountRate, totalAmount: discountTotalAmount } =
    getBulkDiscountRate(itemCount, subTotal, totalAmount);

  // 장바구니의 총액을 업데이트
  updateCartSummary(total, discountRate, discountTotalAmount);

  // 재고 상태 업데이트
  updateLowStockNotice(products, stockInfo);

  // 포인트 적립 기능
  applyLoyaltyPoints(total, discountTotalAmount);
};
