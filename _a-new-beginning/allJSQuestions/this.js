/*
function show() {
    console.log(this);
}
show();


this is global here because you're calling the function in the global context without any owner object. In non-strict mode, JavaScript automatically binds this to the global object in such cases.
*/
//======================================================================================================
/*
const obj = {
    name: "Liam",
    show() {
        console.log(this.name);
    },

obj.show();

In a method call, this always points to the object before the dot (.).
It logs “Liam” because the method is being called as a property of obj, so this refers to obj, and obj.name is "Liam".

*/
//======================================================================================================

/*
const obj = {
    name: "Liam",
    show() {
        console.log(this.name);
    },
};
const fn = obj.show;
fn();

Because when you do const fn = obj.show;, you are taking the function out of the object.

When you call obj.show(), this refers to obj (object to the left of the dot).

But when you call fn(), there is no object to the left of the call, so this is not obj anymore.

*/

/*======================================================================================================
const obj = {
    name: "Liam",
    show() {
        setTimeout(function() {
            console.log(self.name);
        }, 1000);
    },
};
obj.show();

Inside setTimeout(function() { ... }), a regular function is used. In JavaScript:

Regular functions get their own this based on how they are called.

In this case, it's called by setTimeout, not by obj, so this defaults to:

undefined in strict mode

window in non-strict mode
Neither of these has a name property equal to "Liam".

fix: use arrow operator or closure to bind this to self and use self.name.
======================================================================================================*/


/*
const obj = {
    name: "Liam",
    show() {
        function inner() {
            console.log(this.name);
        }
        inner();
    },
};
obj.show();


inner is a regular function which gets it own this. hence undefined. either use arrow operator or 
inner.bind(this)(); or use closure like const self = this;
*/
//======================================================================================================


/*

function Person(name) {
    this.name = name;
    this.show = () => {
        console.log(this.name);
    };
}
const p = new Person("Liam");
const fn = p.show;
fn();

Using an arrow function inside the constructor traps this to always refer to the instance (the object created with new) — so even when you detach the method and call it separately, it still remembers this as p.

*/
//======================================================================================================


/*


function Person(name) {
    this.name = name;
    this.show = () => {
        console.log(this.name);
    };
}
const newObj = {
    name: 'harry'
}
const p = new Person("Liam");
const fn = p.show.bind(newObj);
fn();

.bind(), .call(), .apply() DO NOT change this for arrow functions.
Arrow functions capture this from their surrounding (lexical scope) when they are defined, not when they are called.
Arrow functions have lexical this, not dynamic. Once they capture this when defined, no one (not even .bind()) can change it.
*/
//======================================================================================================


/*
const obj = {
    name: "Liam"
};

function show() {
    console.log(this.name);
}

show.call(obj);
show.apply(obj);
*/
//======================================================================================================
/*
const obj = {
    name: "Liam"
};

const show = () => {
    console.log(this.name);
};
const boundFn = show.bind(obj);
boundFn();

*/
//======================================================================================================


/*
const obj = {
    name: "Liam",
    show() {
        setTimeout(this.show, 1000);
    },
};

obj.show();

obj.show() is called → inside it, you pass this.show as a callback to setTimeout.

So you're NOT calling it as obj.show() anymore. Instead, you're passing a reference to the function alone, without its object context.

When setTimeout executes that function after 1 second, it calls it as a normal function: not as a method of obj.

That means inside show at that time, this is no longer obj.

solution:  setTimeout(this.show.bind(this), 1000);


*/
//======================================================================================================


/*
const obj = {
    name: "Liam",
    getName() {
        return function() {
            console.log(this.name);
        };
    },
};
const fn = obj.getName();
fn();

*/
//======================================================================================================


/*
const obj = {
    name: "Liam",
    getName() {
        return function() {
            return () => {
                console.log(this.name);
            };
        };
    },
};
const fn = obj.getName();
const innerFn = fn.call({
    name: "Mia"
});
innerFn();

*/
//======================================================================================================


/*
class Person {
    constructor(name) {
        this.name = name;
    }
    show() {
        console.log(this.name);
    }
}
const p = new Person("Liam");
const fn = p.show;
fn();
*/
//======================================================================================================

/*
class Person {
    constructor(name) {
        this.name = name;
        this.show = () => {
            console.log(this.name);
        };
    }
}
const p = new Person("Liam");
const fn = p.show;
fn();

*/
//======================================================================================================


/*
const obj = {
    name: 'obj',
    arrowGet: () => {
        return this.name; 
    },
    regularGet() {
        return this.name;
    },
    mixed() {
        const arrow = () => {
            return this.name;
        };
        return arrow();
    }
};
console.log(obj.arrowGet()); // ?
console.log(obj.regularGet()); // ?
console.log(obj.mixed()); // ?

*/
//======================================================================================================
