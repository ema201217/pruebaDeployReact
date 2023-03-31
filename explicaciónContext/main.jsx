import ReactDOM from "react-dom/client";
import App from "../src/App";
import { MsgProvider } from "./contexts/msgContext";
import { PruebaContext } from "./PruebaContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <MsgProvider> {/* let esMenor = false; function cambiarATrue(){esMenor=true} */}
    <PruebaContext/> {/* console.log(esMenor) // false --> true */}
   {/*  <PruebaContext2/>  console.log(esMenor) ; cambiarATrue()  */}
  </MsgProvider>
);
