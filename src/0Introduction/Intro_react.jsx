import React from "react";

const Intro_react = () => {
  return <div>Introduction of react JS</div>;
};

export default Intro_react;


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
// Previous websites are built by multiple elements and multiple elements have multiple children and it creates nested dom tree , so when this type dom tree parse into browser it loads slowly and whenever go to other page and route it would refresh the whole page  again, here is react is best for it because react application built the website by using only single element with single JavaScript page which loads faster into browser and does not refresh by changing into other page.

// --- Hooks ---
// Sometimes in pure Html CSS JavaScript we built application and declare some data in UI and in Js file as variable but both data are same and both are changing by using add event listener like counter app and digital clock, so react  provides us Hooks feature for easier the code writing like useState use for Declare a variable and provide a function with it to modify variable value and same variable name is use in UI part also. There are more hooks in react and each hooks has its own feature to fast and efficient the code writing.

// --- Virtual DOM ---
// React uses Virtual DOM  for changing in  UI part as with pure JavaScript file if change in single element it refresh whole page so in react application if any changes occurs first changes in Virtual DOM then compare with Real DOM and changes only in target element instead of refreshing the whole page.

// 3. Structure of React library ?
// React library is Build by two major vanilla JavaScript libraries  that is one is react which has 3000 js lines of code and other is react-dom which has 30,000 js lines of code and react and react-dom has uses other libraries in it thats why whenever you install react and react-dom both it has many folders and files already in it.

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

