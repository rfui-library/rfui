import * as React from "react";
import { useState } from "react";

export const Button = () => {
  const [numTimesClicked, setNumTimesClicked] = useState(0);
  const incrementNumTimesClicked = () => {
    setNumTimesClicked((n) => n + 1);
  };

  return (
    <button onClick={incrementNumTimesClicked}>
      Clicked {numTimesClicked} times
    </button>
  );
};
