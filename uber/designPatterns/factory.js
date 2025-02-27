// Imagine a 🍔 Burger Factory. You don’t cook each burger yourself—you order one, and the factory gives you a burger based on your choice (cheeseburger, veggie burger, etc.).

// A Factory Pattern works the same way in programming:
// ✅ You request an object, and
// ✅ The factory function creates and returns the correct object without exposing the object’s creation logic.



// without factory:  🔻 The problem? Every time we need a pet, we must know which class to use. 😩
class Dog {
    constructor(name) {
        this.name = name;
        this.type = "Dog";
    }
}

class Cat {
    constructor(name) {
        this.name = name;
        this.type = "Cat";
    }
}

const myDog = new Dog("Buddy");
const myCat = new Cat("Whiskers");

console.log(myDog); // { name: 'Buddy', type: 'Dog' }
console.log(myCat); // { name: 'Whiskers', type: 'Cat' }


class PetFactory {
    static createPet(type, name) {
        switch (type.toLowerCase()) {
            case "dog":
                return { name, type: "Dog" };
            case "cat":
                return { name, type: "Cat" };
            case "parrot":
                return { name, type: "Parrot", canTalk: true };
            default:
                throw new Error("Invalid pet type!");
        }
    }
}

// 🐶 Create pets using the factory
const myDog1 = PetFactory.createPet("dog", "Buddy");
const myParrot = PetFactory.createPet("parrot", "Polly");

console.log(myDog1);   // { name: 'Buddy', type: 'Dog' }
console.log(myParrot); // { name: 'Polly', type: 'Parrot', canTalk: true }


// 📌 Why is This Better?
// ✅ Encapsulation – The logic of object creation is hidden inside the factory.
// ✅ Scalability – We can add more types (fish, hamster) without changing other code.
// ✅ Flexibility – We don’t need to remember class names—just call createPet().

