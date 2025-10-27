/*================================================================================================
console.log(foo)
var foo = 10
function foo() {
  console.log("Hello from function foo!")
}
console.log(foo)

🧠 Understanding Hoisting:

JavaScript hoists declarations in two phases:

✅ 1. Function Declarations are hoisted first (with their full definition).
✅ 2. Variable declarations (var) are hoisted next, but only the declaration, not the assignment.

When both a function and a var with the same name exist:

Function declaration takes priority during hoisting.

[IMPORTANT 🧠] Then the var foo declaration is hoisted (but not its value), which does not override the function.

Later during execution, when the code reaches foo = 10, it reassigns that identifier.

Transforms into:

function foo() {
  console.log("Hello from function foo!")
}
var foo // the foo value is not overridden.

console.log(foo)
foo = 10
console.log(foo)
================================================================================================*/

/*================================================================================================
console.log(a) // Output: ?

var a = 5

function b() {
  console.log(a) // Output: ?
  var a = 20
}

b()
console.log(a) // Output: ?
================================================================================================*/

/*================================================================================================
function a() {
  console.log("A")
}

var a = 10

function test() {
  a() // Output: ?
  var a = function () {
    console.log("B")
  }
}

test()
================================================================================================*/

/*================================================================================================
var a = 1;
function b() {
  a = 10;
  return;
  function a() {}
}
b();
console.log(a);

So:
A local variable a (as a function) is created inside b.
This local a shadows (hides) the global a.
When you write a = 10, you're actually updating the local a, not the global one.
Then return; exits the function before anything else can happen.
================================================================================================*/

/*================================================================================================
function foo() {
  function bar() {
    return 3;
  }
  return bar();
  function bar() {
    return 8;
  }
}
console.log(foo());

If multiple function declarations with the same name exist in the same scope, the last one wins (gets hoisted last and overrides the previous ones).
================================================================================================*/

/*================================================================================================
function parent() {
  var hoisted = "I'm a variable";
  function hoisted() {
    return "I'm a function";
  }
  return hoisted();
}
console.log(parent());
================================================================================================*/

/*================================================================================================
console.log(foo());
function foo() {
  var bar = function () {
    return 3;
  };
  return bar();
  var bar = function () {
    return 8;
  };
}
  Function declarations are fully hoisted (including their body).

Function expressions assigned to var only hoist the variable declaration, but not the assignment
function foo() {
  var bar; // Only the declaration is hoisted (NOT the function)
  
  bar = function () {  // ✅ First assignment
    return 3;
  };
  return bar();        // 🚀 bar is already assigned to return 3, so it returns 3.
  
  var bar = function () { // ❌ This never runs, dead code after return
    return 8;
  };
}

The second var bar = function() { return 8; } is after the return, so it is never executed.

There is no overriding like in the previous example because the second function expression never gets assigned.
================================================================================================*/

/*================================================================================================
var myVar = 'foo';
(function () {
  console.log("Original value was: " + myVar);
  var myVar = "bar";
  console.log("New value is: " + myVar);
})();
================================================================================================*/

/*================================================================================================

var foo = 1;
function bar() {
  console.log(foo);
  var foo = 2;
  function foo() {}
}
bar();

================================================================================================*/

/*================================================================================================

var x = 10;

function test() {
  console.log(x);
  if (false) {
    var x = 20;
  }
}
test();
Declarations (var) are hoisted to the top of their scope (function), but assignments happen in place.

Even unreachable var declarations still get hoisted.
================================================================================================*/

/*================================================================================================
function foo() {
  console.log(x);
  var x = 1;
  let y = 2;
  function x() {}
  console.log(x, y);
}
foo();
================================================================================================*/

/*================================================================================================
var x = 1;
function foo() {
  console.log(x);
  var x = 2;
  function x() {}
  console.log(x);
}
foo();
console.log(x);
================================================================================================*/

/*================================================================================================
function foo() {
  console.log(bar);
  var bar = 10;
  function bar() {}
  console.log(bar);
}
foo();
================================================================================================*/

/*================================================================================================
function a() {
  console.log("A")
}

var a = 10

function test() {
  a() // Output: ?
  var a = function () {
    console.log("B")
  }
}

test()
================================================================================================*/

/*================================================================================================
================================================================================================*/

