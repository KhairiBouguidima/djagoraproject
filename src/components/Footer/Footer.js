import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>
          © {new Date().getFullYear()} Djagora Project
        </p>

        <p className="footer-names">
          Created by <strong>Khairi Bouguidima</strong> &{" "}
          <strong>Mouhamed Mouldi Ben Ksaier</strong>
        </p>
      </div>
    </footer>
  );
}

export default Footer;