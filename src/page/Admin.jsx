import React, { useContext, useEffect, useState } from "react";
import { Button, Form, FormControl, Tab, Table, Tabs } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "../Layouts/layout";
import { UserContext } from "../contexts/userContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const serverHost = import.meta.env.VITE_HOST_SERVER;

export const Admin = () => {
  const [products, setProducts] = useState([]);
  const redirect = useNavigate();
  const { token } = useContext(UserContext);
  const mySwal = withReactContent(Swal);

  const getProducts = () => {
    fetch(`${serverHost}/products`)
    .then((res) => res.json())
    .then(({ data }) => setProducts(data));
  }

  useEffect(() => {
    getProducts()
  }, []);

  const handleCheckActive = async (id) => {
    await fetch(`${serverHost}/products/toggle/${id}`, {
      headers: {
        Authorization: token,
      },
    });
  };

  const handleDelete = ({ id, name }) => {
    mySwal
      .fire({
        title: "Estas seguro de eliminar el producto:",
        text: name,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Eliminar",
      })
      .then((result) => {
        if (result.isConfirmed) {
          fetch(`http://localhost:3030/products/${id}`, {
            method: "DELETE",
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then(({ ok, message }) => {
              console.log({ ok, message });
              mySwal
                .fire({
                  title: message,
                  icon: ok ? "success" : "error",
                  timer: 2000,
                  showConfirmButton: false,
                })
                .then(() => {
                  ok ? redirect("/") : redirect("/login");
                });
            });
        }
      });
  };

  return (
    <Layout>
      <Tabs
        defaultActiveKey="menus"
        id="uncontrolled-tab-example"
        className="my-3"
      >
        <Tab eventKey="menus" title="Menus">
          <Button as={Link} to="/products/create">
            Nuevo Menu
          </Button>

          <Table striped bordered hover className="mt-5">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Descuento</th>
                <th>Imágenes</th>
                <th>Activo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                return (
                  <tr key={product._id}>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    <td>{product.discount}</td>
                    <td>
                      <img
                        width={100}
                        height={100}
                        style={{ objectFit: "contain" }}
                        src={product.images.find(({ primary }) => primary)?.url}
                        alt={product.name}
                      />
                    </td>
                    <td>
                      <Form.Check
                        onChange={() => handleCheckActive(product._id)}
                        checked={product.available}
                      />
                    </td>
                    <td>
                      <Button as={Link} to={`/products/update/${product._id}`}>
                        Editar
                      </Button>

                      <Button
                        variant="danger"
                        onClick={() => handleDelete(product)}
                      >
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey="usuarios" title="Usuarios">
          <Button as={Link} to="/products/create">
            Nuevo Usuario
          </Button>

          <Table striped bordered hover className="mt-5">
            <thead>
              <tr>
                <th>Nombre Usuario</th>
                <th>Email</th>
                <th>Avatar</th>
                <th>Rol</th>
                <th>Activo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>@mdo</td>
              </tr>
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey="pedidos" title="Pedidos">
          Contenido de pedidos
        </Tab>
      </Tabs>
    </Layout>
  );
};
