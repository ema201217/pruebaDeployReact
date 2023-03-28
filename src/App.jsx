import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./page/Home";
import { ListProducts } from "./page/ListProducts";
import { Login } from "./page/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<ListProducts/>} />
        <Route path="/login" element={<Login />}/>

        {/* CREAR LAS RUTAS QUE FALTAN */}
        

      </Routes>
    </BrowserRouter>
  );
}

export default App;
