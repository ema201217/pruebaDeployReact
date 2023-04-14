import { Layout } from "../Layouts/layout";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import bcrypt from 'bcryptjs'

const ContainerButton = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LinkComponent = styled(Link)`
  color: #248626;
  transition: 0.35s;
  &:hover {
    color: #038605;
  }
`;
export const Register = () => {
  const redirect = useNavigate()
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error,setError] = useState('')

  /* handlers */
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleChangePassword2 = (e) => {
    setPassword2(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!email || !username || !password || !password2) {
      setError("Todos los campos son obligatorios")
      return
    }

    const res = await fetch(`http://localhost:3001/users?email=${email}`);
    const user = await res.json();
    const userObj = user[0]

    if(userObj){
      setError("El usuario ya esta registrado con ese email")
      return
    }

    if(password !== password2){
      setError("Las contraseñas no coinciden")
      return
    }



    error ? setError('') : null
    const newUser = {
      username /* username: "dasdaso" */,
      email,
      password: bcrypt.hashSync(password),
      rol: "REGULAR",
      avatar:
        "https://as2.ftcdn.net/v2/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.jpg",
    };

    fetch("http://localhost:3001/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    redirect('/login')
  };

  return (
    <Layout>
      <Container className="my-4">
        <Row>
          <Col lg={{ span: 6, offset: 3 }} md={{ span: 6, offset: 3 }}>
            <h1 className="text-center">REGISTRO DE USUARIO</h1>
          </Col>
          <Col lg={{ span: 4, offset: 4 }} md={{ span: 6, offset: 3 }}>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Colocar Correo electrónico"
                  value={email}
                  onChange={handleChangeEmail}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={handleChangeUsername}
                  placeholder="Colocar nombre de usuario"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={handleChangePassword}
                  placeholder="Colocar Contraseña"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Repetir Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  value={password2}
                  onChange={handleChangePassword2}
                  placeholder="Repetir Contraseña"
                />
              </Form.Group>
              <p className="text-danger">{error}</p>
              <ContainerButton>
                <LinkComponent to="/login">Estoy registrado</LinkComponent>

                <Button variant="primary" type="submit">
                  Registro
                </Button>
              </ContainerButton>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};
