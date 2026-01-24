import { useState } from "react";

const InputProject = () => {
  const [input, setInput] = useState(null);
  function handleInput(e) {
    setInput(e.target.value);
  }
  return (
    <>
      <h2>InputProject(UseState)</h2>
      <input
        type="text"
        name=""
        placeholder="Type Text"
        onChange={handleInput}
      />
      <p>{input}</p>
    </>
  );
};

export default InputProject;
