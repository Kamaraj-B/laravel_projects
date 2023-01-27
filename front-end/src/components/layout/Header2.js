import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import  '../css/Header.css';
import Loriswhite from '../images/Loris_white.png';
import asset2 from '../images/Asset 2.png';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.min.js';




class Header2 extends Component {
  constructor(props)
  {
    super(props);
    this.state = 
    {
    isLoggedIn: false,
    FirstName:sessionStorage.getItem('firstname'), 
    TagNumber:sessionStorage.getItem('tagnumber'),
    loginVia:sessionStorage.getItem('loginVia'),
   };
   }
 
   logout() {
    sessionStorage.setItem('data','');
    sessionStorage.setItem('isLoggedIn',false);
    sessionStorage.setItem('isLoggedIn',false);
    sessionStorage.setItem('firstname','');
    sessionStorage.setItem('phone','');
    sessionStorage.setItem('email','');
    sessionStorage.setItem('tagnumber','');
    
    
    if(this.state.loginVia=='gmail')
    {
      window.location.reload();
      // let customWindow='';
      // customWindow = window.open("https://www.google.com/accounts/Logout", "_BLANK", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400")
      // function closeWindow() {
      //   customWindow.close();
      //   window.location.reload();
      // }
      // setTimeout(closeWindow, 4000);
    }
    if(this.state.loginVia=='facebook')
    {
      
      window.location.reload();
      // let customWindow='';
      // customWindow = window.open("https://www.facebook.com/log.out#", "_BLANK", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400")
      // javascript:FB.logout(function() { window.location.reload() }); return false;
      // function closeWindow() {
      //   customWindow.close();
      //   window.location.reload();
      // }
      // setTimeout(closeWindow, 4000);
    }

    if(this.state.loginVia=='email')
    {
      window.location.reload();
    }
    
  }
  countdown()
  {
    window.close();
  }
  
  
  
    render() {
      const isLoggedIn = this.state.isLoggedIn;
      
      return (
        <header id="header" role="banner" className="clearfix">
        <nav className="navbar navbar-default navbar-expand-lg navbar-light">
            <div className="navbar-header d-flex col">
                <a className="site-logo" href="https://www.lorisgifts.com/" target="_blank" title="Home" id="logo">
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
                <ul className="nav navbar-nav navbar-right ml-auto" style={{marginRight:'30px'}}>
                    {/* <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li> */}
                    <li className="nav-item"><Link to="points" className="nav-link"><b>Points Balance</b></Link></li>
                  <li className="nav-item"><Link to="couponhistory" className="nav-link"><b>Coupons/Promotions</b></Link></li>
                  <li className="nav-item"><Link to="transferpoints" className="nav-link"><b>Transfer Points</b></Link></li>
                  <li className="nav-item"><Link to="contactus" className="nav-link"><b>Contact us</b></Link></li>
                  

                </ul>

                <ul class="navbar-nav">
                <li class="nav-item dropdown">
                    <a href="#" class="nav-link dropdown-toggle" id="navDropDownLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="fa fa-fw fa-user"></i> {this.state.FirstName!=''&&this.state.FirstName!='null'?this.state.FirstName:null}
                    </a>
                    
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navDropDownLink">

                        {/* {this.state.FirstName!=''&&this.state.FirstName!='null'? <Link class="dropdown-item">{this.state.FirstName}</Link> : null} */}
                        {this.state.TagNumber!=''&& this.state.TagNumber!='null'? <Link class="dropdown-item"><i class="fa fa-tag"></i> Tag Number:{this.state.TagNumber}</Link> : null} 
                        <Link to="account" class="dropdown-item"><i class="fas fa-user-edit"></i> Edit Profile</Link>
                        <Link to="changePassword" class="dropdown-item"><i class="fas fa-key"></i> Change Password</Link>
                        {/* <Link class="dropdown-item" >Logout</Link> */}
                        
                        <a class="dropdown-item" onClick={() => this.logout()}>
                        <i class="fas fa-sign-out-alt"></i> Logout</a>
                        
                    </div>

                </li>
            </ul>
                
            </div>
        </nav>
        <img src={asset2} class="img-fluid superman" alt="Home"/>
        </header>
        
      )
    }
}

export default Header2;
