import React, { useContext, useEffect, useState } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { UserContext } from "../contexts/userContext";

const imageDefault =
  "https://farmateambg.com/wp-content/plugins/ecommerce-product-catalog/img/no-default-thumbnail.png";

export const UpdateProduct = () => {
  const mySwal = withReactContent(Swal);

  const { idProduct } = useParams();
  const redirect = useNavigate();
  const initialStateProduct = {
    id: null,
    name: "",
    description: "",
    price: 0,
    discount: 0,
    images: [
      {
        id: 1,
        primary: true,
        url: imageDefault,
      },
      {
        id: 2,
        primary: false,
        url: imageDefault,
      },
      {
        id: 3,
        primary: false,
        url: imageDefault,
      },
    ],
  };
  const [product, setProduct] = useState(initialStateProduct);
  const { token } = useContext(UserContext);
  const handleName = ({ target }) => {
    setProduct({
      ...product,
      name: target.value,
    });
  };

  const handlePrice = ({ target }) => {
    setProduct({
      ...product,
      price: parseInt(target.value),
    });
  };

  const handleDiscount = ({ target }) => {
    setProduct({
      ...product,
      discount: parseInt(target.value),
    });
  };

  const handleDescription = ({ target }) => {
    setProduct({
      ...product,
      description: target.value,
    });
  };

  const handleImages = ({ target }) => {
    const imagesMapped = product.images.map((img) => {
      if (img.id === parseInt(target.id)) {
        return {
          ...img,
          url: target.value,
        };
      }
      return img;
    });
    setProduct({
      ...product,
      images: imagesMapped,
    });
  };

  const handleCheckPrimary = ({ target }) => {
    const imagesMapped = product.images.map((img) => {
      img.primary = false;
      if (img.id === parseInt(target.id)) {
        return {
          ...img,
          primary: true,
        };
      }
      return img;
    });
    setProduct({
      ...product,
      images: imagesMapped,
    });
  };

  useEffect(() => {
    fetch(`http://localhost:3030/products/${idProduct}`)
      .then((res) => res.json())
      .then(({ data, ok }) => (ok ? setProduct(data) : null));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:3030/products/${idProduct}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then(({ ok, message }) => {
        mySwal
          .fire({
            title: message,
            icon: ok ? "success" : "error",
            showConfirmButton: false,
            timer: 2000,
          })
          .then(() => {
            ok ? redirect(`/users/admin`) : redirect("/login");
          });
      });
  };

  return (
    <Layout>
      <h1 className="text-center my-2">EDITAR PRODUCTO</h1>
      <Form onSubmit={handleSubmit}>
        <Container className="mb-4">
          <Row>
            <Col md={12} lg={4}>
              <Form.Group className="mb-3">
                {/* NOMBRE */}
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresar nombre"
                  value={product.name}
                  onChange={handleName}
                />
                <Form.Text className="text-danger"></Form.Text>
              </Form.Group>
            </Col>
            <Col md={12} lg={4}>
              {/* PRECIO */}
              <Form.Group className="mb-3">
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Ingresar precio"
                  value={product.price}
                  onChange={handlePrice}
                />
                <Form.Text className="text-danger"></Form.Text>
              </Form.Group>
            </Col>
            {/* DESCUENTO */}
            <Col md={12} lg={4}>
              <Form.Group className="mb-3">
                <Form.Label>Descuento</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Ingresar descuento"
                  value={product.discount}
                  onChange={handleDiscount}
                />
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
                  {product.images[0].primary ? (
                    <span className="position-absolute top-50 start-50 translate-middle rotate-3 fw-bold text-info">
                      PRIMARIA
                    </span>
                  ) : null}
                </Container>
                <Form.Label>Imagen 1</Form.Label>

                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Ingresar imagen 1"
                    value={product.images[0].url}
                    id="1"
                    onChange={handleImages}
                  />
                  <InputGroup.Text className="bg-white">
                    <Form.Check
                      type="radio"
                      name="activePrimary"
                      id="1"
                      onChange={handleCheckPrimary}
                      checked={product.images[0].primary}
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
                      position: "relative",
                    }}
                    src={
                      product.images[1].url
                        ? product.images[1].url
                        : imageDefault
                    }
                    alt=""
                  />
                  {product.images[1].primary ? (
                    <span className="position-absolute top-50 start-50 translate-middle rotate-3 fw-bold text-info">
                      PRIMARIA
                    </span>
                  ) : null}
                </Container>
                <Form.Label>Imagen 2</Form.Label>

                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Ingresar imagen 2"
                    value={product.images[1].url}
                    id="2"
                    onChange={handleImages}
                  />
                  <InputGroup.Text className="bg-white">
                    <Form.Check
                      type="radio"
                      name="activePrimary"
                      id="2"
                      onChange={handleCheckPrimary}
                      checked={product.images[1].primary}
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
                    src={
                      product.images[2].url
                        ? product.images[2].url
                        : imageDefault
                    }
                    alt=""
                  />
                  {product.images[2].primary ? (
                    <span className="position-absolute top-50 start-50 translate-middle rotate-3 fw-bold text-info">
                      PRIMARIA
                    </span>
                  ) : null}
                </Container>
                <Form.Label>Imagen 3</Form.Label>

                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Ingresar imagen 3"
                    id="3"
                    value={product.images[2].url}
                    onChange={handleImages}
                  />
                  <InputGroup.Text className="bg-white">
                    <Form.Check
                      type="radio"
                      name="activePrimary"
                      id="3"
                      onChange={handleCheckPrimary}
                      checked={product.images[2].primary}
                    />
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
                  value={product.description}
                  onChange={handleDescription}
                />
                <Form.Text className="text-danger"></Form.Text>
              </Form.Group>
            </Col>
            <Col md={6} lg={3}>
              <Form.Group className="my-3">
                <Button variant="primary" type="submit" className="w-100 mt-3">
                  Actualizar
                </Button>
              </Form.Group>
            </Col>
          </Row>
        </Container>
      </Form>
    </Layout>
  );
};
