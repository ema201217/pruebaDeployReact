import { Button, Card, Carousel, Image } from "react-bootstrap";
import { Layout } from "../Layouts/layout";
import Slider from "react-slick";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { enfasis } from "../helpers/enfasis";
const HOST_SERVER = import.meta.env.VITE_HOST_SERVER

export const Home = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    /* Cuando se monta la vista Home */

    fetch(`${HOST_SERVER}/products`)
      .then((res) => res.json())
      .then(({ok,data}) => {
        ok ? setProducts(data) : null; 
      })
      .catch(err => console.error(err))
  }, []);

  return (
    <Layout>
      <Carousel>
        <Carousel.Item>
          <Image
            className="d-block w-100"
            src="https://http2.mlstatic.com/D_NQ_769192-MLA54851350504_042023-OO.webp"
            alt="First slide"
          />
        </Carousel.Item>
      </Carousel>

      <Slider dots={true} speed={500} slidesToShow={4} slidesToScroll={2}>
        {products.map((product) => {
          return (
            <div key={product.id}>
              <Card style={{ width: "15rem" }} className="my-4 mx-auto">
                <Card.Img
                  variant="top"
                  src={product.images.find(img => img.primary)?.url}
                  style={{ height: "150px", objectFit: "contain" }}
                />
                <Card.Body>
                  <Card.Title className="fs-6">{product.name}</Card.Title>
                  <Card.Text style={{ fontSize: ".7rem" }}>
                    {enfasis(product.description)}
                  </Card.Text>
                  <Button as={Link} to={`/products/detail/${product._id}`} variant="primary" className="btn-sm">
                    Ver mas
                  </Button>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </Slider>
    </Layout>
  );
};
