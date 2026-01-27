import { useState, useRef } from "react";

//  CONTROLLED COMPONENTS EXAMPLE;

const HandleInput = () => {
  const [input, setInput] = useState("");
  console.log("Controlled Component render");
  function handleInput(e) {
    setInput(() => e.target.value);
  }
  return (
    <>
      <h2>[Controlled Component]</h2>
      <p>
        It means Input state is maintain by react itself like create, update or
        delete in input field instead of browser control
      </p>
      <p>
        But it is render Component on each letter type on input field by typing
        and deleting text, check console render on each typing
      </p>
      <input type="text" onChange={handleInput} placeholder="Input text" />
      <p>{input}</p>
    </>
  );
};

// UNCONTROLLED COMPONENTS EXAMPLE;

const UseRefInput = () => {
  console.log("Uncontrolled Component render"); // will NOT run on every keystroke
  const inputRef = useRef(null); // store input value
  const handleChange = (e) => {
    inputRef.current = e.target.value; // update ref value
    console.log("Only typing", inputRef.current); // track input
  };

  return (
    <div>
      <h2>[Uncontrolled Component]</h2>
      <p>
        It means Input state is maintain by Browser itself like create, update
        or delete in input field instead of react control check console not
        rendering
      </p>
      <input
        defaultValue=""
        onChange={handleChange}
        ref={inputRef}
        placeholder="Type something..."
      />
    </div>
  );
};

// Controlled Input Checkbox

function MyCheckbox() {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <>
      <label>
        <h2>Input Checkbox [Controlled]</h2>
        <input type="checkbox" checked={isChecked} onChange={handleChange} />
        Accept terms
      </label>
      <span>{isChecked ? "Checked" : null}</span>
    </>
  );
}

export { HandleInput, UseRefInput, MyCheckbox };

// 🔰 PHASE 0 — WHY INPUT HANDLING EXISTS IN REACT

// (The real problem React is solving)

// 1️⃣ The CORE TRUTH ABOUT INPUTS (Browser Reality)

// An <input> is NOT React’s thing.

// It belongs to the browser.

// <input />

// Internally in the browser:

// Input stores its own value

// Browser updates value on every keystroke

// JavaScript can read or set it anytime

// 👉 This is called imperative control

// 2️⃣ Traditional JavaScript Input Handling (The Old World)
// const input = document.querySelector("input");

// input.addEventListener("input", () => {
//   console.log(input.value);
// });

// What’s happening:

// Browser changes value

// JS asks for value

// UI and logic are separate

// State lives inside the DOM

// Problems:

// ❌ Hard to sync UI with logic
// ❌ Multiple sources of truth
// ❌ Complex apps become unmanageable
// ❌ Validation logic scattered everywhere

// 3️⃣ React’s Core Philosophy (IMPORTANT)

// React says:

// ❝ UI should be a pure result of STATE ❞

// Meaning:

// STATE → UI

// Not:

// DOM → JS → Logic

// React wants:

// One source of truth

// Predictable updates

// Easy debugging

// Easy validation

// Easy testing

// 4️⃣ The BIG PROBLEM React Faced

// Inputs are mutable by nature.

// User can type anything anytime.

// But React wants:

// Predictability

// Immutable updates

// Controlled rendering

// So React had to answer:

// “How do we make a browser-controlled thing behave like React state?”

// 💡 That’s why input handling exists.

// 5️⃣ React’s Solution (High-Level Idea)

// React introduces CONTROL.

// There are two strategies:

// 🔹 Strategy 1: Controlled Inputs

// React owns the value.

// User types
//  → React captures event
//  → React updates state
//  → React updates input

// DOM becomes dumb.

// 🔹 Strategy 2: Uncontrolled Inputs

// Browser owns the value.

// User types
//  → Browser updates input
//  → React reads value when needed

// React interferes less.

// 6️⃣ Why React Didn’t Just Use DOM Like JS

// Because React apps are:

// Large

// Component-based

// State-driven

// Re-rendered frequently

// Direct DOM reads:

// Break React’s mental model

// Cause sync issues

// Cause bugs that are hard to track

// React wants:

// STATE → UI (always)

// 7️⃣ What “Handling Input” Actually Means in React

// It does NOT mean:
// ❌ Just reading value

// It means:
// ✔ Owning the data flow
// ✔ Deciding who controls the value
// ✔ Deciding when UI updates
// ✔ Making updates predictable

// 8️⃣ Input Handling = DATA FLOW CONTROL
// User
//  ↓
// Event
//  ↓
// State
//  ↓
// Render
//  ↓
// DOM

//------ React input handling is about controlling this pipeline.
// ====> Input handling exists in React because React refuses to let the DOM be the boss of application state.

// 🟢 PHASE 1 — CONTROLLED INPUTS (REACT TAKES CONTROL)

// ✅ Controlled Input = React controls value

// function App() {
//   const [name, setName] = React.useState("");

//   return (
//     <input
//       value={name}
//       onChange={(e) => setName(e.target.value)}
//     />
//   );
// }

// What’s happening step-by-step

// User types
//    ↓
// Browser fires input event
//    ↓
// React onChange runs
//    ↓
// setState updates value
//    ↓
// Component re-renders
//    ↓
// Input gets new value

// 📌 React is the single source of truth

// Internally (React POV)
// DOM input
//  ↕
// React Synthetic Event
//  ↕
// Fiber reconciler
//  ↕
// State update queue
//  ↕
// Virtual DOM diff
//  ↕
// DOM update

// ====> A controlled input is not an input anymore — it’s a view of React state

// 🧠 REACT CONTROLLED COMPONENTS — COMPLETE CONSOLIDATED GUIDE

// 🔰 1. WHAT A CONTROLLED COMPONENT REALLY IS

// A controlled component is an input where:

// React state controls the value and receives updates on every change.

// <input value={state} onChange={...} />

// The browser does not decide the final value.
// React does.

// 🔁 2. WHAT CONTROLLED COMPONENTS ACTUALLY MEAN (CORE IDEA)

// Controlled components are NOT about forms.

// They are about:

// LIVE REACT LOGIC

// React gets the value while the user is typing and can:

// Validate

// Compare

// Format

// Enable/disable UI

// Show errors instantly

// That’s why controlled components = live checking.

// 🧠 3. WHY CONTROLLED COMPONENTS EXIST

// Browser inputs:

// Own their own value

// Mutate freely

// Are unpredictable for large apps

// React wants:

// STATE → UI

// So React takes ownership of inputs when live logic is needed.

// 🔄 4. HOW CONTROLLED COMPONENTS WORK (INTERNAL FLOW)
// User types
//  → Browser input event
//  → React SyntheticEvent
//  → onChange handler
//  → setState
//  → React schedules update
//  → Re-render
//  → React sets input.value

// React overwrites the browser value every render.

// 🧩 5. WHAT CONTROLLED COMPONENTS ENABLE

// ✔ Live validation
// ✔ Confirm password / email
// ✔ Password strength meter
// ✔ Conditional UI
// ✔ Reset / prefill
// ✔ Shared state between components

// None of this works reliably without controlled inputs.

// ✅ 6. WHEN YOU SHOULD USE CONTROLLED COMPONENTS

// Use controlled components ONLY when React needs the value while typing.

// | Scenario         | Why                  |
// | ---------------- | -------------------- |
// | Reset password   | Live validation      |
// | Confirm password | Cross-field check    |
// | Confirm email    | Live comparison      |
// | Inline errors    | Immediate UI         |
// | Formatting       | React rewrites value |
// | Editable forms   | State-driven         |

// ❌ 7. WHEN YOU SHOULD NOT USE CONTROLLED COMPONENTS

// Controlled components are NOT always good.

// | Scenario         | Reason             |
// | ---------------- | ------------------ |
// | Login (simple)   | No live logic      |
// | Signup (simple)  | Validate on submit |
// | Browser autofill | DOM-driven         |
// | File inputs      | Browser-only       |
// | Huge forms       | Performance cost   |

// ⚖️ 8. SERVER / CACHE CHECK ≠ CONTROLLED COMPONENT

// Very important rule:

// Where validation happens (server, cache, DB) does NOT decide controlled vs uncontrolled.

// What decides is:

// Does React need the value while typing?

// Server check on submit → ❌ controlled NOT needed

// Browser autofill → ❌ controlled NOT needed

// Live UI reaction → ✅ controlled needed

// 🧠 9. SINGLE DECISION RULE (MEMORIZE THIS)

// If React must react to the input while the user types → CONTROLLED.
// If React reacts only on submit or blur → UNCONTROLLED.

// This rule never fails.

// Controlled components are React’s mechanism for live checking and live UI reactions — not a requirement for all forms.

// or even simpler:

// Controlled = live thinking
// Uncontrolled = think later

// 🟢 PHASE 2 — UNCONTROLLED INPUTS (Using ref) — COMPLETE GUIDE

// 🔰 1. WHAT ARE UNCONTROLLED INPUTS (Plain English)

// An uncontrolled input is an input where:

// The browser owns the value, and React does not control it while typing.

// React only reads the value when needed (like on submit or blur).

// const inputRef = React.useRef();

// <input ref={inputRef} />

// Here, inputRef.current.value gives the value only when you access it.

// 🔁 2. WHY UNCONTROLLED INPUTS EXIST

// Controlled inputs are great, but not always ideal:

// Every keystroke = re-render

// Large forms → performance hit

// File inputs cannot be controlled

// Autofill / browser-managed values can desync with React

// Uncontrolled inputs solve this by letting the browser handle typing until React needs the value.

// import React, { useRef } from "react";

// const UseRefInput = () => {
//   const inputRef = useRef(null); // store input value
//   console.log("render"); // will NOT run on every keystroke

//   const handleChange = (e) => {
//     inputRef.current = e.target.value; // update ref value
//     console.log("Current value:", inputRef.current); // track input
//   };

//   return (
//     <div>
//       <input
//         defaultValue=""
//         onChange={handleChange}
//         placeholder="Type something..."
//       />
//     </div>
//   );
// };

// export default UseRefInput;

// Step-by-step internals:
// User types
//  → Browser updates input value
//  → React does nothing
//  → No state update
//  → No re-render

// On submit:
//  → React reads inputRef.current.value
//  → Performs validation / server call

// ✅ React only interacts on demand.

// DOM = Truth
// React = Observer (reads only when needed)
// Input is browser-owned; React just observes.

// 🧩 5. WHAT UNCONTROLLED INPUTS ENABLE

// Faster typing (no re-renders)

// Large forms without performance issues

// File inputs (<input type="file" />)

// Autofill / browser cache

// Minimal React logic until submit

// Easy hybrid patterns (combine with controlled if needed)

// ✅ 6. WHEN TO USE UNCONTROLLED INPUTS

// Login form (check on submit only)

// Signup without inline validation

// Remember-me / autofill

// File uploads

// Very large forms (100+ fields)

// High-frequency typing inputs

// ❌ 7. WHEN NOT TO USE UNCONTROLLED INPUTS

// Live validation (password strength, confirm password/email)

// Formatting on typing

// UI reactions per keystroke

// Reset / prefill on edit mode

// Shared state across components

// In short: When React logic must react live → uncontrolled is insufficient.

// ⚖️ 8. CONTROLLED VS UNCONTROLLED (Decision Rule)

// Controlled = React reacts while typing
// Uncontrolled = React reacts only later (submit / blur)

// Think of timing of logic — that is the main differentiator.

// | Aspect                    | Controlled        | Uncontrolled               |
// | ------------------------- | ----------------- | -------------------------- |
// | Who owns value            | React             | Browser                    |
// | Re-render per keystroke   | Yes               | No                         |
// | Live validation           | Yes               | No                         |
// | Reset / prefill           | Easy              | Requires manual ref update |
// | File input                | ❌                 | ✅                       |
// | Browser autofill          | ❌                 | ✅                       |
// | Performance (large forms) | Slower            | Faster                     |
// | Security                  | Same              | Same                       |
// | Mental model              | React reacts live | React reacts later         |

// 🟡 PHASE 3 — HYBRID INPUT ARCHITECTURE

// (Controlled + Uncontrolled Together — Real-World Pattern)

// This phase explains HOW SENIOR REACT APPS HANDLE INPUTS.

// 🔰 1. WHY HYBRID INPUTS EXIST

// Pure approaches fail at scale:

// ❌ Fully Controlled

// Re-render on every keystroke

// Performance issues in large forms

// Overkill for simple inputs

// ❌ Fully Uncontrolled

// No live validation

// Hard to build complex UX

// Hard to sync UI state

// 👉 Hybrid = Control only what React must think about

// 🧠 2. CORE HYBRID PRINCIPLE (VERY IMPORTANT)

// Let the browser handle typing.
// Let React handle logic.

// In short:

// Typing → Browser
// Logic → React

// 🔑 3. WHAT GETS CONTROLLED VS UNCONTROLLED

// ✅ CONTROLLED (Live logic needed)

// Password

// Confirm password

// Confirm email

// OTP input

// Search with live filter

// Inline validation fields

// ✅ UNCONTROLLED (Submit-time only)

// Email (login)

// Username

// Address fields

// Bio / description

// Remember-me checkbox

// Autofill fields

// 🟢 PHASE 4 — Checkbox, Radio, Select (Special Handling)

// These inputs don’t work on value typing
// They work on state toggling & selection logic

// React had to build special rules for them.

// Checkbox / Radio:
// value ≠ UI state
// checked = UI state

// Select:
// value = selected option(s)
// 👉 So React uses different properties internally

// 🧠 CORE RULE (MEMORIZE THIS)

// | Input Type      | Controlled Prop |
// | --------------- | --------------- |
// | text / password | `value`         |
// | checkbox        | `checked`       |
// | radio           | `checked`       |
// | select          | `value`         |

// +----------------------------+--------------------------------------+--------------------------------------+
// | Topic                       | ❌ Wrong Practice                    | ✅ Best Practice                   |
// +----------------------------+--------------------------------------+--------------------------------------+
// | State binding               | value={isChecked}                   | checked={isChecked} by useState()    |
// | Reading value               | e.target.value                      | e.target.checked                     |
// | State update                | setIsChecked(!isChecked)            | setIsChecked(prev => !prev)          |
// | Missing handler             | <input checked={state} />           | <input checked={state} onChange={} />|
// | Multiple checkboxes state   | Single boolean                      | Array / Set of selected values       |
// | Updating arrays             | selected.push(value)                | [...prev, value]                     |
// | Removing array items        | splice / mutation                   | filter()                             |
// | Controlled vs uncontrolled  | Mixing checked + defaultChecked     | Use one consistently                 |
// | Form submission             | Reading DOM directly                | Read from React state                |
// | Accessibility               | No <label>                          | Input wrapped or htmlFor used        |
// +----------------------------+--------------------------------------+--------------------------------------+

// +----------------------------------+----------------------------------------+------------------------------------------+
// | Case                             | setIsChecked(prev => !prev)             | setIsChecked(e.target.checked)            |
// +----------------------------------+----------------------------------------+------------------------------------------+
// | Source of truth                  | Previous React state                    | DOM event value                           |
// | Depends on event object          | ❌ No                                   | ✅ Yes                                   |
// | Safe with async state updates    | ✅ Always                               | ⚠️ Usually (can break in edge cases)     |
// | Best for toggle behavior         | ✅ Perfect                              | ❌ Overkill                              |
// | Best for form inputs             | ⚠️ Less explicit                       | ✅ Correct                               |
// | Works without checkbox input     | ✅ Yes (buttons, divs, hotkeys)         | ❌ No                                   |
// | React recommended for toggles    | ✅ Yes                                  | ❌ Not ideal                             |
// | Clear intent                     | “Flip the state”                        | “Match the checkbox state”               |
// +----------------------------------+----------------------------------------+------------------------------------------+

// ✅ When to use prev => !prev

// Use this when you want to TOGGLE state, not mirror the DOM.

// <input
//   type="checkbox"
//   checked={isChecked}
//   onChange={() => setIsChecked(prev => !prev)}
// />

// ✔ Best for:

// Toggle switches

// Buttons acting like checkboxes

// Keyboard shortcuts

// When state change is derived from previous state

// 🚀 Safest pattern (avoids stale state bugs)

// ✅ When to use e.target.checked

// Use this when the checkbox is the source of truth

// <input
//   type="checkbox"
//   checked={isChecked}
//   onChange={(e) => setIsChecked(e.target.checked)}
// />

// ✔ Best for:

// Forms

// Validation

// Syncing UI to user input

// Libraries like React Hook Form / Formik

// 🎯 Most explicit & readable

// 🟢 PHASE 4 — Forms & Submission Internals

// 🔰 WHY FORMS ARE SPECIAL IN REACT

// This phase explains what really happens when you submit a form in React,
// how React intercepts browser behavior,
// and how controlled / uncontrolled inputs participate internally.

// ✅ When forms work great with uncontrolled inputs

// <form onSubmit={handleSubmit}>
//   <input name="email" />
//   <input type="password" />
//   <input type="checkbox" />

//   <button>Submit</button>
// </form>


// ✔ Best when:

// You only care about values on submit

// No live validation

// No UI reacting to input changes

// Performance matters

// Using native form behavior

// Think: classic HTML form

// ✅ When controlled inputs inside a form are the right choice

// <form>
//   <input
//     value={email}
//     onChange={e => setEmail(e.target.value)}
//   />

//   <button disabled={!email.includes("@")}>
//     Submit
//   </button>
// </form>


// ✔ Use controlled when:

// Validation while typing

// Enable/disable buttons

// Show/hide UI

// Sync with other state

// Conditional logic

// 👉 The form doesn’t matter — the logic does

// ✅ Totally valid hybrid form (real-world pattern)

// <form onSubmit={handleSubmit}>
//   {/* uncontrolled */}
//   <input name="firstName" />
//   <input name="lastName" />

//   {/* controlled */}
//   <input
//     value={email}
//     onChange={e => setEmail(e.target.value)}
//   />

//   <button disabled={!email}>
//     Submit
//   </button>
// </form>


// This is 100% fine and very common.

// 🧠 Final mental model
// Form ≠ uncontrolled
// Input ≠ controlled

// Each input decides:
// - Does UI depend on it? → controlled
// - Only needed on submit? → uncontrolled