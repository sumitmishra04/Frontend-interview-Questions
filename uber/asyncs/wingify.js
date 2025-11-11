
1. How does the forEach method differ from the map method in JavaScript?:
2. Explain the difference between microtasks and macrotasks in JavaScript’s event loop:
3. What Web Vitals report shows & Name the Core Web Vitals?:
4. How do you create a new object that inherits from an existing object in JavaScript?:
5. What is the disadvantage of overusing closures. & What is the practical use for a closure in JavaScript?:
6. Explain the concept of event bubbling and capturing in JavaScript:
7. How many ways an HTML element can be accessed in JavaScript code?:
8. Explain throttling and debouncing in JavaScript. Provide a real-world scenario where throttling would be more appropriate than debouncing:
9. How does the sessionStorage object differ from the localStorage object in terms of lifetime and scope?:
10. How can we prevent memory leaks in JavaScript applications?:
`````````````````````````````````````````````````````
1. What will be the output?

const animal = { speak() { console.log('sound'); } };

const dogCreate = Object.create(animal);
const dogAssign = Object.assign({}, animal);

console.log(dogCreate.__proto__ === animal);
console.log(dogAssign.__proto__ === animal);
`````````````````````````````````````````````````````
2. What will be the output?
let a = 0.1;
let b = 0.2 + a;
let c = 0.3;

console.log(a === b);
console.log(a === c);
console.log(b === c);
`````````````````````````````````````````````````````
3. What will be the output?
const m = Array.from({ length: 2 }, (_, i) =>
  Array.from({ length: 2 }, (_, j) => String.fromCharCode(65 + i * 2 + j))
)
console.log(m);
`````````````````````````````````````````````````````
4. What will be the output?
function getPlanData() {
    const name = "PlanA";
    return function(characterIndex) {
        return function(newChar) {
            name[characterIndex] = newChar;
            return name;
        }
    }
}
console.log(getPlanData()(4)("B"));
`````````````````````````````````````````````````````
true, false
false, false, false
[[A,B],[C,D]]
PLANB

https://stackblitz.com/edit/js-yzebxu?file=index.js

https://stackblitz.com/edit/js-ajw9wy?file=index.js

https://stackblitz.com/edit/js-ksxm3n?file=index.js

const arr = [1, 2, [3, [7]], 4];
const generator = flatGen(arr);
console.log(generator.next().value); // [1, 2, [3, [7]], 4]
console.log(generator.next().value); // [1, 2, 3, [7], 4]
console.log(generator.next().value); // [1, 2, 3, 7, 4]

function* flatGen(arr) {
  // write your code below:
  yield arr;
}
