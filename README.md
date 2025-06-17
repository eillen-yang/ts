# `Typescript`란 ?

> 자바스크립트에 타입을 부여한 언어<br/>
> 즉, **자바스크립트의 확장된 언어**

- 컴파일 : 자바스크립트와 달리 브라우저에서 실행하려면 파일을 한번 변환해주어야하는데 그 변환 과정을 컴파일이라고 한다.

## 왜 `Typescript`를 써야할까 ?

자바스크립트는 자유로운 언어이다보니 버그 발생 가능성이 높기 때문에 버그 발생 가능성을 낮추기 위해 타입을 지정해 버그 발생 가능성을 낮추기위해 타입스크립트를 사용한다.

### 타입시스템

> 언어의 타입 관련된 문법체계들을 모아 둔 것

- 어떤 기준으로 타입을 규정할건지 ?
- 어떻게 타입을 검사할건지?

타입 시스템은 2가지로 분류된다.

#### 1. 정적 타입 시스템

- `C`, `C++`, `Java`, `Swift` 등..
- 코드 실행 이전에 모든 변수의 타입을 고정적으로 결정한다.
- 강력한 타입 체크를 통해 런타임 오류의 가능성을 줄인다.
- 왜 ?
  - 변수의 사용을 엄격하게 제한하고, 타입 불일치로 인한 오류를 컴파일 시점에 발견할 수 있기 때문이다.

#### 2. 동적 타입 시스템

- `Python`, `Javascript`, `Ruby` 등..
- 코드 실행한 후, 그때 그때마다 유동적으로 변수의 타입을 결정한다.
- 빠른 프로토타이핑과 스크립팅에 유리하다.
- 왜 ?
  - 변수의 타입을 런타임에 결정하기 때문에 타입 선언이 간결하고, 코드의 양을 줄일 수 있다.
  - 타입 변환과 관련된 유연성이 높아 다양한 타입의 데이터를 쉽게 처리할 수 있다.
- 즉, 자바스크립트는 빠른 개발은 가능하지만, 안전한 개발은 불가능하다.

### 점진적 타입시스템

> 모든 변수에 타입을 일일이 지정할 필요없이, `TS`를 사용하기만하면 알아서 타입을 지정해주고 판단해준다.<br/>
> 변수의 초기값을 가지고 알아서 타입을 지정해준다.

즉, **정적/동적 타입 시스템의 장점을 모두 가져가되, 서로가 서로의 단점을 해결해주는 짬뽕 시스템**이다.

#### 1. 에러의 사전 방지

```javascript
function sum(a, b) {
  return a + b;
}

function sum(a: number, b: number) {
  return a + b;
}
```

동일하게 똑같이 합을 구하는 함수코드이다.

```javascript
sum("10", "20");

// js => 1020
// ts => Error: '10'은 number에 할당될 수 없습니다.
```

타입스크립트는 에러를 뱉어낸다.

#### 2. 코드의 자동완성 덕분에 개발 생산성이 향상

자바스크립트는 문자열에서 사용 가능한 메소드, 숫자에서 사용 가능한 메소드가 있다.<br/>
이러한 메소드가 **자동 완성**된다는 점이다.

> 변수에 대한 타입이 지정되어 있기 때문에, vscode에서 해당 타입에 대한 API를 미리 보기로 띄워 준다.<br/>
> API를 일일이 치지 않고 tab으로 빠르고 정확하게 작성해 나갈 수 있다.

## `Typescript` 기본 문법

- `string`
- `number`
- `boolean`
- `object`
- `array`
- `tuple`
- `enum`
- `null`
- `undefined`
- `any`
- `void`
- `never`

### `TS`에서의 "객체 타입"

1. `object` 타입<br/>
   단순히 **이 변수는 객체다** 라고만 알려주는 타입
2. 객체 리터럴 타입<br/>
   객체가 어떤 속성들을 가지고, 각 속성의 값이 어떤 타입인지까지 **정확하게 정해주는 방식**

### `TS`에서 `"tuple"`

**배열의 길이가 고정되고 각 요소의 타입이 지정되어 있는 배열 형식**

```javascript
let arr: [string, number] = ["hi", 10];
// 만약, 정의하지 않은 타입 혹은 인덱스로 접근할 경우에는 오류발생
```

#### 배열과 튜플의 차이

배열 (`Array`)

- 같은 타입의 값들을 순서대로 모아놓은 자료구조
- ex) 학생들의 이름 목록, 점수 목록 등의 배열

```javascript
// 숫자 배열
let numbers: number[] = [1, 2, 3, 4];

// 문자 배열
let names: Array<string> = ["Tom", "Jane", "Bob"];

// 객체 배열
interface Student {
  name: string;
  grade: number;
}
let students: Student[] = [
  { name: "Jisu", grade: 5 },
  { name: "Min", grade: 4 },
];
```

튜플 (`Tuple`)

- "정해진 개수"의 "각각 다른 타입"의 값을 순서대로 담는 자료구조
- ex) [학생이름, 나이]처럼 서로 다른 타입을 한 번에 묶고 싶을 때 사용

```javascript
let studentInfo: [string, number] = ["Jisu", 5];
```

#### 실제 사용

- 배열 : 데이터 목록 (게시글 리스트, 사용자 목록 등..)
- 튜플 : `API`응답에서 여러 값을 한 번에 반환하거나 좌표, 상태값 등 .. **"정해진 구조"**의 데이터를 다룰 때

### `TS`에서의 `enum`

`C`, `Java`와 같은 다른언어에서 흔하게 쓰이는 타입으로 특정 값(상수)들의 집합을 의미한다.

```javascript
enum Avengers {
  Capt,
  IronMan,
  Thor
}

let hero: Avengers = Avengers.Capt;

// 인덱스 번호로도 접근 가능하다.
let hero: Avengers = Avengers[0];
```

### `TS`에서의 `any`

- 모든 타입에 사용할 수 있는 치트키같은 타입이다.
- 특정 데이터의 타입을 잘 모르거나, 자바스크립트 프로젝트에 타입스크립트를 점진적으로 사용하면 좋은 타입이다.
- 단어 의미 그대로 모든 타입에 대해 허용한다.
- 결론적으로는 `any`를 사용하면 `TS`를 사용하는 의미가 없기에 자주 사용하지 않는 것이 좋다.

### `TS`에서의 `void`

- **반환 값이 없는 함수의 반환 타입**이다.
- `return`이 없거나 `return`이 있더라도 반환하는 값이 없으면 함수의 반환 티입을 `void`로 지정한다.

```javascript
// return문 없음
function printSomething(): void {
  console.log("sth");
}

// return문이 있지만 반환하는 값이 없음
function returnNothing(): void {
  return;
}
```

### `TS`에서의 `never`

- **절대 발생하지 않는 값**을 의미한다.
- ex) 함수가 반복문이나 에러 핸들링으로 인해 함수의 끄테 절대 도달하지 안는 경우에 `never`타입을 사용할 수 있다.

```javascript
function loopForever(): never {
  while (true) {
    // ...
  }
}

function neverEnd(): never {
  throw new Error("unexpected");
}
```

### `TS`에서의 함수

타입을 크게 3가지로 정의할 수 있다.

1. 파라미터 (매개변수) 타입
2. 반환 타입
3. 구조 타입

```javascript
function sum(a: number, b: number) : number {
  retun a + b;
}
```

> 만약, 함수의 반환 값에 타입을 정하지 않을 때는 `void`라도 사용해야한다.<br/> >`TS`에서는 함수의 인자를 모두 필수 값으로 간주하기 때문이다.<br/> >`undefined`, `null`이라도 인자로 넘겨야 컴파일러에서 정의된 매개변수 값이 넘어왔는지 확인한다.<br/>
> 즉, **정의된 매개변수 값만 받을 수 있고, 추가로 인자를 받을 수 없음을 의미한다.**

그러함에도 필요할수도, 굳이 없어도 되는 경우에는<br/>
**옵셔널 체이닝의 `?`를 이용**하면 된다.
<br/>
<br/>
추가로

- 초기값을 넣어주고 싶다면, `JS`문법과 동일하게 넣어주면된다.
- 인자로 `REST`문법을 사용하고 싶다면,

```javascript
function sum(a: number, ...nums: number[]): number {
  const totalOfNums = 0;
  for (let key in nums) {
    totalOfNums += nums[key];
  }
  return a + totalOfNums;
}
```

사용하면 되고, **나머지 인자들에 대한 타입정의를** 해주면 된다.<br/>
💡 주의할 점은 **나머지 인자들은 배열로 넘어오는 것만 주의하면 된다.**

## 인터페이스 (`Interface`)

> 상호 간에 정의한 약속 혹은 규칙<br/>
> 객체 타입을 정의할 때 사용

객체 외의 정의

- 객체의 스펙 (속성과 속성의 타입)
- 함수의 파라미터
- 함수의 스펙 (파라미터, 반환 타입 등..)
- 배열과 객체를 접근하는 방식
- 클래스

**형태를 정해주는 규칙**으로 이해하면 된다.

```javascript
interface 인터페이스_이름 {
  속성: 타입; // 반드시 들어가야함
  속성?: 타입; // ? 가 붙었기 때문에 없어도 됨 => 이걸 "옵션 속성"이라고 함
}
```

### 읽기 전용

```javascript
interface 인터페이스_이름 {
  readonly 속성: 타입;  // 읽기 전용
}

let arr: ReadonlyArray<number> = [1, 2, 3];
```

- 배열을 선언할 때 `ReadonlyArray<T>` 타입을 사용하면 읽기 전용 배열을 생성
- 배열의 내용을 변경할 수 없다.
- 선언하는 시점에만 값을 정의할 수 있으니 주의해서 사용해야한다.

### 객체 속성 추가

객체 인터페이스에 정의하지 않은 속성들을 추가로 사용하고 싶다면,

```javascript
interface CraftBeer {
  brand?: string;
  [propName: string]: any;
}
```

> 인터페이스로 객체를 선언할 때 좀 더 엄밀한 속성 검사를 진행한다.<br/>
> 즉, 오탈자도 점검

### 타입추론 무시

```javascript
let family = { names: 'mandoo' };
myFamily(family as Family);
```

### 인터페이스 함수 타입 정의

인터페이스로 함수의 모양 자체를 정의할 수 있다.<br/>
콜백 함수나 여러 함수가 같은 형태를 가져야 할 때 유용

숫자 두 개를 받아와 숫자를 반환하는 함수이다.

```javascript
interface AddFunc {
  (a: number, b: number): number;
}

const add: AddFunc = (x, y) => x + y;
console.log(add(2, 3)); // 5
```

### 인터페이스 확장

```javascript
interface Person {
  name: string;
}
interface Developer extends Person {
  skill: string;
}
let fe = {} as Developer;
fe.name = 'josh';
fe.skill = 'TypeScript';

// User 객체를 받아서 이름을 출력하는 함수 만들기
interface User {
  name: string;
  age: number;
}

function greetUser(user: User) {
  console.log(`안녕하세요, ${user.name}님!`);
}

// Animal 인터페이스를 "반환 타입"으로 사용하는 함수 만들기
interface Animal {
  species: string;
  age: number;
}

function makeAnimal(species: string, age: number): Animal {
  return { species, age };
}
```

## 타입 (`Type`)

## 제네릭을 활용한 초미니 프로젝트
