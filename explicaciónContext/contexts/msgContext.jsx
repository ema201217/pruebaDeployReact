import { createContext } from "react";

export const MsgContext = createContext(""); // { Provider, Consumer }

export const MsgProvider = ({ children }) => {
  return (
    <MsgContext.Provider
      value={{ msg: "MENSAJE DESDE UN CONTEXTO", loading: false }}
    >
      {children}
    </MsgContext.Provider>
  );
};

/* let esMenor = false;
let edad = 10

if(edad < 18) {
  esMenor = true;
} */