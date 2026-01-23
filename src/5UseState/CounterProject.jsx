import { useState } from "react";

const CounterProject = () => {
  const [count, setCount] = useState(0);

  function increment() {
    setCount((prev) => prev + 1);
  }
  return (
    <>
      <h2>Counter (UseState)</h2>
      <p>{count}</p>
      <button onClick={increment}>click</button>
    </>
  );
};

export default CounterProject;
