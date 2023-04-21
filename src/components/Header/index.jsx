import { useContext } from "react";
import logo from "../../../public/logo.png";
import {
  Button,
  Container,
  Form,
  Image,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";

export const Header = () => {
  const { user, logout } = useContext(UserContext);
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <Image src={logo} alt="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/home">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              Sobre Nosotros
            </Nav.Link>
            <Nav.Link as={Link} to="/contact">
              Contacto
            </Nav.Link>
            <Nav.Link as={Link} to="/products">
              Productos
            </Nav.Link>

            <NavDropdown title="Usuario" id="navbarScrollingDropdown">
              {!user.id ? (
                <>
                  <NavDropdown.Item as={Link} to="/login">
                    Iniciar sesión
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/register">
                    Registro
                  </NavDropdown.Item>
                </>
              ) : (
                <NavDropdown.Item onClick={logout}>
                  Cerrar sesión
                </NavDropdown.Item>
              )}

              {user.id ? (
                <>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/user/profile">
                    Mis datos
                  </NavDropdown.Item>
                </>
              ) : null}

              {user.id && user.rol === "ADMIN" ? (
                <NavDropdown.Item as={Link} to="/products/create">
                  Crear producto
                </NavDropdown.Item>
              ) : null}
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
