import React, { useEffect, useState } from "react";
import { Layout } from "../Layouts/layout";
import Slider from "react-slick";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const DetailProduct = () => {
  const mySwal = withReactContent(Swal);
  const redirect = useNavigate();
  const { idProduct } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    fetch(`http://localhost:3030/products/${idProduct}`)
      .then((res) => res.json())
      .then(({ data, ok }) => ok ? setProduct(data) : null)
      .catch(err => console.error(err))
  }, []);

  const formatterPeso = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  });

  const handleDelete = () => {
    mySwal
      .fire({
        title: "Estas seguro de eliminar el producto:",
        text: product.name,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Eliminar",
      })
      .then((result) => {
        if (result.isConfirmed) {
          fetch(`http://localhost:3030/products/${idProduct}`, {
            method: "DELETE",
          })
          .then(res => res.json())
          .then(({message}) => {
            mySwal
              .fire({
                title: message,
                icon: "success",
                timer: 2000,
                showConfirmButton: false,
              })
              .then(() => {
                redirect("/");
              });
          });
        }
      });
  };

  return (
    <Layout>
      <Container className="my-5">
        <Row>
          <Col md={12} className="d-flex justify-content-end gap-2">
            <Button as={Link} to={`/products/update/${product._id}`}>
              Editar
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Eliminar
            </Button>
          </Col>
          <Slider
            dots={true}
            speed={500}
            slidesToShow={1}
            className="card card-body mb-3 col-md-4"
          >
            {product.images
              ? product.images.map((image, index) => {
                return (
                  <div key={index}>
                    <Image
                      style={{ height: "200px" }}
                      src={image.url}
                      alt=""
                      className="m-auto"
                    />
                  </div>
                );
              })
              : null}
          </Slider>

          <div className="col-md-6">
            <h5 className="text-primary">{product.name}</h5>
            <p className="text-muted">{product.description}</p>
            <span className="text-success mx-2 display-6">
              {formatterPeso.format(
                product.price - (product.price * product.discount) / 100
              )}
            </span>
            <p>
              <span className="text-primary text-decoration-line-through mx-3">
                {formatterPeso.format(product.price)}
              </span>
              <span
                className="text-danger fw-bold"
                style={{ fontSize: ".7rem" }}
              >
                {product.discount}% OFF
              </span>
            </p>
          </div>
        </Row>
      </Container>
    </Layout>
  );
};
