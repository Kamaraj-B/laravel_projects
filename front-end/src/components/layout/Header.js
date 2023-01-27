import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import  '../css/Header.css';
import Loriswhite from '../images/Loris_white.png';
import superMan from '../images/Asset 21.png';



class Header extends Component {
  constructor(props){
    super(props);
   }
  
    render() {
      return (
        <header id="header" role="banner" className="clearfix">

        <nav className="navbar navbar-default navbar-expand-lg navbar-light">
            <div className="navbar-header d-flex col">
                <a className="site-logo" href="/" title="Home" id="logo">
                {/* <img src="https://www.lorisgifts.com/profiles/lorisgifts/themes/lorisgifts/logo.png" className="img-header" alt="Home"/> */}
                <img src={Loriswhite} className="img-header" alt="Home"/>
              </a>  		
                <button type="button" data-target="#navbarCollapse" data-toggle="collapse" className="navbar-toggle navbar-toggler ml-auto">
                    <span className="navbar-toggler-icon"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
            </div>
            <div id="navbarCollapse" className="collapse navbar-collapse justify-content-start">
                <ul className="nav navbar-nav navbar-right ml-auto">
                    <li className="nav-item"><Link to="/" className="nav-link"><b>Home</b></Link></li>
                    <li className="nav-item"><Link to="signup" className="nav-link"><b>Signup</b></Link></li>
                    <li className="nav-item"><Link to="login" className="nav-link"><b>Login</b></Link></li>
                    <li className="nav-item"><Link to="contactus" className="nav-link"><b>Contact us</b></Link></li>
                </ul>
            </div>
        </nav>

        <img className="container-fluid superman" src={superMan} alt="super Man"/>
        <br/>
        </header>
        
      )
    }
}

export default Header;
