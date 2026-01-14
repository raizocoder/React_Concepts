import React from "react";

const Jsx = () => {
  return <div>Jsx</div>;
};

export default Jsx;

//1️⃣ What is JSX ?

// 🧠 2.0 One-Line Truth About JSX

// JSX is a nicer way to write React.createElement() calls.

// As we discuss that component is function and who return JSX and JSX is like use Of HTML and JavaScript together in one line and later it  coverts into pure js for react by babel library. 

// JSX Transformation Example

// Input JSX:

// const element = <h1>Hello, React!</h1>;


// After Babel:

// const element = React.createElement("h1", null, "Hello, React!");

//2️⃣ What is Babel?

// Babel is a JavaScript compiler that allows you to write modern JavaScript (ES6+) or JSX and transform it into code that browsers can understand (usually ES5).

// How Babel Works

// Babel works in three main steps:

//(1) Parsing

// Babel reads your code and creates an Abstract Syntax Tree (AST), which is like a structured representation of your code.

//(2) Transforming

// Babel applies plugins to modify the AST.

// Examples:

// Transform JSX → React.createElement()

// Convert const → var for older browsers

// Convert arrow functions → regular functions

//(3) Generating

// Babel turns the transformed AST back into JavaScript code that browsers can run.

// so

// What JSX Compiles Into (Critical)

// JSX: <h1>Hello World</h1>

// Compiled output (Classic runtime):

// function App() {
//   return React.createElement(
//     'h1',          // type of element
//     null,          // props
//     'Hello World'  // children
//   );
// }

//3️⃣ What createElement() Actually Does

// React Elements are Plain JavaScript Objects

// React.createElement(type, props, children)

// Internally creates:
// {
//   $$typeof: Symbol(react.element),
//   type: "h1",
//   key: null,
//   ref: null,
//   props: {
//     children: "Hello World"
//   },
//   _owner: null
// }

// Important properties:

// | Field      | Meaning                               |
// | ---------- | ------------------------------------- |
// | `$$typeof` | Tells React “this is a React element” |
// | `type`     | HTML tag or function                  |
// | `props`    | Inputs                                |
// | `key`      | Used in lists                         |
// | `ref`      | DOM or instance reference             |

// ✅ This is called a React Element
// Tip: React elements are immutable. You never change them. If the state changes, React creates a new element.

// 5️⃣ React Element vs DOM Element (Very Important)

// | React Element | DOM Element    |
// | ------------- | -------------- |
// | JS Object     | Browser Object |
// | Lightweight   | Heavy          |
// | Immutable     | Mutable        |
// | Virtual       | Real           |

// 6️⃣ JSX with Components

// <App /> Compiles to:

// React.createElement(App, null);

// React Element becomes:
// {
//   type: App,
//   props: {},
// }


// 📌 type is now a function reference, not a string.


// Every JSX line gets converted into a React.createElement() call under the hood.

{/* <div>
  Content
  <h1>Hello World</h1>
</div>

Babel transforms this into:

React.createElement(
  "div",       // type
  null,        // props
  "Content",   // first child (text node)
  React.createElement("h1", null, "Hello World") // second child (h1 element)
) */}


// ✅ Key point:

// Every JSX tag (<div>, <h1>, <App />) becomes one React.createElement() call.

// Text between tags also becomes a child node (string).

// Nested JSX → nested React.createElement() calls.



// 📌 Hidden Truth ==>React NEVER sees JSX — only objects.

// 🧬 JSX Is Just Expressions who has final output for UI

// Rules of JSX

// 1. Every HTML element must be closed and should be in small letters and component name has capital letter thats the difference react understand what is component and what is html tag.
{/* <Header /> // component
 <header /> // DOM element */}
//  Why?

// Lowercase → HTML tag

// Uppercase → function lookup

// 2. Use of react fragments for multiple elements render ---> <> Render Elements </>

// 3. Use of [ ClassName ] keyword instead of "class" as we use in js file earlier because class is reserved keyword in js.

// 4. Use of curly braces for render any data into JSX like ----> <h1>hello{Rohit}</h1>.

// 5. If required for incline style in JSX use double curly braces write like 
// <h1 style={{backgroundColor:"red"}}>hello{1}</h1> but not recommenced because pseudo-class and pseudo-element like hover not work.

// 6. Template lateral use like  {`${hi}`} 

// 7. function calling in JSX like onClick = {handle}

// 8. For use images url  src = "url" or scr = {picture} as import first in file 

// 9. "If else" condition statements not work in JSX use of
//  ----> ternary operator , logical operator and optional chaining.

// 10. htmlFor, not for <label htmlFor="email" />


// JSX is just a description of UI
// React decides WHEN and HOW to make it real

// 11. JSX Ignores Undefined, Null, False
{null}
{undefined}
{false}


// ➡ Nothing is rendered
// ✅ Useful for conditional UI


// JSX
//  ↓ (Babel)
// React.createElement()
//  ↓
// React Element (JS Object)
//  ↓
// Stored in memory

// 🚫 No DOM
// 🚫 No render
// 🚫 No Fiber yet

// +------------------------------------------------------------------------------------------------------+
// | ❌ WRONG / BAD JSX CODE                                  | ✅ BEST PRACTICE / CORRECT JSX CODE          |
// +------------------------------------------------------------------------------------------------------+
// | <h1>Hello</h1><p>World</p>                              | <>                                           |
// |                                                        |   <h1>Hello</h1>                              |
// |                                                        |   <p>World</p>                                |
// |                                                        | </>                                          |
// +------------------------------------------------------------------------------------------------------+
// | JSX is treated like HTML                               | JSX is JavaScript (compiled by Babel)        |
// +------------------------------------------------------------------------------------------------------+
// | <myComponent />                                        | <MyComponent />                              |
// +------------------------------------------------------------------------------------------------------+
// | <img src="logo.png">                                  | <img src="logo.png" />                       |
// +------------------------------------------------------------------------------------------------------+
// | { if (isLoggedIn) { <Home /> } }                       | { isLoggedIn && <Home /> }                   |
// +------------------------------------------------------------------------------------------------------+
// | <h1>name</h1>                                         | <h1>{name}</h1>                              |
// +------------------------------------------------------------------------------------------------------+
// | { for(let i=0;i<3;i++){} }                             | { items.map(i => <Item key={i.id} />) }     |
// +------------------------------------------------------------------------------------------------------+
// | <div class="box" />                                   | <div className="box" />                     |
// +------------------------------------------------------------------------------------------------------+
// | <label for="email" />                                 | <label htmlFor="email" />                   |
// +------------------------------------------------------------------------------------------------------+
// | <div style="color:red" />                             | <div style={{ color: "red" }} />            |
// +------------------------------------------------------------------------------------------------------+
// | <button onClick={save()} />                           | <button onClick={save} />                   |
// +------------------------------------------------------------------------------------------------------+
// | props.name = "Alex";                                  | const name = props.name;                    |
// +------------------------------------------------------------------------------------------------------+
// | function Comp() { }                                   | function Comp() { return <div />; }         |
// +------------------------------------------------------------------------------------------------------+
// | <Card></Card> (ignores children)                      | function Card({ children }) {               |
// |                                                        |   return <div>{children}</div>;              |
// |                                                        | }                                           |
// +------------------------------------------------------------------------------------------------------+
// | items.map(i => <li>{i.name}</li>)                     | items.map(i => <li key={i.id}>{i.name}</li>)|
// +------------------------------------------------------------------------------------------------------+
// | key={index}                                           | key={item.id}                               |
// +------------------------------------------------------------------------------------------------------+
// | Assuming JSX creates DOM                              | JSX creates JS objects                      |
// +------------------------------------------------------------------------------------------------------+
// | Re-render = DOM update                                | Re-render = Virtual DOM diff                |
// +------------------------------------------------------------------------------------------------------+
// | <button onClick={() => save()} />                     | const handleSave = () => save();             |
// |                                                        | <button onClick={handleSave} />              |
// +------------------------------------------------------------------------------------------------------+
// | const obj = { a:1 }; <Comp data={obj} />              | const obj = useMemo(() => ({ a:1 }), [])     |
// +------------------------------------------------------------------------------------------------------+
// | Ignoring React.memo                                   | export default React.memo(Comp);            |
// +------------------------------------------------------------------------------------------------------+
// | <div dangerouslySetInnerHTML={{__html:user}} />       | Sanitize HTML before injecting              |
// +------------------------------------------------------------------------------------------------------+
// | Expecting {false} to render                           | false / null render nothing                 |
// +------------------------------------------------------------------------------------------------------+
// | // JSX comment                                        | {/* JSX comment */}                         |
// +------------------------------------------------------------------------------------------------------+
// | Large unreadable JSX in one component                 | Split JSX into small components             |
// +------------------------------------------------------------------------------------------------------+
// | Mixing logic and JSX                                  | Logic outside, JSX clean                    |
// +------------------------------------------------------------------------------------------------------+
// | <div><div><div>                                      | Use Fragment & semantic tags                |
// +------------------------------------------------------------------------------------------------------+

