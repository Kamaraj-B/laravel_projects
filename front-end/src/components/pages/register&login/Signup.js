import React, { Component } from "react";
import FacebookLogin from 'react-facebook-login';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";

import swal from 'sweetalert';
import '../../css/index.css';
import Header from '../../layout/Header.js';
import Footer from '../../layout/Footer.js';
import MyGlobleSetting from '../../layout/MyGlobleSetting';
import Loader from '../../layout/loader';
import axios from 'axios';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import $ from 'jquery';
import Select from 'react-select';

const Alreadyreg = 
<div class="alert alert-danger" role="alert">
  The given tag number already registered <a href="/login" class="alert-link">Click here</a> to login.
</div>
;
const AlreadyregeMail = 
<div class="alert alert-danger" role="alert">
  The given email already registered <a href="/login" class="alert-link">Click here</a> to login.
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
  There is some register problem with your TagNumber Please contact Admin  <a href="/contactus" class="alert-link">Click here</a>
</div>
;
const EnableCookies = 
<div class="alert alert-danger" role="alert">
  Enable Cookies to Sign-In with Google  
</div>
;




export default class Signup extends Component {

  constructor(props) {
    super(props);
    this.state = { eMail: '',alertMessage: '', 
    tagNumber:'',
    storeName:'',
    storeNumber:'',
    Confirm_password:'',Password:'',
    loading:false,
    submitButtonHide:true,
    submitDisable:true,
    emailDisable:true,
    passwordDisable:true,
    tagnumberDisable:false,
    reEnterTagnumberDisable:false,
    reEnterTagNumber:'',
    signupButtonDisable:true,
    storeButtonDisable:false,
    tagNumberHide:false,
    divHide:true,
    storeHide:true,
    storeButtonHide:true,
    isDisableStoreName:false,
    IsDisableTitle1:false,
    IsDisableTitle2:true,
    count:1,
    isMailSimilar:0,
    details:[],
    Cookies: '',
    type:''};


    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.storeName = this.storeName.bind(this);
    this.tagNumberChange = this.tagNumberChange.bind(this);
    this.reEnterTagNumberChange = this.reEnterTagNumberChange.bind(this);
    

    this.handleSubmit = this.handleSubmit.bind(this);
    // this.storeNameValidation = this.storeNameValidation.bind(this);
    this.tagNumberValidation = this.tagNumberValidation.bind(this);
    this.reEnterTagNumberValidation = this.reEnterTagNumberValidation.bind(this);
    this.Password = this.Password.bind(this); 
    this.Confirm_password = this.Confirm_password.bind(this); 
    this.accept = this.accept.bind(this); 
    this.decline = this.decline.bind(this); 
    this.setState({ alertMessage: '' });

       
    
  }

  
  componentDidMount() {

    this.setState({ alertMessage: null });
    this.setState({ loading: false });

    // let uri = MyGlobleSetting.url + '/api/getallStore';
    // axios.get(uri).then((response) => 
    // {
    //     let res=response.data.storedetails;
        
    //     for(let i=1;i<res.length;i++)
    //     {
    //       if(res[i]!='null'&& res[i]!='' )
    //       {
    //         const obj = {'label':res[i], 'value':res[i]};
    //         this.setState({
    //           details: [...this.state.details, obj]
    //         });
    //       }
    //     }

    //   })

    //   .catch(error => { if(error)
    //     {
    //       this.setState({loading:false});
    //       swal("Something wrong in network! please refresh the page..");
    //     }
    // });
  
  }

  handleChange1(e) {
    this.setState({
      eMail: e.target.value
    })
    this.setState({ alertMessage: '' });
  }
  handleChange2(e) {
    this.setState({
      LastName: e.target.value
    })
  }

  tagNumberChange(e) {
    this.setState({
      tagNumber: e.target.value
    })
    this.setState({ alertMessage: '' });
  }

  reEnterTagNumberChange(e) {
    this.setState({
      reEnterTagNumber: e.target.value
    })
    this.setState({ alertMessage: '' });
  }


  Password(event) {  
    this.setState({ Password: event.target.value }) 
    this.setState({ Confirm_password: "" })   
    this.setState({ alertMessage:''});
  } 

  Confirm_password(event) {  
    this.setState({ Confirm_password: event.target.value })  

    if (event.target.value != this.state.Password) {
      document.getElementById("Confirm_password").style.border = "3px solid red";
      $("#submitButton").prop("disabled", true);
      this.setState({ Passworderrors: "password not matched" });
    }
    else
    {
      document.getElementById("Confirm_password").style.border = "3px solid green";
      $("#submitButton").removeAttr('disabled'); 
      this.setState({ Passworderrors: "" });
    }
    this.setState({ Confirm_password: event.target.value }) 
    this.setState({ alertMessage:''});
  } 

  accept()
  {
    document.getElementById("terms_checkbox").checked = true;
    this.setState({submitDisable:false});
    
  }
  decline()
  {
    document.getElementById("terms_checkbox").checked = false;
    this.setState({submitDisable:true});
  }
  checkbox()
  {
    var checkBox = document.getElementById("terms_checkbox");

    if (checkBox.checked == true){
      $("#Button").removeAttr('disabled');
    } else {
      $("#Button").prop("disabled", true);
    }
  }
 
 
storeName(event) {  
    this.setState({storeName:event.value})
}

//  storeNameValidation(e)
//  {
//   this.setState({ alertMessage: '' })
//   const customers = {
//     tagNumber: this.state.tagNumber,
//     storeName:this.state.storeName,
//     count:this.state.count,
//   }

//   let res='';
  
//  this.setState({loading:true})

//   let uri = MyGlobleSetting.url + '/api/storeNameValidation';
//   axios.post(uri,customers).then((response) => 
//   {
//     res = response.data.status;
//     if(res=="valid transaction")
//     {
//       this.setState({submitButtonHide:false})
//       this.setState({submitDisable:true});
//       this.setState({storeHide:true});
      
//       this.setState({signupButtonDisable:false});
//       this.setState({emailDisable:false});
//       this.setState({passwordDisable:false});
//       this.setState({tagnumberDisable:true});
//       this.setState({alertMessage:''});
//       // this.setState({type:'update'});
//       this.setState({divHide:false});
//       this.setState({isMailSimilar:1});
//       this.setState({IsDisableTitle1:true});
//       this.setState({IsDisableTitle2:false});
      
      
//     }
//     else if(res=="limit over")
//     {
//       this.setState({ alertMessage: "You can't proceed further. Please try again after 24 hours with valid details"})
//       this.setState({storeButtonDisable:true});
//       this.setState({isDisableStoreName:true});
//     }

//     else if(res=="no transaction")
//     {
//       this.setState({ alertMessage: '' })
//       this.setState({ alertMessage: " " })
//       this.setState({storeHide:false});
//       this.setState({submitButtonHide:false});
//       this.setState({ alertMessage: "Sorry!! That was incorrect" })
//       this.setState({count:this.state.count+1});
//     }
//     this.setState({loading:false})
    
//   }).catch(error => { if(error)
//     {
//       this.setState({loading:false});
//       swal("Something wrong in network! please refresh the page..");
//     }
// });
//  }
  
reEnterTagNumberValidation(e)
{

  e.preventDefault();

  if (isNaN(this.state.reEnterTagNumber)) {
    this.setState({alertMessage:"Please enter valid tag number!"});
    return;
  }
  
  if (!this.state.reEnterTagNumber) {
    this.setState({alertMessage:"Please valid tag number!"});
    return;
  }

  if (this.state.reEnterTagNumber.length>10) {
    this.setState({alertMessage:"Only allow 10 digit!"});
    return;
  }

 this.setState({ alertMessage: '' })
 const customers = {
   tagNumber: this.state.tagNumber,
   reEnterTagNumber: this.state.reEnterTagNumber,
   count:this.state.count,
 }

 let res='';
 
this.setState({loading:true})

 let uri = MyGlobleSetting.url + '/api/reEnterTagNumberValidation';
 axios.post(uri,customers).then((response) => 
 {
   res = response.data.status;
   if(res=="valid user")
   {
     this.setState({submitButtonHide:false})
     this.setState({submitDisable:true});
     this.setState({storeHide:true});
     
     this.setState({signupButtonDisable:false});
     this.setState({emailDisable:false});
     this.setState({passwordDisable:false});
     this.setState({tagNumberHide:false});
     this.setState({tagnumberDisable:true});
     this.setState({alertMessage:''});
     // this.setState({type:'update'});
     this.setState({divHide:false});
     this.setState({isMailSimilar:1});
     this.setState({IsDisableTitle1:true});
     this.setState({IsDisableTitle2:false});
     console.log("hi");
     console.log(this.state.tagNumberHide);
     
     
   }
   else if(res=="limit over")
   {
     this.setState({ alertMessage: "You can't proceed further. Please try again after 24 hours with valid details"})
     this.setState({storeButtonDisable:true});
     this.setState({reEnterTagnumberDisable:true});
     this.setState({tagNumberHide:true});
     this.setState({isDisableStoreName:true});
   }

   else if(res=="invalid user")
   {
     this.setState({ alertMessage: '' })
     this.setState({ alertMessage: " " })
     this.setState({storeHide:false});
     this.setState({submitButtonHide:false});
     this.setState({ alertMessage: "Sorry!! That was incorrect" })
     this.setState({count:this.state.count+1});
   }
   this.setState({loading:false})
   
 }).catch(error => { if(error)
   {
     this.setState({loading:false});
     swal("Something wrong in network! please refresh the page..");
   }
});
}



 
 tagNumberValidation(e) 
 {

  e.preventDefault();

  if (isNaN(this.state.tagNumber)) {
    this.setState({alertMessage:"Please enter valid tag number!"});
    return;
  }
  
  if (!this.state.tagNumber) {
    this.setState({alertMessage:"Please enter valid tag number!"});
    return;
  }

  if (this.state.tagNumber.length>10) {
    this.setState({alertMessage:"Only allow 10 digit!"});
    return;
  }
  
   this.setState({ alertMessage: '' })
   const customers = {
     tagNumber: this.state.tagNumber,
   }
   let res='';

   this.setState({loading:true})

   let uri = MyGlobleSetting.url + '/api/tagNumberValidation';
   axios.post(uri,customers).then((response) => 
   {
     res = response.data.status;
     if(res=="new user")
     {
       this.setState({submitButtonHide:false})
       this.setState({submitDisable:true});
       
       this.setState({signupButtonDisable:false});
       this.setState({emailDisable:false});
       this.setState({passwordDisable:false});
       this.setState({tagnumberDisable:true});
       this.setState({type:'create'});
       this.setState({storeNumber:response.data.storenumber});
       this.setState({divHide:false});
       this.setState({IsDisableTitle1:true});
       this.setState({IsDisableTitle2:false});
       
     }
     else if(res=="new user with exist account")
     {
       this.setState({submitButtonHide:false});
       this.setState({submitDisable:true});
       
       this.setState({signupButtonDisable:false});
       this.setState({passwordDisable:false});
       this.setState({tagnumberDisable:true});
       this.setState({type:'update'});
       this.setState({storeNumber:response.data.storenumber});
       this.setState({divHide:false});
       this.setState({IsDisableTitle1:true});
       this.setState({IsDisableTitle2:false});
       if(!response.data.userdata.eMail)
       {
         this.setState({emailDisable:false});
       }
       this.setState({eMail:response.data.userdata.eMail});
     }
     else if(res=="already registered")
     {
       this.setState({ alertMessage: Alreadyreg});
     }
     else if(res=="new user with transaction")
     {
       this.setState({storeHide:false});
       this.setState({submitButtonHide:false});
       this.setState({type:'create'});
       this.setState({tagNumberHide:true});
       this.setState({storeNumber:response.data.storenumber});
       this.setState({divHide:true});
       this.setState({ alertMessage: 'We need to validate the rewards number. Please re-enter your rewards number' })
     }
     else if(res=="invalid user")
     {
       this.setState({storeHide:false});
       this.setState({submitButtonHide:false});
       this.setState({type:'update'});
       this.setState({tagnumberDisable:true});
       this.setState({tagNumberHide:true});
       this.setState({storeNumber:response.data.storenumber});
       this.setState({divHide:true});
       this.setState({ alertMessage: 'We need to validate the rewards number. Please re-enter your rewards number' })
     }

     else if(res=="limit over")
     {
       this.setState({storeHide:false});
       this.setState({submitButtonHide:false});
       this.setState({type:'update'});
       this.setState({tagNumberHide:true});
       this.setState({reEnterTagNumberChange:true});
       this.setState({reEnterTagnumberDisable:true});
       this.setState({storeNumber:response.data.storenumber});
       this.setState({divHide:true});
       this.setState({storeButtonDisable:true});
       this.setState({isDisableStoreName:true});
       this.setState({ alertMessage: "You can't proceed further. Please try again after 24 hours with valid details"})
     }
     else if(res=="account deactivated")
     {
       this.setState({ alertMessage:"The given tagnumber was deactivated"})
     }

     else if(res=="invalid tagnumber")
     {
       this.setState({ alertMessage:"We are unable to find this rewards number in a LorisGifts store.  Please verify the tag number and, if correct, wait up to 24 hours from your initial purchase to register the account"})
     }
     else if(res=="invalid format")
     {
       this.setState({ alertMessage:"Invalid TagNumber format"})
     }
     
     this.setState({loading:false})
     
   }).catch(error => { if(error)
     {
       this.setState({loading:false});
       swal("Something wrong in network! please refresh the page..");
     }
 });
 
 }

 ///////////////////////////////////////Register Start////////////////////////////////////////////

  handleSubmit(e) {
    console.log("test1");
    e.preventDefault();
    console.log("test2");
    if (e.key === 'Enter') {
      console.log('do validate')
    }
    this.setState({ alertMessage:""});
    let res = '';
    const customers = {
      tagNumber: this.state.tagNumber,
      eMail: this.state.eMail,
      userName: this.state.eMail,
      password: this.state.Password,
      type: this.state.type,
      signupVia:"email",
      storeNumber:this.state.storeNumber,
    }
  
  console.log(customers);
  
  this.setState({
    loading:true
  })
    let uri = MyGlobleSetting.url + '/api/Register';
    axios.post(uri,customers).then((response) => {
     
      
      res = response.data.status;
      switch (res) {
        
        //registered start
        case "registered&loggedin":
          this.setState({
            loading:false
          })

          swal({
              title: "Successfully Registered",
              text: "Thanks for registering with us",
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

        //registered end

        //not activated start

        case "unregistered":
          this.setState({
            loading:false
          })
          this.setState({ alertMessage: "The given email is unregistered" })
          $("#Button").prop("disabled", true);
          return;

        case "invalid email":
          this.setState({
            loading:false
          })
          this.setState({ alertMessage: "The given email seems to be invalid" });
          $("#Button").prop("disabled", true);
          return;

        case "already email registered":
          this.setState({
            loading:false
          })
          $("#Button").prop("disabled", true);
          this.setState({ alertMessage: AlreadyregeMail });


          return;

      }

    }).catch(error => { if(error)
      {
        this.setState({loading:false});
        swal("Something wrong in network! please refresh the page..");
      }
  });
  }

///////////////////////////////////////Register End////////////////////////////////////////////////


  fsignup(res) {
    
    let customers='';
    if(res.email)
    {
      customers = {
        tagNumber:this.state.tagNumber,
        eMail: res.email,
        userName:res.email,
        firstName:res.name,
        signupVia :'facebook signup via email',
        phone : '',
        type:this.state.type,
        storeNumber:this.state.storeNumber,
        isMailSimilar:this.state.isMailSimilar,
      }
    }
    else if(this.state.eMail)
    {
      customers = {
        tagNumber:this.state.tagNumber,
        eMail: this.state.eMail,
        userName:res.id,
        firstName:res.name,
        signupVia :'facebook signup via phone number',
        phone : '',
        type:this.state.type,
        storeNumber:this.state.storeNumber,
        isMailSimilar:this.state.isMailSimilar,
      }
    }
    else
    {
      sessionStorage.setItem('tagnumber',this.state.tagNumber);
      sessionStorage.setItem('id',res.id);
      sessionStorage.setItem('type',this.state.type);
      sessionStorage.setItem('storenumber',this.state.storeNumber);
      sessionStorage.setItem('isMailSimilar',this.state.isMailSimilar);
      sessionStorage.setItem('firstname',res.name);
      this.props.history.push("/verifyeMail");
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
                    text: "Thanks for registering with us",
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
                    sessionStorage.setItem('loginVia','facebook');
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
                this.setState({ alertMessage: "Cannot registered the account" })
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
                  
                 case "already email registered":
                  this.setState({
                    loading:false
                  })
                  this.setState({ alertMessage: AlreadyregeMail});
                  break;
            }      
          }) .catch(error => { if(error)
            {
              this.setState({loading:false});
              swal("Something wrong in network! please refresh the page..");
            }
        });
    
  }

  ///////////////////G-sign-up/////////////////////////
  
  gsignup(res) {
   
    
    const user=jwt_decode(res.credential);
			 console.log(user);
   
    let eMail=user.email;
    let firstName=user.name;
     
   
    const customers = {
      tagNumber:this.state.tagNumber,
      eMail: eMail,
      userName:eMail,
      firstName:firstName,
      signupVia :'google',
      phone : '',
      type:this.state.type,
      storeNumber:this.state.storeNumber,
      isMailSimilar:this.state.isMailSimilar,
    }

    console.log(customers);

          this.setState({loading:true})
          let uri = MyGlobleSetting.url + '/api/SocialmediaSignupGoogle';
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
                    text: "Thanks for registering with us",
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
                    sessionStorage.setItem('loginVia', 'gmail');
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
                  
                 case "already email registered":
                  this.setState({
                    loading:false
                  })
                  this.setState({ alertMessage: AlreadyregeMail });
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

    const responseFacebook = (response) => {
    this.fsignup(response, 'facebook');
    }

    const responseGoogle = (response) => {
    
    if(response.error != undefined)
    {
        if(response.details == "Cookies are not enabled in current environment.")
        {
          this.setState({
            Cookies: 'disabled',
            alertMessage: "Enable browser Cookies to log-in with Google"
          });
        }
        else if(this.state.Cookies == 'disabled')
        {
          this.setState({
            alertMessage: "Enable browser Cookies to log-in with Google"
          });
        }
        else
        {
          
            this.setState({
                alertMessage: response.details
            });
        }
    }
    else
    {
      this.setState({
        Cookies: 'enabled'
      });
      
      this.gsignup(response);
    }

  }

    const { details } = this.state;

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

        <main style={{height: '100vh'}}>
          <div className="container" id="login">

            <h4 className="mb-1" style={{ textAlign: 'left', color: '#43494d', marginTop: '20px' }}>
              <b>Rewards customer signup</b>
            </h4>

            <hr className="mb-4" />

            {!this.state.IsDisableTitle1?
            <h5 className="mb-4" style={{ textAlign: 'left', color: '#43494d', marginTop: '20px' }}>
            To register we need to validate the rewards number from the key tag you were given at the gift shop.
            </h5>:null
            }

          {!this.state.IsDisableTitle2?
            <h5 isDisabled={this.state.IsDisableTitle2} className="mb-4" style={{ textAlign: 'left', color: '#43494d', marginTop: '20px' }}>
            Thank you for validating your account.  Please enter your email address and create a password for your account
            </h5>:null
        }

            

            {/* <div className="row justify-content-center"> */}
              {/* <div className="col-6 border-right"> */}
              <div className="row">
              <div className="col-md-5 col-sm-12 col-12">

                {/* <center> */}
                {(this.state.alertMessage) ?
                  <div class="alert alert-danger" role="alert">
                    {this.state.alertMessage}
                  </div> : null}


              <div style={{marginRight:"10%"}}>
                

                  {/* tag validation start*/}
                  
                  {/* <form onSubmit={this.tagNumberValidation}> */}

                    <div>
                  {(!this.state.tagNumberHide)?
                  <div className="form-group">
                    <label for="tagNumber" className="mb-1">Tag Number:</label>
                    <input type="text" value={this.state.tagNumber} id="tagnumber" disabled={this.state.tagnumberDisable} required class="form-control mb-3" 
                    onChange={this.tagNumberChange}
                    onKeyPress={event => {
                      if (event.key === 'Enter') {
                        this.tagNumberValidation(event);
                      }
                    }}
                    autoComplete="true" 
                    autoFocus />
                  </div>:null
                  }
                  
                  {
                  (this.state.submitButtonHide)?
                  <div className="form-group">
                    <button type="submit" class="btn btn-primary btnwidth"
                    onClick={this.tagNumberValidation}
                     >
                    <b>Verify Tag number</b></button>
                    
                   </div>
                   
                   :null
                  }
                  </div>
                {/* </form> */}

                  {/* tag validation end*/}





                {/* reenter validation start */}
                  
                { (!this.state.storeHide)?
                  // <form onSubmit={this.reEnterTagNumberValidation}>
                  <div>
                  <div className="form-group">
                    <label for="tagNumber" className="mb-1">Tag Number:</label>
                    <input type="text" value={this.state.reenterTagNumber} id="reenterTagnumber" disabled={this.state.reEnterTagnumberDisable} required class="form-control mb-3" 
                    onChange={this.reEnterTagNumberChange}
                    onKeyPress={event => {
                      if (event.key === 'Enter') {
                        this.reEnterTagNumberValidation(event);
                      }
                    }}
                    autoComplete="true" autoFocus />
                  </div>

                   {/* <div className="form-group">
                  <button type="submit" class="btn btn-primary btnwidth" 
                  disabled={this.state.storeButtonDisable}>
                    <b>Verify TagNumber</b></button>
                   </div> */}

                   <div className="form-group">
                  <button type="button" class="btn btn-primary btnwidth" 
                  disabled={this.state.storeButtonDisable} 
                  onClick={this.reEnterTagNumberValidation} >
                    <b>Verify TagNumber</b></button>
                   </div>

                   </div>
                  //  </form>
                   
                   :null}


                   {/* reenter validation end */}


                  {/* registeration start */}
            
                <form onSubmit={this.handleSubmit}>
                  
                  {!this.state.divHide?
                  <div class="hideDiv">

                  <div className="form-group">
                    <label for="eMail" className="mb-1">Email:</label>
                    <input type="email" required class="form-control mb-3"  value={this.state.eMail} onChange={this.handleChange1} autoComplete="true"
                    disabled={this.state.emailDisable}/>
                  </div>

                 
                  <div className="form-group">
                    <label for="Password"   className="mb-1 labels">Password:</label>
                    <input type="password"required className="form-control mb-3" onChange={this.Password} autoComplete="true"
                    disabled={this.state.passwordDisable}/>                  
                    </div>

                  <div className="form-group">
                   <label for="Confirm password" className="mb-1">Confirm Password:</label>
                   <input type="password" required className="form-control mb-3" id="Confirm_password" onKeyUp={this.Confirm_password} 
                   autoComplete="true" disabled={this.state.passwordDisable}/>
                   <span className="error">{this.state.Passworderrors}</span>
                  </div>

                  <div className="form-group" style={{marginLeft:'18px'}}>
                  <label class="form-check-label">
                      <input type="checkbox" id="terms_checkbox" onClick={this.checkbox} class="form-check-input" style={{width:'12px',height:'14px'}}/>
                      Read and accept <a style={{color: "#005295",fontFamily: 'Tahoma, Arial, Helvetica'}} data-toggle="modal" data-target="#myModal">Terms and Conditions</a>
                    </label>
                  </div>

                  
                  <div className="form-group">
                  <button type="submit" id="Button" disabled={this.state.submitDisable} class="btn btn-primary btnwidth">
                  <b>Sign up</b>
                  </button>
                   </div>

                   <h4 class="signin-text mb-1">Or signup with</h4>

              <center>
              {/* <FacebookLogin
                  // appId="270570307324577"
                  appId="259803798619822"
                  autoLoad={false}
                  fields="name,email,picture"
                  callback={responseFacebook}
                  cssClass="my-facebooklogin-button-class-signup"
                  icon="fa-facebook"
                  textButton="Continue with Facebook"
                  isDisabled={true}
                  scope="public_profile,user_friends,email" 
                  />
                
                <GoogleLogin
                    clientId="695238102765-fstg97ilopq97q43qp2divd2eescqrlu.apps.googleusercontent.com"
                    icon={true}
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    buttonText="Login with Google"
                  >
                    <i className="fa fa-google-plus" style={{}} />
                  </GoogleLogin> */}



                            <GoogleOAuthProvider clientId="695238102765-fstg97ilopq97q43qp2divd2eescqrlu.apps.googleusercontent.com">
                            <GoogleLogin onSuccess={responseGoogle} onFailure={responseGoogle}> </GoogleLogin>
                            </GoogleOAuthProvider>



                            <FacebookLogin appId="1260564637638026" 
                            autoLoad={false} 
                            fields="name,email,picture" callback={responseFacebook} 
                            isDisabled={false}
                            textButton="Signin with Facebook"
                            cssClass="loginBtn1 loginBtn--facebook"
                            scope="public_profile,email"
                            isMobile={true}
                            disableMobileRedirect = {true} />
                </center>

                <hr/>
                
                   
                  </div>:null}
              
                </form>

                {/* registration end here */}


  {/* <!-- start Modal --> */}
  <div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog">
    
    {/* <!-- Modal content--> */}
    <div class="modal-content">
        <div class="modal-body">
        <div className='row' style={{marginLeft:"3%",marginRight:"3%", height:"50% !important"}}>
        <h4 className="mb-1" style={{marginBottom:"2%",textAlign: 'left',marginTop: '20px',color: '#43494d'}}>
                  <b>Terms&Condition</b>
        </h4>
<hr className="mb-4" />

<ul style={{textAlign: 'left', fontFamily: 'Tahoma, Arial, Helvetica',fontSize: '16px',fontWeight: 'normal',color:'#43494d'}}>
    <li>Key tag must be presented to the cashier at the time of purchase to receive points.</li>
    <li>Points will not be added retroactively if the key tag is not presented at time of purchase for prior purchases.</li>
    <li>One Rewards Point is earned for each whole dollar that is spent in the gift shop on regularly priced merchandise; not including sales tax.</li>
    <li>Points are not earned purchase amounts less than $1.00.</li>
    <li>Rewards Points are not earned for purchases of sale or discounted merchandise, vendor show merchandise or service items such as magazines, newspapers, movie tickets, gift cards, transportation tokens and stamps.</li>
    <li>Points are deducted for the whole dollar amount of merchandise returns, not including sales tax.</li>
    <li>$5.00 Rewards Coupons are awarded for every 100 Rewards Points accumulated.</li>
    <li>Rewards Coupons are emailed to the Rewards Customer the day after 100 Rewards Points are accumulated.</li>
    <li>No cash back will be given if the full amount of the Rewards Coupon is not used.</li>
    <li>Purchases made using different key tags cannot be combined.</li>
    <li>Lori's is not responsible for lost or stolen key tags and Rewards Points cannot be transferred to another account.</li>
    <li>Key tags may only be used for purchases made by the original applicant. Violations of this provision will result in forfeiture of all Rewards Points.</li>
    <li>Not valid for employees of Lori's Gifts.</li>
    <li>Receipts will display points received for the current purchase + the total point balance as of the previous day. Multiple purchases on the same day will be added to the following day's account balance.</li>
</ul>

</div>

</div>
<div class="modal-footer">
          <button type="button" class="btn btn-primary" onClick={this.accept} data-dismiss="modal">Accept</button>
          <button type="button" class="btn btn-primary" onClick={this.decline} data-dismiss="modal">Decline</button>
        </div>
</div>
      

    </div>
  </div>

  {/* <!-- end Modal --> */}


                </div>


                {/* </center> */}

              </div>

            </div>

            
          </div>
         
            
          <div className="py-4">
          </div>


        
        </main>
        <br/><br/><br/><br/>
        <footer>
          <Footer />
        </footer>

      </div>
    );
                }
  }
}
