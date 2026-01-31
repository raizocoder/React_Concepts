import { useState } from "react";
import Comp2 from "./Comp2";

const Comp1 = () => {
  const [count, setCount] = useState(0);
  // console.log("Parent Component");
  function HandlePlus() {
    setCount((prev) => prev + 1);
  }
  return (
    <>
      <p>Simple Counter[Component 1]</p>
      <p>
        On increment of Component 1 render because of state change it is
        acceptable but why Component render 2 render with component 1 with every
        time
      </p>
      <h1>{count}</h1>
      <button onClick={HandlePlus}>Plus</button>
      <Comp2 />
    </>
  );
};

export default Comp1;
