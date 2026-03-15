/*
Great topic — this is one of the most important mental models for mastering DOM events in JavaScript. We’ll go step-by-step and build intuition, not just definitions.

🌊 Event Flow in the Browser — The Big Picture
Whenever you click an element in the DOM, the browser doesn’t just notify that element. The event travels through three phases:

Window → Document → HTML → Body → Parent → Target → Parent → Body → HTML → Document → Window
        (capturing)              (target)              (bubbling)
So an event has:

CAPTURING → TARGET → BUBBLING
Understanding these phases unlocks:

✅ Event bubbling
✅ Event capturing
✅ Event delegation

🟢 Event Bubbling (Default Behavior)
What it means
Event bubbling means:

The event starts at the clicked element and bubbles upward through its ancestors.

Example
HTML:

<div id="parent">
  <button id="child">Click me</button>
</div>
JavaScript:

parent.addEventListener("click", () => console.log("Parent clicked"));
child.addEventListener("click", () => console.log("Child clicked"));
When button is clicked:
Child clicked
Parent clicked
Why?

Because the event bubbles:

button → div → body → document
Why bubbling exists
It allows parent elements to react to child interactions — which is the foundation of delegation.

Stopping bubbling
child.addEventListener("click", (e) => {
  e.stopPropagation();
});
Now the parent won’t receive the event.

🔵 Event Capturing (Opposite Direction)
What it means
Capturing runs:

From outer elements → down to the target.

By default, listeners run in bubbling phase.

To enable capture:

parent.addEventListener(
  "click",
  () => console.log("Parent capture"),
  true
);
or

{ capture: true }
Execution order with capturing + bubbling
parent.addEventListener("click", () => console.log("Parent bubble"));
parent.addEventListener("click", () => console.log("Parent capture"), true);
child.addEventListener("click", () => console.log("Child bubble"));
Click child →

Parent capture
Child bubble
Parent bubble
Flow:

CAPTURE ↓
TARGET
BUBBLE ↑
When capturing is useful
Rare but helpful for:

Global interception

Security controls

Framework internals

Analytics logging

🟣 Event Delegation (The Power Move)
This is where bubbling becomes extremely useful.

Idea
Instead of attaching listeners to many children…

👉 Attach one listener to a parent
👉 Detect which child triggered the event

Example: 100 buttons
❌ Bad:

buttons.forEach(btn => btn.addEventListener("click", handler));
✅ Delegation:

container.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    console.log("Button clicked:", e.target.textContent);
  }
});
Why this works:

Event bubbles:

button → container
The container catches it.

Delegation superpowers
✅ Handles dynamic elements
New buttons added later still work — no extra listeners needed.

✅ Better performance
One listener instead of hundreds.

✅ Cleaner architecture
Centralized event logic.

target vs currentTarget (Important!)
Inside delegated handler:

container.addEventListener("click", (e) => {
  console.log(e.target);        // actual clicked element
  console.log(e.currentTarget); // container
});
Think:

target → where event originated
currentTarget → where handler is attached
🔥 Real-world mental model
Imagine nested boxes:

📦 grandparent
  📦 parent
    📦 child (click happens here)
Event travel:

Capturing:
grandparent → parent → child
Bubbling:
child → parent → grandparent
Delegation = parent says:

“I’ll listen for anything my kids click.”

⚠ Common pitfalls
1. Clicking nested elements
<button><span>Text</span></button>
Clicking span →

e.target === span
Fix:

e.target.closest("button")
2. stopPropagation misuse
Stops delegation chain → breaks architecture.

Use sparingly.

3. stopImmediatePropagation
Prevents other handlers on same element:

e.stopImmediatePropagation();
Rarely needed.

🧠 How frameworks use this
Libraries like:

React

Vue.js

Angular

internally rely heavily on delegation for performance.

🚀 Best practices
Use bubbling by default
It’s natural and efficient.

Prefer delegation when:
✔ Many similar elements
✔ Dynamic UI
✔ Lists/tables
✔ Interactive dashboards

Capture only when needed
Advanced scenarios.

🧩 Visual summary
Click happens ↓

CAPTURE:
window → document → html → body → parent

TARGET:
child

BUBBLE:
parent → body → html → document → window
Delegation lives here ↑
*/
