let products = [
    { id: 'p1', name: '상품1', price: 10000, quantity: 50 },
    { id: 'p2', name: '상품2', price: 20000, quantity: 30 },
    { id: 'p3', name: '상품3', price: 30000, quantity: 20 },
    { id: 'p4', name: '상품4', price: 15000, quantity: 0 },
    { id: 'p5', name: '상품5', price: 25000, quantity: 10 },
  ],
  sel,
  addButton,
  cartDisp,
  total,
  stockInfo,
  lastSel;

const main = () => {
  let root = document.getElementById('app');
  let cont = document.createElement('div');
  let wrap = document.createElement('div');
  let hTxt = document.createElement('h1');

  cartDisp = document.createElement('div');
  total = document.createElement('div');
  sel = document.createElement('select');
  addButton = document.createElement('button');
  stockInfo = document.createElement('div');

  cartDisp.id = 'cart-items';
  total.id = 'cart-total';
  sel.id = 'product-select';
  addButton.id = 'add-to-cart';
  stockInfo.id = 'stock-status';

  cont.className = 'bg-gray-100 p-8';
  wrap.className =
    'max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8';
  hTxt.className = 'text-2xl font-bold mb-4';
  total.className = 'text-xl font-bold my-4';
  sel.className = 'border rounded p-2 mr-2';
  addButton.className = 'bg-blue-500 text-white px-4 py-2 rounded';
  stockInfo.className = 'text-sm text-gray-500 mt-2';
  hTxt.textContent = '장바구니';
  addButton.textContent = '추가';

  updateSelOpts();

  wrap.appendChild(hTxt);
  wrap.appendChild(cartDisp);
  wrap.appendChild(total);
  wrap.appendChild(sel);
  wrap.appendChild(addButton);
  wrap.appendChild(stockInfo);
  cont.appendChild(wrap);
  root.appendChild(cont);

  calcCart();

  setTimeout(() => {
    setInterval(() => {
      const luckyItem = products[Math.floor(Math.random() * products.length)];

      if (Math.random() < 0.3 && luckyItem.quantity > 0) {
        luckyItem.price = Math.round(luckyItem.price * 0.8);

        alert('번개세일! ' + luckyItem.name + '이(가) 20% 할인 중입니다!');

        updateSelOpts();
      }
    }, 30000);
  }, Math.random() * 10000);

  setTimeout(() => {
    setInterval(() => {
      if (lastSel) {
        const suggest = products.find(item => {
          return item.id !== lastSel && item.quantity > 0;
        });
        if (suggest) {
          alert(
            suggest.name + '은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!'
          );
          suggest.price = Math.round(suggest.price * 0.95);

          updateSelOpts();
        }
      }
    }, 60000);
  }, Math.random() * 20000);
};

const updateSelOpts = () => {
  sel.innerHTML = '';

  products.forEach(item => {
    const opt = document.createElement('option');
    opt.value = item.id;

    opt.textContent = item.name + ' - ' + item.price + '원';

    if (item.quantity === 0) {
      opt.disabled = true;
    }
    sel.appendChild(opt);
  });
};

const calcCart = () => {
  let itemCount = 0,
    totalAmount = 0,
    cartItems = cartDisp.children,
    subTotal = 0;

  for (let i = 0; i < cartItems.length; i++) {
    (() => {
      let currentItem;

      for (let j = 0; j < products.length; j++) {
        if (products[j].id === cartItems[i].id) {
          currentItem = products[j];
          break;
        }
      }

      let q = parseInt(
        cartItems[i].querySelector('span').textContent.split('x ')[1]
      );
      let itemTotal = currentItem.price * q;
      let disc = 0;

      itemCount += q;
      subTotal += itemTotal;
      if (q >= 10) {
        if (currentItem.id === 'p1') disc = 0.1;
        else if (currentItem.id === 'p2') disc = 0.15;
        else if (currentItem.id === 'p3') disc = 0.2;
        else if (currentItem.id === 'p4') disc = 0.05;
        else if (currentItem.id === 'p5') disc = 0.25;
      }

      totalAmount += itemTotal * (1 - disc);
    })();
  }

  let discRate = 0;

  if (itemCount >= 30) {
    const bulkDisc = totalAmount * 0.25;
    const itemDisc = subTotal - totalAmount;
    if (bulkDisc > itemDisc) {
      totalAmount = subTotal * (1 - 0.25);
      discRate = 0.25;
    } else {
      discRate = (subTotal - totalAmount) / subTotal;
    }
  } else {
    discRate = (subTotal - totalAmount) / subTotal;
  }
  if (new Date().getDay() === 2) {
    totalAmount *= 1 - 0.1;
    discRate = Math.max(discRate, 0.1);
  }
  total.textContent = '총액: ' + Math.round(totalAmount) + '원';

  if (discRate > 0) {
    let span = document.createElement('span');
    span.className = 'text-green-500 ml-2';
    span.textContent = '(' + (discRate * 100).toFixed(1) + '% 할인 적용)';
    total.appendChild(span);
  }

  updateStockInfo();
  renderbonusPoints(totalAmount);
};

const renderbonusPoints = totalAmount => {
  let bonusPoints = Math.floor(totalAmount / 1000);

  let ptsTag = document.getElementById('loyalty-points');

  if (!ptsTag) {
    ptsTag = document.createElement('span');
    ptsTag.id = 'loyalty-points';
    ptsTag.className = 'text-blue-500 ml-2';
    total.appendChild(ptsTag);
  }

  ptsTag.textContent = '(포인트: ' + bonusPoints + ')';
};

const updateStockInfo = () => {
  let infoMsg = '';

  products.forEach(item => {
    if (item.quantity < 5) {
      infoMsg +=
        item.name +
        ': ' +
        (item.quantity > 0
          ? '재고 부족 (' + item.quantity + '개 남음)'
          : '품절') +
        '\n';
    }
  });

  stockInfo.textContent = infoMsg;
};

main();

addButton.addEventListener('click', () => {
  let selItem = sel.value;

  const itemToAdd = products.find(product => {
    return product.id === selItem;
  });

  if (itemToAdd && itemToAdd.quantity > 0) {
    let item = document.getElementById(itemToAdd.id);
    if (item) {
      const newQty =
        parseInt(item.querySelector('span').textContent.split('x ')[1]) + 1;

      if (newQty <= itemToAdd.quantity) {
        item.querySelector('span').textContent =
          itemToAdd.name + ' - ' + itemToAdd.price + '원 x ' + newQty;
        itemToAdd.quantity--;
      } else {
        alert('재고가 부족합니다.');
      }
    } else {
      const newItem = document.createElement('div');
      newItem.id = itemToAdd.id;
      newItem.className = 'flex justify-between items-center mb-2';
      newItem.innerHTML =
        '<span>' +
        itemToAdd.name +
        ' - ' +
        itemToAdd.price +
        '원 x 1</span><div>' +
        '<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' +
        itemToAdd.id +
        '" data-change="-1">-</button>' +
        '<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' +
        itemToAdd.id +
        '" data-change="1">+</button>' +
        '<button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="' +
        itemToAdd.id +
        '">삭제</button></div>';
      cartDisp.appendChild(newItem);
      itemToAdd.quantity--;
    }
    calcCart();
    lastSel = selItem;
  }
});

cartDisp.addEventListener('click', event => {
  let tgt = event.target;

  if (
    tgt.classList.contains('quantity-change') ||
    tgt.classList.contains('remove-item')
  ) {
    const prodId = tgt.dataset.productId;
    const itemElem = document.getElementById(prodId);
    const prod = products.find(p => {
      return p.id === prodId;
    });
    if (tgt.classList.contains('quantity-change')) {
      const qtyChange = parseInt(tgt.dataset.change);
      const newQty =
        parseInt(itemElem.querySelector('span').textContent.split('x ')[1]) +
        qtyChange;
      if (
        newQty > 0 &&
        newQty <=
          prod.quantity +
            parseInt(itemElem.querySelector('span').textContent.split('x ')[1])
      ) {
        itemElem.querySelector('span').textContent =
          itemElem.querySelector('span').textContent.split('x ')[0] +
          'x ' +
          newQty;
        prod.quantity -= qtyChange;
      } else if (newQty <= 0) {
        itemElem.remove();
        prod.quantity -= qtyChange;
      } else {
        alert('재고가 부족합니다.');
      }
    } else if (tgt.classList.contains('remove-item')) {
      const remQty = parseInt(
        itemElem.querySelector('span').textContent.split('x ')[1]
      );
      prod.quantity += remQty;
      itemElem.remove();
    }

    calcCart();
  }
});
