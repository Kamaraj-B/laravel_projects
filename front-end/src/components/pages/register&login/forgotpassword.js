import React, { Component } from "react";
import FacebookLogin from 'react-facebook-login';
import swal from 'sweetalert';
import '../../css/index.css';
import Header from '../../layout/Header.js';
import Footer from '../../layout/Footer.js';
import MyGlobleSetting from '../../layout/MyGlobleSetting';
import Loader from '../../layout/loader';
import Success from '../../Alert/Success.js';
import Failure from '../../Alert/Failure.js';
import Error from '../../Alert/Error.js';
import axios from 'axios';
// import loader from '../../images/load_progress.gif';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const Alreadyreg = 
<div class="alert alert-danger" role="alert">
  The given email seems to be alreday registered <a href="/login" class="alert-link">Click here</a> to login.
</div>
;

// const laoder = () =><div>
// <Header/>

// <div className="container" >
// <div  className="load" >
//    <center style={{marginTop:"10%"}}><img src={load}/></center>
//  </div>

// </div>;

export default class forgotpassword extends Component {

  constructor(props) {
    super(props);
    this.state = { email: '', alert_message: '',loading:false };


    this.handleChange1 = this.handleChange1.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this); 
    this.setState({ alert_message: '' });

  }
  componentDidMount() {
    this.setState({ alert_message: null });
    this.setState({ loading: false });

  }

  handleChange1(e) {
    this.setState({
      email: e.target.value
    })
  }
 



  handleSubmit(e) {
    
    e.preventDefault();
    let res = '';
    const customers = {
      Username: this.state.email,
  
    }
  //  alert(JSON.stringify(customers));
  this.setState({
    loading:true
  })
    let uri = MyGlobleSetting.url + '/api/ForgotPassword';
    axios.post(uri,customers).then((response) => {
     
      console.log(response);
    //   alert(response.data);
    //   resdata= response.data;
      res = response.data.status;
      console.log(res);
    //   console.log(resdata);
   
     if(response.data == "mail send successfully"){
        this.setState({
            loading:false
          })
        swal({
            title: "Reset password link sent!!",
            text: " Please check your email for reset password link",
            icon: "success",
            
          })
          .then((value) => {
            if(value== true){
              this.props.history.push({
                          pathname: '/login',
                //           // state: { detail: customers }
                      })  
            }
          });   
     }

     if(res =="invalid user"){
        this.setState({
            loading:false,
            alert_message:"Email address does not exist or this is a new account that has not been registered. Please visit the Signup page."
          })
     }
     if(res =="facebook or google user"){
      this.setState({
          loading:false,
          alert_message:"Unable to proceed password recovery. Looks like you signed up using Google or Facbook."
        })
   }

    }).catch(error => { if(error)
      {
        this.setState({loading:false});
        swal("Something wrong in network! please refresh the page..");
      }
  });
  }





  render() {

if(this.state.loading){
  return(
    <div>
         <header>
          <Header/>
        </header>
<Loader/>
 </div>
  )
}
   else {
     return (
      <div>
        <header>
          <Header/>
        </header>

        <main>
          <div className="container" id="login">

            <h4 className="mb-1" style={{ textAlign: 'left', color: '#43494d', marginTop: '20px' }}>
              <b>Account Recovery</b>
            </h4>

           
            <hr className="mb-4" />

            <h5 className="mb-4" style={{ textAlign: 'left', color: '#43494d', marginTop: '20px' }}>
            Enter your email address below.  If this is a valid account the password reset instructions will be sent that email address

            </h5>


            {/* <div className="row justify-content-center"> */}
            <div className="row">
             
              <div className="col-5 ">

                {/* <center> */}
                {this.state.alert_message == "success" ? <Success /> : null}
                {this.state.alert_message == "failure" ? <Failure /> : null}

                {(this.state.alert_message) ?
                  <div class="alert alert-danger" role="alert">
                    {this.state.alert_message}
                  </div> : null}
              <div style={{marginRight:"10%"}}>
                <form onSubmit={this.handleSubmit}>
              
                  <div className="form-group">
                    <label for="email" className="mb-1" style={{ fontFamily: 'Tahoma, Arial, Helvetica', color: '#43494d' }}>Email</label>
                    <input type="email" required class="form-control mb-3" onChange={this.handleChange1} />
                  </div>

                  <button type="submit" class="btn btn-primary"><b>Verify mail</b></button>

                </form>
                </div>


                {/* </center> */}

              </div>

            </div>
          </div>
          <br />
          <div className="py-5"></div>
          <br />
        </main>
        <br /><br /><br />
        <footer>
          <Footer />
        </footer>

      </div>
    );
                }
  }
}
