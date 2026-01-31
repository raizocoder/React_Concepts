import React from "react";

// const Comp2 = () => {
//   console.log("Comp 2 render");
//   function calculateSum() {
//     let sum = 0;
//     for (let i = 0; i <= 100; i++) {
//       sum += i;
//     }
//     return sum;
//   }
//   const total = calculateSum();
//   return (
//     <>
//       <p>[Component 2]</p>
//       <h1>{total}</h1>
//     </>
//   );
// };

// export default Comp2;

// ==========> solution By React.Memo

const Sum = React.memo(() => {
  // console.log("Child Component render");
  function calculateSum() {
    let sum = 0;
    for (let i = 0; i <= 100; i++) {
      sum += i;
    }
    return sum;
  }
  const total = calculateSum();
  return (
    <>
      <p>[Child Component]</p>
      <h1>{total}</h1>
    </>
  );
});

export default Sum;

// Now only Comp 1 render with state changes
