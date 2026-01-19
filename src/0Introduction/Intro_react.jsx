// 1. What is React ?
// React is free open source frontend library for building User interfaces by using a component based architecture.
// React library focus only on UI part.

// 2. Why Use React ?
// There are majorly four reasons to stand out react is use for UI,

// --- Reusable Component----
// There are some blocks of code which are built by html CSS JavaScript and same section repeated multiple time at multiple places  so react is component based architecture which provides us facility to built same sections multiple time only by calling the component just like calling a function.

// --- Maintable code ---

// As react provides us component building  facility and it is easier for us to separate code bases in separate component and it will easy to track and debug the code.

// --- single page applications ---

//A Single Page Application in React is a web app where only one HTML page is loaded, and React updates the UI dynamically without reloading the page.

// Browser loads one HTML file Usually: index.html

// This file has:

// <div id="root"></div

// Previous websites are built by multiple elements and multiple elements have multiple children and it creates nested dom tree , so when this type dom tree parse into browser it loads slowly and whenever go to other page and route it would refresh the whole page  again, here is react is best for it because react application built the website by using only single element with single JavaScript page which loads faster into browser and does not refresh by changing into other page.

// --- Hooks ---

// Sometimes in pure Html CSS JavaScript we built application and declare some data in UI and in Js file as variable but both data are same and both are changing by using add event listener like counter app and digital clock, so react  provides us Hooks feature for easier the code writing like useState use for Declare a variable and provide a function with it to modify variable value and same variable name is use in UI part also. There are more hooks in react and each hooks has its own feature to fast and efficient the code writing.

// --- Virtual DOM ---

// React uses Virtual DOM  for changing in  UI part as with pure JavaScript file if change in single element it refresh whole page so in react application if any changes occurs first changes in Virtual DOM then compare with Real DOM and changes only in target element instead of refreshing the whole page.

// 3. Structure of React library ?

// React library is Build by two major vanilla JavaScript libraries 

// one is react which has 3000 js lines of code and other is react-dom which has 30,000 js lines of code
// second react-dom has uses other libraries in it thats why whenever you install react and react-dom both it has many folders and files already in it.

// react library --- createElement, props, hooks etc
// react-dom library --- Virtual DOM , portal, createRoot, render etc

// 1️⃣ What is React JS?

// React JS is a JavaScript library used for building user interfaces (UIs), especially for web applications.

// It is not a framework, but a library focused on the view layer of an application.

// Developed by Facebook in 2013 and widely adopted for modern web development.

// React allows developers to build UIs as reusable components, making development modular and maintainable.

// 2️⃣ Why React Exists – Problems it Solves

// React solves multiple problems inherent in vanilla JS development:

// Problem 1: Manual DOM Manipulation

// Vanilla JS: Updating the DOM manually is error-prone.

// React: Uses Virtual DOM to minimize updates and improve performance.

// Problem 2: Code Maintainability

// Vanilla JS: Mixing HTML, JS, and logic leads to spaghetti code.

// React: Component-based architecture separates UI, logic, and styling, making code modular and reusable.

// Problem 3: State Management Complexity

// Vanilla JS: Managing state for large apps is complex (e.g., multiple forms, UI changes).

// React: Built-in state management (useState, useReducer) makes tracking UI state simple and predictable.

// Problem 4: UI Predictability

// Vanilla JS: If you don’t carefully track state, UI might become inconsistent.

// React: React’s one-way data binding ensures UI always matches state.

// 3️⃣ Key Features of React that Solve These Problems

// +----------------------+---------------------------+------------------------------------------------------+
// | React Feature        | Problem Solved            | Explanation & Example                                |
// +----------------------+---------------------------+------------------------------------------------------+
// | Virtual DOM          | Slow DOM updates          | React keeps a lightweight copy of the DOM in memory.|
// |                      |                           | When state changes, it calculates the minimal       |
// |                      |                           | changes and updates only those, improving           |
// |                      |                           | performance.                                        |
// |                      |                           | Example: Updating one item in a list of 1000        |
// |                      |                           | items only changes that one item.                  |
// +----------------------+---------------------------+------------------------------------------------------+
// | Components           | Code maintainability      | UI is split into reusable units.                    |
// |                      |                           | Each component manages its own logic and UI.        |
// |                      |                           | Example: <Header />, <Footer />, <TodoList />       |
// +----------------------+---------------------------+------------------------------------------------------+
// | JSX                  | Declarative syntax        | Write HTML-like syntax in JS.                       |
// |                      |                           | Easier to read and maintain than string-based DOM  |
// |                      |                           | manipulations.                                      |
// |                      |                           | Example: <div>Hello, {name}</div>                  |
// +----------------------+---------------------------+------------------------------------------------------+
// | State & Props        | State management          | State tracks dynamic data. Props pass data         |
// |                      |                           | between components.                                 |
// |                      |                           | UI updates automatically when state changes.       |
// |                      |                           | Example: const [count, setCount] = useState(0)    |
// +----------------------+---------------------------+------------------------------------------------------+
// | One-way Data Binding | UI inconsistency          | Data flows from state → UI.                         |
// |                      |                           | Avoids mismatch between UI and state.              |
// |                      |                           | Example: <Child value={parentValue} />            |
// +----------------------+---------------------------+------------------------------------------------------+
// | Hooks (useEffect,    | Side-effects & lifecycle  | Handle API calls, subscriptions, or timers         |
// | useReducer, etc.)    | issues                    | inside functional components.                       |
// |                      |                           | Example: useEffect(() => fetchData(), [])          |
// +----------------------+---------------------------+------------------------------------------------------+
// | Keys in Lists        | Unnecessary re-renders    | Helps React identify items in dynamic lists.       |
// |                      |                           | Minimizes re-rendering for better performance.     |
// |                      |                           | Example: {items.map(item => <div key={item.id} />)}|
// +----------------------+---------------------------+------------------------------------------------------+
// | Event Delegation     | Cross-browser issues      | React uses synthetic events, normalizing across    |
// |                      | & manual event handling   | browsers and reducing memory usage.                |
// |                      |                           | Example: onClick handlers on components           |
// +----------------------+---------------------------+------------------------------------------------------+
// | Developer Tools      | Debugging & Performance   | Inspect component tree, state, and props.         |
// |                      | issues                    | Allows tracing re-renders and optimizing UI.       |
// +----------------------+---------------------------+------------------------------------------------------+

// ✅ Takeaways:

// Each feature in React directly solves a vanilla JS problem:

// Virtual DOM → performance

// Components → maintainability

// State & props → dynamic UI management

// JSX → declarative & readable code

// Hooks → side effects management

// These features work together to make large, complex UIs predictable, fast, and scalable.

// 4️⃣ React vs Vanilla JS: Mental Model

// | Aspect                  | Vanilla JS          | React JS             |
// | ----------------------- | ------------------- | -------------------- |
// | UI updates              | Manual              | Automatic (reactive) |
// | State management        | Manual              | useState, useReducer |
// | DOM efficiency          | Manual optimization | Virtual DOM diffing  |
// | Component reuse         | Hard                | Easy with components |
// | Declarative programming | ❌                   | ✅                 |

// ✅ Summary — Why React Exists:

// DOM is slow and messy to manage manually.

// UI should be a function of state → declarative programming.

// React introduces Virtual DOM + reconciliation + fiber for efficiency.

// Allows component-based design → scalable, maintainable apps.

// Handles weird edge cases and performance optimization internally.


// Here's a concise yet detailed version of your table for react and react-dom libraries:

// +------------+-------------------------------+-----------------------------------------------------+
// | Library    | Feature / Term               | Role / What it Actually Does                        |
// +------------+-------------------------------+-----------------------------------------------------+
// | react      | React.createElement          | Creates a virtual DOM node that describes the UI   |
// |            |                               |                                                     |
// |            | JSX support (via Babel)      | Allows writing HTML-like syntax; converted to      |
// |            |                               | React.createElement automatically                  |
// |            | Functional components        | Components as functions that return React elements|
// |            |                               |                                                     |
// |            | useState, useEffect, etc.    | Hooks for managing state, side-effects, and context|
// |            |                               |                                                     |
// |            | createContext                | Shares data across components without props       |
// |            |                               |                                                     |
// |            | memo, lazy, Suspense         | Performance & optimization tools:                  |
// |            |                               | memoization, code splitting, async UI             |
// |            |                               |                                                     |
// |            | Fragment, StrictMode         | Fragment: groups elements without extra DOM node  |
// |            |                               | StrictMode: highlights potential issues in dev    |
// |            |                               |                                                     |
// |            | Fiber (Internal)             | Tracks component tree & efficiently manages updates|
// |            | Reconciler (Internal)        | Compares old vs new virtual DOM to minimize DOM   |
// |            | Scheduler / Lanes (Internal) | Manages update priority and interruptible rendering|
// |            | Effect Flags (Internal)      | Marks nodes for placement, update, or deletion    |
// |            | Concurrent Mode (Internal)   | Allows interruptible and prioritized updates      |
// |            | Lifecycle & Error Handling   | Manages hooks, component lifecycle, and errors   |
// +------------+-------------------------------+-----------------------------------------------------+
// | react-dom  | createRoot                   | Connects React Fiber tree to the browser DOM      |
// |            |                               |                                                     |
// |            | render / hydrateRoot         | Updates DOM based on Fiber tree                   |
// |            |                               |                                                     |
// |            | flushSync                    | Forces immediate DOM update for high-priority tasks|
// |            |                               |                                                     |
// |            | findDOMNode (legacy)         | Gets actual DOM node from a React component       |
// |            |                               |                                                     |
// |            | DOM Renderer (Internal)      | Converts Fiber nodes into real DOM nodes          |
// |            | Synthetic Events (Internal)  | Handles events consistently across browsers      |
// |            | Portals (Internal)           | Render content outside parent DOM hierarchy      |
// |            | Hydration (SSR) (Internal)  | Attach React to server-rendered HTML             |
// |            | Effect Handling (Internal)   | Executes useLayoutEffect (sync) and useEffect (async)|
// |            | Fiber Host Config (Internal) | Knows how to create & place DOM nodes            |
// |            | DevTools Integration (Internal)| Provides data for React Developer Tools        |
// +------------+-------------------------------+-----------------------------------------------------+



// ✅ Key Points

// React = “engine” → Fiber, Hooks, Reconciliation, Scheduler, Concurrent Mode.

// ReactDOM = “renderer” → Commit phase, DOM mutations, events, hydration.

// Hooks, Fiber, Scheduler are internal, you never call them directly.

// CDN usage or build tool doesn’t change how internals work.

// ✅ Key Simplified Takeaways

// React (core) = builds the virtual UI, tracks state, hooks, and Fiber tree.

// ReactDOM = converts Fiber to real DOM, handles events, effects, and portals.

// Hooks = logic attached to Fiber nodes for state/effects.

// Fiber + Scheduler = smart system to update only what changed and in priority order.

// _________________________React Render Pipeline______________________________

// <script>
//   /* ============================================================
//      STEP 0: Browser loads React & ReactDOM (via CDN)
//      ------------------------------------------------------------
//      - React core is loaded (Virtual DOM + Fiber + Reconciler)
//      - ReactDOM connects React to the browser DOM
//      - Scheduler is initialized for task prioritization
//   ============================================================ */

//   /* ============================================================
//      STEP 1: Create a React Element (Virtual DOM node)
//      ------------------------------------------------------------
//      - React.createElement() creates a plain JS object
//      - This is NOT a real DOM element
//      - It describes what the UI SHOULD look like
//      - Structure includes: type, props, children
//   ============================================================ */
//   const heading = React.createElement(
//     "h1",          // Element type (host component)
//     null,          // Props object (attributes, events)
//     "Hello React!" // Children (text Fiber)
//   );

//   /* ============================================================
//      STEP 2: Select the root DOM container
//      ------------------------------------------------------------
//      - This is the real DOM element controlled by React
//      - React will attach its Fiber tree here
//      - const container = document.getElementById("root");
//   ============================================================ */
//   
//   /* ============================================================
//      STEP 3: Create a React Root (React 18+ API)
//      ------------------------------------------------------------
//      - Enables React Fiber architecture
//      - Enables Concurrent Rendering
//      - Sets up internal Scheduler
//      - Prepares a root Fiber node (HostRoot)
//      - const root = ReactDOM.createRoot(container);
//   ============================================================ */

//   /* ============================================================
//      STEP 4: Start React Render Pipeline
//      ------------------------------------------------------------
//      - root.render() schedules work with the Scheduler
//      - Rendering does NOT immediately update the DOM
//      - React enters the Render Phase
//      - root.render(heading);
//   ============================================================ */

//   /* ============================================================
//      ------------ INTERNAL REACT RENDER PIPELINE ----------------
//      (Everything below happens automatically inside React)
//   ============================================================ */

//   /* ============================================================
//      STEP 5: Scheduler assigns priority
//      ------------------------------------------------------------
//      - render() is treated as high-priority work
//      - Scheduler decides when work should run
//      - Work can be paused or resumed (Fiber feature)
//   ============================================================ */

//   /* ============================================================
//      STEP 6: Render Phase (Pure & Interruptible)
//      ------------------------------------------------------------
//      - React converts React Elements into Fiber Nodes
//      - Each Fiber represents a unit of work
//      - Fiber tree is built (Work Loop)
//      - No DOM mutations happen here
//   ============================================================ */

//   /* ============================================================
//      STEP 7: Fiber Node Creation
//      ------------------------------------------------------------
//      HostRoot Fiber
//        └── HostComponent Fiber (h1)
//              └── HostText Fiber ("Hello React!")
//   ============================================================ */

//   /* ============================================================
//      STEP 8: Reconciliation (Diffing)
//      ------------------------------------------------------------
//      - Old Fiber Tree vs New Fiber Tree
//      - First render → no old tree → mark all as Placement
//      - Determines minimal set of changes
//   ============================================================ */

//   /* ============================================================
//      STEP 9: Effect List Creation
//      ------------------------------------------------------------
//      - Fibers with side effects are tagged
//      - Example tags:
//          • Placement (new node)
//          • Update (change existing)
//          • Deletion (remove)
//   ============================================================ */

//   /* ============================================================
//      STEP 10: Commit Phase (Synchronous & Non-Interruptible)
//      ------------------------------------------------------------
//      - React applies changes to real DOM
//      - DOM nodes are created
//      - <h1>Hello React!</h1> is appended to #root
//   ============================================================ */

//   /* ============================================================
//      STEP 11: DOM Mutation
//      ------------------------------------------------------------
//      - document.createElement("h1")
//      - document.createTextNode("Hello React!")
//      - appendChild operations executed
//   ============================================================ */

//   /* ============================================================
//      STEP 12: Lifecycle & Effects
//      ------------------------------------------------------------
//      - useLayoutEffect runs (if present)
//      - Browser layout & paint
//      - useEffect runs after paint
//   ============================================================ */

//   /* ============================================================
//      STEP 13: Browser Paint
//      ------------------------------------------------------------
//      - Browser recalculates layout
//      - Browser paints pixels to screen
//      - User sees: "Hello React!"
//   ============================================================ */

// </script>

// // Full Pipeline (One View)
//  → JSX
//  → React.createElement (describe UI)
//  → Virtual DOM
//  → Fiber (split work)
//  → Reconciler (diffing)
//  → Scheduler (prioritize)
//  → Commit Phase
//  → Browser DOM