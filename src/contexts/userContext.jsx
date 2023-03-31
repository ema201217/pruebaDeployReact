import { createContext, useState } from "react";

const userInitialState = {
  id: "",
  username: "",
  password: "",
  rol: "",
  avatar: "",
};
export const UserContext = createContext(userInitialState); // {Provider , Consumer}

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(userInitialState);

  const loginUser = () => {
    const infoUser = {
      id: "asdo123",
      username: "Gonza2023",
      password: "123456",
      rol: "REGULAR", // REGULAR
      avatar:
        "https://as2.ftcdn.net/v2/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.jpg",
    };
    setUser(infoUser);
  };

  const logout = () => {
    setUser(userInitialState);
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logout }}>
      {/* REPRESENTACIÓN DE VARIABLES GLOBALES */}
      {children}
    </UserContext.Provider>
  );
};
