import React from "react";
import "./Footer.css";
import { BsArrowUpCircle } from "react-icons/bs";
import { GiPeanut } from "react-icons/gi";
import { SiCmake } from "react-icons/si";


const Footer = () => {
  return (
    <div className="footer_container">
      <div className="footer_detail">
        <div className="footer_header">
          <h2>
            <GiPeanut style={{ color: "#f27935" }} />
          </h2>
            <p className="footer_header-sroll">
              Return to Top <BsArrowUpCircle style={{ marginLeft: "10px" }} />
            </p>
        </div>
        <div className="footer_body">
          <ul className="footer_body-detail">
            <li>About</li>
            <li>Privacy Notice</li>
            <li>Interest Based Ads</li>
            <li>Our Company</li>
            <li>Advertise with Us</li>
          </ul>
          <ul className="footer_body-detail">
            <li>Contact</li>
            <li>Customer Service</li>
            <li>Newscroom Contacts</li>
          </ul>
          <ul className="footer_body-detail">
            <li>Connect</li>
            <li>Email</li>
            <li>
              <i class="fa-brands fa-facebook"></i> Facebook
            </li>
            <li>
              <i class="fa-brands fa-twitter"></i> Twitter
            </li>
            <li>
              <i class="fa-brands fa-unsplash"></i> Unplash
            </li>
            <li>
              <i class="fa-brands fa-pinterest"></i> Pinterest
            </li>
            <li>
              <i class="fa-brands fa-google"></i> Google
            </li>
            <li>
              <i class="fa-brands fa-instagram"></i> Instagram
            </li>
          </ul>
          <ul className="footer_body-detail">
            <li>Subscribe</li>
            <li>unsplash.com</li>
            <li>stripe.com</li>
            <li>cloudinary.com</li>
            <li>fontawesome.com</li>
          </ul>
        </div>
        <div className="footer_final">
          <h2>peashop</h2>
          <p>
            <SiCmake style={{ marginRight: "10px", color: "#f7efe8" }} />
            Make by Gia Lac. @2022
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
