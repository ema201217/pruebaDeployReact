import { useContext } from "react";
import { Header } from "./Header";
import { MsgContext } from "./contexts/msgContext";

export const PruebaContext = () => {
  const { msg } = useContext(MsgContext); // USAMOS EL CONTEXTO CREADO

  return (
    <>
      <Header />
      <div>{msg}</div>
    </>
  );
};
