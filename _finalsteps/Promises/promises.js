// Step 1: Define the MagicBox class
class MagicBox {
  constructor() {
    this.isDone = false
    this.result = null
    this.callbacks = []
  }

  // Step 2: Add a method to tell the magic box what to do when it's done
  then(onFulfilled, onRejected) {
    if (this.isDone) {
      // If the magic box is already done, call the appropriate callback
      if (this.result instanceof Error) {
        onRejected(this.result)
      } else {
        onFulfilled(this.result)
      }
    } else {
      // If the magic box is not done yet, save the callbacks for later
      this.callbacks.push({ onFulfilled, onRejected })
    }
  }

  // Step 3: Add a method to resolve the magic box and give it a special toy
  resolve(result) {
    if (!this.isDone) {
      this.isDone = true
      this.result = result
      // Call all the saved callbacks with the special toy
      this.callbacks.forEach(({ onFulfilled }) => onFulfilled(this.result))
    }
  }

  // Step 4: Add a method to reject the magic box and say it can't find any toys
  reject(error) {
    if (!this.isDone) {
      this.isDone = true
      this.result = new Error(error)
      // Call all the saved callbacks with the error message
      this.callbacks.forEach(({ onRejected }) => onRejected(this.result))
    }
  }
}

// Step 5: Let's play with our magic box!

// Create a new magic box
const myMagicBox = new MagicBox()

// Tell the magic box what to do when it's done
myMagicBox.then(
  (toy) => console.log("I got a special toy:", toy),
  (error) =>
    console.error("Oops! The magic box couldn't find any toys:", error.message)
)

// Now, let's resolve the magic box and give it a special toy
myMagicBox.resolve("Teddy bear")

// Output: I got a special toy: Teddy bear

// Let's try rejecting the magic box this time
myMagicBox.reject("Sorry, no more toys left")

// Output: Oops! The magic box couldn't find any toys: Sorry, no more toys left
