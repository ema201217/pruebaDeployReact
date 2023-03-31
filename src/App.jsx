import { useContext, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserContext } from "./contexts/userContext";
import { CheckPermission } from "./helpers/CheckPermission";
import { About } from "./page/About";
import { Contact } from "./page/Contact";
import { CreateProduct } from "./page/CreateProduct";
import { DetailProduct } from "./page/DetailProduct";
import { Home } from "./page/Home";
import { ListProducts } from "./page/ListProducts";
import { Login } from "./page/Login";
import { ProfileUser } from "./page/ProfileUser";
import { Register } from "./page/Register";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const { user } = useContext(UserContext);
  return (
    <BrowserRouter>
      <Routes>
        {/* "index" es los mismo que hacer path="/" */}
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/products" element={<ListProducts />} />
        <Route path="/products/detail" element={<DetailProduct />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/user/profile"
          element={
            <CheckPermission hasPermission={user.id} redirect="/login">
              <ProfileUser />
            </CheckPermission>
          }
        />
        <Route
          path="/products/create"
          element={
            <CheckPermission hasPermission={user.id && user.rol === "ADMIN"}>
              <CreateProduct />
            </CheckPermission>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
