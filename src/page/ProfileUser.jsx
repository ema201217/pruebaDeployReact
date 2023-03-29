import React from "react";
import { Layout } from "../Layouts/layout";

export const ProfileUser = ({ user }) => {
  return (
    <Layout>
      <img
        src={user.avatar}
        style={{
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          objectFit: "contain",
        }}
        alt=""
      />
      <h1>PERFIL DE USUARIO</h1>
    </Layout>
  );
};
