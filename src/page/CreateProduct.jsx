import { useState } from "react";
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
  const initialStateImages = [
    {
      id: 1,
      primary: true,
      url: "",
    },
    {
      id: 2,
      primary: false,
      url: "",
    },
    {
      id: 3,
      primary: false,
      url: "",
    },
  ];
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [images, setImages] = useState(initialStateImages);
  const [description, setDescription] = useState("");

  const handleInputName = ({ target }) => {
    // event onChange
    setName(target.value);
  };

  const handleInputPrice = ({ target }) => {
    setPrice(target.value);
  };

  const handleInputDiscount = ({ target }) => {
    setDiscount(target.value);
  };

  const handleInputDescription = ({ target }) => {
    setDescription(target.value);
  };

  const resetStatesAndForm = () => {
    setName("");
    setPrice(0);
    setDiscount(0);
    setImages(initialStateImages);
    setDescription("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      name,
      price: parseInt(price),
      discount: parseInt(discount),
      description,
      images,
    };


    fetch("http://localhost:3001/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    }).then(() => {
      resetStatesAndForm();
    });
  };

  const handleInputImages = ({ target }) => {
    const imagesMapped = images.map((img) => {
      // url del la primera imagen la cambie
      // id de la imagen === id del input imagen
      if (img.id === parseInt(target.id)) {
        return {
          id: img.id,
          primary: img.primary,
          url: target.value,
        };
      }
      return img;
    });
    setImages(imagesMapped); // url del la primera imagen la cambie
  };

  const handleCheckPrimaryImg = ({ target }) => {
    // trabaja con onChange
    const imagesMappedPrimary = images.map((img) => {
      img.primary = false;
      // si el ID de la imagen es igual al la del input check
      if (img.id === parseInt(target.id)) {
        return {
          id: img.id,
          primary: true,
          url: img.url,
        };
      }
      return img;
    });
    setImages(imagesMappedPrimary)
  };

  return (
    <Layout>
      <h1 className="text-center my-2">NUEVO PRODUCTO</h1>
      <Form onSubmit={handleSubmit}>
        <Container className="mb-4">
          <Row>
            <Col md={12} lg={4}>
              <Form.Group className="mb-3">
                {/* NOMBRE */}
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  placeholder="Ingresar nombre"
                  onChange={handleInputName}
                />
              </Form.Group>
            </Col>
            <Col md={12} lg={4}>
              {/* PRECIO */}
              <Form.Group className="mb-3">
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  type="number"
                  value={price}
                  placeholder="Ingresar precio"
                  onChange={handleInputPrice}
                />
              </Form.Group>
            </Col>
            {/* DESCUENTO */}
            <Col md={12} lg={4}>
              <Form.Group className="mb-3">
                <Form.Label>Descuento</Form.Label>
                <Form.Control
                  type="number"
                  value={discount}
                  placeholder="Ingresar descuento"
                  onChange={handleInputDiscount}
                />
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
                    src={images[0].url ? images[0].url : imageDefault}
                    alt=""
                  />
                  {
                    images[0].primary ? (
                      <span className="position-absolute top-50 start-50 translate-middle rotate-3 fw-bold text-info">
                    PRIMARIA
                  </span>
                    ) : null
                  }
                </Container>
                <Form.Label>Imagen 1</Form.Label>

                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Ingresar imagen 1"
                    id="1"
                    onChange={handleInputImages}
                    value={images[0].url}
                  />
                  <InputGroup.Text className="bg-white">
                    <Form.Check
                      type="radio"
                      name="activePrimary"
                      id="1"
                      onChange={handleCheckPrimaryImg}
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
                    src={images[1].url ? images[1].url : imageDefault}
                    alt=""
                  />
                  {
                    images[1].primary ? (
                      <span className="position-absolute top-50 start-50 translate-middle rotate-3 fw-bold text-info">
                    PRIMARIA
                  </span>
                    ) : null
                  }
                </Container>
                <Form.Label>Imagen 2</Form.Label>

                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Ingresar imagen 2"
                    id="2"
                    onChange={handleInputImages}
                    value={images[1].url}
                  />
                  <InputGroup.Text className="bg-white">
                    <Form.Check
                      type="radio"
                      name="activePrimary"
                      id="2"
                      onChange={handleCheckPrimaryImg}
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
                    src={images[2].url ? images[2].url : imageDefault}
                    alt=""
                  />
                  {
                    images[2].primary ? (
                      <span className="position-absolute top-50 start-50 translate-middle rotate-3 fw-bold text-info">
                    PRIMARIA
                  </span>
                    ) : null
                  }
                </Container>
                <Form.Label>Imagen 3</Form.Label>

                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Ingresar imagen 3"
                    id="3"
                    onChange={handleInputImages}
                    value={images[2].url}
                  />
                  <InputGroup.Text className="bg-white">
                    <Form.Check
                      type="radio"
                      name="activePrimary"
                      id="3"
                      onChange={handleCheckPrimaryImg}
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
                  value={description}
                  placeholder="Ingresar Descripción"
                  onChange={handleInputDescription}
                />
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
