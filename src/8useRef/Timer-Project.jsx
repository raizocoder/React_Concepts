import { useState, useRef, useEffect } from "react";

const LiveCounter = () => {
  const countRef = useRef(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      countRef.current += 1;
      setCount(countRef.current);
    }, 1000);

    return () => clearInterval(intervalId); // cleanup on unmount
  }, []);

  return <h1>{count}</h1>;
};

export default LiveCounter;




