
const Component = () => {
  return <div> I just a Component</div>;
};

export default Component;

// What is Component?

// A React component is:

// A function or class that

// Accepts props

// Returns JSX (or null)

// Is pure with respect to its inputs

// The component is just like a function that return JSX Elements like HTML and  JavaScript together and later JSX covert into pure JavaScript Objects. JSX provides  method that you can use HTML and JavaScript together in a single line and later JSX code transforms into pure JS code by Babel JS library.

// example as above
// const Component = () => {
//   return <div> I just a Component</div>;
// };

// App is a Component just like the function that returns JSX code  <div>I just a Component</div> and calls in app.jsx after export.

// Component Rules

// 1. The component name should start with capital letters and also file Component name and file name should be the same as App.jsx file name and Component name App are the same name.

// 2. File extension use .jsx with vite it occurs errors if use App.js

// 3. Do not write return keyword like this
//  --- return
//  (                                ---- it will give an error
//     <div>hello</div>
//   )

// 4. For return multiple Element use React fragments ---  <>Elements</> because return keyword return only single Element.

//    return (
//     <>
//     <h1>hi</h1>
//     <h1>hello</h1>
//     </>
//   )

// 5. Components are reusable which means the same Component repeats with the same UI by calling it multiple times like
// <App/>
// <App/>
// <App/>

// 6. Components must be created, exported, imported, and called.

// 7. One Component in one file can be exported like this --- export default App; and during default export when import curly braces not required.

// 8. Multiple  Components are exported like this export {app, main, head} and import {app, main, head} from file.js but during named export curly braces are required.

// 9. Try to create custom variables declarations, functions declarations, If else Conditionals, objects, and arrays  before the return keyword or outside the Component but inside the file because the return keyword only shows the final output.

// 10. Component would be export by default export and named export same for import named import and default import,

// like export default App;

// and for default import like -- import App from "./App"

// * remember Default export is only one in one js file.

// and for named export and import

// -=====> like export {func1, func2, func3};
// -=====> import {func1, func2 , func3} from "./app.js"


// 🔁 Lifecycle vs Hooks Mapping Table
// 🧱 Class Components → 🧩 Function Components

// ┌───────────────────────────────┬───────────────────────────────┬──────────────────────────────┐
// │ Class Lifecycle Method        │ When it runs                  │ Hook Equivalent              │
// ├───────────────────────────────┼───────────────────────────────┼──────────────────────────────┤
// │ constructor                   │ Before first render          │ useState / useRef             │
// │                               │                              │ (initialization)              │
// │ render                        │ Calculate UI                 │ Function body                 │
// │ componentDidMount             │ After first DOM commit        │ useEffect(() => {}, [])       │
// │ componentDidUpdate            │ After updates                │ useEffect(() => {}, [deps])   │
// │ componentWillUnmount          │ Before removal               │ useEffect cleanup             │
// │                               │                              │ return () => {}               │
// │ shouldComponentUpdate         │ Skip re-render                │ React.memo / useMemo          │
// │ getDerivedStateFromProps      │ Sync state from props         │ useState during render        │
// │ getSnapshotBeforeUpdate       │ Before DOM mutations         │ useLayoutEffect               │
// │ componentDidCatch             │ Catch errors                 │ Error Boundaries (class only) │
// └───────────────────────────────┴───────────────────────────────┴──────────────────────────────┘

// 🧩 Timing Breakdown (Critical)
// RENDER PHASE
// - function body
// - useState
// - useMemo
// - useCallback

// COMMIT PHASE
// - DOM updates
// - useLayoutEffect

// AFTER PAINT
// - useEffect

// This timing is more important than lifecycle names.

