import React, { useEffect, useState } from "react";
import { Layout } from "../Layouts/layout";
import Slider from "react-slick";
import { Image } from "react-bootstrap";
import { useParams } from "react-router-dom";

export const DetailProduct = () => {
  const params = useParams();
  let [product, setProduct] = useState({});
  console.log(params.idProduct); // 1

  useEffect(() => {
    fetch(`http://localhost:3001/products?id=${params.idProduct}`)
      .then((res) => res.json())
      .then((product) => {
        console.log("el producto encontrado es", product[0]);
        setProduct(product[0]);
      });
  }, []);

  const formatterPeso = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  });

  return (
    <Layout>
      <div className="container my-5">
        <div className="row">
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
        </div>
      </div>
    </Layout>
  );
};
