import { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { UpdateProduct } from "./page/UpdateProduct";
import { Admin } from "./page/Admin";

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
        <Route path="/products/detail/:idProduct" element={<DetailProduct />} />

        <Route
          path="/login"
          element={
            <CheckPermission hasPermission={!user._id} redirect="/user/profile">
              <Login />
            </CheckPermission>
          }
        />

        <Route
          path="/register"
          element={
            <CheckPermission hasPermission={!user._id} redirect="/user/profile">
              <Register />
            </CheckPermission>
          }
        />

        <Route
          path="/user/profile"
          element={
            <CheckPermission hasPermission={user._id} redirect="/login">
              <ProfileUser />
            </CheckPermission>
          }
        />
        <Route
          path="/products/create"
          element={
            <CheckPermission hasPermission={user._id && user.rol === "ADMIN"}>
              <CreateProduct />
            </CheckPermission>
          }
        />

        <Route
          path="/users/admin"
          element={
            <CheckPermission hasPermission={user._id && user.rol === "ADMIN"}>
              <Admin />
            </CheckPermission>
          }
        />

        <Route
          path="/products/update/:idProduct"
          element={
            <CheckPermission hasPermission={user._id && user.rol === "ADMIN"}>
              <UpdateProduct />
            </CheckPermission>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
