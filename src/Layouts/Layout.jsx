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
            <Link to="/products">Productos</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
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
