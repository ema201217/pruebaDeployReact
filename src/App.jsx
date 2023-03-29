import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { About } from "./page/About";
import { Contact } from "./page/Contact";
import { CreateProduct } from "./page/CreateProduct";
import { DetailProduct } from "./page/DetailProduct";
import { Home } from "./page/Home";
import { ListProducts } from "./page/ListProducts";
import { Login } from "./page/Login";
import { ProfileUser } from "./page/ProfileUser";
import { Register } from "./page/Register";
import { RoutesPrivate } from "./routes/RoutesPrivate";
import { RoutesPrivateAdmin } from "./routes/RoutesPrivateAdmin";

function App() {
  const userInitialState = {
    id: "",
    username: "",
    password: "",
    rol: "",
    avatar: "",
  };
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
    <BrowserRouter>
      {user.id ? (
        <button onClick={logout}>Cerrar sesión</button>
      ) : (
        <button onClick={loginUser}>Iniciar sesión</button>
      )}

      <Routes>
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
            <RoutesPrivate user={user}>
              <ProfileUser user={user}/>
            </RoutesPrivate>
          }
        />
        <Route
          path="/products/create"
          element={
            <RoutesPrivateAdmin user={user}>
              <CreateProduct />
            </RoutesPrivateAdmin>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
