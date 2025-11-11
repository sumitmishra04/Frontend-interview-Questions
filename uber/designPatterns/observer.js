// 🎯 Subject (Publisher)
class Subject {
    constructor() {
        this.observers = []; // List of subscribers
    }

    subscribe(observer) {
        this.observers.push(observer); // Add a subscriber
    }

    unsubscribe(observer) {
        this.observers = this.observers.filter(sub => sub !== observer); // Remove a subscriber
    }

    notify(data) {
        this.observers.forEach(observer => observer.update(data)); // Notify all subscribers
    }
}

// 🎯 Observer (Subscriber)
class Observer {
    constructor(name) {
        this.name = name;
    }

    update(data) {
        console.log(`${this.name} received update: ${data}`);
    }
}

// ✅ Usage Example
const newsChannel = new Subject(); // Create a subject

const user1 = new Observer("Alice");
const user2 = new Observer("Bob");

newsChannel.subscribe(user1);
newsChannel.subscribe(user2);

newsChannel.notify("Breaking News: Observer Pattern Implemented!"); 
// Output:
// Alice received update: Breaking News: Observer Pattern Implemented!
// Bob received update: Breaking News: Observer Pattern Implemented!

newsChannel.unsubscribe(user1);
newsChannel.notify("Another News: Alice won't receive this!"); 
// Output:
// Bob received update: Another News: Alice won't receive this!
