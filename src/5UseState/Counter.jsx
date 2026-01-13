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

// 6️⃣ What Is a Stale Closure? (Very Important)

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
