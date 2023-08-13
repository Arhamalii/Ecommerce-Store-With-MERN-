import React from "react";
import Layout from "../../Component/Layout";
import { useAuth } from "../../context/auth";
import "./Home.css"


const Home = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Home E-Commerce"}>

    <div className="home">

      Home
      <pre> {JSON.stringify(auth, null, 4)}</pre>
    </div>
    </Layout>
  );
};

export default Home;
