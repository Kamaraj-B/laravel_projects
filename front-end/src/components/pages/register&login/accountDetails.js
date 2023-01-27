import React, { Component } from "react";
import axios from 'axios';
//import Header from '../layout/Header.js';
import Header2 from '../../layout/Header2.js';
import Footer from '../../layout/Footer.js';
import '../../css/index.css';
import Loader from '../../layout/loader';
import MyGlobleSetting from '../../layout/MyGlobleSetting';
import './Signup';
import $ from 'jquery';
// import 'jquery/dist/jquery-ui';
import swal from 'sweetalert';
import Select from 'react-select';

export default class accountDetails extends Component {

  constructor(props) {
 
    super(props);
 
    this.state = {
      ID:'',
      StoreNumber:''
      ,TagNumber:sessionStorage.getItem('tagnumber')
      ,LastName:''
      ,FirstName:''
      ,BirthdayDate:''
      ,Addr1:''
      ,Addr2:''
      ,City:''
      ,State:''
      ,ZipCode:''
      ,Phone:''
      ,eMail:''
      ,Month:''
      ,Date:''
      ,errors:[],
      test:'',
      mobalert:false,
      alert_message:'Invalid',
      username:'',
      tagnumber:'',
      loading:false,
      buttonDisable:false,
      selectedValue: '',
      Content: ''

    
    }
 
    this.StoreNumber = this.StoreNumber.bind(this);  
    this.TagNumber = this.TagNumber.bind(this);  
    this.LastName = this.LastName.bind(this);  
    this.FirstName = this.FirstName.bind(this);    
    this.Addr1 = this.Addr1.bind(this);  
    this.Addr2 = this.Addr2.bind(this);  
    this.City = this.City.bind(this);  
    this.State = this.State.bind(this); 
    this.ZipCode = this.ZipCode.bind(this);  
    this.Phonechange = this.Phonechange.bind(this);  
    this.eMail = this.eMail.bind(this);
    this.Month = this.Month.bind(this);
    this.Monthfocusout = this.Monthfocusout.bind(this);  
    this.Date = this.Date.bind(this);
    this.Datefocusout = this.Datefocusout.bind(this);  
    this.registerSubmit = this.registerSubmit.bind(this);

    this.options = [
      { label: "Alaska", value: "Alaska" },
      { label: "Alabama", value: "Alabama" },
      { label: "Arkansas", value: "Arkansas" },
      { label: "American Samoa", value: "American Samoa"},
      { label: "Arizona", value: "Arizona" },
      { label: "California", value: "California" },
      { label: "Colorado", value: "Colorado" },
      { label: "Connecticut", value: "Connecticut" },
      { label: "Delaware", value: "Delaware" },
      { label: "Florida", value: "Florida"},
      { label: "Georgia", value: "Georgia" },
      { label: "Guam", value: "Guam" },
      { label: "Hawaii", value: "Hawaii" },
      { label: "Iowa", value: "Iowa" },
      { label: "Idaho", value: "Idaho" },
      { label: "Illinois", value: "Illinois"},
      { label: "Indiana", value: "Indiana" },
      { label: "Kansas", value: "Kansas" },
      { label: "Kentucky", value: "Kentucky" },
      { label: "Louisiana", value: "Louisiana" },
      { label: "Massachusetts", value: "Massachusetts" },
      { label: "Maryland", value: "Maryland"},
      { label: "Maine", value: "Maine" },
      { label: "Michigan", value: "Michigan" },
      { label: "Minnesota", value: "Minnesota" },
      { label: "Missouri", value: "Missouri" },
      { label: "Mississippi", value: "Mississippi" },
      { label: "Montana", value: "Montana"},
      { label: "North Carolina", value: "North Carolina" },
      { label: "North Dakota", value: "North Dakota" },
      { label: "Nebraska", value: "Nebraska" },
      { label: "New Hampshire", value: "New Hampshire" },
      { label: "New Jersey", value: "New Jersey" },
      { label: "New Mexico", value: "New Mexico"},
      { label: "Nevada", value: "Nevada" },
      { label: "New York", value: "New York" },
      { label: "Ohio", value: "Ohio" },
      { label: "Oklahoma", value: "Oklahoma" },
      { label: "Oregon", value: "Oregon" },
      { label: "Pennsylvania", value: "Pennsylvania"},
      { label: "Puerto Rico", value: "Puerto Rico" },
      { label: "Rhode Island", value: "Rhode Island" },
      { label: "South Carolina", value: "South Carolina" },
      { label: "South Dakota", value: "South Dakota" },
      { label: "Tennessee", value: "Tennessee" },
      { label: "Texas", value: "Texas"},
      { label: "Utah", value: "Utah" },
      { label: "Virginia", value: "Virginia" },
      { label: "Virgin Islands", value: "Virgin Islands" },
      { label: "Vermont", value: "Vermont" },
      { label: "Washington", value: "Washington" },
      { label: "Wisconsin", value: "Wisconsin"},
      { label: "West Virginia", value: "West Virginia" },
      { label: "Wyoming", value: "Wyoming" },
    ];
    
    
    
  }

componentDidMount(){
  if(sessionStorage.getItem('data')){
    this.setState({loading:true});
    const cust = {
      eMail: sessionStorage.getItem('email'),
      tagNumber: sessionStorage.getItem('tagnumber'),
      }
    let uri1 = MyGlobleSetting.url + '/api/getContent';
    axios.post(uri1, cust).then((response) => {
      console.log('contetnt');
      console.log(response.data.content);
      this.setState({Content:response.data.content});
    }).catch(error => { if(error)
      {
        this.setState({loading:false});
        swal(error);
      }
  });
    
    const customers = {
        eMail: sessionStorage.getItem('email'),
        tagNumber: sessionStorage.getItem('tagnumber'),
        }
        let uri = MyGlobleSetting.url + '/api/getuserDetails';
          axios.post(uri, customers).then((response) => {
            sessionStorage.setItem('data',response.data);
            console.log(response);
            
            sessionStorage.setItem('flag',response.data.userdata.accountFlag?response.data.userdata.accountFlag:0);
            sessionStorage.setItem('store',response.data.userdata.StoreNumber?response.data.userdata.StoreNumber:'');
            sessionStorage.setItem('firstname',response.data.userdata.FirstName?response.data.userdata.FirstName:'');
            sessionStorage.setItem('lastname',response.data.userdata.LastName?response.data.userdata.LastName:'');
            sessionStorage.setItem('username',response.data.userdata.eMail?response.data.userdata.eMail:'');
            sessionStorage.setItem('token',response.data.userdata.token?response.data.userdata.token:'');
            sessionStorage.setItem('birthdaydate',(response.data.userdata.BirthdayDate!=null)?response.data.userdata.BirthdayDate:'');
            sessionStorage.setItem('addr1',(response.data.userdata.Addr1!=null)?response.data.userdata.Addr1:'');
            sessionStorage.setItem('addr2',(response.data.userdata.Addr2!=null)?response.data.userdata.Addr2:'');
            sessionStorage.setItem('city',(response.data.userdata.City!=null)?response.data.userdata.City:'');
            sessionStorage.setItem('state',(response.data.userdata.State!=null)?response.data.userdata.State:'');
            sessionStorage.setItem('zipcode',(response.data.userdata.ZipCode!=null)?response.data.userdata.ZipCode:'');
            sessionStorage.setItem('phone',(response.data.userdata.Phone!=null)?response.data.userdata.Phone:'');
    
            this.setState({FirstName:response.data.userdata.FirstName});
            this.setState({LastName:response.data.userdata.LastName});
            this.setState({StoreNumber:response.data.userdata.StoreNumber});
            this.setState({eMail:sessionStorage.getItem('email')});
            this.setState({LastName:response.data.userdata.LastName});
            this.setState({Addr1:response.data.userdata.Addr1});
            this.setState({Addr2:response.data.userdata.Addr2});
            this.setState({City:response.data.userdata.City});
            this.setState({State:response.data.userdata.State});
            this.setState({ZipCode:response.data.userdata.ZipCode});

            this.setState(prevState=> ({ Phone: this.normalizeInput(response.data.userdata.Phone, prevState.Phone) }));
            this.setState({State:response.data.userdata.State});
            this.setState({
              selectedValue: response.data.userdata.State
          })

          
          if(response.data.userdata.BirthdayDate!=='' && response.data.userdata.BirthdayDate!==null)
            {
              let birthdaydate=response.data.userdata.BirthdayDate;
              let values=birthdaydate.split("/");
              this.setState({Month:values[0]});
              this.setState({Date:values[1]});

            }

            this.setState({loading:false});
            
          }).catch(error => { if(error)
            {
              this.setState({loading:false});
              swal("Something wrong in network! please refresh the page..");
            }
        });

    }
  else if(sessionStorage.getItem('isInfo'))
    {
      sessionStorage.setItem('isInfo','')
      this.props.history.push("/login");
    }
    else{
      this.props.history.push("/login");
    }
}




StoreNumber(event) {  
    this.setState({ StoreNumber: event.target.value })  
  } 

  
 TagNumber(event) {  
    this.setState({ TagNumber: event.target.value })  
  } 

 LastName(event) {  
  let value = event.target.value;
  value = value.replace(/[^A-Za-z]/ig, '')
  value=value.length ? value.charAt(0).toUpperCase() + value.slice(1) : value;
  this.setState({LastName:value})
  } 

 FirstName(event) {  
  let value = event.target.value;
  value = value.replace(/[^A-Za-z]/ig, '')
  value=value.length ? value.charAt(0).toUpperCase() + value.slice(1) : value;
  this.setState({FirstName:value})
  } 
  
  Addr1(event) {  
    this.setState({ Addr1: event.target.value })  
  } 

  Addr2(event) {  
    this.setState({ Addr2: event.target.value })  
  } 
  
  City(event) {  
    //this.setState({ City: event.target.value }) 
    let value = event.target.value;
    value = value.replace(/[^A-Za-z]/ig, '');
    value=value.length ? value.charAt(0).toUpperCase() + value.slice(1) : value;
    this.setState({City:value})
  } 

  State(event) {  
    this.setState({State:event.value});
    this.setState({selectedValue: event.value});
    console.log(event.value);
  } 

  ZipCode(event) {  
    let value=event.target.value;
    let currentValue = value.replace(/[^\d]/g, '');
    console.log(currentValue);
    this.setState({ ZipCode: currentValue }) ;
    
  } 
  

  //phone validation start
  Phonechange({ target: { value } }) {   
    this.setState(prevState=> ({ Phone: this.normalizeInput(value, prevState.Phone) }));
    let cvLength=$('#phone').val();
    cvLength=cvLength.length;
    if(cvLength===14)
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
  

//email validaton start//
  eMail(event) {  
    this.setState({ eMail: event.target.value });
    var eMail = this.state.eMail;
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(eMail)) {
        document.getElementById("eMail").style.border = "3px solid green";
        this.setState({ eMailerrors: " " });
        $("#submitButton").removeAttr('disabled');
        return true;
    } else {
        document.getElementById("eMail").style.border = "3px solid red";
        $("#submitButton").prop("disabled", true);
        this.setState({ eMailerrors: "Email format invalid" });
        return false;
    }
  }
  
//email validaton end//
 
  //date calculation end here //

  Month(event)
  {
    
    this.setState({ Month: event.target.value }); 
    let mm= $('#month').val();
    let error_mob='';
    if(isNaN(mm))
        {
            error_mob = 'Only Number allowed';
            $('#error').text(error_mob);
            $('#month').addClass('has-error');
            $('#month').val($.trim($('#month').val()).slice(0, -1));
            this.setState({buttonDisable:false});
            return false;
        }
        else
        {
            if(mm>=1 && mm<=12)
        {
            error_mob = '';
            $('#error').text(error_mob);
            $('#month').removeClass('has-error');
            this.setState({buttonDisable:false});
            this.Date();
            return true;
        }
        else
        {
            error_mob = 'Invalid Month';
            $('#error').text(error_mob);
            $('#month').addClass('has-error');
            this.setState({buttonDisable:true});
            return false;
            
        }

        
        }
        
    
  }

  Monthfocusout(event)
{
    this.setState({ Month: event.target.value }) 
    let mm= this.state.Month;
    console.log(mm);
    if(mm.length==1)
    {
      mm = ("0" + mm).slice(-2);  
      $('#month').val(mm);
    }
    this.setState({ Month:  $('#month').val() }) 
    
  }

  Date()
  {
    
    let mm= $('#month').val();;
    let dd= $('#date').val();

    this.setState({ Date:$('#date').val()})

        let error_mob='';
        //check month
        if(mm!='' && dd!='')
        {

            if(isNaN(dd))
            {
            error_mob = 'Only Number allowed';
            $('#error').text(error_mob);
            $('#date').addClass('has-error');
            $('#date').val($.trim($('#date').val()).slice(0, -1));
            this.setState({buttonDisable:true});
            return false;
            }
            else
            {

                if((dd>=1 && dd<=31) && (mm==1 || mm==3 || mm==5 || mm==7 || mm==8 || mm==10 || mm==12))
            {

                error_mob = '';
                $('#error').text(error_mob);
                $('#date').removeClass('has-error');
                this.setState({buttonDisable:false});
                return true;
            }
            else if((dd>=1 && dd<=30) && (mm==4 || mm==6 || mm==9 || mm==11))
            {

                error_mob = '';
                $('#error').text(error_mob);
                $('#date').removeClass('has-error');
                this.setState({buttonDisable:false});
                return true;
            }
            else if((dd>=1 && dd<=29) && (mm==2))
            {
                error_mob = '';
                $('#error').text(error_mob);
                $('#date').removeClass('has-error');
                this.setState({buttonDisable:false});
                return true;
            }
            else
            {
                error_mob = 'Invalid Date';
                $('#error').text(error_mob);
                $('#date').addClass('has-error');
                this.setState({buttonDisable:true});
                return false;
            }
            }
            this.setState({ Date: $('#date').val() })
            
        }
        else
        {
                error_mob = 'Empty month or date';
                $('#error').text(error_mob);
                $('#date').addClass('has-error');
                this.setState({buttonDisable:true});
                return false;
        }

         
        
    }
  
    Datefocusout()
  {
    let dd= $('#date').val();
    if(dd.length==1)
    {
      dd = ("0" + dd).slice(-2);  
      $('#date').val(dd);
    }
    this.setState({Date:$('#date').val()});
    
  }
  
  //date calculation end here //

  registerSubmit(e){
    e.preventDefault();

    const customers = {
      Username :this.state.username,
      StoreNumber: this.state.StoreNumber,
      TagNumber: this.state.TagNumber,
      FirstName: this.state.FirstName,
      LastName: this.state.LastName,
      Addr1: this.state.Addr1,
      Addr2: this.state.Addr2,
      City: this.state.City,
      State: this.state.State,
      ZipCode: this.state.ZipCode,
      Phone: this.state.Phone,
      Date: this.state.Date,
      Month: this.state.Month,
      eMail: this.state.eMail,
    }


    this.setState({loading:true})

            let uri = MyGlobleSetting.url + '/api/accountUpdate';
              axios.post(uri, customers).then((response) => {

                if(response.data.status=='email required')
                {
                  swal("Email is Required!");
                }
                if(response.data.status=='tagNumber required')
                {
                  swal("RewardsNumber/TagNumber is Required!");
                }
                
                if(response.data.status=='store number required')
                {
                  swal("StoreNumber is Required!");
                }
                if(response.data.status=='updated')
                {

                  this.setState({loading:false})
                  swal({
                    title: "Account details updated Successfully",
                    // text: "Thank for registering with us",
                    icon: "success",
                    className:'swalclass',
                    buttons: {
                      confirm : {text:'Ok',className:'sweet-warning'},
                     
                  },
                    
                  })
                  .then((value) => {
                    if(value== true){
                      sessionStorage.setItem('flag',response.data.userdata.accountFlag);
                      //window.location.reload();
                      this.props.history.push("/account");
                    }
                  });
                  
                }
                else
                {
                  this.setState({loading:false})
                  this.setState({alert_message:"failure"})
                }

                if(response.data.status=='not updated')
                {
                  this.setState({alert_message:"Something wrong.."})
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
               <Header2/>
              </header>
      <Loader/>
       </div>
        )
      }
         else {          
        return (
          
            <div>
    <Header2/>

    <div className="container" id="login">
      
        
    <h4 className="mb-1 signinhead" style={{textAlign: 'left',marginTop: '20px',color: '#43494d'}}>
        <b>Account Details</b>
    </h4>
    <hr className="mb-4" />
    <p>{this.state.Content}</p>
        <form onSubmit={this.registerSubmit}>
            
                <div className="form-holder" >
                <div className="row">
                            <div className="col-md-5">
                                <div className="form-group">
                                    <label className="lab">Store Number</label>
                                    <input type="text" readOnly className="form-control" value={this.state.StoreNumber} onChange={this.StoreNumber} />
                                </div>
                             
                                <div className="form-group">
                                    <label className="lab">Tag Number</label>
                                    <input type="text"required readOnly value={this.state.TagNumber}  className="form-control" onChange={this.TagNumber}  />
                                </div>
                               <div className="form-group">
                                    <label className="lab">First Name</label>
                                    <input type="text" className="form-control" value={this.state.FirstName} onChange={this.FirstName} autoComplete="true"/>
                                </div>
                              
                                <div className="form-group">
                                    <label className="lab">Last Name</label>
                                    <input type="text" className="form-control" value={this.state.LastName} onChange={this.LastName} allow="[a-zA-Z]" autoComplete="true"/>
                                </div>
                                
                                <div className="form-group">
                                    <label className="lab">Email*</label>
                                    <input type="text" required readOnly value={this.state.eMail} className="form-control" id="eMail"  onChange={this.eMail}  onKeyUp={this.eMail}  autoComplete="true" required/>
                                    <span className="error">{this.state.eMailerrors}</span>
                                </div>

                                <div className="form-group">
                                    <label className="lab">Mobile Number</label>
                                    <input className="form-control" type="text" id="phone" placeholder="(xxx) xxx-xxxx"
                                    value={this.state.Phone} onChange={this.Phonechange} maxLength="14" autoComplete="true"/>
                                    {this.state.mobalert?<span className="error">{this.state.alert_message}</span>:null}
                               </div>
                               

                              
                            </div>


                            <div className="col-md-5">
                                
                              <label className="lab">Month & Day Born</label>
                              <div className="form-group">
                              <span class="inlineinput">
                                    <input type='text' placeholder="MM" id="month" 
                                    onChange={this.Month} 
                                    onBlur={this.Monthfocusout} 
                                    value={this.state.Month}
                                    maxLength="2" className="form-control box" autoComplete="true"/>
                                </span>
                                /
                                <span class="inlineinput">
                                    <input type='text' placeholder="DD" id="date" 
                                    onChange={this.Date} onBlur={this.Datefocusout}
                                    value={this.state.Date}  
                                    maxLength="2" className="form-control box" autoComplete="true"/>
                                </span>
                                <br/>
                                <span id="error" class="text-danger"></span>
                            </div>
                                
                                <div className="form-group">
                                    <label className="lab">Address1</label>
                                    <input type="text" className="form-control" value={this.state.Addr1} onChange={this.Addr1} maxLength="50" autoComplete="true"/>
                                </div>

                                <div className="form-group">
                                    <label className="lab">Address2</label>
                                    <input type="text"  className="form-control" value={this.state.Addr2} onChange={this.Addr2} maxLength="50" autoComplete="true"/>
                                </div>

                                <div className="form-group">
                                    <label className="lab">City</label>
                                    <input type="text"  className="form-control" value={this.state.City} onChange={this.City} autoComplete="true"/>
                                </div>

                                <div class="form-group">
                                  <label className="lab">State</label>
                                  <Select options={this.options} onChange={this.State}  
                                  value={this.options.filter(({value}) => value === this.state.selectedValue)}
                                  class="form-control" 
                                  autoComplete="true"/>
                                  {/* <input id="tags" value={this.state.State} onChange={this.State} className="form-control" autoComplete="true"/> */}
                                </div>

                                <div className="form-group">
                                    <label className="lab">Zipcode</label>
                                    <input type="text"  className="form-control" value={this.state.ZipCode} onChange={this.ZipCode} maxLength="5" autoComplete="true"/>
                                </div>

                                <div className="col-4" style={{float:"right"}}>

                                <button type="submit"  style={{float:"right"}} id="Button" disabled={this.state.buttonDisable} className="btn btn-primary signin">Update</button>

                            </div>

                            </div>

                </div>

            </div>

      
  </form>
    
    
    

</div>
<Footer/>
</div>
        );
    }
}
}