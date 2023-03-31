import React, { useContext } from "react";
import styled from "styled-components";
import { Layout } from "../Layouts/layout";
import { UserContext } from "../contexts/userContext";

const ImgComponent = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: contain;
  transition:1s;
  ${(props) => props.active ? "box-shadow:3px 3px 5px red;" : null}

  &:hover {
    transform: scale(1.2);
  }
`;

export const ProfileUser = () => {

  const {user} = useContext(UserContext)
  return (
    <Layout>
      <ImgComponent
        src={user.avatar}
        alt=""
        active={user.rol === "ADMIN"}
      />
      <h1>PERFIL DE USUARIO</h1>
    </Layout>
  );
};
