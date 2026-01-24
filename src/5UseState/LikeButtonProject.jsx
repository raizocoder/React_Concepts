import { useState } from "react";

const LikeButtonProject = () => {
  const [like, setLike] = useState(false);
  function handleLike() {
    setLike((prev) => !prev);
  }

  return (
    <>
      <h2>LikeButtonProject(UseState)</h2>
      <button onClick={handleLike}>
        {like ? "liked project 💖" : "Like 🩶"}
      </button>
    </>
  );
};

export default LikeButtonProject;
