import React, { Component } from "react";
import swal from 'sweetalert';
import '../../css/index.css';
import Header from '../../layout/Header.js';
import Footer from '../../layout/Footer.js';
import MyGlobleSetting from '../../layout/MyGlobleSetting';
import Loader from '../../layout/loader';
import axios from 'axios';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


const Alreadyreg = 
<div class="alert alert-danger" role="alert">
  The given email seems to be alreday registered <a href="/login" class="alert-link">Click here</a> to login.
</div>
;


export default class updatepassword extends Component {

  constructor(props) {
    super(props);
    this.state = { alertMessage: '',confirmPassword:'',
    password:'',loading:false,submitDisable:false};


    this.handleSubmit = this.handleSubmit.bind(this);
    this.password = this.password.bind(this); 
    this.confirmPassword = this.confirmPassword.bind(this); 
    this.setState({ alertMessage: '' });

  }
  componentDidMount() {
    this.setState({ alertMessage: null });
    this.setState({ loading: false });
    console.log(this.props.match.params);
    
  }


  password(event) {  
    this.setState({ password: event.target.value }) 
    this.setState({ confirmPassword: "" })   
  } 

  confirmPassword(event) {  
    this.setState({ confirmPassword: event.target.value })  

    if (event.target.value != this.state.password) {
      //disable button
      this.setState({submitDisable:true});
      this.setState({ passwordErrors: "password not macthed" });
    }
    else
    {
      //enable button
      this.setState({submitDisable:false}); 
      this.setState({ passwordErrors: "" });
      
    }
    this.setState({ confirmPassword: event.target.value }) 
  } 



  handleSubmit(e) {
    
    e.preventDefault();
    let res = '';
    const customers = {
      password: this.state.password,
      username: this.props.match.params.email,
      token: this.props.match.params.token,
    }
    console.log(customers);
  
  this.setState({
    loading:true
  })
    let uri = MyGlobleSetting.url + '/api/updatePassword';
    axios.post(uri,customers).then((response) => {
      res = response.data.status;
      if(res=="password updated")
      {
        this.setState({loading:false})
        swal({
          title: "Successfully Registered",
          text: "Thank for registering with us",
          icon: "success",
          className:'swalclass',
          buttons: {
            confirm : {text:'Click here to proceed',className:'sweet-warning'}
                
            }
          })
      .then((value) => {
        if(value== true){
          this.setState({ loading: false });
          this.props.history.push("/login");
        }
      });
      }
      else if(res=="invalid user")
      {
        this.setState({
          loading:false
        })
        this.setState({ alertMessage: "Invalid user. Could not update the password" })
      }
      else if(res=="unable to update")
      {
        this.setState({
          loading:false
        })
        this.setState({ alertMessage: "Something wrong..Unable to update password" })
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
          <Header />
        </header>

        <main>
          <div className="container" id="login">

            <h4 className="mb-1" style={{ textAlign: 'left', color: '#43494d', marginTop: '20px' }}>
              <b>Reset Password</b>
            </h4>


            <hr className="mb-4" />

            <div className="row">
             
              <div className="col-5">

                {/* <center> */}

                {(this.state.alertMessage) ?
                  <div class="alert alert-danger" role="alert">
                    {this.state.alertMessage}
                  </div> : null}
              <div>
                <form onSubmit={this.handleSubmit}>

                  <div className="form-group">
                    <label for="Password"   className="mb-1 labels">Password:</label>
                    <input type="password"required className="form-control mb-3" onChange={this.password} autoComplete="true"/>                  
                    </div>

                  <div className="form-group">
                   <label for="Confirm password" className="mb-1" style={{fontFamily: 'Tahoma, Arial, Helvetica',color: '#43494d'}}>Confirm Password:</label>
                   <input type="password" required className="form-control mb-3" id="confirmPassword" onKeyUp={this.confirmPassword} autoComplete="true"/>
                   <span className="error">{this.state.passwordErrors}</span>
                  </div>
                  <button type="submit " disabled={this.state.submitDisable} class="btn btn-primary">Submit</button>

                </form>
                </div>


                {/* </center> */}

              </div>
              
            </div>
          </div>
          
          <div className="py-5"></div>
          <div className="py-5"></div>
          
          <div className="mb-3"></div>
        </main>

        <footer>
          <Footer />
        </footer>

      </div>
    );
                }
  }
}
