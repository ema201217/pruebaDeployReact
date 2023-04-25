import React, { useEffect, useState } from "react";
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
import { useParams } from "react-router-dom";
const imageDefault =
  "https://farmateambg.com/wp-content/plugins/ecommerce-product-catalog/img/no-default-thumbnail.png";

export const UpdateProduct = () => {
  const { idProduct } = useParams();
  const [product, setProduct] = useState({})

  useEffect(() => {
    fetch(`http://localhost:3001/products/${idProduct}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, []);

  return (
    <Layout>
      <h1 className="text-center my-2">EDITAR PRODUCTO</h1>
      <Form>
        <Container className="mb-4">
          <Row>
            <Col md={12} lg={4}>
              <Form.Group className="mb-3">
                {/* NOMBRE */}
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" placeholder="Ingresar nombre" value={product?.name}/>
                <Form.Text className="text-danger"></Form.Text>
              </Form.Group>
            </Col>
            <Col md={12} lg={4}>
              {/* PRECIO */}
              <Form.Group className="mb-3">
                <Form.Label>Precio</Form.Label>
                <Form.Control type="number" placeholder="Ingresar precio" value={product?.price} />
                <Form.Text className="text-danger"></Form.Text>
              </Form.Group>
            </Col>
            {/* DESCUENTO */}
            <Col md={12} lg={4}>
              <Form.Group className="mb-3">
                <Form.Label>Descuento</Form.Label>
                <Form.Control type="number" placeholder="Ingresar descuento" value={product?.discount}/>
                <Form.Text className="text-danger"></Form.Text>
              </Form.Group>
            </Col>

            {/* IMÁGENES */}
            <Col md={12} lg={4}>
              <Form.Group className="mb-3">
                <Container className="d-flex justify-content-center position-relative">
                  <Image
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "contain",
                      margin: "auto",
                    }}
                    src={product.images[0].url}
                    alt=""
                  />
                  {/*  {images[0].primary ? (
                    <span className="position-absolute top-50 start-50 translate-middle rotate-3 fw-bold text-info">
                      PRIMARIA
                    </span>
                  ) : null} */}
                </Container>
                <Form.Label>Imagen 1</Form.Label>

                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Ingresar imagen 1"
                    value={product?.images[0].url}
                    id="1"
                  />
                  <InputGroup.Text className="bg-white">
                    <Form.Check type="radio" name="activePrimary" id="1" />
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
            </Col>
            <Col md={12} lg={4}>
              <Form.Group className="mb-3">
                <Container className="d-flex justify-content-center position-relative">
                  <Image
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "contain",
                      margin: "auto",
                      position: "relative",
                    }}
                    src={product?.images[1].url ? product?.images[1].url : imageDefault}
                    alt=""
                  />
                  {/* {images[1].primary ? (
                    <span className="position-absolute top-50 start-50 translate-middle rotate-3 fw-bold text-info">
                      PRIMARIA
                    </span>
                  ) : null} */}
                </Container>
                <Form.Label>Imagen 2</Form.Label>

                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Ingresar imagen 2"
                    value={product?.images[1].url}
                    id="2"
                  />
                  <InputGroup.Text className="bg-white">
                    <Form.Check
                      type="radio"
                      name="activePrimary"
                      id="2" /* 
                      onChange={handleCheckPrimaryImg} */
                    />
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
            </Col>
            <Col md={12} lg={4}>
              <Form.Group className="mb-3">
                <Container className="d-flex justify-content-center position-relative">
                  <Image
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "contain",
                      margin: "auto",
                    }}
                    src={product?.images[2].url ? product?.images[2].url : imageDefault}
                    alt=""
                  />
                  {/*  {images[2].primary ? (
                    <span className="position-absolute top-50 start-50 translate-middle rotate-3 fw-bold text-info">
                      PRIMARIA
                    </span>
                  ) : null} */}
                </Container>
                <Form.Label>Imagen 3</Form.Label>

                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Ingresar imagen 3"
                    id="3"
                    value={product?.images[2].url}
                  />
                  <InputGroup.Text className="bg-white">
                    <Form.Check type="radio" name="activePrimary" id="3" />
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
            </Col>

            {/* DESCRIPCIÓN */}
            <Col md={12} lg={9}>
              <Form.Group className="my-3">
                <Form.Control
                  as={"textarea"}
                  rows={3}
                  type="text"
                  placeholder="Ingresar Descripción"
                  value={product?.description}
                />
                <Form.Text className="text-danger"></Form.Text>
              </Form.Group>
            </Col>
            <Col md={6} lg={3}>
              <Form.Group className="my-3">
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
