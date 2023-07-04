import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const signup = async (fullname, username, accountType, password) => {
    setIsLoading(true);
    setError(null);
    const response = await fetch(`${import.meta.env.VITE_USER_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullname,
        username,
        accountType,
        password,
      }),
    });
    const json = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      //save the user to localstorage
      localStorage.setItem("rms-user", JSON.stringify(json));

      //update the auth context
      dispatch({ type: "LOGIN", payload: json });

      setIsLoading(false);
      navigate("/dashboard", { replace: true });
    }
  };

  return { signup, isLoading, error };
};
