import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);
  // Declare state variable 'count' with initial value 0
  // 'setCount' is the function to update 'count'

  const increment = () => {
    setCount((prev) => prev + 1); // updates state
    // setCount(count + 1);
    // console.log(count);
  };
  return (
    <>
      {/* Display current count */}
      <p>{count}</p>

      {/* Button click updates state */}
      <button onClick={increment}>Increment</button>
    </>
  );
};

export default Counter;

// ✅ Explanation:

// count → current state value.

// setCount → function to update state.

// useState(0) → initializes count to 0.

// React re-renders the component whenever setCount is called.

// ____________________________ What are react hooks ?______________

// React hooks are just type of functions which provides some features to build a project in efficient manner. Each hook has its own syntax and features.
// UseState, UseEffect, UseRef, UseContext etc.

// Three Main Rules of hooks
// 1- Hooks cant be conditionals and loops.
// 2- Hooks will write inside only in functional component.
// 3- Hooks will write at starting or Top of functional component.

// 🧠 Others Rules of Hooks Explained With Fiber Internals

// 🔹 Quick Fiber Recap

// Each component has a Fiber node.

// Hooks are stored in a linked list or array on the Fiber node.

// Fiber tracks hook state, memoized values, and effects.

// React matches hooks by call order, not by name.

// Fiber
//  └─ hooks: [hook0, hook1, hook2, ...]

// ✅ RULE 1: Call Hooks Only at the Top Level

// Fiber Reason

// React relies on hookIndex during render.

// hookIndex increments for each hook call:

// hookIndex = 0
// useState() → hooks[0]
// useEffect() → hooks[1]

// If you put hooks in a condition or loop, hookIndex may change across renders:

// 1st render: hookIndex=0 → useState() (runs)
// 2nd render: condition false → useState skipped

// ➡️ Fiber reads hooks[0] expecting useState → gets wrong state → corruption.

// Summary

// Top-level calls = stable hookIndex

// Conditions/loops = unstable hookIndex → broken Fiber state

// ✅ RULE 2: Call Hooks Only From React Functions

// Fiber Reason

// Fiber expects hooks only on components or custom hooks.

// If you call hooks in normal functions, there is no Fiber context.

// React doesn’t know where to store state, which Fiber node owns the hook.

// Internal View
// No Fiber → No hooks array → React cannot store state

// React will throw: “Hooks can only be called inside the body of a function component.”

// ✅ RULE 3: Hook Order Must Be Stable

// Fiber Reason

// Each Fiber node stores hook state in an array/list.

// On each render:

// hookIndex = 0
// currentFiber.hooks[hookIndex++] → returns hook state

// If the order changes, hookIndex will point to the wrong hook:

// useState may be read as useEffect

// useReducer may be read as useMemo

// Fiber state mismatches → runtime bugs

// ✅ RULE 4: Effects Must Clean Up

// Fiber Reason

// Fiber tracks effects in effect list on the Fiber node:

// currentFiber.effectTag → includes useEffect/useLayoutEffect

// During commit:

// Fiber iterates effect list

// Runs cleanup if present

// Runs new effect

// If you don’t clean up:

// Old effect remains in effect list

// Memory leaks, duplicate subscriptions

// Fiber cannot safely reuse slots in next render

// ✅ RULE 5: Render Must Be Pure

// Fiber Reason

// Render phase is interruptible in Concurrent Mode.

// Fiber may pause, discard, or restart render.

// Side effects in render → run multiple times or be partially applied → inconsistent state.

// BAD: fetch inside render → may run twice
// GOOD: fetch inside useEffect → only after commit

// ✅ RULE 6: Declare All Dependencies (useEffect/useMemo)

// Fiber Reason

// Fiber stores effect dependencies for reconciliation:

// effect.deps → list of dependencies

// On update:

// Fiber compares new deps vs old deps

// Decides whether to re-run effect

// Missing deps → Fiber may skip re-running an effect or run stale closure → inconsistent UI

// 🔹 Fiber Hook Lifecycle (Simplified)
// Render Phase:
//   - Fiber walks hooks array
//   - hookIndex increments for each hook call
//   - Builds new Fiber tree
//   - Pure computation only

// Commit Phase:
//   - Fiber commits DOM updates
//   - Runs effect cleanups + effects

// Concurrent Mode:
//   - Render can be paused
//   - Fiber may discard partially built tree

// Stable hook order = Fiber can safely pause/resume

// Impure render = Fiber may discard updates incorrectly

// 🧩 Mental Model
// Fiber sees hooks as numbered slots:
// Slot 0 = hook0
// Slot 1 = hook1
// Slot 2 = hook2
// ...
// Rules of Hooks protect slot consistency

// Call hooks out-of-order → slot mismatch → corrupted Fiber → buggy UI

// ✅ Valid order patterns
// 1. Multiple hooks of same type are fine
// useState(...)
// useState(...)
// useEffect(...)
// useEffect(...)
// useMemo(...)


// No required grouping—just consistent order.

// 🎯 Interview-Ready Summary

// React hooks rules exist to protect the Fiber’s internal hook state. Fiber stores hooks in a list per component, incremented in call order. Violating the rules (conditional hooks, loops, or non-component calls) breaks the mapping between hook calls and Fiber slots, causing state mismatches and rendering bugs, especially in concurrent mode.


// ________________________________🟢 Phase 1 — How useState Works Internally (High-Level Mental Model)_________________

// 1️⃣ Basic Idea

// useState is a Hook in React that lets functional components have state.

// State = a value that changes over time and can affect what your UI shows.

// Before Hooks, only class components could have state. useState made it possible in functional components.

// 2️⃣ Syntax
// const [state, setState] = useState(initialValue);

// state → current value of this state.

// setState → function to update the state , it sends signal to react for update the state.

// initialValue → starting value of the state.

// Key Points

// useState can hold numbers, strings, booleans, arrays, or objects.

// Updating state re-renders the component automatically.

// The initial value is only used once, during the first render.

// 3️⃣  Where Does React Store State?

// React stores state inside a Fiber node.

// Think like this:

// Each component = 1 Fiber

// Each useState = 1 hook object

// Hooks are stored as a linked list on the Fiber

// Simplified structure:

// Fiber {
//   memoizedState: Hook1 -> Hook2 -> Hook3
// }

// Each hook looks like:

// Hook {
//   memoizedState: currentStateValue,
//   queue: [] // pending updates
// }

// ____________________Why UseState() exist and what problems solves ?__________________

// Vanilla JS Counter

// <div id="count">0</div>
// <button id="btn">Increment</button>

// <script>
//   // Initial state
//   let count = 0;

//   // Function to handle button click
//   function increment() {
//     count += 1; // Update state manually
//     document.getElementById("count").textContent = count; // Manually update the DOM
//   }

//   // Attach event listener to button
//   document.getElementById("btn").addEventListener("click", increment);
// </script>

// All steps followed
// (1) Create  // Initial state ====>  let count = 0;
// (2) Create Function ===> function increment() and assign to Button
// (3) Manually update the DOM ===> By selection and update Counter Manually

// But Scaling this for multiple counters/components becomes messy.

// 💡 Key difference:

// Vanilla JS: you manipulate the DOM manually whenever state changes.

// React + useState: you declare the UI based on state, and React takes care of syncing the DOM.

// _____________________🟢 Phase 2 — Why State Updates Are Asynchronous, Batching & Stale Closures________________

// 3️⃣ What Is Batching (Internally)?
// Internally React does this:
// Event handler starts
//   ├─ setCount()
//   ├─ setName()
//   ├─ setAge()
// Event handler ends
// 👉 React re-renders ONCE

// React batches updates:

// Inside event handlers

// Inside effects

// Inside timeouts (React 18+)

// Why React Does This (Performance Reason)

// If React updated state immediately:

// setCount(1);
// setName("Rohit");
// setAge(25);

// React would re-render 3 times ❌

// Instead React:

// Queues all updates

// Re-renders once ✅

// This is called batching

// 4️⃣ Why This Code Fails (Classic Bug)

// setCount(count + 1);
// setCount(count + 1);

// Expected:

// count + 2

// Actual:

// count + 1

// Why?

// Because:

// count is captured from current render

// Both updates use same value

// count = 0
// setCount(0 + 1)
// setCount(0 + 1)

// Second update overwrites the first.

// 5️⃣ The Correct Way (Functional Updates)

// setCount(prev => prev + 1);
// setCount(prev => prev + 1);

// Internally:
// prev = 0 → 1
// prev = 1 → 2

// ✔ React applies updates in order

// One-liner takeaway

// If your next state depends on the previous one → use prev.

// 6️⃣ What Is a Stale Closure? [ Old snapshot of state ] (Very Important)

// function App() {
//   const [count, setCount] = useState(0);

//   setTimeout(() => {
//     setCount(count + 1);
//   }, 1000);
// }

// Problem:

// count is captured

// Timeout runs later

// Uses old value

// This is called a stale closure

// Mental model (easy to remember)

// count → 📸 snapshot from render

// prev → 🔄 live latest state

// One-line definition (interview-ready)

// Stale state means using a state value that belongs to an old render, not the latest update.

// 7️⃣ How React Sees This

// Render #1:
// count = 0
// setTimeout remembers count = 0

// Render #2:
// count = 1
// timeout still uses old closure

// 8️⃣ Fix for Stale Closure (Golden Rule)

// ✔ Always use functional update when:

// Using setTimeout

// Using setInterval

// Using async logic

// Depending on previous state

// setTimeout(() => {
//   setCount(prev => prev + 1);
// }, 1000);

// 9️⃣ Internal Update Queue (Advanced but Simple)

// Each hook has:

// queue = [
//   action1,
//   action2,
//   action3
// ]

// _____Table showing common useState mistakes on the left (❌ Wrong) and best practices on the right (✅ Correct)___

// +------------------------------------------------------+------------------------------------------------------+
// | ❌ WRONG (Mistakes)                                  | ✅ BEST PRACTICES                                    |
// +------------------------------------------------------+------------------------------------------------------+
// | setCount(count + 1);                                 | setCount(prev => prev + 1);                          |
// | (can use stale state)                                | (always uses latest state)                           |
// +------------------------------------------------------+------------------------------------------------------+
// | setCount(count + 1);                                 | setCount(prev => prev + 1);                          |
// | setCount(count + 1);                                 | setCount(prev => prev + 1);                          |
// | (multiple updates fail)                              | (updates correctly)                                  |
// +------------------------------------------------------+------------------------------------------------------+
// | user.name = "John";                                  | setUser({ ...user, name: "John" });                  |
// | setUser(user);                                       | (immutability preserved)                             |
// +------------------------------------------------------+------------------------------------------------------+
// | items.push(newItem);                                 | setItems([...items, newItem]);                       |
// | setItems(items);                                     | (new array reference)                                |
// +------------------------------------------------------+------------------------------------------------------+
// | const [fullName, setFullName] = useState("");         | const fullName = `${first} ${last}`;                 |
// | (derived state)                                      | (derive during render)                               |
// +------------------------------------------------------+------------------------------------------------------+
// | const [value, setValue] = useState(props.value);     | useEffect(() => setValue(props.value),               |
// | (won’t update on prop change)                        |            [props.value]);                           |
// +------------------------------------------------------+------------------------------------------------------+
// | items.map((item, i) => <Item key={i} />);             | items.map(item => <Item key={item.id} />);           |
// | (index as key)                                       | (stable keys)                                        |
// +------------------------------------------------------+------------------------------------------------------+
// | const [timer, setTimer] = useState(setInterval());   | const timerRef = useRef(null);                       |
// | (side effects in state)                              | (use refs for non-UI values)                         |
// +------------------------------------------------------+------------------------------------------------------+
// | useState({ a: 1 }); useState({ b: 2 });               | useReducer(reducer, initialState);                  |
// | (related state split)                                | (grouped state logic)                                |
// +------------------------------------------------------+------------------------------------------------------+
// | console.log(count);                                  | useEffect(() => { console.log(count); }, [count]);   |
// | after setCount()                                     | (observe updated state)                              |
// +------------------------------------------------------+------------------------------------------------------+

// Golden Rules (remember this)

// ❌ Never mutate state

// ✅ Always use functional updates when based on previous state

// ❌ Don’t store derived data

// ✅ Keep state minimal

// ❌ Avoid stale closures

// ✅ Let React control updates

// ___________________🟢 Phase 3 — Rendering Lifecycle, Re-render Flow & Virtual DOM with useState______________

// setState()
//    ↓
// Schedule update
//    ↓
// Render Phase
//    ↓
// Virtual DOM diff
//    ↓
// Commit Phase
//    ↓
// DOM updated


// 1️⃣ Component renders
//    → Fiber node is created
//    → Hook object stores memoizedState + empty queue

// 2️⃣ useState returns [state, setState]
//    → state = current value
//    → setState = function to update state

// 3️⃣ User calls setState(newValue or function)
//    → React adds update to Hook.queue
//    → Marks Fiber as "dirty" (needs re-render)

// 4️⃣ React schedules re-render
//    → Render Phase:
//        - Reads memoizedState
//        - Applies queued updates in order
//        - Clears queue
//        - Generates new Virtual DOM

// 5️⃣ Reconciliation Phase:
//    → Compares old vs new Virtual DOM
//    → Determines minimal changes

// 6️⃣ Commit Phase:
//    → Updates only changed nodes in real DOM
//    → Browser paints UI
//    → Runs useEffect hooks

// 7️⃣ Functional Updates:
//    → Always applied in queue order
//    → Prevent stale state

// 8️⃣ Batching:
//    → Multiple setState calls in same event are combined
//    → Only 1 re-render happens → better performance


// 🟢 useState Internal Flow — Detailed Terminal Diagram

// ┌───────────────────────────────────────────────────────────────────────────────┐
// │                       FIRST RENDER (MOUNT PHASE)                               │
// └───────────────────────────────────────────────────────────────────────────────┘
//           │
//           │ Component App() runs for the first time
//           ▼
// ┌───────────────────────────────────────────────────────────────────────────────┐
// │ useState(0) called                                                             │
// │   → Creates Hook object in Fiber:                                              │
// │                                                                               │
// │   Hook1:                                                                       │
// │     memoizedState = 0         // Initial state value                            │
// │     queue = []                // Queue to store pending updates                 │
// └───────────────────────────────────────────────────────────────────────────────┘
//           │
//           ▼
// ┌───────────────────────────────────────────────────────────────────────────────┐
// │ useState returns:                                                              │
// │   [count, setCount]                                                            │
// │                                                                               │
// │   count = 0  // current state value                                            │
// │   setCount = function to enqueue updates                                       │
// └───────────────────────────────────────────────────────────────────────────────┘
//           │
//           ▼
// ┌───────────────────────────────────────────────────────────────────────────────┐
// │ JSX Render Phase:                                                              │
// │   <h1>Count: {count}</h1>                                                     │
// │   → Virtual DOM created:                                                      │
// │       { type: 'h1', props: { children: 0 } }                                  │
// └───────────────────────────────────────────────────────────────────────────────┘
//           │
//           ▼
// ┌───────────────────────────────────────────────────────────────────────────────┐
// │ Commit Phase (DOM Update):                                                    │
// │   - Virtual DOM diff (old vs new)                                             │
// │   - Minimal change applied to real DOM                                        │
// │   - Browser paints: <h1>Count: 0</h1>                                        │
// └───────────────────────────────────────────────────────────────────────────────┘

// ────────────────────────────────────────────────────────────────────────────────
// USER INTERACTION: Click "Increment" button
// ────────────────────────────────────────────────────────────────────────────────
//           │
//           ▼
// ┌───────────────────────────────────────────────────────────────────────────────┐
// │ setCount(count + 1) called                                                    │
// │   → Action added to Hook1.queue                                               │
// │   queue = [count + 1]                                                         │
// │   → Fiber marked as "needs update"                                           │
// └───────────────────────────────────────────────────────────────────────────────┘
//           │
//           ▼
// ┌───────────────────────────────────────────────────────────────────────────────┐
// │ RE-RENDER PHASE (Render Phase)                                               │
// │   - App() function runs again                                                 │
// │   - Hook1.memoizedState read from Fiber: 0                                    │
// │   - Apply queued updates:                                                     │
// │       for action in queue:                                                    │
// │           memoizedState = action(memoizedState)                               │
// │       → memoizedState = 1                                                    │
// │   - queue cleared                                                             │
// │   - JSX recalculated: <h1>Count: 1</h1>                                      │
// │   - Virtual DOM created: { type: 'h1', props: { children: 1 } }              │
// └───────────────────────────────────────────────────────────────────────────────┘
//           │
//           ▼
// ┌───────────────────────────────────────────────────────────────────────────────┐
// │ RECONCILIATION (Diffing Phase)                                               │
// │   - Compare old Virtual DOM: { children: 0 }                                   │
// │   - Compare new Virtual DOM: { children: 1 }                                   │
// │   - Minimal difference detected → only text node updated                       │
// └───────────────────────────────────────────────────────────────────────────────┘
//           │
//           ▼
// ┌───────────────────────────────────────────────────────────────────────────────┐
// │ COMMIT PHASE (DOM Update)                                                     │
// │   - Apply changes to real DOM                                                 │
// │   - Browser paints: <h1>Count: 1</h1>                                        │
// │   - useEffect hooks (if any) run                                              │
// └───────────────────────────────────────────────────────────────────────────────┘

// ────────────────────────────────────────────────────────────────────────────────
// ADVANCED BEHAVIOR: Functional Updates & Batching
// ────────────────────────────────────────────────────────────────────────────────
//           │
//           ▼
// ┌───────────────────────────────────────────────────────────────────────────────┐
// │ setCount(prev => prev + 1)                                                    │
// │ setCount(prev => prev + 1)                                                    │
// │ → Both updates added to Hook1.queue                                           │
// │ queue = [prev => prev + 1, prev => prev + 1]                                   │
// └───────────────────────────────────────────────────────────────────────────────┘
//           │
//           ▼
// ┌───────────────────────────────────────────────────────────────────────────────┐
// │ During Render Phase:                                                          │
// │   - prevState = 0                                                             │
// │   - Apply first update: prevState + 1 → 1                                     │
// │   - Apply second update: prevState + 1 → 2                                    │
// │   - memoizedState = 2                                                         │
// │   - queue cleared                                                             │
// │   - Virtual DOM: { type: 'h1', props: { children: 2 } }                       │
// └───────────────────────────────────────────────────────────────────────────────┘
//           │
//           ▼
// ┌───────────────────────────────────────────────────────────────────────────────┐
// │ Commit Phase:                                                                │
// │   - DOM updates text node to 2                                               │
// │   - Browser paints: <h1>Count: 2</h1>                                        │
// └───────────────────────────────────────────────────────────────────────────────┘


// _________________🟢 Phase 4 — Multiple useState, Hook Ordering, and Why Hooks MUST Be Top-Level_______________


  // const [count, setCount] = useState(0);
  // const [name, setName] = useState("Rohit");

// Each useState call creates a separate Hook object in the Fiber node.

// React stores them in a linked list in the order they are called.

// Fiber Hook Linked List Example:

// AppFiber.memoizedState
//  ├─ Hook1 → count = 0, queue = []
//  └─ Hook2 → name = "Rohit", queue = []


// Hook1 = first useState

// Hook2 = second useState

// Order is critical! React relies on it to map hooks between renders.

// App Component Render
//  ├─ useState(0) → Hook1: count
//  └─ useState("Rohit") → Hook2: name

// User updates:
//  setCount(prev => prev + 1)
//  setName("Rohit Kumar")
//         │
//         ▼
// React queues updates:
//  Hook1.queue = [prev => prev + 1]
//  Hook2.queue = ["Rohit Kumar"]
//         │
//         ▼
// Render Phase:
//  - Apply Hook1.queue → count = 1
//  - Apply Hook2.queue → name = "Rohit Kumar"
//  - Build new Virtual DOM
//         │
//         ▼
// Reconciliation → diff with old Virtual DOM
//         │
//         ▼
// Commit Phase → update only changed nodes in real DOM


// ✅ Key Takeaways

// Each useState has its own Hook object in Fiber.

// Hook order is critical — React identifies hooks by position.

// Hooks must be top-level to maintain consistent order.

// Multiple hooks updates are queued and applied during render.

// Top-level hooks + Fiber + queue system allows React to map state correctly across re-renders.

// 5️⃣ Tips & Best Practices

// Always call hooks at top-level of the component.

// Never call hooks inside loops, conditions, or nested functions.

// Use multiple useState for independent state variables.

// Keep hook order consistent across renders.

// ___________🟢 Phase 5 — Advanced useState Internals: Stale Closures, Functional Updates & Batching__________


// 1️⃣ Stale Closure Problem (Outdated state Or Old snapshot of state)

// In React, each render creates a new function scope.

// If you use state inside an event handler without functional updates, you may get stale values.

// Example:
// function App() {
//   const [count, setCount] = useState(0);

//   const handleClick = () => {
//     setTimeout(() => {
//       setCount(count + 1); // ❌ count might be stale
//     }, 1000);
//   };

//   return <button onClick={handleClick}>{count}</button>;
// }


// Problem:

// count inside the setTimeout captures the value at render time.

// Even if user clicks multiple times, React may only increment from the old value.

// Fix with functional update:

// setCount(prev => prev + 1); // ✅ always uses latest state


// React applies queued functional updates in order.

// Prevents stale closure issues.

// 3️⃣ Batching State Updates

// React merges multiple state updates into one render.

// Reduces unnecessary renders and improves performance.

// Example:
// setCount(prev => prev + 1);
// setName("Rohit");
// setCount(prev => prev + 1);


// React batches updates synchronously in events or asynchronously in React 18 concurrent mode

// Internal flow:

// Hook1.queue = [prev => prev + 1, prev => prev + 1]
// Hook2.queue = ["Rohit"]
// Render Phase applies all updates
// Only 1 re-render occurs


// Important: Batching works only within React events. Native events or setTimeout may need React 18 concurrent batching.

// __________________🟢 Phase 6 — Performance, Optimization, and Best Practices with useState_____________

// 1️⃣ Performance Considerations

// Even though useState is lightweight, there are some things to keep in mind:

// Re-render triggers

// Every setState triggers a re-render of the component.

// React will re-run the component function and rebuild Virtual DOM for that subtree.

// Virtual DOM Rebuild

// Virtual DOM is rebuilt for the component and its children, but not the whole app.

// React diffs old vs new Virtual DOM → only minimal DOM changes applied.

// Functional Updates for efficiency

// If state update depends on previous value, always use functional update:

// setCount(prev => prev + 1);


// Prevents incorrect updates and ensures correct batching.

// 2️⃣ Avoid Unnecessary Re-renders

// Split state into multiple useState hooks

// Instead of one object state:

// const [state, setState] = useState({count:0, name:'Rohit'});


// Use separate hooks:

// const [count, setCount] = useState(0);
// const [name, setName] = useState('Rohit');


// Updating one value doesn’t re-render unrelated parts.

// Memoize expensive calculations

// Use useMemo or useCallback when calculating derived data.

// React.memo

// Prevents child components from re-rendering if props didn’t change.

// 3️⃣ Batching for Performance

// React automatically batches multiple state updates in events.

// React 18 batches updates across:

// Event handlers

// Promises

// setTimeout

// fetch callbacks

// Example:

// setCount(prev => prev + 1);
// setName("Rohit");
// // Only 1 re-render happens

// ____________________🟢 Phase 7 — useState Patterns in React_________________________

// 1️⃣ Basic useState Pattern (Single Value)

// When to use: Simple primitive state like numbers, strings, booleans.

// function Counter() {
//   const [count, setCount] = useState(0);

//   const increment = () => setCount(count + 1);

//   return <button onClick={increment}>{count}</button>;
// }


// Behavior internally:

// Hook object created with memoizedState = 0

// setCount enqueues update

// Render phase recalculates Virtual DOM for count

// 2️⃣ Multiple Independent States

// Pattern: Use separate useState hooks for unrelated state.

// function Profile() {
//   const [name, setName] = useState("Rohit");
//   const [age, setAge] = useState(25);

//   return (
//     <>
//       <input value={name} onChange={e => setName(e.target.value)} />
//       <input value={age} onChange={e => setAge(Number(e.target.value))} />
//     </>
//   );
// }


// Internal advantage: Updating one state does not affect the other hook’s memoizedState.

// Maintains minimal re-renders.

// 3️⃣ Object or Array State Pattern

// Pattern: Use useState with objects or arrays.

// const [user, setUser] = useState({ name: "Rohit", age: 25 });

// const updateName = (newName) => setUser(prev => ({ ...prev, name: newName }));


// Why use functional update:

// Ensures latest state is used

// Avoids outdated state in async closures

// Tip: Always spread previous state when updating nested objects.

// 4️⃣ Functional Updates Pattern

// Pattern: Use a function in setState when new state depends on previous.

// const [count, setCount] = useState(0);

// const incrementTwice = () => {
//   setCount(prev => prev + 1);
//   setCount(prev => prev + 1);
// };


// Internal behavior:

// Both functions are queued in Hook.queue

// Render phase applies them sequentially → final count = previous + 2

// Prevents outdated/old state issues.

// 5️⃣ Lazy Initialization Pattern

// Pattern: Pass a function to useState to compute initial state once.

// const [data, setData] = useState(() => expensiveComputation());


// Advantage:

// expensiveComputation runs only on first render

// Not on every re-render

// Internal: React evaluates the function once and stores result in memoizedState.

// 6️⃣ Toggle / Boolean Pattern

// Pattern: For boolean state, common for UI toggle or modal visibility.

// const [isOpen, setIsOpen] = useState(false);
// const toggle = () => setIsOpen(prev => !prev);


// Internal:

// Uses functional update → guarantees latest value

// Avoids issues with async events or multiple toggles in one event

// 7️⃣ Derived State Pattern (Computed from other state)

// Pattern: Avoid storing derived state; compute it on render instead.

// const [count, setCount] = useState(0);
// const doubled = count * 2; // compute, not stored in state


// Why: Avoids state duplication and keeps Fiber/hook queues minimal

// Only store in useState if computation is expensive → use useMemo

// 8️⃣ Best Practices Patterns

// Top-level hooks only → ensures correct hook ordering

// Split independent state → minimal re-renders

// Functional updates → prevent outdated state problems

// Lazy initialization → for expensive initial state

// Avoid complex nested objects if possible → keeps updates simple

// 🔹 Visual Summary of Patterns


// | Pattern                     | Use Case                      | Internal Benefit                           |
// | --------------------------- | ----------------------------- | ------------------------------------------ |
// | Single primitive state      | Counter, input                | Simple hook object                         |
// | Multiple independent states | Separate UI values            | Minimal re-renders, separate hooks         |
// | Object/array state          | Nested or grouped state       | Functional updates prevent outdated state  |
// | Functional updates          | Dependent on previous state   | Queue ensures correct order, async-safe    |
// | Lazy initialization         | Expensive initial computation | Only runs once, memoizedState stores value |
// | Toggle / boolean            | Modals, switches              | Functional update ensures latest value     |
// | Derived state               | Computed from other state     | Avoids unnecessary memoized state          |
// | Top-level only              | All                           | Maintains hook order & Fiber integrity     |

