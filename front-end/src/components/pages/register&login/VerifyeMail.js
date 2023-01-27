import React, { Component } from "react";
import swal from 'sweetalert';
import '../../css/index.css';
import Loader from '../../layout/loader';
import Header from '../../layout/Header.js';
import Footer from '../../layout/Footer.js';
import MyGlobleSetting from '../../layout/MyGlobleSetting';
import axios from 'axios';


const Alreadyreg = 
<div class="alert alert-danger" role="alert">
  The given email seems to be already registered <a href="/login" class="alert-link">Click here</a> to login.
</div>
;
const AlreadyregGmail = 
<div class="alert alert-danger" role="alert">
  The given Gmail seems to be already registered <a href="/login" class="alert-link">Click here</a> to login.
</div>
;
const AlreadyregFacebook = 
<div class="alert alert-danger" role="alert">
  The given Facebook ID seems to be already registered <a href="/login" class="alert-link">Click here</a> to login.
</div>
const AlreadyregContactus = 
<div class="alert alert-danger" role="alert">
  There is some register problem with your TagNumber Please contact Admin <a href="/contactus" class="alert-link">Click here</a>
</div>
;


export default class VerifyeMail extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            tagNumber: sessionStorage.getItem('tagnumber'),
            eMail:'',
            firstName:'',
            isMailSimilar:'',
            loading:false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setState({ alertMessage:""});
      }
     

componentDidMount()
{
  this.setState({loading:false});
  console.log("hi");
  console.log(sessionStorage.getItem('tagnumber'));
}

handleChange(e) {
        this.setState({
          eMail: e.target.value
        })
  }

      handleSubmit(e){
        e.preventDefault();
        this.setState({ alertMessage:""});
        let res='';
        let customers='';

        customers = {
            tagNumber:sessionStorage.getItem('tagnumber'),
            eMail: this.state.eMail,
            userName:sessionStorage.getItem('id'),
            firstName:sessionStorage.getItem('firstname'),
            signupVia :'facebook signup via phone number',
            phone : '',
            type:sessionStorage.getItem('type'),
            storeNumber:sessionStorage.getItem('storenumber'),
            isMailSimilar:sessionStorage.getItem('isMailSimilar'),
           }

          console.log(customers);
        
           this.setState({loading:true})
           let uri = MyGlobleSetting.url + '/api/SocialmediaSignupFacebook';
           axios.post(uri, customers).then((response) => 
           {
             res = response.data.status;
             switch (res) {
               //registered start
                 case "registered&loggedin":
                   this.setState({
                     loading:false
                   })
       
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
                     this.setState({ isLoggedIn : true })
                     console.log(response);
                     sessionStorage.setItem('data',response.data.userdata);
                     sessionStorage.setItem('tagnumber',response.data.userdata.Customer_No?response.data.userdata.Customer_No:'');
                     sessionStorage.setItem('email',response.data.userdata.eMail?response.data.userdata.eMail:'');
                     sessionStorage.setItem('firstname',response.data.userdata.FirstName?response.data.userdata.FirstName:'');
                     sessionStorage.setItem('loginVia','email');
                     sessionStorage.setItem('isInfo', 'true');
                    
                     this.setState({ loading: false });
                     this.props.history.push("/points");
                    
                   }
                 });
                 break;
                 case "unregistered":
                 this.setState({
                   loading:false
                 })
                 this.setState({ alertMessage: "The given email is unregistered" })
                 break;
 
                 case "invalid email":
 
                   this.setState({
                     loading:false
                   })
                   this.setState({ alertMessage: "The given email seems to be invalid" });
                   break;
                 
                 case "email not match":
                     this.setState({
                       loading:false
                     })
                     this.setState({storeHide:false});
                     this.setState({submitButtonHide:false});
                     this.setState({tagnumberDisable:true});
                     this.setState({ alertMessage: 'Problem with your TagNumber. Please verify the store name where did you done last purchase' })
                     
                     break;
                   
                  case "already registered":
                   this.setState({
                     loading:false
                   })
                   this.setState({ alertMessage: Alreadyreg });
                   break;
             }      
           }) .catch(error => { if(error)
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

          <h4 className="mb-1" style={{textAlign: 'left',color: '#43494d',marginTop: '20px'}}>
                  <b>Please provide email</b>
         </h4>
         
         
          <hr className="mb-4" />
          <h5 className="mb-4">
              We need your email to complete signup</h5>
              <div className="row">
                <div className="col-md-5 col-sm-12 col-12">
               
        
                  {(this.state.alertMessage) ?
                  <div class="alert alert-danger" role="alert">
                    {this.state.alertMessage}
                  </div> : null}


                  <form onSubmit={this.handleSubmit}>
                      <div class="form-group">
                        <label for="email:" className="mb-1">Email</label>
                        <input type="text" class="form-control"  onChange={this.handleChange}/>
                      </div>
                      <button type="submit" class="btn btn-primary">Complete signup</button>
                </form>
        
          </div>
        </div>
    </div>
    <br/>
    <div className="py-5"></div>
    <br/>
    </main>
<br/>
<br/>
<br/>
    <footer>
    <Footer/>
    </footer>
    
      </div>
        );
    }
  }
}
