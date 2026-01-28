const Project = ({ name }) => {
  return (
    <>
      <h1>Props</h1>
      <p>Hello {name}</p>
    </>
  );
};

export default Project;

// 🔁 Parent vs Child — Props (Side-by-Side)

// | #  | **Parent Component (Sending Data)**             | **Child Component (Receiving Data)** |
// | -- | ----------------------------------------------- | ------------------------------------ |
// | 1  | `<Child name="Alice" />`                        | `props.name`                         |
// | 2  | `<Child age={25} />`                            | `{ age }` (destructuring)            |
// | 3  | `<Child isAdmin={true} />`                      | `{ isAdmin && <p>Admin</p> }`        |
// | 4  | `<Child skills={["JS","React"]} />`             | `{ skills.map(...) }`                |
// | 5  | `<Child user={{ name:"Bob" }} />`               | `{ user.name }`                      |
// | 6  | `<Child onClick={handleClick} />`               | `onClick()`                          |
// | 7  | `<Child><h1>Hello</h1></Child>`                 | `{ props.children }`                 |
// | 8  | `<Child role={condition ? "Admin" : "User"} />` | `{ role }`                           |
// | 9  | `<Child title="Hello" />`                       | `{ title = "Default" }`              |
// | 10 | `<Child {...data} />`                           | `{ ...rest }`                        |

// 🔁 Parent vs Child — Props with Data Types

// | Data Type | Parent Example                  | Child Example         | Usage                         |
// | --------- | ------------------------------- | --------------------- | ----------------------------- |
// | String    | `name="Alice"`                  | `{name}`              | Labels, text, names           |
// | Number    | `age={25}`                      | `{age}`               | Counters, numeric info        |
// | Boolean   | `isAdmin={true}`                | `{isAdmin && ...}`    | Conditional rendering         |
// | Array     | `skills={["JS"]}`               | `{skills.map(...)}`   | Lists of items                |
// | Object    | `user={{ name:"Bob" }}`         | `{user.name}`         | Structured data               |
// | Function  | `onClick={handleClick}`         | `onClick()`           | Event handling                |
// | JSX       | `<Child><h1>Hello</h1></Child>` | `{children}`          | Nested content                |
// | Dynamic   | `role={isAdmin?"Admin":"User"}` | `{role}`              | Computed / conditional values |
// | Default   | `title="Hello"`                 | `{title = "Default"}` | Fallback values               |
// | Spread    | `{...data}`                     | `{...rest}`           | Bulk props                    |
