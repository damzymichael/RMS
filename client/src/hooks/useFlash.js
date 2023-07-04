import { useState } from "react";

export const useFlash = () => {
  const [showMessage, setShowMessage] = useState(false);
  const flashMessage = (time) => {
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), time);
  };
  return { showMessage, flashMessage };
};
