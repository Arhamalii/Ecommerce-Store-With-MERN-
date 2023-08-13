import React from "react";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <>
      <div>
        <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <meta name="author" content={author} />
        </Helmet>

      <Header />
      <main style={{ height: "100%" }}>
        <Toaster />
        {children}
      </main>
      <Footer />
      </div>
    </>
  );
};

export default Layout;
