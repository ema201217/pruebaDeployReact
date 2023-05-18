import { useContext, useState } from "react";
import {
  Button,
  Container,
  Form,
  Image,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";

export const Header = () => {
  const { user, logout } = useContext(UserContext);
  const redirect = useNavigate();
  const [keyword, setKeyword] = useState("");

  const handleKeyword = ({ target }) => {
    setKeyword(target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    redirect(`/products?keyword=${keyword}`);
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <Image src="public/logo.png" alt="logo" />
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
              {!user._id ? (
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

              {user._id ? (
                <>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/user/profile">
                    Mis datos
                  </NavDropdown.Item>
                </>
              ) : null}

              {user._id && user.rol === "ADMIN" ? (
                <NavDropdown.Item as={Link} to="/users/admin">
                  Administrar
                </NavDropdown.Item>
              ) : null}
            </NavDropdown>
          </Nav>
          <Form className="d-flex" onSubmit={handleSubmit}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={handleKeyword}
            />
            <Button type="submit" variant="outline-success">
              🔍
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
