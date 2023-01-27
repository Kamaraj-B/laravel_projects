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
  The given tagnumber seems to be alreday registered <a href="/login" class="alert-link">Click here</a> to login.
</div>
;

export default class forgotUsername extends Component {

  constructor(props) {
    super(props);
    this.state = { email: '', alertMessage: '',loading:false };

    this.tagNumber = this.tagNumber.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this); 
    
  }
  
  tagNumber(e) {
    this.setState({tagNumber: e.target.value})
  }
 

  handleSubmit(e) {
    
    e.preventDefault();
    let res = '';
    const customers = {
      tagNumber: this.state.tagNumber,
    }

    console.log(customers);
  this.setState({loading:true})
    let uri = MyGlobleSetting.url + '/api/forgotUsername';
    axios.post(uri,customers).then((response) => {
     
    res=response.data.status;

     if(res== "mail send successfully"){
        this.setState({
            loading:false,
            alertMessage:"The username has been send to your "+response.data.maskeMail+" ID"
          })
     }
     
     
     if(res =="invalid tagnumber"){
        this.setState({
            loading:false,
            alertMessage:"Invalid tagnumber"
          })
    }
    if(res =="deactivated account"){
      this.setState({
          loading:false,
          alertMessage:"Account is deactivated"
        })
  }

    if(res =="no username"){
      this.setState({
          loading:false,
          alertMessage:"Username is not available for this account"
        })
  }
  this.setState({
    loading:false});
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
              <b>Find your Username</b>
            </h4>

           
            <hr className="mb-4" />

            <h5 className="mb-4" style={{ textAlign: 'left', color: '#43494d', marginTop: '20px' }}>
              Please provide your Lori's Rewards Key Tag number
            </h5>


            {/* <div className="row justify-content-center"> */}
            <div className="row">
             
              <div className="col-5 ">

                {(this.state.alertMessage) ?
                  <div class="alert alert-danger" role="alert">
                    {this.state.alertMessage}
                  </div> : null}
              <div >
                <form onSubmit={this.handleSubmit}>
              
                  <div className="form-group">
                    <label for="tagnumber" className="mb-1">Tag Number</label>
                    <input type="text" required class="form-control" onChange={this.tagNumber} />
                  </div>

                  <button type="submit" class="btn btn-primary"><b>Verify tag number</b></button>

                </form>
                </div>


                {/* </center> */}

              </div>

            </div>
          </div>
          <div className="py-5"></div>
          <div className="py-5"></div>
          
        </main>
        <br /><br />
        <footer>
          <Footer />
        </footer>

      </div>
    );
                }
  }
}
