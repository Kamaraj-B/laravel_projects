import React, { Component } from "react";
import axios from 'axios';
import Header from '../../layout/Header.js';
import Header2 from '../../layout/Header2.js';
import Footer from '../../layout/Footer.js';
import '../../css/index.css';
import Loader from '../../layout/loader';
import MyGlobleSetting from '../../layout/MyGlobleSetting';
import swal from 'sweetalert';
import $ from 'jquery';

const AlreadySuccess = "Thank you for contacting the Lori's Gifts Rewards Administrator. Your inquiry is very important to us and will be responded in 1 business day or less";


export default class Contactus extends Component {

  constructor(props) {
 
    super(props);
 
    this.state = {
 
       tagNumber:sessionStorage.getItem('tagnumber')
      ,firstName:sessionStorage.getItem('firstname')
      ,phone:''
      ,eMail:sessionStorage.getItem('email')
      ,userName:sessionStorage.getItem('firstname'),
      tag:'',
      comment:'',
      loading:false,
      alertMessage:'',
      
    
    }
 
    this.tagNumber = this.tagNumber.bind(this);  
    this.firstName = this.firstName.bind(this);    
    this.phone = this.phone.bind(this);  
    this.eMail = this.eMail.bind(this);
    this.comment = this.comment.bind(this);
   
    this.contactSubmit = this.contactSubmit.bind(this);

    this.setState(prevState=> ({ phone: this.normalizeInput(sessionStorage.getItem('phone'), prevState.phone) }));
  }

  componentDidMount(){
    
    if(sessionStorage.getItem('data')){
      this.setState(prevState=> ({ phone: this.normalizeInput(sessionStorage.getItem('phone'), prevState.phone) }));
      this.props.history.push("/contactus");
    }
    else if(sessionStorage.getItem('isInfo'))
    {
      sessionStorage.setItem('isInfo','')
      this.props.history.push("/login");
    }
    else{
      this.props.history.push("/contactus");
    }
 }

  

//phone validation start
phone({ target: { value } }) {   
  this.setState(prevState=> ({ phone: this.normalizeInput(value, prevState.phone) }));
  let cvLength=$('#phone').val();
  cvLength=cvLength.length;
  if(cvLength==14)
    {
      this.setState({mobalert:false});
    }
    else
    {
      this.setState({mobalert:true});
    }
};

normalizeInput = (value, previousValue) => {
  if (!value) return value;
  const currentValue = value.replace(/[^\d]/g, '');
  const cvLength = currentValue.length;
  
  if (!previousValue || value.length > previousValue.length) {
    if (cvLength < 4) return currentValue;
    if (cvLength < 7) return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;
    return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3, 6)}-${currentValue.slice(6, 10)}`;
  }
};
//phone validation end


 tagNumber(event) {  
    this.setState({ tagNumber: event.target.value })  
  } 

  eMail(event) {  
    this.setState({ eMail: event.target.value })  
  } 

  comment(event) {  
    this.setState({ comment: event.target.value })  
  } 

 
 firstName(event) {  
  this.setState({ firstName: event.target.value })  
  } 
  
  
  contactSubmit(e){
    e.preventDefault();
    this.setState({ alertMessage:''})  


    const customers = {
      firstName :this.state.firstName,
      storeNumber: this.state.storeNumber,
      tagNumber: this.state.tagNumber,
      phone: this.state.phone,
      eMail: this.state.eMail,
      comment: this.state.comment,
     
    }

              this.setState({loading:true})
              let res='';
              let uri = MyGlobleSetting.url + '/api/contactUs';
              axios.post(uri, customers).then((response) => {
                res=response.data.status;
                if(res=='success')
                {
                  this.setState({loading:false})
                  this.setState({alertMessage:AlreadySuccess})
                  
                }
                else
                {
                  this.setState({loading:false})
                  this.setState({alertMessage:"failure"})
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
               {sessionStorage.getItem('data')?<Header2/>:<Header/>}
              </header>
      <Loader/>
       </div>
        )
      }
         else {          
        return (
          
            <div>
    {sessionStorage.getItem('data')?<Header2/>:<Header/>}

    <div className="container">
    <h4 className="mb-1 signinhead" style={{textAlign: 'left',marginTop: '20px',color: '#43494d'}}>
        <b>Contact Us</b>
    </h4>
    <hr className="mb-4" />
    <form onSubmit={this.contactSubmit}>

                {(this.state.alertMessage) ?
                  <div class="alert alert-success" role="alert">
                    {this.state.alertMessage}
                  </div> : null}

        <div className="row">

               
                <br/>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Name <span className="asterik">*</span></label>
                                    <input type="text" className="form-control"  value={this.state.firstName} onChange={this.firstName} 
                                    required autoComplete="true"/>
                                </div>
                             
                                <div className="form-group">
                                    <label>Mobile Number</label>
                                    <input className="form-control" type="text" id="phone" 
                                    placeholder="(xxx) xxx-xxxx"
                                    value={this.state.phone} onChange={this.phone} maxLength="14" autoComplete="true"/>
                                    {this.state.mobalert?<span className="success">{this.state.alertMessage}</span>:null}
                               </div>
                               

                             
                            </div>


                            <div className="col-md-6">
                               <div className="form-group">
                                    <label>Email <span className="asterik">*</span></label>
                                    <input type="email" required  className="form-control" value={this.state.eMail} onChange={this.eMail} required autoComplete="true" />
                                </div>

                                <div className="form-group">
                                    <label>Rewards/Tag Number</label>
                                    <input type="text"  className="form-control" value={this.state.tagNumber} onChange={this.tagNumber} autoComplete="true" />
                                </div>

                               
                            </div>
                </div>

                <div className="row justify-content-center" style={{marginBottom:"2%"}} >
            <textarea placeholder="Please type your comment here..." rows="8"  id="commet_text" cols="95" 
            class="ui-autocomplete-input" style={{width:'98%',marginLeft:'0px' }}
            role="textbox" aria-autocomplete="list" aria-haspopup="true"
            onChange={this.comment}></textarea>
            </div>

            <button type="submit" style={{float:'right' }} className="btn btn-primary">Send</button>

                
                

            
          
        
        {/* <!-- Modal --> */}
  
      </form>
    
    
    

</div>
<br/><br/><br/>
<Footer/>
</div>
        );
    }
}
}