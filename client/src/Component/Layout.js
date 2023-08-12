import React from "react";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <>
      <div>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <Helmet>
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <meta name="author" content={author} />
        </Helmet>
      </div>

      <Header />
      <main style={{ height: "76vh" }}>
        <Toaster />
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
