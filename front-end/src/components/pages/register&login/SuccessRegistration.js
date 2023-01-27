import React, { Component } from "react";
import FacebookLogin from 'react-facebook-login';
import swal from 'sweetalert';
import '../../css/index.css';
import Header2 from '../../layout/Header2.js';
import Footer from '../../layout/Footer.js';
import MyGlobleSetting from '../../layout/MyGlobleSetting';
import Success from '../../Alert/Success.js';
import Failure from '../../Alert/Failure.js';
import Error from '../../Alert/Error.js';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

export default class SuccessRegistration extends Component {

  constructor(props) {
    super(props);
    
  
    this.state = {
  
        Email: '',
        Password: '',
        alert_message: ''
    }
    


    
    this.loginSubmit = this.loginSubmit.bind(this);

}

componentDidMount(){
    let details=this.props.location.state.detail;
alert(details);
}

loginSubmit(e){
        e.preventDefault();
     
        const customers = {
          eMail: this.state.eMail,
          Password: this.state.Password,
        }
    
          let uri = MyGlobleSetting.url + '/api/login';
          axios.post(uri, customers).then((response) => {
            console.log(response.data);
            if(response.data.status=='loggedin')
            {
              this.setState({ isLoggedIn : true })
              this.props.history.push("/points");
            }
            else
            {
              this.setState({alert_message:"failure"})
            }
           
          }) .catch(function (error) {
            console.log(error);
            this.setState({alert_message:"error"})
          });
    
           
      }
    


    render() {

    return (
      <div>
        <header>
          <Header2 />
        </header>

        <main>
          <div className="container" id="login">

          <h4 className="mb-1" style={{textAlign: 'left',color: '#43494d',marginTop: '20px'}}>
                  <b>Successfully registered!!</b>
         </h4>
        
         
          <hr className="mb-4" />
          <p className="mb-1" style={{textAlign: 'left',color: '#43494d',marginTop: '20px'}}>
                 Thank you for registering with us.
         </p>
              <div className="row justify-content-center">
                <div className="col-11">
                  {/* <h4 className="mb-5 text-center" style={{fontFamily: 'Tahoma, Arial, Helvetica',color: '#43494d'}}>
                  To access registration form you must enter the key tag number of the key tag you were given at the gift shop. We will also need your Last Name for verification purposes.
                </h4> */}
      <button type="button" class="btn btn-primary  btn-lg btn-block" style={{marginTop:"2%"}}>Click here to Signin</button>

          </div>
        </div>
    </div>
    <br/>
    <div className="py-5"></div>
    <br/>
    </main>
        <footer>
          <Footer />
        </footer>

      </div>
    );
  }

}
