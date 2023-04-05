import { createContext, useState } from "react";

const userInitialState = {
  id: "",
  username: "",
  email:"",
  password: "",
  rol: "",
  avatar: "",
};
export const UserContext = createContext(userInitialState); // {Provider , Consumer}

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(userInitialState);

  const logout = () => {
    setUser(userInitialState);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {/* REPRESENTACIÓN DE VARIABLES GLOBALES */}
      {children}
    </UserContext.Provider>
  );
};
