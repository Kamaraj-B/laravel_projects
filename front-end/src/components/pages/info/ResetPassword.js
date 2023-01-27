import React, { Component } from "react";
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import swal from 'sweetalert';
import '../../css/index.css';
import Header2 from '../../layout/Header2.js';
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



export default class resetpassword extends Component {

    constructor(props) {
        super(props);
        this.state = { email: '', password: '',confirm_password: '' ,codeSent:false,setCodeSent:false,
        confirmed:false,setConfirmed:false,isConfirming:false,setIsConfirming:false,isSendingCode:false,setIsSendingCode:false,
    };

        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleChange3 = this.handleChange3.bind(this);

        this.handleSendCodeClick = this.handleSendCodeClick.bind(this); 
        this.handleConfirmClick = this.handleConfirmClick.bind(this); 

        this.renderRequestCodeForm = this.renderRequestCodeForm.bind(this); 
        this.renderConfirmationForm = this.renderConfirmationForm.bind(this); 
      }

      handleChange1(e) {
        this.setState({
            email: e.target.value
        })
      }
     
      
      handleChange2(e) {
        this.setState({
          password: e.target.value
        })
      }

      handleChange3(e) {
        this.setState({
          confirm_password: e.target.value
        })
      }

      componentDidMount() {
        console.log("hi");
        console.log(sessionStorage.getItem('id'));
    
      }

      
  async handleSendCodeClick(event) {
    event.preventDefault();

    const customers = {
        Username: this.state.email,
    
      }

      let uri = MyGlobleSetting.url + '/api/ForgotPassword';
      axios.post(uri,customers).then((response) => {
       
        res = response.data.status;
        
       this.setState({setIsSendingCode:true});

       if(response.data == "mail sendsuccessfully"){
          this.setState({
              loading:false
            })
            this.setState({codeSent:true});
            sessionStorage.setItem('id',1);
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
  
       if(res =="Invalid User"){
          this.setState({
              loading:false,
              alert_message:"Invalid Username"
            })
  
       }
  
      }).catch(error => { if(error)
        {
          this.setState({loading:false});
          swal("Something wrong in network! please refresh the page..");
        }
    });

    

    try {
      await Auth.forgotPassword(fields.email);
      setCodeSent(true);
    } catch (error) {
      onError(error);
      setIsSendingCode(false);
    }
  }

renderRequestCodeForm(params) 
{
    return(
    <form onSubmit={this.handleSendCodeClick}>
        <div className="form-group">
          <label for="email" className="mb-1" style={{ fontFamily: 'Tahoma, Arial, Helvetica', color: '#43494d' }}>Username</label>
          <input type="email" required class="form-control mb-3" onChange={this.handleChange1} />
        </div>
        <button type="submit" class="btn btn-primary " style={{marginLeft:"40%"}}>submit</button>
    </form>
    );
}

      async handleConfirmClick(event) {
        event.preventDefault();
    
        setIsConfirming(true);
    
        try {
          await Auth.forgotPasswordSubmit(
            fields.email,
            fields.code,
            fields.password
          );
          setConfirmed(true);
        } catch (error) {
          onError(error);
          setIsConfirming(false);
        }
      }

    renderConfirmationForm() {
        return (
          <form onSubmit={handleConfirmClick}>
            <div className="form-group">
              <label for="email" className="mb-1" style={{ fontFamily: 'Tahoma, Arial, Helvetica', color: '#43494d' }}>Username</label>
              <input type="email" required class="form-control mb-3" onChange={this.handleChange2} />
            </div>
            <div className="form-group">
              <label for="email" className="mb-1" style={{ fontFamily: 'Tahoma, Arial, Helvetica', color: '#43494d' }}>Username</label>
              <input type="email" required class="form-control mb-3" onChange={this.handleChange3} />
            </div>
            <button type="submit" class="btn btn-primary " style={{marginLeft:"40%"}}>submit</button>
          </form>
        );
      }
    
  render()
  {
      
    return(
        <div>
            {!this.state.codeSent
        ? this.renderRequestCodeForm()
        : !this.state.confirmed
        ? this.renderConfirmationForm()
        : this.renderSuccessMessage()}
        </div>
      )
  }
     
  
  
      
}
