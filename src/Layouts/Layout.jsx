import { Header } from "../components/Header";

export const Layout = ({ children }) => {
  return (
    <>
     <Header />

      <div style={{border:"1px solid gray",height:"60vh"}}>{children}</div>

      <footer>
        <p>Este es el FOOTER</p>
      </footer>
    </>
  );
};
