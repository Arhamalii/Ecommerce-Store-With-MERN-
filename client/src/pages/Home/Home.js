import React from "react";
import Layout from "../../Component/Layout";
import { useAuth } from "../../context/auth";

const Home = () => {
  const [auth, setAuth] = useAuth();
  return (
    <Layout tittel={"Home E-Commerce"}>
      Home
      <pre> {JSON.stringify(auth, null, 4)}</pre>
    </Layout>
  );
};

export default Home;
