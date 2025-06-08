## 과제 체크포인트

### 배포링크
https://luwbe1.github.io/front_5th_chapter2-1/ <br >
https://luwbe1.github.io/front_5th_chapter2-1/index.basic.html  <br >
https://luwbe1.github.io/front_5th_chapter2-1/index.advanced.html  <br >

### 기본과제

- [x] 코드가 Prettier를 통해 일관된 포맷팅이 적용되어 있는가?
- [x] 적절한 줄바꿈과 주석을 사용하여 코드의 논리적 단위를 명확히 구분했는가?
- [x] 변수명과 함수명이 그 역할을 명확히 나타내며, 일관된 네이밍 규칙을 따르는가?
- [x] 매직 넘버와 문자열을 의미 있는 상수로 추출했는가?
- [x] 중복 코드를 제거하고 재사용 가능한 형태로 리팩토링했는가?
- [x] 함수가 단일 책임 원칙을 따르며, 한 가지 작업만 수행하는가?
- [x] 조건문과 반복문이 간결하고 명확한가? 복잡한 조건을 함수로 추출했는가?
- [x] 코드의 배치가 의존성과 실행 흐름에 따라 논리적으로 구성되어 있는가?
- [x] 연관된 코드를 의미 있는 함수나 모듈로 그룹화했는가?
- [x] ES6+ 문법을 활용하여 코드를 더 간결하고 명확하게 작성했는가?
- [x] 전역 상태와 부수 효과(side effects)를 최소화했는가?
- [x] 에러 처리와 예외 상황을 명확히 고려하고 처리했는가?
- [x] 코드 자체가 자기 문서화되어 있어, 주석 없이도 의도를 파악할 수 있는가?
- [x] 비즈니스 로직과 UI 로직이 적절히 분리되어 있는가?
- [x] 코드의 각 부분이 테스트 가능하도록 구조화되어 있는가?
- [x] 성능 개선을 위해 불필요한 연산이나 렌더링을 제거했는가?
- [x] 새로운 기능 추가나 변경이 기존 코드에 미치는 영향을 최소화했는가?
- [x] 코드 리뷰를 통해 다른 개발자들의 피드백을 반영하고 개선했는가?
- [x] (핵심!) 리팩토링 시 기존 기능을 그대로 유지하면서 점진적으로 개선했는가?

### 심화과제

- [x] 변경한 구조와 코드가 기존의 코드보다 가독성이 높고 이해하기 쉬운가?
- [x] 변경한 구조와 코드가 기존의 코드보다 기능을 수정하거나 확장하기에 용이한가?
- [x] 변경한 구조와 코드가 기존의 코드보다 테스트를 하기에 더 용이한가?
- [x] 변경한 구조와 코드가 기존의 모든 기능은 그대로 유지했는가?
- [x] (핵심!) 변경한 구조와 코드를 새로운 한번에 새로만들지 않고 점진적으로 개선했는가?


## 과제 셀프회고

<!-- 과제에 대한 회고를 작성해주세요 -->

### 과제를 하면서 내가 제일 신경 쓴 부분은 무엇인가요?
#### 코드 가독성과 구조적인 정리에 가장 중점을 뒀음
- `var` -> `let, const`을 사용해서 변수의 유효범위와 변경 가능성을 명확히 하려고 했다.
- 기존에는 `function` 키워드로 선언된 함수들이 많았는데, 이를 모두 `const + () => {}` 형태의 화살표 함수로 리팩토링하여 코드 스타일을 통일하고, 함수 표현을 더 간결하게 만들었다.
- `main.basic.js`에 모여있는 로직들을 기능별로 모듈화하여 관리함으로써, 재사용성을 고려했다.
- 불필요한 조건문들을 덜어내려고 노력했다. 
``` 
// 길던 if-else 조건문을 그나마 switch로 변경해서 해결하려고 노력했음.
export const getItemDiscountRate = (itemId, quantity) => {
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
```
- 변수명을 최대한 풀어쓰고 직관적으로 이해할 수 있게 하려고 노력했다. (예, Qty -> Quantity)
- 자주 사용되는 기능은 utils 폴더에 함수로 분리해 관리했고, 예를 들어 장바구니 수량 확인 및 텍스트 업데이트도 아래와 같은 유틸 함수로 정리했다.
```
export const getQuantity = item => {
  return parseInt(item.querySelector('span').textContent.split('x ')[1]);
};

export const updateCartItemText = (itemElement, name, price, quantity) => {
  itemElement.querySelector('span').textContent =
    `${name} - ${price}원 x ${quantity}`;
};
```
- `innerHTML vs createElement` 전략적으로 구분하여 사용하였다.
복잡한 구조의 HTML 마크업이 들어가는 부분(main 등)에서는 여러 줄의 DOM 생성 코드를 innerHTML로 한 번에 처리하여 가독성과 유지보수성을 높였다.
반대로, 작고 단순한 요소를 재사용하거나 반복적으로 생성해야 할 때는 범용적으로 쓸 수 있는 `createElement()` 유틸 함수를 만들어 활용했다.
```
// createElement 유틸 함수
export const createElement = (tag, options = {}) => {
  const element = document.createElement(tag);
  if (options.id) {
    element.id = options.id;
  }
  if (options.className) {
    element.className = options.className;
  }
  if (options.text) {
    element.textContent = options.text;
  }
  if (options.value) {
    element.value = options.value;
  }

  return element;
};
```
- 전반적으로 모듈화를 관심사 기반으로 나눌지, 기능 단위로 나눌지에 대해 계속 고민했고 시도해보는 시간을 가졌다.
- React로 옮길 때는 기존에 만들어둔 기능들을 최대한 해치지 않는 선에서 자연스럽게 마이그레이션하려고 했다.
타입 안정성을 위해 `TypeScript`도 적극적으로 활용하려고 했고, 컴포넌트 구조는 `CartList → CartItem → ButtonGroup`처럼 역할을 나누어 구성했다.

- 추가적으로 설명할 부분은 밑에 코멘트로 남겼습니다.


### 과제를 다시 해보면 더 잘 할 수 있었겠다 아쉬운 점이 있다면 무엇인가요?

기본 과제에 집중해서 구조를 나누고 정리하는 데 많은 시간을 쏟다 보니, 심화 과제에는 충분한 시간을 들이지 못한 점이 아쉬웠다.

또한, 아직 리액트에 익숙하지 않아 App.tsx 안에 상태와 로직이 뒤섞인 채로 남아 있었고, 이 부분을 커스텀 훅이나 분리된 모듈로 더 정리할 수 있었을 텐데, 그런 구조적 개선까지는 미처 다 하지 못한 점도 아쉽게 느껴진다.

그리고 테스트 코드도 꼭 작성해보고 싶었지만, 시간 부족으로 인해 시도조차 하지 못한 것이 가장 아쉽다.

함수마다 단일 책임 원칙을 적용하려고 노력하긴 했지만, 아직 모든 함수가 명확하게 역할이 분리되었다고는 자신 있게 말하기 어렵다.
다음에는 컴포넌트 단위의 책임 분리와 테스트 코드 작성까지 고려해서, 더 완성도 높은 구현을 목표로 하고 싶다.


### 리뷰 받고 싶은 내용이나 궁금한 것에 대한 질문 편하게 남겨주세요 :)

<!--
피드백 받고 싶은 내용은 가급적 구체적으로 남겨주세요
모호한 요청은 피드백을 남기기 어렵습니다.

참고링크: https://chatgpt.com/share/675b6129-515c-8001-ba72-39d0fa4c7b62

모호한 요청의 예시)
- 코드 스타일에 대한 피드백 부탁드립니다.
- 코드 구조에 대한 피드백 부탁드립니다.
- 개념적인 오류에 대한 피드백 부탁드립니다.
- 추가 구현이 필요한 부분에 대한 피드백 부탁드립니다.

구체적인 요청의 예시)
- 현재 함수와 변수명을 보면 직관성이 떨어지는 것 같습니다. 함수와 변수를 더 명확하게 이름 지을 수 있는 방법에 대해 조언해주실 수 있나요?
- 현재 파일 단위로 코드가 분리되어 있지만, 모듈화나 계층화가 부족한 것 같습니다. 어떤 기준으로 클래스를 분리하거나 모듈화를 진행하면 유지보수에 도움이 될까요?
- MVC 패턴을 따르려고 했는데, 제가 구현한 구조가 MVC 원칙에 맞게 잘 구성되었는지 검토해주시고, 보완할 부분을 제안해주실 수 있을까요?
- 컴포넌트 간의 의존성이 높아져서 테스트하기 어려운 상황입니다. 의존성을 낮추고 테스트 가능성을 높이는 구조 개선 방안이 있을까요?
-->
- 추상적인 질문이긴 하지만... 개발을 할 때 무엇을 중점적으로 고려해야 하는지 잘 모르겠습니다.
예를 들어 과제나 실무 개발 중에, 특정 기술적 디테일에만 몰입하다가 정작 전체 흐름이나 기능 완성도는 부족해지는 경우가 많습니다.
우선 순위 판단 기준을 어떻게 세울지 고민이 됩니다.
- 현재 모듈화 방식이 기능별도, 관심사별도 아닌 애매한 구조입니다. 어떻게 개선하는 것이 좋을까요?
```
basic/
├── __tests__/
├── cart/
│   ├── calculateCartSummary.js
│   ├── eventHandler.js
│   ├── index.js
│   └── utils.js
├── components/
│   ├── createCartElement.js
│   ├── index.js
│   ├── updateCartSummary.js
│   ├── updateLowStockNotice.js
│   ├── updateLoyaltyPoints.js
│   └── updateProductOptions.js
├── constants/
│   └── index.js
├── data/
│   └── products.js
├── promotion/
│   ├── discountRate.js
│   ├── index.js
│   ├── randomSale.js
│   └── suggestProduct.js
└── utils/
    ├── index.js
    └── main.basic.js
```
- 다른 질문들은 밑에 코멘트를 달았습니다.
