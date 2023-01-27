import React, { Component } from "react";
import swal from 'sweetalert';

import '../../css/index.css';
// import Header from '../../layout/Header.js';
import Header2 from '../../layout/Header2.js';
import Footer from '../../layout/Footer.js';
import ReactIsCapsLockActive from '../../layout/ReactIsCapsLockActive';
import MyGlobleSetting from '../../layout/MyGlobleSetting';
import Loader from '../../layout/loader';
import axios from 'axios';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


const Alreadyreg = 
<div class="alert alert-danger" role="alert">
  The given email seems to be alreday registered <a href="/login" class="alert-link">Click here</a> to login.
</div>
;


export default class changePassword extends Component {

  constructor(props) {
    super(props);
    this.state = { alertMessage: '',confirmPassword:'', oldPassword:'',
    password:'',loading:false,submitDisable:false};


    this.handleSubmit = this.handleSubmit.bind(this);
    this.password = this.password.bind(this); 
    this.confirmPassword = this.confirmPassword.bind(this); 
    this.oldPassword = this.oldPassword.bind(this);
    this.setState({ alertMessage: '' });
   

  }
  componentDidMount() {
    
    this.setState({ alertMessage: null });
    this.setState({ loading: false });
    console.log(this.props.match.params);
    // alert(sessionStorage.getItem('tagnumber'));
    if ((sessionStorage.getItem('tagnumber') == '') || (sessionStorage.getItem('tagnumber') == null))
    {
      // alert('not looged in');
      this.props.history.push('/login');
    }
  }


  password(event) {  
    this.setState({ password: event.target.value }) 
    this.setState({ confirmPassword: "" })   
    this.setState({ alertMessage: "" });
    // alert(event.target.value.length);
   

  } 
  oldPassword(event) {  
  
  //  alert(event.getModifierState("CapsLock"));
  
  
  
    this.setState({ oldPassword: event.target.value }) 

    this.setState({ confirmPassword: "" })   
    this.setState({ alertMessage: "" })
  } 

  confirmPassword(event) {  
    this.setState({ confirmPassword: event.target.value })  

    if (event.target.value != this.state.password) {
      //disable button
      this.setState({submitDisable:true});
      this.setState({ passwordErrors: "Confirmed Password does not matched." });
      this.setState({ alertMessage: "" });
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
      tag: sessionStorage.getItem('tagnumber'),
      oldPassword: this.state.oldPassword,
      username: this.props.match.params.email,
      token: this.props.match.params.token,
    }
    console.log(customers);
  
  this.setState({
    loading:true
  })
    let uri = MyGlobleSetting.url + '/api/changePassword';
    axios.post(uri,customers).then((response) => {
      res = response.data.status;
     
      if(res=="success")
      {
      
        this.setState({loading:false})
        this.setState({ alertMessage: "" })
        swal({
          title: "Successfully",
          text: "Password Changed Successfully",
          icon: "success",
          
          
          })
   
      }
      else if(res=="Not signed in with E-Mail")
      {
        this.setState({
          loading:false
        })
        this.setState({ alertMessage: "You have not signed in with E-Mail" })
      }
      else if(res=="Old Password is Incorrect")
      {
        this.setState({
          loading:false
        })
        this.setState({ alertMessage: "Old Password is Incorrect" })
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
          <Header2/>
        </header>
<Loader/>
 </div>
  )
}
   else {
     return (
      <div>
        <header>
          <Header2 />
        </header>

        <main>
        
          <div className="container" id="login">

            <h4 className="mb-1" style={{ textAlign: 'left', color: '#43494d', marginTop: '20px' }}>
              <b>Change Password</b>
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
                  <ReactIsCapsLockActive>
                    {active => active ? <div class="alert alert-danger" >Caps Lock is ON</div> : <div></div>}
                    {/* {alert(active)} */}
                  </ReactIsCapsLockActive>
                  <div className="form-group">
                    <label for="Old Password"   className="mb-1 labels">Old Password:</label>
                    <input type="password"required className="form-control mb-3" onChange={this.oldPassword} autoComplete="true"/>                  
                  </div>

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
