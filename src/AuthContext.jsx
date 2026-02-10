import { createContext, useContext, useState, useEffect } from "react";

const API = "https://fsa-jwt-practice.herokuapp.com";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState();
  const [location, setLocation] = useState("GATE");

  useEffect(() => {
    const savedToken = sessionStorage.getItem("token");

    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  /*
  Why put it in setToken?
  setToken() doesn't store it permanently, it just puts it in React state so app can use it
  the token survives in sessionStorage and in state via setToken so if state is wiped, it's still in sessionStorage
  if useEffect runs, loads token from sessionStorage, calls setToken() and puts it back into state
  */

  // TODO: signup
  const signup = async (username) => {
    try {
      const response = await fetch(API + "/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: "React_is_overly_complicated_and_confusing",
        }),
      });
      const data = await response.json();
      const token = data.token;
      setToken(token);
      setLocation("TABLET");
      sessionStorage.setItem("token", token);
    } catch (error) {
      console.error("It failed", error);
    }
  };

  // TODO: authenticate
  const authenticate = async () => {
    if (!token) throw new Error("No toekn");
    try {
      const response = await fetch(API + "/authenticate", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setLocation("TUNNEL");
    } catch (error) {
      console.error("Authentication Failed", error);
    }
  };

  const value = { location, signup, authenticate };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}
