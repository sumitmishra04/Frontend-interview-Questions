// The new keyword is used to create an instance of an object from a constructor function. 
// When we use new with a function, it does the following:

// Creates a new empty object { }.
// Sets this inside the function to refer to the new object.
// Links the new objects __proto__ to the constructor functions.prototype.
// Returns the new object(unless the function explicitly returns something else).

// JavaScript’s new behavior:

// If a constructor explicitly returns an object, that object is used.
// Otherwise, the newly created instance (obj) is used.


// No return (undefined) =>	Return the created object (obj)
// Returns a primitive (string, number, etc.) => Ignore it, return obj
// Returns this	=> Behaves the same as no return hence normal usecase
// Returns an object =>	Return that object instead


// What Does new Do ?
//     When we write:
// const obj = new Constructor(args);
// The new operator does 4 key things:

// Creates a new empty object({}).
// Links the new object to the constructor's prototype.
// Calls the constructor function, setting "this" to the new object.
// Returns the new object(unless the constructor returns a non - primitive).


function myNew(constructorFn, ...args) {
    let myThis = {}
    Object.setPrototypeOf(myThis, constructorFn.prototype)
    let result = constructorFn.apply(myThis, args)
    return result instanceof Object ? result : myThis
}

function Person(name, age) {
    this.name = name;
    this.age = age;
}

const person = myNew(Person, "Alice", 25);
console.log(person.name); // "Alice"
console.log(person.age);  // 25
console.log(person instanceof Person); // true



function Person(name) {
    this.name = name;
}

// const p1 = new Person("Alice");

// console.log(p1.name); // "Alice"
// console.log(p1 instanceof Person); // true
// console.log(p1); // Person { name: 'Alice' }
// Why ?
//     The constructor doesn't return anything.
// The new operator automatically creates an object and returns it.



function WeirdPerson(name) {
    this.name = name;
    return "hello"; // Returning a primitive
}

// const p2 = new WeirdPerson("Bob");

// console.log(p2.name); // "Bob"
// console.log(p2 instanceof WeirdPerson); // true
// console.log(p2); // WeirdPerson { name: 'Bob' }
// Why ?
//     The constructor returns "hello"(a string, which is a primitive).
// JavaScript ignores the return value and returns the created object instead.



function CustomPerson(name) {
    return { customName: name }; // Returning an object
}

// const p3 = new CustomPerson("Charlie");

// console.log(p3.customName); // "Charlie"
// console.log(p3 instanceof CustomPerson); // false
// console.log(p3); // { customName: 'Charlie' }
// Why ?
//     The constructor returns an object({ customName: name }).
// The new operator replaces the created instance with the returned object.
// p3 is not an instance of CustomPerson because the returned object is unrelated to the function’s prototype.

function ExplicitPerson(name) {
    this.name = name;
    return this; // Explicitly returning this
}

// const p4 = new ExplicitPerson("David");

// console.log(p4.name); // "David"
// console.log(p4 instanceof ExplicitPerson); // true
// console.log(p4); // ExplicitPerson { name: 'David' }
// Why ?
//     Returning this explicitly doesn’t change anything—it’s the same object that new would return anyway.








Rules that Object.create() follows
It creates a new object

The new object has its __proto__ set to the first argument(object used).
The new object itself does not get a copy of the properties—it inherits them.
The first argument(proto) must be an object or null
If proto is not an object or null, Object.create() throws a TypeError.
    Object.create(42); // ❌ TypeError: Object prototype may only be an Object or null
It does not invoke the constructor of the prototype
Unlike new, Object.create() does not run a constructor function.
It can accept a second argument(optional)
The second argument is a propertiesObject that defines additional properties for the new object.
    Example:
    const obj = Object.create({}, { x: { value: 10, writable: true } });
console.log(obj.x); // 10
If null is passed as the first argument, the new object has no prototype
Example:
const obj = Object.create(null);
console.log(Object.getPrototypeOf(obj)); // null
console.log(obj.toString); // undefined (doesn’t inherit from `Object.prototype`)
It only establishes prototype inheritance, but does not copy properties
Example:
const person = { species: "Homo sapiens" };
const john = Object.create(person);
console.log(john.species); // "Homo sapiens"
console.log(john.hasOwnProperty("species")); // false (it's inherited, not owned)

POLYFILL
// When you do Object.create(proto), it creates an object that inherits from proto, not one that copies its properties.
// Only functions in JavaScript have a .prototype property
// Regular objects don’t have .prototype—only constructor functions do.
// That’s why we need function F() {}—so we can set F.prototype = proto.
function myCreate(proto) {
    if (typeof proto !== 'object' || typeof proto !== 'null') {
        throw new TypeError("Prototype must be an object or null");
    }
    // we need to send an instance which can access all of proto's properties but without directly copying them as thats not how create
    // wants to work.
    // copying can be done using prototype inheritance
    // once we create a contructir fn that inherited all properties from the object passed
    // we can then create an instance of that and return as create return a new object whose prototype is equal to the object passed
    function F() { } //  
    F.prototype = proto
    return new F()
}

function myCreate(proto, propertiesObject) {
    if (typeof Object.create !== 'function') {
 
        // Handle edge cases
        if (proto !== Object(proto) && proto !== null) {
            throw new TypeError('Object prototype may only be an Object or null');
        }

        // Create a temporary constructor function
        function F() {}
        
        // Set its prototype to the provided proto
        F.prototype = proto;
        
        // Create new instance
        const obj = new F();
        
        // If proto was null, remove __proto__
        if (proto === null) {
            Object.setPrototypeOf(obj, null);
        }
        
        // If properties object is provided, define properties
        if (propertiesObject !== undefined) {
            Object.defineProperties(obj, propertiesObject);
        }
        
        return obj;
   }
}

const animal = { type: "mammal" };
const dog = myObjectCreate(animal);

console.log(dog.type); // "mammal"
console.log(Object.getPrototypeOf(dog) === animal); // true


RULES

1️⃣ Every function (except arrow functions) has a prototype object.
function Vehicle() { }
console.log(Vehicle.prototype);
// ✅ { constructor: Vehicle }
Vehicle.prototype is an object that will be inherited by instances created using new Vehicle().

2️⃣ prototype is used for inheritance.
You can add properties/methods to Vehicle.prototype, and instances will inherit them.
Vehicle.prototype.start = function () { console.log("Engine started!"); };
Vehicle.prototype.country = "India";
console.log(Vehicle.prototype);
// ✅ { country: 'India', start: ƒ, constructor: ƒ }


3️⃣ A functions prototype object has a constructor property that points back to the function.
console.log(Vehicle.prototype.constructor);  
// ✅ Vehicle
This means Vehicle.prototype.constructor === Vehicle.

4️⃣ Every object (not function) has __proto__, which points to its prototype.
const v = new Vehicle("rr");
console.log(v.__proto__ === Vehicle.prototype);  // ✅ true
v.__proto__ points to Vehicle.prototype.

5️⃣ Instances do not have a prototype property, only functions do.
console.log(v.prototype);  // ✅ undefined
prototype is a property of constructor functions, not instances.

6️⃣ Prototype Chain follows this lookup order:
v.__proto__ === Vehicle.prototype
Vehicle.prototype.__proto__ === Object.prototype
Object.prototype.__proto__ === null
If a property/method is not found on v, JavaScript looks in Vehicle.prototype.
If not found there, it looks in Object.prototype.

7️⃣ Every function (constructor function) is an object and has __proto__.
console.log(Vehicle.__proto__);  
// ✅ ƒ Function() { [native code] }
Functions themselves are created from the built-in Function constructor.

8️⃣ Every function’s __proto__ points to Function.prototype.
console.log(Vehicle.__proto__ === Function.prototype);  
// ✅ true
Function.prototype is the prototype for all functions.

9️⃣ The __proto__ of Vehicle.prototype is Object.prototype.
console.log(Vehicle.prototype.__proto__ === Object.prototype);  
// ✅ true
This means Vehicle.prototype is just a regular object, inheriting from Object.prototype.


1️⃣0️⃣ When Car.prototype = Object.create(Vehicle.prototype), it creates a new prototype chain.
function Car() {}
Car.prototype = Object.create(Vehicle.prototype);
Car.prototype is now an empty object whose __proto__ points to Vehicle.prototype.
c.__proto__ => Car.prototype → 
                    __proto__ → Vehicle.prototype →
                                            __proto__ → Object.prototype →
                                                                    __proto__ → null

1️⃣1️⃣ After Object.create(), Car.prototype.constructor no longer points to Car.
console.log(Car.prototype.constructor);  
// ✅ Vehicle (incorrect reference)
Object.create() does not copy the constructor.
We manually reset it:
Car.prototype.constructor = Car;
console.log(Car.prototype.constructor);  
// ✅ Car

1️⃣2️⃣ Instances of Car inherit from Car.prototype (which inherits from Vehicle.prototype).
const qq = new Car();
console.log(qq.__proto__ === Car.prototype);  
// ✅ true
console.log(qq.__proto__.__proto__ === Vehicle.prototype);  
// ✅ true

1️⃣3️⃣ Instances do not have prototype, only __proto__.
console.log(qq.prototype);  
// ✅ undefined

1️⃣ Functions Can Have a prototype, But Objects Cannot
Only functions (except arrow functions) have a prototype property.
Objects do not have a prototype property.
function Foo() {}
console.log(Foo.prototype); // ✅ { constructor: Foo }

const bar = {};
console.log(bar.prototype); // ❌ undefined
📌 Why?
prototype exists only for functions to define shared properties/methods for instances created using new.
Regular objects have __proto__, but no prototype.

2️⃣ The prototype of Arrow Functions is undefined
const ArrowFn = () => {};
console.log(ArrowFn.prototype); // ❌ undefined
📌 Why?
Arrow functions do not have their own this or prototype because they are not meant to be used as constructors.


5️⃣ Changing prototype After Creating Instances Doesn’t Affect Existing Objects
function Foo() {}
const foo1 = new Foo();

Foo.prototype.greet = function () { console.log("Hello!"); };

const foo2 = new Foo();
foo2.greet(); // ✅ "Hello!"
foo1.greet(); // ✅ "Hello!"

Foo.prototype = {};
const foo3 = new Foo();
console.log(foo3.greet); // ❌ undefined (new prototype is empty)
console.log(foo2.greet); // ✅ still works!
📌 Why?

Changing Foo.prototype after instances are created only affects future instances.
Old instances still reference the old prototype.


7️⃣ Object.getPrototypeOf(obj) is the Standard Way to Access __proto__
const obj = {};
console.log(Object.getPrototypeOf(obj) === obj.__proto__); // ✅ true
📌 Why?

Object.getPrototypeOf(obj) is the official way to get the prototype.
__proto__ is non-standard and legacy.


8️⃣ Object.setPrototypeOf(obj, prototype) Can Change __proto__ Dynamically
const obj = {};
Object.setPrototypeOf(obj, Array.prototype);
console.log(obj.push); // ✅ [Function: push] (obj now behaves like an array)
📌 Why?

This is the modern way to change an object's prototype, though it's slow and should be avoided in performance-critical code.
















2. Full List of Prototype Relationships
    (A) Instance - Level Relationships
const instance = new ParentFn();
instance.__proto__ === ParentFn.prototype
Object.getPrototypeOf(instance) === ParentFn.prototype
instance.constructor === ParentFn

    (B) Constructor - Level Relationships
function ParentFn() { }
ParentFn.prototype.constructor === ParentFn
ParentFn.__proto__ === Function.prototype
Function.prototype.__proto__ === Object.prototype
ParentFn.prototype.__proto__ === Object.prototype

    (C) Object.create() Relationships
const child = Object.create(parent);
child.__proto__ === parent
Object.getPrototypeOf(child) === parent
child.constructor === undefined(unless explicitly set)

4. Bonus: What About Arrays and Built -in Objects ?
const arr = [];
arr.__proto__ === Array.prototype
Array.prototype.__proto__ === Object.prototype
Array.__proto__ === Function.prototype












Inheritance
function Animal(name) {
    this.name = name;
}
Animal.prototype.makeSound = function () {
    console.log("Some generic sound...");
};

function Dog(name, breed) {
    Animal.call(this, name); // Calls Animal constructor
    this.breed = breed;
}

// ✅ Correct prototype inheritance
Dog.prototype = Object.create(Animal.prototype);

// ✅ Restore the correct constructor reference
Dog.prototype.constructor = Dog;


//THUMB RULE
function Vehicle(name) {
    this.name = name
}
console.log(Vehicle.prototype) => { constructor: ƒ }

Vehicle.prototype.start = function () {
    console.log("Engine started!");
};
Vehicle.prototype.country = 'India'
console.log(Vehicle.prototype) => { country: 'India', start: ƒ, constructor: ƒ }
console.log(Vehicle.prototype.constructor) => Vehicle
console.log(Vehicle.__proto__) => ƒ() { [native code] }
console.log(Vehicle.prototype.__proto__) => Object

const v = new Vehicle('rr')
console.log(v) => Vehicle { name: "rr", [[Prototype]]: Object }
console.log(v.__proto__) => { country: 'India', start: ƒ, constructor: ƒ }
console.log(v.__proto__ === Vehicle.prototype) // true
console.log(v.prototype) // undefined

function Car() { }
Car.prototype = Object.create(Vehicle.prototype);
console.log(Car.prototype) => Vehicle { }
console.log(Car.constructor) => ƒ Function() { [native code] }
console.log('b', Car.prototype.__proto__) => { country: 'India', start: ƒ, constructor: ƒ } === Vehicle.prototype
console.log('c', Car.prototype.constructor) =>  ƒ Vehicle(name) { this.name = name }
Car.prototype.constructor = Car
console.log('c', Car.prototype.constructor) => ƒ Car() { }
const qq = new Car()
console.log('a', qq.prototype) => undefined
console.log('a', qq.__proto__) => Vehicle { constructor: ƒ }



Challenge 1️⃣ (Easy)
What will be the output of the following code?

function Foo() {}
Foo.prototype.bar = "Hello";

const obj = new Foo();

console.log(obj.bar);
console.log(obj.hasOwnProperty("bar")); 





function Foo() {}
Foo.prototype = {
    bar: "Hello"
};

const obj1 = new Foo();
const obj2 = new Foo();

console.log(obj1.bar);
console.log(obj2.bar);
console.log(obj1.constructor === Foo);
console.log(Foo.prototype.constructor === Foo);

To restore the constructor:
Foo.prototype = { 
    bar: "Hello",
    constructor: Foo // 🔥 Manually restore the constructor
};

function Bar() {}
Bar.prototype = Object.create(Foo.prototype);

const obj3 = new Bar();
console.log(obj3.bar);
console.log(obj3.constructor === Bar);
console.log(obj3.constructor === Foo);


Restore: Bar.prototype.constructor = Bar;  // 🔥 Fix

function Foo() {}
Foo.prototype.bar = "Hello";

function Baz() {}
Baz.prototype = new Foo();  // 🔥 Key difference: using `new Foo()` instead of `Object.create`

const obj4 = new Baz();
console.log(obj4.bar);  
console.log(obj4.constructor === Baz);  
console.log(obj4.constructor === Foo);











function Person(name) {
    this.name = name;
}

Person.prototype.sayHello = function () {
    // console.log(`Hello, my name is ${this.name}`);
};

const user = new Person("Alice");

// console.log(user.__proto__ === Person.prototype); // true
// console.log(Person.prototype.__proto__ === Object.prototype); // true
// console.log(Object.prototype.__proto__); // null

function myInstanceOf(obj, Constructor) {
    let proto = obj.__proto__; // Object.getPrototypeOf(obj)
    while (proto) {
        if (proto === Constructor.prototype) return true;
        proto = proto.__proto__; // Object.getPrototypeOf(proto)
    }
    return false;
}

// Test
// console.log(myInstanceOf([], Array)); // true
// console.log(myInstanceOf({}, Array)); // false
// console.log(myInstanceOf(new Date(), Date)); // true

function A() { }
function B() { }

B.prototype = new A();

const b = new B();
// console.log(b.__proto__)
// console.log(b.__proto__.__proto__)
// console.log(b.__proto__.__proto__.__proto__)
// console.log(b.__proto__.__proto__.__proto__.__proto__)

function X() { }
function Y() { }

Y.prototype = Object.create(X.prototype);
const y = new Y();

// console.log(y instanceof X); // ???
// console.log(y instanceof Y); // ???
// console.log(y.__proto__ === Y.prototype); // ???
// console.log(y.__proto__.__proto__ === X.prototype); // ???
// console.log(y.__proto__.__proto__.__proto__ === Object.prototype); // ???

function A() { }
function B() { }

A.prototype.greet = function () { return "Hello from A"; }
B.prototype = new A();

const b1 = new B();

// console.log(b1.greet()); // ???

B.prototype.greet = function () { return "Hello from B"; }

// console.log(b1.greet()); // ???