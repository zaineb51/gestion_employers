import React from "react";
import { Link } from "react-router-dom";

//composant pour la page footer
const Footer = () => {
  return (
    <div>
      <div className="py-6 px-6 text-center">
        <p className="mb-0 fs-4">
          Design and Developed by{" "}
          <Link
            to="https://adminmart.com/"
            target="_blank"
            className="pe-1 text-primary text-decoration-underline"
          >
            AdminMart.com
          </Link>{" "}
          Distributed by <Link to="https://themewagon.com">ThemeWagon</Link>
        </p>
      </div>
      <div className="py-6 px-6 text-center">
        <p className="mb-0 fs-4">
          Design and Developed by{" "}
          <Link
            to="https://adminmart.com/"
            target="_blank"
            className="pe-1 text-primary text-decoration-underline"
          >
            AdminMart.com
          </Link>{" "}
          Distributed by <Link to="https://themewagon.com">ThemeWagon</Link>
        </p>
      </div>
    </div>
  );
};

//exporté le composant footer
export default Footer;
