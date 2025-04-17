import"./modulepreload-polyfill-B5Qt9EMX.js";const x=(e,t={})=>{const a=document.createElement(e);return t.id&&(a.id=t.id),t.className&&(a.className=t.className),t.text&&(a.textContent=t.text),t.value&&(a.value=t.value),a},v=(e,t)=>{e.innerHTML="",t.forEach(a=>{const n=x("option",{value:a.id,text:`${a.name} - ${a.price}원`});a.quantity===0&&(n.disabled=!0),e.appendChild(n)})},I=(e,t)=>{const a=Math.floor(t/1e3);let n=document.querySelector("#loyalty-points");n||(n=x("span",{id:"loyalty-points",className:"text-blue-500 ml-2"}),e.appendChild(n)),n.textContent=`(포인트: ${a})`},S=(e,t)=>{const a=e.filter(n=>n.quantity<5).map(n=>{const i=n.quantity>0?`재고 부족 (${n.quantity}개 남음)`:"품절";return`${n.name}: ${i}`});t.textContent=a.join(`
`)},w=(e,t,a)=>{if(e.textContent=`총액: ${Math.round(a)}원`,t>0){const n=x("span",{className:"text-green-500 ml-2",text:`(${(t*100).toFixed(1)}% 할인 적용)`});e.appendChild(n)}},L=e=>{const t=x("div",{id:e.id,className:"flex justify-between items-center mb-2"});return t.innerHTML=`
    <span>${e.name} - ${e.price}원 x 1</span>
    <div>
      <button
        class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
        data-product-id="${e.id}"
        data-change="-1"
      >-</button>
      <button
        class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
        data-product-id="${e.id}"
        data-change="1"
      >+</button>
      <button
        class="remove-item bg-red-500 text-white px-2 py-1 rounded"
        data-product-id="${e.id}"
      >삭제</button>
    </div>
  `,t},M=(e,t,a=3e4,n=Math.random()*1e4)=>{setTimeout(()=>{setInterval(()=>{const i=t[Math.floor(Math.random()*t.length)];Math.random()<.3&&i.quantity>0&&(i.price=Math.round(i.price*.8),alert(`번개세일! ${i.name}이(가) 20% 할인 중입니다!`),v(e,t))},a)},n)},E=(e,t,a=6e4,n=Math.random()*2e4)=>{setTimeout(()=>{setInterval(()=>{if(e){const i=t.find(o=>o.id!==e&&o.quantity>0);i&&(alert(`${i.name}은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!`),i.price=Math.round(i.price*.95),updateProductOptions(e,t))}},a)},n)},k=(e,t)=>{if(t<10)return 0;switch(e){case"p1":return .1;case"p2":return .15;case"p3":return .2;case"p4":return .05;case"p5":return .25;default:return 0}},D=(e,t,a)=>{let n=0,i=a;const o=i*.25,r=t-i;return e>=30&&o>r?(i=t*(1-.25),n=.25):n=r/t,new Date().getDay()===2&&(i*=1-.1,n=Math.max(n,.1)),{discountRate:n,totalAmount:i}},N=(e,t)=>{let a=0,n=0,i=0;for(let o of e){const r=t.find(u=>u.id===o.id);if(!r){console.error(`상품 ID ${o.id}를 찾을 수 없습니다.`);continue}const c=parseInt(o.querySelector("span").textContent.split("x ")[1]),s=r.price*c,d=k(r.id,c);a+=c,i+=s,n+=s*(1-d)}return{itemCount:a,totalAmount:n,subTotal:i}},q=(e,t,a,n)=>{const{itemCount:i,totalAmount:o,subTotal:r}=N(t,a),{discountRate:c,totalAmount:s}=D(i,r,o);w(e,c,s),S(a,n),I(e,s)},b=e=>parseInt(e.querySelector("span").textContent.split("x ")[1]),$=(e,t,a,n)=>{e.querySelector("span").textContent=`${t} - ${a}원 x ${n}`},A="장바구니",O="추가",T="재고가 부족합니다",P=(e,t,a,n,i,o)=>{const r=e.value,c=o.find(s=>s.id===r);if(c&&c.quantity>0){const s=document.querySelector(`#${c.id}`);if(s){const d=b(s)+1;if(d>c.quantity){alert(T);return}$(s,c.name,c.price,d)}else{const d=L(c);t.appendChild(d)}c.quantity--,q(a,t.children,o,n),i(r)}},_=(e,t,a,n,i)=>{const o=e.target;if(!o.classList.contains("quantity-change")&&!o.classList.contains("remove-item"))return;const r=o.dataset.productId,c=document.querySelector(`#${r}`),s=i.find(u=>u.id===r),d=b(c);if(o.classList.contains("quantity-change")){const u=parseInt(o.dataset.change),p=d+u;p>0&&p<=s.quantity+d?($(c,s.name,s.price,p),s.quantity-=u):p<=0?(c.remove(),s.quantity-=u):alert(T)}o.classList.contains("remove-item")&&(s.quantity+=d,c.remove()),q(a,t.children,i,n)},l=[{id:"p1",name:"상품1",price:1e4,quantity:50},{id:"p2",name:"상품2",price:2e4,quantity:30},{id:"p3",name:"상품3",price:3e4,quantity:20},{id:"p4",name:"상품4",price:15e3,quantity:0},{id:"p5",name:"상품5",price:25e3,quantity:10}];let g,C,m,y,f,h;const Q=()=>{const e=t=>{h=t};C.addEventListener("click",()=>{P(g,m,y,f,e,l)}),m.addEventListener("click",t=>{_(t,m,y,f,l)})},B=()=>{const e=document.querySelector("#app");if(!e){console.error("루트 엘리먼트가 없습니다.");return}e.innerHTML=`
    <div class="bg-gray-100 p-8">
      <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
        <h1 class="text-2xl font-bold mb-4">${A}</h1>

        <div id="cart-items"></div>

        <div id="cart-total" class="text-xl font-bold my-4"></div>

          <select id="product-select" class="border rounded p-2 flex-1"></select>
          <button
            id="add-to-cart"
            class="bg-blue-500 text-white px-4 py-2 rounded"
          >
            ${O}
          </button>

        <div id="stock-status" class="text-sm text-gray-500 mt-2"></div>
      </div>
    </div>
  `,m=document.querySelector("#cart-items"),y=document.querySelector("#cart-total"),g=document.querySelector("#product-select"),C=document.querySelector("#add-to-cart"),f=document.querySelector("#stock-status")},H=()=>{B(),v(g,l),q(y,m.children,l,f),M(h,l),E(h,l),Q()};H();
