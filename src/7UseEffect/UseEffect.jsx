/* ________________🚀 PHASE 0 — Big Picture of useEffect___________________

// 1️⃣ What is useEffect?

// useEffect is a Hook in React that lets you run side effects in function components.

// Side effects are anything that affects something outside the component, like:

// | Side Effect Type     | Example                                   |
// | ----------------     | ----------------------------------------- |
// | Data fetching        | API calls                                 |
// | Event listeners      | Window resize, scroll events              |
// | Timers WEB API       | `setTimeout`, `setInterval`               |
// | DOM API manipulation | Accessing `document` or `window` directly |
// | Logging              | Sending analytics data                    |

// Without useEffect, function components are pure: they only calculate JSX and render it. useEffect allows them to do “impure” work safely.

👉 Browser APIs cause side effects, and useEffect is the place where React allows side effects.

// 2️⃣ Why useEffect exists?

// React wants function components to stay pure:

// Pure components = predictable + easier to debug + easier to optimize

// But real apps need side effects.

// useEffect exists to handle side effects safely, in a controlled way after rendering, without blocking the UI.

// Think of it like:

// “React, after you paint this UI on screen, please run this effect.”

// 3️⃣ When does useEffect run?

// It runs after rendering, during the commit phase.

// Phases of React rendering:

//(1) Render Phase: React calculates JSX → builds virtual DOM

//(2) Commit Phase: React updates the real DOM

//(3) Effect Phase: React runs all useEffect callbacks asynchronously

// ✅ Key idea: useEffect runs after the component is painted, so it doesn’t block the UI.

// Syntax

// useEffect(() => {
//   // Code for side effect
//   console.log("Effect ran!");

//   // Optional cleanup function
//   return () => {
//     console.log("Cleanup before next effect or unmount");
//   };
// }, [dependencies]);

// 4️⃣ Key Internal Concepts

// +----------------------+-----------------------------------------------------+
// | Concept              | Internal Working                                   |
// +----------------------+-----------------------------------------------------+
// | Dependency array     | Compares previous values to decide if effect runs  |
// | Cleanup function     | Runs before next effect or on unmount             |
// | Async scheduling     | Queued after painting, doesn’t block UI           |
// | Multiple effects     | Each runs independently in order                  |
// | Strict Mode (18+)    | Mount → unmount → remount in dev to find bugs     |
// +----------------------+-----------------------------------------------------+
*/

// __________________________-🧩 PHASE 1 — Basic Syntax & Core Concept of useEffect___________________

// In this phase, we’ll focus on how to write useEffect, what each part means, and what React does internally — using very simple language.

// 1️⃣ Basic Syntax of useEffect

// useEffect(() => {
//   // side effect logic
// }, []);

// Two important parts

// Effect function → what you want to do

// Dependency array → when you want to do it

// Think of it as:

// “Hey React, after rendering, run this code when these things change.”

// 2️⃣ Simplest Possible useEffect

// useEffect(() => {
//   console.log("Hello from useEffect");
// });

// What happens internally?

// Component renders

// DOM updates

// React schedules this effect

// Effect runs

// Console logs message

// ⚠️ Important:

// No dependency array → runs after every render

// Every state update = re-render = effect runs again

// 3️⃣ Dependency Array — The Control Panel

// The dependency array tells React WHEN to run the effect.

// Case 1: No Dependency Array

// useEffect(() => {
//   console.log("Runs on every render");
// });

// 📌 Internal logic

// React assumes effect depends on everything

// Runs after every render

// Use case:

// Debug logging

// Rare cases only

// Case 2: Empty Dependency Array []

// useEffect(() => {
//   console.log("Runs only once");
// }, []);

// 📌 Internal logic

// React runs effect after first render

// React remembers []

// No dependencies → nothing can change → effect never re-runs

// ✅ Equivalent to:

// componentDidMount (class components)

// Use case:

// API calls

// Initial setup

// Event listeners

// Case 3: With Dependencies

// useEffect(() => {
//   console.log("Count changed:", count);
// }, [count]);

// 📌 Internal logic

// React stores previous value of count

// On next render:

// Object.is(prevCount, newCount)

// If particular state changed → run effect

// If same → skip effect

// Use case:

// Reacting to state/prop changes

// | Effect   | When it runs         |
// | -------- | -------------------- |
// | Effect 1 | Every render         |
// | Effect 2 | Only once            |
// | Effect 3 | When State changes   |

// 5️⃣ Important Rule (Very Important ⚠️)

// Render must be PURE. Effects (Browser API Tasks) must go inside useEffect.

// ✅ Correct

// useEffect(() => {
//   fetch("/api/data");
// }, []);

// Why?

// Render may run multiple times

// React may pause, restart, or discard renders

// Side effects in render = bugs + performance issues

// Render → Paint UI → useEffect runs → API fetch → setState → Re-render → Paint updated UI

//Initial Render ──► Paint UI (Loading...) ──► useEffect runs (API fetch) ──► API Response ──► setData ──► Second Render (UI shows data)

// In Vanilla JS (order matters a lot)

// You must manually ensure:

// DOM is ready

// API is called at the right time

// DOM exists before updating it

// React guarantees:

// JSX is rendered

// DOM is painted

// THEN useEffect runs

// You don’t think about order — React enforces it.

// | Vanilla JS Problem                  | React `useEffect` Solution                                    |
// | ----------------------------------- | ------------------------------------------------------------- |
// | Manually select and update DOM      | JSX + state automatically updates DOM                         |
// | Must wait until DOM is ready        | useEffect runs **after render**                               |
// | Must track when to re-run API       | Dependency array `[ ]` or `[state]` controls when effect runs |
// | Cleanup needed for listeners/timers | Return cleanup function in useEffect                          |
// | UI may flicker or block             | Effect is async relative to painting → UI renders immediately |

// Vanilla JS:
// You control order → DOM ready → API → DOM update

// React:
// React controls order → Render → Paint → useEffect → State → Re-render

// In vanilla JS, developers must manually control execution order and DOM readiness.

// In React, useEffect provides a structured lifecycle that guarantees effects run after render, eliminating timing and order issues.

// 6️⃣ How React Thinks About useEffect (Internals)

// React internally stores effects like this (conceptually):

// Component Fiber
//  ├── State hooks
//  ├── Effect hooks
//  │    ├── effect callback
//  │    ├── dependency array
//  │    ├── cleanup function

// After commit phase:

// React loops through effect list

// Checks dependencies

// Runs necessary effects

// __________________________________🧩 PHASE 2 — Cleanup Function__________________________________

// 1️⃣ Why Cleanup Exists

// Some side effects create resources that persist:

// Event listeners

// Timers (setInterval, setTimeout)

// Subscriptions (WebSocket, Firebase, etc.)

// Async operations

// Without cleanup, these resources stay in memory long time after the component is gone, causing memory leaks or bugs.

// Cleanup is like: “Before this effect runs again, or before the component unmounts, clean up any leftover work from the previous effect.”

// 2️⃣ Basic Cleanup Syntax

// useEffect(() => {
//   // Effect logic
//   return () => {
//     // Cleanup logic
//   };
// }, [dependencies]);

// return () => {} → React treats this as a cleanup function

// Cleanup runs:

// Before next effect (if dependencies changed)

// On component unmount

// When does a component unmount?

// A component unmounts when:

//(1) You navigate to a different page/route

//(2) Conditional rendering stops showing it

// {show && <MyComponent />}

//(3) A parent component unmounts

//(4) A list item is removed

// Why is unmounting important?

// When a component unmounts, you should:

//(1) Clean up timers

//(2) Cancel API requests

//(3) Remove event listeners

//(4) Stop subscriptions

// ===> Failing to do this can cause memory leaks or errors.

// Why this matters (even in your simple app)

// For eg Your timer uses setInterval.

// setInterval lives outside React and does not stop automatically.

// If the component ever unmounts:

// The interval keeps running in memory

// React no longer controls it

// It may try to update state on a component that no longer exists

// That’s why cleanup is required.

// ✔ Yes, even a single timer app needs cleanup
// ✔ Cleanup removes the previous timer from memory
// ✔ This is best practice and required for correct React behavior

// ✅ The 5-second mental checklist (use this every time)

// Ask yourself ONE question:

// “Did I start something that lives outside React?”

// If YES → you need cleanup
// If NO → no cleanup needed

//===========> Things that ALWAYS need cleanup ✅

// These all live outside React:

// setInterval

// setTimeout

// addEventListener

// WebSocket / SSE

// Subscriptions (RxJS, Firebase, etc.)

// Observers (IntersectionObserver, ResizeObserver)

//===========> Things that NEVER need cleanup  ❌

// These are controlled by React:

// useState

// props

// JSX rendering

// Calculations

// Array mapping

// Conditional rendering

// 🧠 One rule to remember forever

// If you start it, you stop it.

// Memory-leak patterns with solutions for Vanilla JS and React 👇

// +----------------------+-------------------------+------------------------------+------------------------------+
// | MEMORY LEAK PATTERN  | VANILLA JS (PROBLEM)    | SOLUTION                     | REACT SOLUTION               |
// +----------------------+-------------------------+------------------------------+------------------------------+
// | Timer (setInterval)  | Interval keeps running  | clearInterval(timer)         | useEffect cleanup            |
// |                      | after DOM removal       |                              | return () => clearInterval() |
// +----------------------+-------------------------+------------------------------+------------------------------+
// | setTimeout           | Timeout fires after     | clearTimeout(timer)          | useEffect cleanup            |
// |                      | page/component gone     |                              | return () => clearTimeout()  |
// +----------------------+-------------------------+------------------------------+------------------------------+
// | Event Listener       | Listener never removed  | removeEventListener          | Cleanup in useEffect         |
// |                      | (window/document)       |                              | removeEventListener          |
// +----------------------+-------------------------+------------------------------+------------------------------+
// | API Call / Fetch     | Callback runs after     | AbortController              | AbortController in cleanup   |
// |                      | page destroyed          |                              | controller.abort()           |
// +----------------------+-------------------------+------------------------------+------------------------------+
// | WebSocket / RxJS     | Subscription open       | unsubscribe / close          | Cleanup unsubscribe/close    |
// | Subscription         | forever                |                              | in useEffect                 |
// +----------------------+-------------------------+------------------------------+------------------------------+
// | Observer             | Element reference kept  | observer.disconnect()        | Cleanup disconnect           |
// | (Intersection/Resize)| in memory               |                              | in useEffect                 |
// +----------------------+-------------------------+------------------------------+------------------------------+
// | Closure / Large Obj  | Large data never freed  | Clear refs / stop process    | Cleanup effect (stop source) |
// +----------------------+-------------------------+------------------------------+------------------------------+

// ✅ Short correct statement (refined)

// useEffect is used to interact with things outside React like all Browser API
// (DOM APIs, Web APIs, server APIs, subscriptions, timers, etc.).

// Because these things live outside React’s control, they can cause memory leaks,
// so React requires you to clean them up — just like in vanilla JavaScript.

// ✔ This is 100% correct.

// 🧠 What “outside React” really means

// React only manages: JSX , Virtual DOM , State & props and Rendering

// React does NOT manage: setInterval, setTimeout ,fetch , addEventListener ,WebSocket ,Browser observers and Global variables

// All of those are external systems → same as vanilla JS.

// 📌 Why useEffect exists

// In vanilla JS, you do this manually:

// // start
// const timer = setInterval(() => {}, 1000);

// // stop
// clearInterval(timer);

// In React, you need a lifecycle-safe place to do the same thing:

// useEffect(() => {
//   // start (outside React)
//   const timer = setInterval(() => {}, 1000);

//   // stop (cleanup)
//   return () => clearInterval(timer);
// }, []);

// So:

// useEffect = controlled place to run & clean external JS logic

// | Vanilla JS       | React               |
// | ---------------- | ------------------- |
// | Browser APIs     | Side effects        |
// | Manual cleanup   | `useEffect` cleanup |
// | Page unload      | Component unmount   |
// | Memory leak risk | Same risk           |

// 5️⃣ Common Use Cases for Cleanup

// | Use Case               | Example                                      |
// | ---------------------- | -------------------------------------------- |
// | Timers                 | `setInterval`, `setTimeout`                  |
// | Event listeners        | `window.addEventListener("resize", handler)` |
// | Subscriptions          | Firebase, WebSocket                          |
// | Cancelling async calls | AbortController for fetch requests           |

// 6️⃣ Async Operations & Cleanup : ✅ Better solution: AbortController

// useEffect(() => {
//   const controller = new AbortController();

//   async function fetchData() {
//     try {
//       const res = await fetch(url, { signal: controller.signal });
//       const data = await res.json();
//       setData(data);
//     } catch (err) {
//       if (err.name !== "AbortError") {
//         console.error(err);
//       }
//     }
//   }

//   fetchData();

//   return () => controller.abort();
// }, []);

// 🧠 Golden rule (remember this)

// React does not clean what it didn’t create.

// If React didn’t create it, you clean it

// ✅ When to use useEffect

// Use it when you:

// Touch the DOM directly

// Call APIs

// Start timers

// Add listeners

// Subscribe to something

// Don’t use it for:

// Calculations

// Rendering logic

// Derived state

// useEffect is a tool for managing side effects, and that enables proper memory management — but it is not automatic memory management by itself.

// Exception Case

// Vanilla JS:
// el.remove();
// el = null;   // free memory

// React:
// <div ref={divRef} /> removed by conditional rendering
// React automatically sets divRef.current = null
// Use cleanup in useEffect to remove listeners / timers / observers

// Refs track the element

// React automatically nulls them

// Cleanup releases external references

// // __________________________________🧩 PHASE 3 — Dependency Array Deep Dive_____________________

// 1️⃣ What is the Dependency Array?

// The dependency array ([dep1, dep2]) tells React:

// “Run this effect only if these specific values change.”

// Basic Syntax Recap

// useEffect(() => {
//   // effect code
// }, [dependencies]);

// No array → runs after every render

// Empty array [] → runs once after mount

// Array with dependencies [a, b] → runs after mount AND whenever a or b changes

// 2️⃣ How React Handles Dependencies Internally

//(1) On the first render, React stores the current dependency values in its internal “fiber” structure.

//(2) On subsequent renders, React compares the new values to the previous values using Object.is().

//(3) If any dependency has changed, React schedules the effect.

//(4) If no dependency changed, React skips running the effect.

// Internal conceptual model:

// Fiber Node → Effect Hook → {
//     effect: callback,
//     cleanup: function | null,
//     deps: [dep1, dep2]
// }

// 3️⃣ Example: State Dependency

// import { useState, useEffect } from "react";

// function Counter() {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     console.log("Count changed:", count);
//   }, [count]);

//   return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
// }

// Initial render → effect runs (count = 0)

// Click button → count = 1 → dependency changed → effect runs again

// Click again → count = 2 → effect runs again

// 4️⃣ Example: Props Dependency

// function Child({ name }) {
//   useEffect(() => {
//     console.log("Name prop changed:", name);
//   }, [name]);
// }

// Effect runs only when name prop changes, not every render

// Optimizes performance and avoids unnecessary side effects

// Props are immutable = child cannot change them
// Props may change = parent can pass new values
// Dependency array watches for value changes = effect re-runs if props change

// | Statement                          | True/False | Explanation                         |
// | ---------------------------------- | ---------- | ----------------------------------- |
// | Props are immutable                | ✅          | Child cannot modify them            |
// | Props never change                 | ❌          | Parent can pass new values anytime  |
// | Dependency array cares about props | ✅          | Effect runs when prop value changes |

// Immutability is about child not changing props. Dependency arrays are about React re-running effects when the parent changes props. Both are separate concepts.

// 5️⃣ Common Pitfalls with UseEffect

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║                          useEffect Pitfalls Cheat Sheet                   ║
// ╠══════════════════════════════════════════════════════════════════════════╣
// ║ 1️⃣ Missing dependencies                                                  ║
// ║ ❌ Wrong: useEffect(() => console.log(userId), []);                       ║
// ║ ⚠ Problem: stale values, effect won't run when userId changes             ║
// ║ ✅ Correct: useEffect(() => console.log(userId), [userId]);               ║
// ╠══════════════════════════════════════════════════════════════════════════╣
// ║ 2️⃣ Excessive dependencies                                                 ║
// ║ ❌ Wrong: useEffect(() => doSomething(config), [config]);                ║
// ║ ⚠ Problem: effect runs every render (objects recreated each render)      ║
// ║ ✅ Correct: memoize config with useMemo; useEffect(() => doSomething(memoConfig), [memoConfig]); ║
// ╠══════════════════════════════════════════════════════════════════════════╣
// ║ 3️⃣ Infinite loop                                                         ║
// ║ ❌ Wrong: useEffect(() => setCount(count + 1), [count]);                 ║
// ║ ⚠ Problem: continuous re-renders, browser freeze                          ║
// ║ ✅ Correct: useEffect(() => setCount(c => c + 1), []);                    ║
// ╠══════════════════════════════════════════════════════════════════════════╣
// ║ 4️⃣ Missing cleanup                                                        ║
// ║ ❌ Wrong: useEffect(() => window.addEventListener("resize", f), []);    ║
// ║ ⚠ Problem: memory leak, events fire after unmount                         ║
// ║ ✅ Correct: useEffect(() => {                                             ║
// ║              window.addEventListener("resize", f);                        ║
// ║              return () => window.removeEventListener("resize", f);       ║
// ║          }, []);                                                          ║
// ╠══════════════════════════════════════════════════════════════════════════╣
// ║ 5️⃣ Async directly in effect                                               ║
// ║ ❌ Wrong: useEffect(async () => { await fetch(url) }, []);               ║
// ║ ⚠ Problem: returns a Promise, React ignores it                             ║
// ║ ✅ Correct: useEffect(() => { async function fetchData() {...}; fetchData(); }, []); ║
// ╠══════════════════════════════════════════════════════════════════════════╣
// ║ 6️⃣ State update after unmount                                             ║
// ║ ❌ Wrong: fetch(...).then(data => setData(data));                          ║
// ║ ⚠ Problem: React warning "Can't perform state update on unmounted component" ║
// ║ ✅ Correct: use AbortController or isMounted flag                          ║
// ╠══════════════════════════════════════════════════════════════════════════╣
// ║ 7️⃣ Mutable objects in deps                                                ║
// ║ ❌ Wrong: useEffect(() => doSomething({a:1}), [{a:1}]);                   ║
// ║ ⚠ Problem: object recreated every render → effect runs each render        ║
// ║ ✅ Correct: useMemo(() => ({a:1}), []); useEffect(() => doSomething(memoObj), [memoObj]); ║
// ╠══════════════════════════════════════════════════════════════════════════╣
// ║ 8️⃣ Ignoring Strict Mode double-mount                                     ║
// ║ ❌ Wrong: setInterval without cleanup                                    ║
// ║ ⚠ Problem: timers / fetches run twice in dev                             ║
// ║ ✅ Correct: cleanup timers in return function                            ║
// ╠══════════════════════════════════════════════════════════════════════════╣
// ║ 9️⃣ Updating state without deps                                           ║
// ║ ❌ Wrong: useEffect(() => setCount(count + 1), []);                      ║
// ║ ⚠ Problem: may capture stale count or infinite loops                     ║
// ║ ✅ Correct: useEffect(() => setCount(c => c + 1), []);                   ║
// ╠══════════════════════════════════════════════════════════════════════════╣
// ║ 🔟 Relying on default prop values                                        ║
// ║ ❌ Wrong: useEffect(() => console.log(userId), []);                      ║
// ║ ⚠ Problem: ignores new values from parent                                ║
// ║ ✅ Correct: useEffect(() => console.log(userId), [userId]);              ║
// ╚══════════════════════════════════════════════════════════════════════════╝

// 1️⃣ Missing dependencies

// Problem:
// You use a prop or state inside useEffect but don’t include it in the dependency array. React doesn’t know it changed → effect uses stale values.

// Wrong code:

// function Child({ userId }) {
//   useEffect(() => {
//     console.log("Fetching data for", userId);
//   }, []); // ❌ userId not included
// }

// This runs only once, even if userId changes.

// Correct code:

// useEffect(() => {
//   console.log("Fetching data for", userId);
// }, [userId]); // ✅ include userId

// 2️⃣ Excessive dependencies

// Problem:
// You include objects, arrays, or functions recreated on every render. Effect runs too often.

// Wrong code:

// const config = { a: 1 };
// useEffect(() => {
//   doSomething(config);
// }, [config]); // ❌ runs every render

// Correct code:

// const memoConfig = useMemo(() => ({ a: 1 }), []);
// useEffect(() => {
//   doSomething(memoConfig);
// }, [memoConfig]); // ✅ stable reference

// 3️⃣ Infinite loop

// Problem:
// You update state inside an effect, but that state is also in the dependency array, or you don’t use a functional update → effect runs endlessly.

// Wrong code:

// useEffect(() => {
//   setCount(count + 1); // ❌ effect triggers state change → re-run
// }, [count]);

// Correct code:

// useEffect(() => {
//   setCount(c => c + 1); // ✅ functional update avoids stale closure
// }, []); // runs only once if intended

// 4️⃣ Missing cleanup

// Problem:
// Effects that add listeners, timers, or subscriptions aren’t cleaned up → memory leaks or events firing after unmount.

// Wrong code:

// useEffect(() => {
//   window.addEventListener("resize", handleResize);
// }, []); // ❌ no cleanup

// Correct code:

// useEffect(() => {
//   window.addEventListener("resize", handleResize);
//   return () => {
//     window.removeEventListener("resize", handleResize);
//   };
// }, []);

// 5️⃣ Async directly in useEffect

// Problem:
// You declare async directly in the useEffect function. React expects cleanup or nothing, not a Promise.

// Wrong code:

// useEffect(async () => {
//   const res = await fetch(url); // ❌ invalid
// }, []);

// Correct code:

// useEffect(() => {
//   async function fetchData() {
//     const res = await fetch(url);
//     const data = await res.json();
//     setData(data);
//   }
//   fetchData();
// }, []);

// 6️⃣ State update after unmount

// Problem:
// Async code (fetch, timer) tries to update state after component is unmounted → React warning.

// Wrong code:

// useEffect(() => {
//   fetch(url)
//     .then(res => res.json())
//     .then(data => setData(data)); // ❌ may run after unmount
// }, []);

// Correct code with AbortController:

// useEffect(() => {
//   const controller = new AbortController();
//   fetch(url, { signal: controller.signal })
//     .then(res => res.json())
//     .then(data => setData(data))
//     .catch(err => { if (err.name !== "AbortError") console.error(err) });
//   return () => controller.abort(); // ✅ cancel fetch on unmount
// }, []);

// Alternative with flag:

// useEffect(() => {
//   let isMounted = true;
//   fetch(url).then(data => { if (isMounted) setData(data) });
//   return () => { isMounted = false; }
// }, []);

// 7️⃣ Mutable object in dependencies

// Problem:
// Objects, arrays, or functions recreated every render → effect re-runs unnecessarily.

// Wrong code:

// useEffect(() => {
//   doSomething({ a: 1 }); // ❌ new object each render
// }, [{ a: 1 }]);

// Correct code:

// const memoObj = useMemo(() => ({ a: 1 }), []);
// useEffect(() => {
//   doSomething(memoObj);
// }, [memoObj]);

// 8️⃣ Ignoring Strict Mode double-mounts

// Problem:
// In development, React Strict Mode mounts → unmounts → mounts again. Effects without proper cleanup may cause duplicate timers, subscriptions, fetches.

// Wrong code:

// useEffect(() => {
//   setInterval(() => console.log("tick"), 1000);
// }, []); // ❌ no cleanup

// Correct code:

// useEffect(() => {
//   const id = setInterval(() => console.log("tick"), 1000);
//   return () => clearInterval(id); // ✅ cleanup
// }, []);

// 9️⃣ Updating state inside effect without deps

// Problem:
// You update state inside effect but don’t include dependencies → effect may run on every render → infinite loops.

// Wrong code:

// useEffect(() => {
//   setCount(count + 1); // ❌ count not in deps
// }, []);

// Correct code:

// useEffect(() => {
//   setCount(c => c + 1); // ✅ functional update, safe
// }, []);

// 10️⃣ Relying on default prop values inside effect

// Problem:
// Using default props in effect but ignoring actual prop in dependency array → effect may not respond to changes.

// Wrong code:

// function Child({ userId = 1 }) {
//   useEffect(() => {
//     console.log(userId);
//   }, []); // ❌ ignores prop changes
// }

// Correct code:

// useEffect(() => {
//   console.log(userId);
// }, [userId]); // ✅ effect runs whenever parent passes new userId

// ✅ Summary

// Dependency array: Always include props/state you use inside the effect

// Cleanup: Always remove listeners, timers, subscriptions

// Async: Don’t make useEffect async; cancel or guard async updates

// Objects/Functions: Use useMemo / useCallback to prevent unnecessary runs

// Strict Mode: Always write safe cleanup

/*_________________________🧩 PHASE 5 — Multiple Effects & Effect Ordering___________________________


1️⃣ Multiple useEffect Hooks

React allows multiple useEffect hooks in the same component.

useEffect(() => {
  console.log("Effect 1: runs on mount");
}, []);

useEffect(() => {
  console.log("Effect 2: runs on count change");
}, [count]);


✅ Advantages:

Separation of concerns – each effect handles one task

Easier cleanup – each effect can clean up independently

Better performance – React schedules effects independently

2️⃣ How React Internally Handles Multiple Effects

React stores effects in a list attached to the component fiber

After rendering & commit:

Loop over effects in order of declaration

Compare dependencies

Run cleanup if needed

Run effect callback

Conceptual model:

Fiber Node → Effects List
 ├─ Effect 1 → deps: []
 ├─ Effect 2 → deps: [count]
 └─ Effect 3 → deps: [data]


Cleanup of each effect is stored alongside its effect

Effects run after paint in the order declared

Cleanups run before the next effect on dependency change and on unmount

4️⃣ Why Split Effects?

Clarity

useEffect(() => {
  // only fetch data
}, [id]);

useEffect(() => {
  // only subscribe to events
}, []);


Avoid dependency conflicts

Large effects often need multiple unrelated dependencies → can cause infinite loops or stale closures

Easier debugging

Logs and cleanup are easier to trace

✅ Summary

Multiple effects are independent

Execution order: declaration order

Cleanup order: reverse order

Splitting effects improves clarity, maintainability, and performance

React stores effect + cleanup + deps internally per effect

| Bug / Issue             | Cause                                            | Fix                                 |
| ----------------------- | ------------------------------------------------ | ----------------------------------- |
| Stale closure           | Effect captured old state/props                  | Use functional update or add deps   |
| Infinite loop           | State updated inside effect → effect triggers    | Use functional update, correct deps |
| Memory leaks            | Timers, subscriptions, async updates not cleaned | Always return cleanup               |
| Strict Mode double runs | Dev-only double mount                            | Ensure cleanup handles it           |
| Non-memoized deps       | Objects/functions recreated every render         | Use `useMemo` or `useCallback`      |
| Async after unmount     | Fetch/timers update state after unmount          | Use flag or AbortController         |


*/

/*__________________🧩 PHASE 6 — Security, Memory & Performance Best Practices_________________

1️⃣ Memory Management & Cleanup

Memory leaks often occur if you create persistent resources inside effects but don’t clean them up.

Common sources of leaks:

Timers (setTimeout, setInterval)

Event listeners (window.addEventListener)

WebSocket / Firebase subscriptions

Async fetch calls updating state after unmount

Best Practice: Always return cleanup

useEffect(() => {
  const interval = setInterval(() => console.log("tick"), 1000);
  return () => clearInterval(interval);
}, []);


React internally stores the cleanup function and runs it before next effect or on unmount

Prevents lingering timers/subscriptions → memory leak free

2️⃣ Async Calls & AbortController

Prevent state updates after unmount (avoids warnings or crashes)

useEffect(() => {
  const controller = new AbortController();
  fetch("/api/data", { signal: controller.signal })
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err => {
      if (err.name !== "AbortError") console.error(err);
    });

  return () => controller.abort(); // abort fetch on unmount
}, []);


Internals: React stores cleanup → abort signal triggers → fetch canceled → no state update → safe

3️⃣ Performance Optimizations
a) Minimize dependencies
useEffect(() => {
  // runs only when count changes
}, [count]);


Avoid adding unnecessary deps → reduces re-runs → better performance

b) Split effects

One effect for fetching, another for timers, another for event listeners

Benefits:

React can schedule them independently

Easier cleanup

Avoid unintended re-renders

c) Functional state updates

Avoid stale closure issues

setCount(prev => prev + 1); // always latest state


Useful for timers, intervals, async callbacks

d) Memoize objects/functions
const obj = useMemo(() => ({ key: value }), []);
useEffect(() => {
  console.log("Obj changed");
}, [obj]);


Prevents effects from running every render due to new object references

4️⃣ Security Considerations

Avoid running untrusted code in effects

Example: dynamically eval-ing strings → XSS risk

Sanitize fetched data

Never blindly set HTML from API inside effects (dangerouslySetInnerHTML)

Avoid race conditions

Async calls must respect cleanup and mounted state

let isMounted = true;
fetch(url).then(res => isMounted && setData(res.data));
return () => { isMounted = false };

5️⃣ Strict Mode & Double Effects (Dev Mode)

In React 18+, effects run twice in dev for detecting bugs

Always ensure cleanup functions are idempotent (can run multiple times safely)

6️⃣ Hidden / Weird Behaviors

Timers + state inside stale closure

useEffect(() => {
  setInterval(() => console.log(count), 1000); // logs old count
}, []);


✅ Fix: use functional update or add count in deps

Non-memoized deps → infinite re-runs

useEffect(() => {}, [{ a: 1 }]); // runs every render


✅ Fix: use useMemo or move object outside component

Async fetch → unmounted component

Can trigger setState on unmounted component warning

Fix: use flag or AbortController

7️⃣ Best Practices Summary Table

| Concern                  | Best Practice                                          |
| ------------------------ | ------------------------------------------------------ |
| Memory leaks             | Always clean up timers, listeners, subscriptions       |
| Async operations         | Use AbortController or mounted flags                   |
| Stale closures           | Use functional state updates                           |
| Performance              | Split effects, memoize objects/functions, minimal deps |
| Security                 | Sanitize inputs, avoid eval, handle async safely       |
| Strict Mode dev behavior | Make cleanups idempotent                               |



8️⃣ Final Mental Model of useEffect Internals

Render → Commit Phase → 
    For each effect in declaration order:
        1. Run cleanup (if deps changed or unmount)
        2. Run effect callback (if deps changed)
→ Browser paints → Non-blocking UI


Dependencies = what triggers effect

Cleanup = what frees resources / prevents leaks

Effect callback = your side effect logic

9️⃣ Final Complete Example

import { useState, useEffect, useRef, useMemo } from "react";

function Dashboard({ userId }) {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);
  const boxRef = useRef();
  
  const obj = useMemo(() => ({ key: "value" }), []);

  // [Timer effect]

  useEffect(() => {
    const interval = setInterval(() => setCount(prev => prev + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  // [Fetch effect with AbortController]

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/user/${userId}`, { signal: controller.signal })
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => { if(err.name !== "AbortError") console.error(err); });
    return () => controller.abort();
  }, [userId]);

  // [DOM measurement]

  useEffect(() => {
    console.log("Box width:", boxRef.current.offsetWidth);
  }, [obj]);

  return (
    <div ref={boxRef}>
      <p>Count: {count}</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}


✅ Covers:

Timers + cleanup

Async fetch + cleanup + safe update

DOM measurements

Memoized objects

Proper dependency usage

✅ Phase 6 Summary

Always clean up persistent resources → prevent memory leaks

Async operations → use flags or AbortController → prevent post-unmount updates

Split effects, memoize deps, use functional updates → avoid stale closures & performance issues

Security: sanitize inputs, avoid untrusted code

Strict mode → ensure idempotent cleanups

Mental model: Render → Cleanup → Effect → Paint

*/

/*________________🧩 PHASE 7 — useEffect vs useLayoutEffect & Performance Optimizations______________

1️⃣ Key Difference Between useEffect and useLayoutEffect

+------------------+-------------------------------+------------------------------------------+
| Feature          | useEffect                     | useLayoutEffect                          |
+------------------+-------------------------------+------------------------------------------+
| Timing           | After render, post-DOM paint  | Before paint, after render               |
| Blocks UI?       | No                            | Yes                                      |
| Use case         | Async tasks: API, timers, log | DOM measurements, sync reads/writes      |
| Cleanup          | Before next & on unmount      | Same as useEffect                        |
+------------------+-------------------------------+------------------------------------------+


Mental model:

Render → Commit Phase (DOM updated)
        ├─ useLayoutEffect runs → blocks painting
        └─ Browser paints → useEffect runs (non-blocking)

2️⃣ Why This Matters (Performance & UX)

useEffect is non-blocking → better for UI performance

useLayoutEffect blocks painting → avoids visual glitches when you need DOM measurements

Wrong choice → flickering, layout jumps, or unnecessary blocking

3️⃣ Example — Measuring DOM

import { useRef, useLayoutEffect, useEffect, useState } from "react";

function Box() {
  const boxRef = useRef();
  const [width, setWidth] = useState(0);

  // [Measuring layout]

  useLayoutEffect(() => {
    setWidth(boxRef.current.offsetWidth);
    console.log("Measured width:", boxRef.current.offsetWidth);
  }, []);

  useEffect(() => {
    console.log("useEffect: non-blocking effect runs after paint");
  }, []);

  return <div ref={boxRef}>Width: {width}</div>;
}


✅ Key Points:

useLayoutEffect → runs before paint → ensures you measure correct width without flicker

useEffect → runs after paint → not suitable for measurements that affect layout

4️⃣ Performance Optimizations with useEffect

Minimal dependencies

useEffect(() => {
  console.log("Runs only when needed");
}, [count]); // avoid unnecessary re-runs


Split effects

One effect for fetching, one for timers, one for event listeners

Improves scheduling & readability

Use functional updates

setCount(prev => prev + 1);


Avoids stale closure & unnecessary re-renders

Avoid expensive calculations in effects

useEffect(() => {
  const expensive = computeHeavyStuff(data); // ❌
}, [data]);


✅ Fix: Use useMemo or calculate outside effect

5️⃣ Hidden / Weird Behaviors

Strict Mode double run

useEffect → runs twice in dev

useLayoutEffect → also runs twice

Helps catch missing cleanups

Stale state in useLayoutEffect

useLayoutEffect(() => {
  console.log(count); // might log stale value if not in deps
}, []); 


Always include dependencies or use functional updates

Blocking UI

Heavy calculations in useLayoutEffect → blocks painting → bad UX

6️⃣ Practical Example — Timer + Layout Measurement

import { useState, useEffect, useLayoutEffect, useRef } from "react";

function Dashboard() {
  const [count, setCount] = useState(0);
  const boxRef = useRef();
  const [width, setWidth] = useState(0);

  // Timer effect
  useEffect(() => {
    const interval = setInterval(() => setCount(prev => prev + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  // Layout measurement
  useLayoutEffect(() => {
    setWidth(boxRef.current.offsetWidth);
  }, []);

  return (
    <div>
      <div ref={boxRef}>Box width: {width}px</div>
      <p>Timer: {count}</p>
    </div>
  );
}


✅ Observations:

Timer effect doesn’t block paint → smooth UI

Layout measurement is correct and synchronous → no flicker

7️⃣ Best Practices for Phase 6

Use useEffect for side effects that don’t affect layout (API calls, timers)

Use useLayoutEffect for DOM measurements and sync layout updates

Keep effects small and focused

Always return cleanup when needed

Use functional updates to avoid stale closure issues

✅ Phase 6 Summary

useEffect → after paint, non-blocking

useLayoutEffect → before paint, blocking

Choose the right effect for performance and UX

Split effects for clarity and maintainability

Avoid heavy blocking work inside useLayoutEffect
*/
