import React, {Component} from "react";
import {Link} from "react-router-dom";
import MyGlobleSetting from '../../layout/MyGlobleSetting';

import axios from 'axios';

import Header from '../../layout/Header.js';
import Footer from '../../layout/Footer.js';
import Failure from '../../Alert/Failure.js';
import Success from '../../Alert/Success.js';
import '../../css/index.css';
import swal from 'sweetalert';

import Loader from '../../layout/loader';
import FacebookLogin from 'react-facebook-login';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";

export default class Login extends Component {
  constructor() {

      super();


      this.state = {

          eMail: '',
          Password: '',
          alert_message: '',
          loading: false,
          isChecked: false,
          Cookies: ''
      }



      this.Password = this.Password.bind(this);
      this.eMail = this.eMail.bind(this);
      this.loginSubmit = this.loginSubmit.bind(this);
      this.onChangeCheckbox = this.onChangeCheckbox.bind(this);

  }

  componentDidMount() {
      this.setState({
          loading: false
      });

      this.state = {
          eMail: '',
          Password: '',
          isChecked: false,
      }
      console.log("compound");
      if (localStorage.checkbox && localStorage.email != "") {
          this.setState({
              isChecked: true,
              eMail: localStorage.email,
              Password: localStorage.password
          })
      }
      console.log(localStorage.email);
      console.log(localStorage.checkbox);
      console.log(localStorage.password);

  }

  onChangeCheckbox(event) {
      this.setState({
          isChecked: event.target.checked
      })

  }

  eMail(event) {
      this.setState({
          eMail: event.target.value
      })
  }

  Password(event) {
      this.setState({
          Password: event.target.value
      })
  }

  loginSubmit(e) {
      e.preventDefault();

      const customers = {
          Username: this.state.eMail,
          Password: this.state.Password,
      }

      if (this.state.isChecked && this.state.eMail != "") {
          localStorage.email = this.state.eMail
          localStorage.password = this.state.Password
          localStorage.checkbox = this.state.isChecked
      } else {
          localStorage.email = "";
          localStorage.password = "";
          localStorage.checkbox = "";
          this.state = {
              eMail: '',
              Password: '',
              isChecked: false,
          }
      }

      this.setState({
          loading: true
      });
      let uri = MyGlobleSetting.url + '/api/login';
      axios.post(uri, customers).then((response) => {
          if (response.data.status == 'Loggedin') {
              this.setState({
                  loading: false
              });
              this.setState({
                  isLoggedIn: true
              })
              sessionStorage.setItem('data', response);
              sessionStorage.setItem('tagnumber', response.data.data.user.Customer_No ? response.data.data.user.Customer_No : '');
              sessionStorage.setItem('flag', response.data.data.user.accountFlag ? response.data.data.user.accountFlag : 0);
              sessionStorage.setItem('store', response.data.data.user.StoreNumber ? response.data.data.user.StoreNumber : '');
              sessionStorage.setItem('email', response.data.data.user.eMail ? response.data.data.user.eMail : '');
              sessionStorage.setItem('username', response.data.data.user.eMail ? response.data.data.user.eMail : '');
              sessionStorage.setItem('firstname', (response.data.data.user.FirstName != null) ? response.data.data.user.FirstName : '');
              sessionStorage.setItem('token', response.data.data.token ? response.data.data.token : '');
              sessionStorage.setItem('lastname', (response.data.data.user.LastName != null) ? response.data.data.user.LastName : '');
              sessionStorage.setItem('firstname', (response.data.data.user.FirstName != null) ? response.data.data.user.FirstName : '');
              sessionStorage.setItem('birthdaydate', (response.data.data.user.BirthdayDate != null) ? response.data.data.user.BirthdayDate : '');
              sessionStorage.setItem('addr1', (response.data.data.user.Addr1 != null) ? response.data.data.user.Addr1 : '');
              sessionStorage.setItem('addr2', (response.data.data.user.Addr2 != null) ? response.data.data.user.Addr2 : '');
              sessionStorage.setItem('city', (response.data.data.user.City != null) ? response.data.data.user.City : '');
              sessionStorage.setItem('state', (response.data.data.user.State != null) ? response.data.data.user.State : '');
              sessionStorage.setItem('zipcode', (response.data.data.user.ZipCode != null) ? response.data.data.user.ZipCode : '');
              sessionStorage.setItem('phone', (response.data.data.user.Phone != null) ? response.data.data.user.Phone : '');
              sessionStorage.setItem('loginVia', 'email');
              sessionStorage.setItem('isInfo', 'true');

              this.setState({loading: false});
              this.props.history.push("/points");

          } else {
              this.setState({
                  loading: false
              });
              this.setState({
                  alert_message: "Invalid Credentials"
              })
          }

      }).catch(error => { if(error)
        {
          this.setState({loading:false});
        }
    });


  }

  gsignin(res) {

    const user=jwt_decode(res.credential);
    console.log(user);

      const googleresponse = {
          Username: user.email,
          // ProviderId: 'google'
      };

   console.log(googleresponse);

      this.setState({
          loading: true
      });

      let uri = MyGlobleSetting.url + '/api/SocialmediaLoginGoogle';
      
      axios.post(uri, googleresponse).then((response) => {
          res = response.data.status;
          
          if (response.data.error == 'invalid user') {
              this.setState({
                  alert_message: "User details not registered! "
              });
          }
          if (res = 'loggedin') {

              this.setState({
                  loading: false
              });
              this.setState({
                  isLoggedIn: true
              })

              sessionStorage.setItem('isLoggedIn', true);

              sessionStorage.setItem('data', response);
              sessionStorage.setItem('tagnumber', response.data.data.user.Customer_No ? response.data.data.user.Customer_No : '');
              sessionStorage.setItem('flag', response.data.data.user.accountFlag ? response.data.data.user.accountFlag : 0);
              sessionStorage.setItem('store', response.data.data.user.StoreNumber ? response.data.data.user.StoreNumber : '');
              sessionStorage.setItem('email', response.data.data.user.eMail ? response.data.data.user.eMail : '');
              sessionStorage.setItem('username', response.data.data.user.eMail ? response.data.data.user.eMail : '');
              sessionStorage.setItem('firstname', (response.data.data.user.FirstName != null) ? response.data.data.user.FirstName : '');
              sessionStorage.setItem('token', response.data.data.token ? response.data.data.token : '');
              sessionStorage.setItem('lastname', (response.data.data.user.LastName != null) ? response.data.data.user.LastName : '');
              sessionStorage.setItem('firstname', (response.data.data.user.FirstName != null) ? response.data.data.user.FirstName : '');
              sessionStorage.setItem('birthdaydate', (response.data.data.user.BirthdayDate != null) ? response.data.data.user.BirthdayDate : '');
              sessionStorage.setItem('addr1', (response.data.data.user.Addr1 != null) ? response.data.data.user.Addr1 : '');
              sessionStorage.setItem('addr2', (response.data.data.user.Addr2 != null) ? response.data.data.user.Addr2 : '');
              sessionStorage.setItem('city', (response.data.data.user.City != null) ? response.data.data.user.City : '');
              sessionStorage.setItem('state', (response.data.data.user.State != null) ? response.data.data.user.State : '');
              sessionStorage.setItem('zipcode', (response.data.data.user.ZipCode != null) ? response.data.data.user.ZipCode : '');
              sessionStorage.setItem('phone', (response.data.data.user.Phone != null) ? response.data.data.user.Phone : '');
              sessionStorage.setItem('loginVia', 'gmail');
              sessionStorage.setItem('isInfo', 'true');
              
              this.setState({loading: false});
              this.props.history.push("/points");
          } else {
              this.setState({
                  alert_message: "User details not registered! "
              });
              
          }
      }).catch(error => { if(error)
        {
          this.setState({loading:false});
        }
    });
  }


  fsignin(res) {
      const fbresponse = {
          userName: res.email,
          id:res.id
          
      };
      
      let uri = MyGlobleSetting.url + '/api/SocialmediaLoginFacebook';
      this.setState({
        loading: true
        });

      axios.post(uri, fbresponse).then((response) => {
          res = response.data.status;

     
          if (res === 'loggedin') {

              this.setState({
                  loading: false
              });
              this.setState({
                  isLoggedIn: true
              })

              sessionStorage.setItem('isLoggedIn', true);

              sessionStorage.setItem('data', response);
              sessionStorage.setItem('tagnumber', response.data.data.user.Customer_No ? response.data.data.user.Customer_No : '');
              sessionStorage.setItem('flag', response.data.data.user.accountFlag ? response.data.data.user.accountFlag : 0);
              sessionStorage.setItem('store', response.data.data.user.StoreNumber ? response.data.data.user.StoreNumber : '');
              sessionStorage.setItem('email', response.data.data.user.eMail ? response.data.data.user.eMail : '');
              sessionStorage.setItem('username', response.data.data.user.eMail ? response.data.data.user.eMail : '');
              sessionStorage.setItem('firstname', (response.data.data.user.FirstName != null) ? response.data.data.user.FirstName : '');
              sessionStorage.setItem('token', response.data.data.token ? response.data.data.token : '');
              sessionStorage.setItem('lastname', (response.data.data.user.LastName != null) ? response.data.data.user.LastName : '');
              sessionStorage.setItem('firstname', (response.data.data.user.FirstName != null) ? response.data.data.user.FirstName : '');
              sessionStorage.setItem('birthdaydate', (response.data.data.user.BirthdayDate != null) ? response.data.data.user.BirthdayDate : '');
              sessionStorage.setItem('addr1', (response.data.data.user.Addr1 != null) ? response.data.data.user.Addr1 : '');
              sessionStorage.setItem('addr2', (response.data.data.user.Addr2 != null) ? response.data.data.user.Addr2 : '');
              sessionStorage.setItem('city', (response.data.data.user.City != null) ? response.data.data.user.City : '');
              sessionStorage.setItem('state', (response.data.data.user.State != null) ? response.data.data.user.State : '');
              sessionStorage.setItem('zipcode', (response.data.data.user.ZipCode != null) ? response.data.data.user.ZipCode : '');
              sessionStorage.setItem('phone', (response.data.data.user.Phone != null) ? response.data.data.user.Phone : '');
              sessionStorage.setItem('loginVia', 'facebook');
              sessionStorage.setItem('isInfo', 'true');

                  this.setState({
                      loading: false
                  });
                  this.props.history.push("/points");

          } else {
            this.setState({
                loading: false
            });
              this.setState({
                  alert_message: "User details not registered! "
              });
          }
      }).catch(error => { if(error)
        {
          this.setState({loading:false});
          swal("Something wrong in network! please refresh the page..");
        }
    });
  }



  render() {
        const responseGoogle = (response) => {
            
            if(response.error != undefined)
            {
                if(response.details == "Cookies are not enabled in current environment.")
                {
                    this.setState({
                        alert_message: "Enable browser Cookies to log-in with Google",
                        Cookies: 'disabled' 
                    });
                }
                else if(this.state.Cookies == 'disabled')
                {
                    this.setState({
                        alert_message: "Enable browser Cookies to log-in with Google",
                    });
                }
                else
                {
                    this.setState({
                        alert_message: response.details
                    });
                }
            }
            else
            {
                this.setState({
                    Cookies: 'enabled' 
                });
                this.gsignin(response);
            }
        }

        const responseFacebook = (response) => {
            this.fsignin(response, 'facebook');
        }


    if(this.state.loading){
      return(
        <div>
	<header>
		<Header />
	</header>
	<Loader/>
</div>) } else { return (
<div>
	<header>
		<Header/>
	</header>
	<main>
		<div class="container mt-5">
			<div class="row justify-content-center">
				<div class="login-box  border mb-4">
					<form onSubmit={this.loginSubmit}>
						<center>
							<img class="mb-4 mt-2 rounded" src="https://www.lorisgifts.com/profiles/lorisgifts/themes/lorisgifts/favicon.ico" alt="" width="72" height="72" />
						</center>
						<div style={{marginBottom: "5%"}}>
							<h5 class="mb-4 signin-title">Lori's Sign In</h5>
							<h5 class="signin-text">New to Lori's Rewards? <Link class="forgot" to="/signup" style={{fontSize:"15px"}}> Create an Account</Link></h5>
							{/*
							<center>*/} {this.state.alert_message == "success" ?
								<Success />: null} {this.state.alert_message == "failure" ?
								<Failure />: null} {(this.state.alert_message) ?
								<div class="alert alert-danger" role="alert">{this.state.alert_message}</div>: null}</div>{/*
						<!-- <h1 class="h4 mb-3 text-center font-weight-normal">Welcome to login</h1> -->*/}
						<div className="form-group">
							<label for="inputEmail" class="sr-only">Email address</label>
							<input type="email" placeholder="Enter email" value={this.state.eMail} class="form-control mb-3" onChange={this.eMail} required />
						</div>
						<div className="form-group">
							<label for="inputPassword" class="sr-only">Password</label>
							<input type="password" value={this.state.Password} placeholder="Enter password" class="form-control mb-3" onChange={this.Password} required/>
						</div>
						<div className="form-group">
							<input type="checkbox" checked={this.state.isChecked} name="lsRememberMe" onChange={this.onChangeCheckbox} /> <span>&nbsp; Remember me</span>
							{/*
							<div className="custom-control custom-checkbox">
								<label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
							</div>*/}</div>
						<button class="btn btn-primary col-12 mb-3" type="submit"><b>Sign in</b>
						</button>
						<h5 class="signin-text mb-1">or</h5>
						<div className="row justify-content-center mb-2">
                            {/*
							// <h2><span>OR</span></h2> */}
                            
                            <GoogleOAuthProvider clientId="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com">
                            
                            <div>
                            <GoogleLogin  data-text="signup_with" onSuccess={responseGoogle} onFailure={responseGoogle}> </GoogleLogin>
                            </div>
                            
                            </GoogleOAuthProvider>

                            <div>
                            <FacebookLogin appId="1260564637638026" 
                            autoLoad={false} 
                            fields="name,email,picture" callback={responseFacebook} 
                            isDisabled={false}
                            textButton="Signin with Facebook"
                            cssClass="loginBtn1 loginBtn--facebook"
                            scope="public_profile,email"
                            isMobile={true}
                            disableMobileRedirect = {true} style={{ padding: '2px 40px 2px 67px' }}/>

                            </div>
                            

                </div>
                {/* <h2><span>OR</span></h2> */}
                <div className="row">
                 




                            {/* <FacebookLogin appId="259803798619822" 
                            autoLoad={false} 
                            fields="name,email,picture" callback={responseFacebook} 
                            cssClass="my-facebooklogin-button-class" icon="fa-facebook" 
                            textButton=""
                            isDisabled={true}
                            scope="public_profile,user_friends,email" />{/*
							<h2><span>OR</span></h2>
                            <GoogleLogin clientId="695238102765-fstg97ilopq97q43qp2divd2eescqrlu.apps.googleusercontent.com" 
                            icon={false} onSuccess={responseGoogle} 
                            onFailure={responseGoogle} 
                            isSignedIn={false} 
                            className="btnGoogleLogin"><i className="fa fa-google-plus" style={{}} />
							</GoogleLogin> */}

						</div>
					</form>
					<h5 class="signin-text">Need to find your <Link class="forgot" to="/forgotusername" style={{fontSize:"15px"}}>Username?</Link>  or  <Link class="forgot" to="/forgotpassword" style={{fontSize:"15px"}}>Password ?</Link></h5>
					<p class="mt-5 mb-3"></p>
				</div>
			</div>
		</div>
	</main>
	<footer>
		<Footer/>
	</footer>
</div>
        );
       }
    }
}