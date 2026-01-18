// Problem Statement

// import React, { useState } from "react";

// const UseStateInput = () => {
//   const [inputValue, setInputValue] = useState("");
//   console.log("render");

//   const handleChange = (e) => {
//     setInputValue(e.target.value);
//   };

//   return (
//     <div>
//       <input
//         value={inputValue}
//         onChange={handleChange}
//         placeholder="Type something..."
//       />
//     </div>
//   );
// };

// export default UseStateInput;

// Solution By UseRef 

import React, { useRef } from "react";

const UseRefInput = () => {
  const inputRef = useRef(""); // store input value
  console.log("render"); // will NOT run on every keystroke

  const handleChange = (e) => {
    inputRef.current = e.target.value; // update ref value
    console.log("Current value:", inputRef.current); // track input
  };

  return (
    <div>
      <input
        defaultValue=""
        onChange={handleChange}
        placeholder="Type something..."
      />
    </div>
  );
};

export default UseRefInput;

// Here simple search input where user can search something like in real world apps but problem is render parent component on each letter type

/* 🔵 React useRef Hook — Complete Deep Dive

(1) useRef is a React Hook that acts like a component’s private memory (cache).
(2) It stores a mutable value that persists across re-renders, can remember previous state values, and can be updated     manually without causing the component to re-render or update the UI.
(3) The stored value resets only when the component unmounts.
(4)It is commonly used for DOM references, timers, and tracking values without affecting the UI.

// 🧠 FIRST: Why useRef Exists (Big Picture)

// | Data Type | Changes cause re-render? |
// | --------- | ------------------------ |
// | `state`   | ✅ Yes                  |
// | `ref`     | ❌ No                   |


👉 useRef is for data you want to remember BUT don’t want to re-render UI.

🧩 React’s Fundamental Rule

React UI works on this simple idea:

UI = f(state)


➡️ When state changes → React re-renders → UI updates
➡️ When nothing changes → React does nothing

This is great for UI, but bad for some cases.

🚨 The Problem React Faced

In real apps, we need data that must survive renders, BUT:

❌ should NOT trigger re-render

❌ should NOT affect UI directly

❌ should NOT be recalculated

❌ should NOT be lost on re-render

Examples of such data:

DOM elements

Timers (setTimeout, setInterval)

WebSocket connections

Previous values

Render counters

Mutable caches

🧪 What Happens WITHOUT useRef

❌ Normal variable inside component
function App() {
  let count = 0;

  function handleClick() {
    count++;
    console.log(count);
  }

  return <button onClick={handleClick}>Click</button>;
}

Internal Reality
Render #1 → count = 0
Click → count = 1

Render #2 → count = 0 ❌ RESET


➡️ Component re-render destroys normal variables

🧪 What About useState?
const [count, setCount] = useState(0);

Problems with state here:

❌ Causes re-render

❌ Expensive for non-UI data

❌ Async updates

❌ Can cause render loops

👉 React needed memory without rendering

💡 React’s Solution → useRef

| Requirement                 | Needed?   |
| ----------------------      | -------   |
| Persist data across renders | ✅       |
| No re-render                | ✅       |
| Mutable                     | ✅       |
| Fast                        | ✅       |
| Simple                      | ✅       |

➡️ That is exactly useRef


📦 What useRef Actually Is
const ref = useRef(initialValue);


React gives you:

Persistent Object
{
  current: initialValue
}

Key Insight 🔑

React never watches ref.current

So:

Change it freely

React ignores it for rendering

🔁 Internal Mental Diagram
Component Render Cycle

Render #1
  useRef() → create object

Render #2
  useRef() → return SAME object

Render #3
  useRef() → return SAME object


➡️ Object lives outside render logic

useRef exists because React needed a way to remember things without re-rendering UI.

One-sentence comparison

useState → changes value and updates UI

useRef → changes value without updating UI

Super short rule to remember 🧠

useState = screen updates
useRef = memory box

👉 useRef is like a small cache inside a component.

How it’s like caching

Stores a value

Value persists across re-renders

Fast access

Doesn’t trigger UI update

useRef = cache for this component

| Thing                    | useRef |
| ------------------------ | ------ |
| Cached during re-renders | ✅      |
| Survives page refresh    | ❌      |
| Shared globally          | ❌      |
| Triggers re-render       | ❌      |

Best mental model 🧠

useRef = component’s private cache / memory

Simple one-line difference

useRef caches a value you manually change
useMemo caches a value React recalculates for you

| Feature           | useRef                            | useMemo                  |
| ----------------- | --------------------------------- | ------------------------ |
| Purpose           | Store mutable value               | Cache calculation result |
| Who updates it    | You                               | React                    |
| Causes re-render  | ❌ No                              | ❌ No                  |
| Dependency array  | ❌ No                              | ✅ Yes                 |
| Resets on unmount | ✅ Yes                             | ✅ Yes                 |
| Typical use       | DOM refs, timers, previous values | Expensive computations   |

Mental model 🧠

useRef → memory box

useMemo → calculator with cache

When NOT to use useRef

When UI needs to update → use useState

For derived data → use useMemo

*/

/*__________________________________🟢 PHASE 0 — What is useRef? (Ultra Basics)__________________________

Let’s understand useRef without React jargon, using very simple words.

🔹 Simple Definition

useRef is a hook that gives you a box which React remembers forever for that component.

This box:

stays the same across renders

can store any value

changing it does NOT re-render the component

🔹 Basic Syntax
const ref = useRef(initialValue);


What you get back:

{
  current: initialValue
}

📦 Mental Model (MOST IMPORTANT)

Think like this:

useRef(10)

┌──────────────────┐
│   ref object     │
│                  │
│   current: 10    │
│                  │
└──────────────────┘


ref → the box

current → value inside the box

🔁 What Happens on Re-render?
function App() {
  const myRef = useRef(0);
  console.log(myRef.current);
}

Internal Timeline
Render #1 → create box → current = 0
Render #2 → SAME box → current still there
Render #3 → SAME box → current still there


❗ React never creates a new box

🔹 Changing Ref Value
myRef.current = 5;


Value changes immediately

No re-render

UI stays same

🔹 Why current? (Important Concept)

React intentionally uses:

ref.current


Why?

Object reference must stay same

Only value inside changes

If React allowed:

ref = 10 ❌


Then:

ref identity breaks

React can’t track it

🔹 What Can current Store?

✔ Number
✔ String
✔ Object
✔ Array
✔ Function
✔ DOM element
✔ Class instance

*/

/* ___________________🟢 PHASE 1 — How useRef Works Internally (React Internals)_______________

🔍 Step 1: Every Component Has a Fiber

When React renders a component, it creates a Fiber node.

Think of Fiber like:

Component Fiber
├── type (function)
├── props
├── state hooks
├── effect hooks
├── ref hooks
└── children


👉 useRef lives inside the Fiber, not inside your function.

🔍 Step 2: What Happens on First Render
const myRef = useRef(0);

Internal React Logic (Simplified)
If hook does NOT exist:
  create ref object
  store in Fiber
  return ref

Internal Structure
Fiber.memoizedState
 └── refHook
       └── { current: 0 }


📦 This object is created only once

🔁 Step 3: What Happens on Re-render

On re-render, React does NOT recreate ref.

If hook EXISTS:
  return SAME ref object

Visual Flow
Render #1 → create ref → store in Fiber
Render #2 → return same ref
Render #3 → return same ref

🔬 Step 4: Why ref.current Does NOT Trigger Re-render

React rendering system watches:

state

props

React does NOT track:

ref.current


Because:

ref object identity never changes

only inner value mutates

➡️ React ignores it completely during reconciliation.

🧠 Step 6: Why React Chose Object with .current

If React returned just value:

const value = useRef(0); ❌


Then on re-render:

value would reset

Using object:

reference remains same

content can change


🧩 Step 7: Internal Comparison with useState

| Feature            | `useState` | `useRef` |
| ------------------ | ---------- | -------- |
| Stored in Fiber    | ✅          | ✅     |
| Triggers re-render | ✅          | ❌     |
| Used in JSX        | ✅          | ❌     |
| Async updates      | ✅          | ❌     |
| Mutable            | ❌          | ✅     |
| Performance cost   | Higher     | Very low |

🔥 Real Rule You Should Remember

| Question                     | Use        |
| ---------------------------- | ---------- |
| Does UI need to update?      | `useState` |
| Just need to remember value? | `useRef`   |
| Value used only in logic?    | `useRef`   |
| User can see it?             | `useState` |



🧠 Key Internal Insight

useRef is a Fiber-level memory slot that React never reconciles.

*/

/*_________________🟢 PHASE 3 — useRef for DOM Access (How React Connects to Real DOM)____________

🧠 Why DOM Access is Needed in React

React normally says:

“Don’t touch the DOM, I’ll handle it.”

But some things require direct DOM access:

focus input

scroll element

measure height/width

play/pause video

canvas / media APIs

➡️ useRef is React’s official escape hatch to DOM

🔹 Basic DOM Ref Example
function App() {
  const inputRef = useRef(null);

  function focusInput() {
    inputRef.current.focus();
  }

  return (
    <>
      <input ref={inputRef} />
      <button onClick={focusInput}>Focus</button>
    </>
  );
}

🔍 What Happens Internally (Step-by-Step)
Step 1: Render Phase
JSX created
<input ref={inputRef} />


At this moment:

inputRef.current === null


⚠️ DOM does NOT exist yet

Step 2: Commit Phase (Important)

After React finishes rendering:

DOM element created
React assigns:
  inputRef.current = <input DOM node>


📦 Now ref holds real DOM node

Step 3: Using the DOM
inputRef.current.focus();


This directly calls browser DOM API.

🧪 Internal Timeline (Terminal Style)
Render phase
  ref.current = null

Commit phase
  DOM created
  ref.current = DOM node

Event handler
  ref.current.focus()

⚠️ Important Rule: When ref.current is Available
Time	Value
During render	null
After mount	DOM node
After unmount	null
❌ Common Mistake
console.log(inputRef.current); // null ❌


Why?

Happens during render

DOM not mounted yet

✅ Correct Place to Access DOM
useEffect(() => {
  inputRef.current.focus();
}, []);


Because:

useEffect runs after DOM commit

🔥 Advanced: Measuring DOM Size
useEffect(() => {
  const height = inputRef.current.offsetHeight;
  console.log(height);
}, []);


Used for:

layouts

animations

virtualization

🔄 Cleanup on Unmount
useEffect(() => {
  return () => {
    inputRef.current = null;
  };
}, []);


(Not required, React does this automatically)

🧠 Why React Uses ref Instead of Query Selectors

❌ Bad:

document.querySelector("input")


Problems:

breaks React tree isolation

unsafe in concurrent rendering

selects wrong node

✅ Good:

useRef()

🔐 Security Perspective

⚠️ DOM refs allow:

.innerHTML

.style

.setAttribute

❌ Never inject user input manually
❌ Avoid XSS risks

✅ Let React update DOM whenever possible

🧠 Mental Model
useRef → Fiber → DOM node

🧠 One-Line Summary

useRef gives safe, scoped, React-controlled access to real DOM elements.


*/

/*____________🟢 PHASE 4 — Persistent Values Without Re-render (Hidden Superpower of useRef)_____________


1️⃣ Auto-focus input (Login / Search)

Used in: Login forms, search bars

const inputRef = useRef(null);

useEffect(() => {
  inputRef.current.focus();
}, []);


✅ Focuses input when page opens
✅ No re-render needed

2️⃣ Prevent multiple API calls (Button spam)

Used in: Submit buttons, payment actions

const isSubmitting = useRef(false);

const submit = async () => {
  if (isSubmitting.current) return;

  isSubmitting.current = true;
  await apiCall();
  isSubmitting.current = false;
};


✅ Blocks double click
✅ Faster than state

3️⃣ Store previous state (Compare values)

Used in: Analytics, change detection

const prevValue = useRef(null);

useEffect(() => {
  prevValue.current = value;
}, [value]);


✅ Compare old vs new value
✅ No UI re-render

4️⃣ Timers & intervals (OTP, countdown)

Used in: OTP screens, session timers

const timerRef = useRef(null);

useEffect(() => {
  timerRef.current = setInterval(() => {
    console.log("tick");
  }, 1000);

  return () => clearInterval(timerRef.current);
}, []);


✅ Clean timer handling
✅ Avoid memory leaks

5️⃣ Scroll position memory

Used in: Chat apps, feeds

const scrollRef = useRef(0);

const onScroll = (e) => {
  scrollRef.current = e.target.scrollTop;
};


✅ Remember scroll without re-render
✅ Smooth performance

6️⃣ Access third-party libraries (charts, maps)

Used in: Google Maps, Chart.js

const chartRef = useRef(null);

useEffect(() => {
  chartRef.current = new Chart(canvas);
}, []);


✅ Store library instance
✅ Prevent re-initialization

7️⃣ Track component mounted status

Used in: Async calls safety

const isMounted = useRef(true);

useEffect(() => {
  return () => {
    isMounted.current = false;
  };
}, []);


✅ Prevent state update after unmount
✅ Avoid warnings

Mental model for real apps 🧠

If it’s needed for logic, not for UI → useRef

*/

/* _______________🟢 Phase 5 "How useRef Solves Common Vanilla JS Problems in React"________________

1️⃣ Direct DOM access

Vanilla JS way:

const input = document.getElementById("myInput");
input.focus();


✅ Works perfectly in plain JS.

Problem in React:

You don’t manually query the DOM.

React manages the DOM for you.

Using document.getElementById breaks React’s declarative model and can be unsafe.

useRef solves this:

const inputRef = useRef(null);

<input ref={inputRef} />
<button onClick={() => inputRef.current.focus()}>Focus</button>


✅ Safe, declarative, React-friendly.
✅ No need for document.getElementById.

2️⃣ Storing a value without re-render

Vanilla JS way:

let counter = 0;

function increment() {
  counter++;
  console.log(counter);
}


✅ Works fine in JS because there’s no virtual DOM.

Problem in React:

If you store counter in a local variable inside a component function, it resets on every render.

If you store it in state, every increment re-renders the UI, which may be unnecessary for some cases.

useRef solves this:

const counterRef = useRef(0);

function increment() {
  counterRef.current++;
  console.log(counterRef.current);
}


✅ Persists across renders
✅ No UI re-render

3️⃣ Storing timers / intervals

Vanilla JS:

let timer = setInterval(() => console.log("tick"), 1000);
clearInterval(timer);


✅ Simple.

Problem in React:

If you create a timer inside a component, the variable is lost on re-render.

You need a stable reference across renders.

useRef solves this:

const timerRef = useRef(null);

useEffect(() => {
  timerRef.current = setInterval(() => console.log("tick"), 1000);
  return () => clearInterval(timerRef.current);
}, []);


✅ Safe and persists across re-renders

4️⃣ Storing previous state

Vanilla JS:

let prevValue = 0;
function update(newValue) {
  console.log("Previous:", prevValue);
  prevValue = newValue;
}


Problem in React:

Local variables reset on each render.

State updates trigger re-renders (we may not want that).

useRef solves this:

const prevValue = useRef(null);

useEffect(() => {
  prevValue.current = value; // remember previous value
}, [value]);


✅ Can track previous value without causing UI updates

| Vanilla JS Problem      | Why it fails in React                           | `useRef` Fix                            |
| ----------------------- | ----------------------------------------------- | --------------------------------------- |
| Direct DOM manipulation | React controls DOM; querying manually is unsafe | `ref` gives safe access to DOM nodes    |
| Persistent variable     | Local variable resets on re-render              | `useRef` persists value across renders  |
| Timers / intervals      | Variables reset on re-render                    | Store timer ID in `useRef`              |
| Previous state tracking | Local variable resets, state triggers re-render | `useRef` tracks previous value silently |



 */

/*___________________________🟢 Phase 6 🔵 Real-World useRef Usage in Apps____________________

1️⃣ DOM Manipulation & Focus

| Usage                  | How                                  | Why `useRef`                  |
| ---------------------- | ------------------------------------ | ----------------------------- |
| Auto-focus input       | `inputRef.current.focus()`           | Access DOM safely after mount |
| Scroll to element      | `elRef.current.scrollIntoView()`     | Smooth scroll or navigation   |
| Measuring element size | `elRef.current.offsetHeight`         | Dynamic layout or animation   |
| Canvas / WebGL         | `canvasRef.current.getContext('2d')` | Direct DOM API access         |

Example:

const inputRef = useRef(null);

useEffect(() => {
  inputRef.current.focus();
}, []);


2️⃣ Storing Previous State or Props

| Usage                  | How                           | Why `useRef`                               |
| ---------------------- | ----------------------------- | ------------------------------------------ |
| Compare previous value | `prevValue.current = value`   | Track changes without triggering re-render |
| Animation triggers     | Store previous positions      | Logic-only storage for diffing             |
| Undo/redo stack        | Keep previous state snapshots | Efficient storage outside state            |


Example:

const prevCount = useRef(0);
useEffect(() => {
  prevCount.current = count;
}, [count]);


3️⃣ Timers & Intervals

| Usage            | How                                               | Why `useRef`                    |
| ---------------- | ------------------------------------------------- | ------------------------------- |
| `setTimeout`     | `timerRef.current = setTimeout(...)`              | Persist timer ID across renders |
| `setInterval`    | Store interval ID                                 | Stop / clear later safely       |
| Animation frames | `requestRef.current = requestAnimationFrame(...)` | Cancel on unmount               |

Example:

const timerRef = useRef();
timerRef.current = setInterval(() => setCount(c => c+1), 1000);
clearInterval(timerRef.current);

4️⃣ WebSockets, Fetch, or API Connections

| Usage           | How                                             | Why `useRef`                   |
| --------------- | ----------------------------------------------- | ------------------------------ |
| Store WebSocket | `socketRef.current = new WebSocket(...)`        | Connection survives re-renders |
| AbortController | `controllerRef.current = new AbortController()` | Cancel fetch on unmount        |

const socketRef = useRef(null);
useEffect(() => {
  socketRef.current = new WebSocket(url);
  return () => socketRef.current.close();
}, []);

5️⃣ Form Handling & Uncontrolled Components

6️⃣ Animation & Motion

| Usage                  | How                     | Why `useRef`                      |
| ---------------------- | ----------------------- | --------------------------------- |
| Track animation frames | `requestAnimationFrame` | Stop or pause frames dynamically  |
| Track element position | Store previous X/Y      | Smooth animation, physics engines |
| CSS transitions        | Track DOM nodes         | Apply transformations directly    |

7️⃣ Component Mounted / Unmounted Check

| Usage                         | How                              | Why `useRef`          |
| ----------------------------- | -------------------------------- | --------------------- |
| Avoid `setState` on unmounted | `isMounted.current`              | Prevent memory leaks  |
| Conditional logic             | Only run if component is mounted | Safe async operations |

Example:

const isMounted = useRef(false);
useEffect(() => {
  isMounted.current = true;
  return () => isMounted.current = false;
}, []);
| Usage              | How                            | Why `useRef`                         |
| ------------------ | ------------------------------ | ------------------------------------ |
| Uncontrolled input | `<input ref={inputRef} />`     | Avoid state for every keystroke      |
| File upload        | `fileInputRef.current.click()` | Trigger file picker programmatically |
| Reset form         | `formRef.current.reset()`      | Clear values without re-render       |

6️⃣ Animation & Motion

| Usage                  | How                     | Why `useRef`                      |
| ---------------------- | ----------------------- | --------------------------------- |
| Track animation frames | `requestAnimationFrame` | Stop or pause frames dynamically  |
| Track element position | Store previous X/Y      | Smooth animation, physics engines |
| CSS transitions        | Track DOM nodes         | Apply transformations directly    |

7️⃣ Component Mounted / Unmounted Check

| Usage                         | How                              | Why `useRef`          |
| ----------------------------- | -------------------------------- | --------------------- |
| Avoid `setState` on unmounted | `isMounted.current`              | Prevent memory leaks  |
| Conditional logic             | Only run if component is mounted | Safe async operations |

Example:

const isMounted = useRef(false);
useEffect(() => {
  isMounted.current = true;
  return () => isMounted.current = false;
}, []);


8️⃣ Caching & Logic Memory (Non-UI)

| Usage                          | How                         | Why `useRef`                     |
| ------------------------------ | --------------------------- | -------------------------------- |
| Store expensive calculation    | `cacheRef.current = result` | Avoid recalculating every render |
| Track previous scroll position | `scrollRef.current = yPos`  | Smooth scrolling logic           |
| Track hover or drag state      | `dragRef.current = true`    | Logic-only tracking              |

9️⃣ Forwarding Refs (forwardRef)

| Usage                        | How                   | Why `useRef`                                |
| ---------------------------- | --------------------- | ------------------------------------------- |
| Pass ref from parent → child | `<Child ref={ref} />` | Allow parent to access child DOM or methods |
| Expose methods               | `useImperativeHandle` | Custom APIs on child components             |

Example:

const Input = forwardRef((props, ref) => <input ref={ref} />);
const inputRef = useRef(null);
<Input ref={inputRef} />

10️⃣ Debugging & Logging

| Usage              | How                         | Why `useRef`              |
| ------------------ | --------------------------- | ------------------------- |
| Track render count | `renderCount.current++`     | Debug performance         |
| Log previous props | `prevProps.current = props` | Compare changes over time |

✅ Summary of Real App Scenarios

UI-related DOM → focus, scroll, measure

Timers & async logic → interval, timeout, animation

Network connections → WebSocket, fetch, AbortController

Form & inputs → uncontrolled components

Animation & motion → frames, positions

Component lifecycle checks → mounted/unmounted

Logic-only memory → caching, previous values

Forwarding refs → parent-child communication

Debugging → render counts, previous props

==> Refs Can Store Anything

DOM nodes ✅

Numbers ✅

Objects ✅

Functions ✅

Class instances ✅

Arrays ✅
*/
