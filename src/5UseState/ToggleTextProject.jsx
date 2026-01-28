import { useState } from "react";

const ToggleTextProject = () => {
  const [show, setShow] = useState(false);
  function handleShow() {
    setShow((prev) => !prev);
  }
  return (
    <>
      <h2>ToggleTextProject (UseState)</h2>
      <button onClick={handleShow}>Toggle</button>
      <h1>{show && <p>hello 😊</p>}</h1>
    </>
  );
};

export default ToggleTextProject;
