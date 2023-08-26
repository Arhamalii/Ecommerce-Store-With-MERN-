import React from "react";
import "./Style.css";

const BnrQform = () => {
  return (
    <>
      <section id="sm-banner" className="section-p1">
        <div className="banner-box">
          <h4>Creazy Deal</h4>
          <h2>Buy 1 Get One Free</h2>
          <span>The Best classNameic Dress is on Sale at zara </span>
          <button className="white">learn more</button>
        </div>

        <div className="banner-box banner-box2">
          <h4>Creazy Deal</h4>
          <h2>Buy 1 Get One Free</h2>
          <span>The Best classNameic Dress is on Sale at zara </span>
          <button className="white">learn more</button>
        </div>
      </section>

      <section className="newsletter section-m1 section-p1">
        <div className="newstext">
          <h4>sign in for Newsletter</h4>
          <p>
            get email update about our latest shop and
            <span>Special offers.</span>
          </p>
        </div>
        <div className="form">
          <input type="text" placeholder="ENTER YOUR E-MAIL" />
          <button className="normal">Sign Up</button>
        </div>
      </section>


    </>
  );
};

export default BnrQform;
