import { useLocation, useNavigate } from "react-router";
import { Layout } from "../Layouts/layout";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { enfasis } from "../helpers/enfasis";

export const ListProducts = () => {
  const [query] = useSearchParams();
  const redirect = useNavigate()
  const keyword = query.get("keyword");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/products?q=${keyword}`)
      .then((res) => res.json())
      .then((data) => setProducts(data));

      if(!keyword){
        fetch(`http://localhost:3001/products`)
        .then((res) => res.json())
        .then((data) => setProducts(data));
      }

  }, [keyword]);

  return (
    <Layout>
      <h1 className="text-center my-3">LISTA DE PRODUCTOS</h1>
      <Container>
        <Row>
          {products.map((product) => {
            return (
              <Col key={product.id} md={4} lg={3}>
                <Card style={{ width: "15rem" }} className="my-4 mx-auto">
                  <Card.Img
                    variant="top"
                    src={product.images.find((img) => img.primary)?.url}
                    style={{ height: "150px", objectFit: "contain" }}
                  />
                  <Card.Body>
                    <Card.Title className="fs-6">{product.name}</Card.Title>
                    <Card.Text style={{ fontSize: ".7rem" }}>
                      {enfasis(product.description)}
                    </Card.Text>
                    <Button
                      as={Link}
                      to={`/products/detail/${product.id}`}
                      variant="primary"
                      className="btn-sm"
                    >
                      Ver mas
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </Layout>
  );
};
