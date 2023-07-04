import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (username, password) => {
    setIsLoading(true);
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_USER_URL}/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
        }),
      }
    );
    const json = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      return { json };
    }
    if (response.ok) {
      //save the user to localstorage
      localStorage.setItem("rms-user", JSON.stringify(json));

      //update the auth context
      dispatch({ type: "LOGIN", payload: json });

      setIsLoading(false);

      return { json };
    }
  };
  return { isLoading, setIsLoading, login };
};
