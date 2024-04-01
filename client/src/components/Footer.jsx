import "@/styles/Footer.scss";
import { Email, LocalPhone } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-left">
        <Link to="/">
          <h1 className="logo">
            Dream<span>Home</span>
          </h1>
        </Link>
      </div>
      <div className="footer-center">
        <h3>Useful Links</h3>
        <ul>
          <li>
            <Link to="#">About Us</Link>
          </li>
          <li>
            <Link to="#">Terms &amp; Conditions</Link>
          </li>
          <li>
            <Link to="#">Return &amp; Refund Policy</Link>
          </li>
        </ul>
      </div>
      <div className="footer-right">
        <h3>Contact</h3>
        <div className="footer-right-info">
          <LocalPhone />
          <p>+1 242 525</p>
        </div>
        <div className="footer-right-info">
          <Email />
          <p>support@dreamhome.com</p>
        </div>
        <img src="/assets/payment.png" alt="payment" />
      </div>
    </div>
  );
};

export default Footer;
