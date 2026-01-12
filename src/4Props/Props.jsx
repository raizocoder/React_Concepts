import React from "react";

const Props = () => {
  return <div>Props</div>;
};

export default Props;

// Props Rules
// 1. Props are objects that store data in key:value pair and Props can be any JavaScript value

{/* <Component
  number={10}
  isLoggedIn={true}
  user={{ name: "Sam" }}
  onClick={handleClick}
  items=
  {[1, 2, 3]}
/> */}

// Props stores data like strings , numbers,boolean, array , objects.

// 2. Props flow one-way (parent → child)

// Data always flows down the component tree.

// function Parent() {
//   return <Child age={25} />;
// }

// function Child(props) {
//   return <p>Age: {props.age}</p>;
// }


// A child cannot directly change a parent’s props — it must use callbacks.


// 2. Props are created inside the component call or before the component call and use in component call and access inside components for UI.

// 4. Props are read-only it means only show direct in UI as it create in code , it cant change or modify by any event listener.

// 5. Avoid the case of Props drilling it means one data pass into multiple component without required to reach nested target component.

// 4. Props are passed like HTML attributes

// <Greeting name="John" />


// Access inside component:

// function Greeting(props) {
//   return <h1>Hello {props.name}</h1>;
// }

// 5. Props can be destructured

// Cleaner and more readable.

// function Greeting({ name }) {
//   return <h1>Hello {name}</h1>;
// }

// 6. Props are optional

// If a prop isn’t passed, it will be undefined.

// function Greeting({ name }) {
//   return <h1>Hello {name || "Guest"}</h1>;
// }

// Default Props

// Using default parameters (recommended)
// function Button({ type = "button" }) {
//   return <button type={type}>Click</button>;
// }
// 6. Props are basically used when rendering dynamic data in UI as in code and it is suitable only in one component.

// 7. By using Props in components use destructuring in components.

// 8. Props are created into components call and access into components structure by destructuring by 
// (props.title) or ({title}) if it is pass like
// < App title = "rony"> --- this props
// <App>{title:rony}<App/> --- this props children

// 1️⃣ Props vs State (Most Important Concept)

// | Feature      | Props            | State                   |
// | ------------ | ---------------- | ----------------------- |
// | Who owns it? | Parent component | The component itself    |
// | Mutable?     | ❌ No (read-only) | ✅ Yes                |
// | Purpose      | Pass data        | Manage changing data    |
// | Updated by   | Parent only      | `setState` / `useState` |


// Example: Props

// function Parent() {
//   return <Child name="Alex" />;
// }

// function Child({ name }) {
//   return <h1>{name}</h1>;
// }


// 📌 Child cannot change name.

// 2️⃣ When to Use Props vs State

// ✔ Use props when:

// Data comes from parent

// Data does not change inside component

// ✔ Use state when:

// Data changes (user input, API response, toggle)

// 4️⃣ Prop Drilling 🧩

// Prop drilling = passing props through many layers unnecessarily.

// <App>
//   <Page>
//     <Sidebar>
//       <User name="Alex" />
//     </Sidebar>
//   </Page>
// </App>


// 📌 Even if Page and Sidebar don’t use name, they must pass it.

// Solutions to Prop Drilling

// ✔ React Context API
// ✔ Redux / Zustand / Recoil
// ✔ Component composition


// Props are used to pass data from parent to child and are immutable.

// State is used to manage data that changes over time inside a component.

// When multiple components need the same state, we lift the state up to a common parent.

// Passing props through many layers is called prop drilling, which can be solved using Context or state management libraries.

