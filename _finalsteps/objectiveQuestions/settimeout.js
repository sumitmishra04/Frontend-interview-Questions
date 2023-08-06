// 1. Write a function that takes a name as input and displays a greeting message with the name after 2 seconds using setTimeout.

function displayGreetings(name) {
  setTimeout(() => {
    console.log(name)
  }, 2000)
}

// 2. Create a countdown timer that starts from a given number of seconds and decrements every second.
// Display the remaining time on the screen using setTimeout. The timer should stop when it reaches zero.

function countdown(time) {
  if (time === 0) {
    return
  }
  const timer = setTimeout(() => {
    console.log(time)
    countdown(time - 1)
    clearTimeout(timer)
  }, 1000)
}

// 3. Build a function that generates a random color and applies it as the background color of an HTML
// element every 3 seconds using setTimeout.

function colorGenerator(time) {
  setTimeout(() => {
    const letters = "0123456789ABCDEF"
    let color = "#"

    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }

    console.log(color)
    colorGenerator()
  }, 3000)
}

// 4. Debouncing Input:
// Implement a debounce function using setTimeout that delays calling a function until after the user stops typing.
// For example, if the user is typing in a search bar, delay the search function until they pause for 1 second.

function debounce(fn, delay) {
  let timer
  clearTimeout(timer)
  return function () {
    timer = setTimeout(() => {
      fn()
    }, delay)
  }
}
