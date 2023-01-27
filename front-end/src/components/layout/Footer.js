import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import '../css/index.css';


class Footer extends Component {
 
    render() {
      return (
     
      <div className="footer-combo">
        <div className="text-lg-right text-sm-right" style={{fontSize:"15px",padding:'5px',background:'#343a40'}}>
        <small>
        <a href="https://www.lorisgifts.com/privacy-policy" target="_blank"  className="footer-link">Privacy Policy</a>&nbsp;&nbsp;
        <Link to="termscondition" className="footer-link">Terms & Condition</Link>&nbsp;&nbsp;
        <Link to="contactus" className="footer-link">Contact Us</Link>&nbsp;&nbsp;
        </small>
      </div>
        <footer id="sticky-footer" className="footer">
          <div className="container text-center">
          <small>© 2020 Copyright:<a href="https://www.lorisgifts.com/" target="blank" className="footer-link">&nbsp;www.lorisgifts.com</a></small>
        </div>
        </footer>
        </div>
      
      )
    }
}

export default Footer;