import React, { useState } from "react";
import { Layout } from "../Layouts/layout";
import {
  Button,
  Col,
  Container,
  Form,
  Image,
  InputGroup,
  Row,
} from "react-bootstrap";
const imageDefault =
  "https://farmateambg.com/wp-content/plugins/ecommerce-product-catalog/img/no-default-thumbnail.png";

export const CreateProduct = () => {
  return (
    <Layout>
      <h1 className="text-center my-2">NUEVO PRODUCTO</h1>
      <Form>
        <Container className="mb-4">
          <Row>
            <Col md={12} lg={4}>
              <Form.Group className="mb-3" controlId="formName">
                {/* NOMBRE */}
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" placeholder="Ingresar nombre" />
              </Form.Group>
            </Col>
            <Col md={12} lg={4}>
              {/* PRECIO */}
              <Form.Group className="mb-3" controlId="formPrice">
                <Form.Label>Precio</Form.Label>
                <Form.Control type="number" placeholder="Ingresar precio" />
              </Form.Group>
            </Col>
            {/* DESCUENTO */}
            <Col md={12} lg={4}>
              <Form.Group className="mb-3" controlId="formDiscount">
                <Form.Label>Descuento</Form.Label>
                <Form.Control type="number" placeholder="Ingresar descuento" />
              </Form.Group>
            </Col>

            {/* IMÁGENES */}
            <Col md={12} lg={4}>
              <Form.Group className="mb-3" controlId="formImage">
                <Container className="d-flex justify-content-center">
                  <Image
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "contain",
                      margin: "auto",
                    }}
                    src={imageDefault}
                    alt=""
                  />
                </Container>
                <Form.Label>Imagen 1 - Activar primaria</Form.Label>

                <InputGroup>
                  <Form.Control type="text" placeholder="Ingresar imagen 1" />
                  <InputGroup.Text className="bg-white">
                    <Form.Check type="radio" name="activePrimary" />
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
            </Col>

            <Col md={12} lg={4}>
              <Form.Group className="mb-3" controlId="formImage">
                <Container className="d-flex justify-content-center">
                  <Image
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "contain",
                      margin: "auto",
                    }}
                    src={imageDefault}
                    alt=""
                  />
                </Container>
                <Form.Label>Imagen 2 - Activar primaria</Form.Label>

                <InputGroup>
                  <Form.Control type="text" placeholder="Ingresar imagen 2" />
                  <InputGroup.Text className="bg-white">
                    <Form.Check type="radio" name="activePrimary" />
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
            </Col>
            <Col md={12} lg={4}>
              <Form.Group className="mb-3" controlId="formImage">
                <Container className="d-flex justify-content-center">
                  <Image
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "contain",
                      margin: "auto",
                    }}
                    src={imageDefault}
                    alt=""
                  />
                </Container>
                <Form.Label>Imagen 3 - Activar primaria</Form.Label>

                <InputGroup>
                  <Form.Control type="text" placeholder="Ingresar imagen 3" />
                  <InputGroup.Text className="bg-white">
                    <Form.Check type="radio" name="activePrimary" />
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
            </Col>

            {/* DESCRIPCIÓN */}
            <Col md={12} lg={9}>
              <Form.Group className="my-3" controlId="formPrice">
                <Form.Control
                  as={"textarea"}
                  rows={3}
                  type="text"
                  placeholder="Ingresar Descripción"
                />
              </Form.Group>
            </Col>
            <Col md={6} lg={3}>
              <Form.Group className="my-3" controlId="formSubmit">
                <Button variant="primary" type="submit" className="w-100 mt-3">
                  Guardar
                </Button>
              </Form.Group>
            </Col>
          </Row>
        </Container>
      </Form>
    </Layout>
  );
};
