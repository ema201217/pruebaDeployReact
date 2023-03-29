import { Link } from "react-router-dom";

export const Layout = ({ children }) => {
  return (
    <>
      <header>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/about">Sobre Nosotros</Link>
          </li>

          <li>
            <Link to="/contact">Contacto</Link>
          </li>
          <li>
            <Link to="/user/profile">Perfil de usuario</Link>
          </li>

          <li>
            <Link to="/login">Login</Link>
          </li>

          <li>
            <Link to="/register">Registro</Link>
          </li>

          <li>
            <Link to="/products">Productos</Link>
          </li>
          <li>
            <Link to="/products/detail">Detalle de producto</Link>
          </li>
          <li>
            <Link to="/products/create">Crear Producto</Link>
          </li>

          {/* Agregar las otras vistas */}
        </ul>
      </header>

      <div>{children}</div>

      <footer>
        <p>Este es el FOOTER</p>
      </footer>
    </>
  );
};
