import React, { Component } from "react";

import '../../css/index.css';
import Header2 from '../../layout/Header2.js';
import Footer from '../../layout/Footer.js';
import swal from 'sweetalert';
import MyGlobleSetting from '../../layout/MyGlobleSetting';
import axios from 'axios';
import Loader from '../../layout/loader';

const AlreadyregContactus = 
<div class="alert alert-danger" role="alert">
The tag you are transferring to is already registered in the system.  Therefore you can not transfer points to it.  If you believe this to be an error please
contact the Rewards Program Administrator. <a href="/contactus" class="alert-link">Click here</a>
</div>
;

class transferpoints extends Component {
  constructor(props) {
 
    super(props)
 
    this.state = {
      tagnumber: null,
      flag: 0,
      alertMessage: '',
      loading:false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount(){
    if(sessionStorage.getItem('data')){
        console.log("logged in")
    }
    else{
      this.props.history.push("/login");
    }
  
   }


  componentDidMount()
  {
    
   this.setState({
    tagnumber: sessionStorage.getItem('tagnumber')
   })

   this.setState({
    flag:sessionStorage.getItem('flag')
    })
  }

  handleChange(e) {
    this.setState({
      TagNumber: e.target.value
    })
  }
  

  handleSubmit(e)
  {
  e.preventDefault();
  
  const customers = {
    oldTagNumber: sessionStorage.getItem('tagnumber'),
    newTagNumber: this.state.TagNumber,
    eMail: sessionStorage.getItem('email'),
  }

  let res='';
  let uri = MyGlobleSetting.url + '/api/checkTagNumberForNullRecord';
  let uri2 = MyGlobleSetting.url + '/api/transferPoints';

  this.setState({loading:true});
  
  axios.post(uri, customers).then((response) => {
            
  // validating the tagnumber and null records          
    this.setState({loading:false});

    res=response.data.status;

    if(res=='invalid tagnumber')
    {
      this.setState({ alertMessage: "Invalid Tagnumber" });
      
    }

    else if(res=='already exist')
    {
      this.setState({ alertMessage: AlreadyregContactus });
      
    }

    else if(res=="invalid format")
    {
        this.setState({ alertMessage:"Invalid TagNumber format"})
    }

    else if(res=='no user')
    {
      swal({
        title: "Transfer Tagnumber",
        text: "Do you want to update Tagnumber!",
        icon: "warning",
        className:'swalclass',
        buttons: {
          cancel : "cancel",
          confirm : {text:'Click here to proceed',className:'sweet-warning'}
                }
          })
          .then((value) => {
            if(value== true)
            {
              this.setState({loading:true});
              const customers = {
                oldTagNumber: sessionStorage.getItem('tagnumber'),
                newTagNumber: this.state.TagNumber,
                eMail: sessionStorage.getItem('email'),
                storeNumber:response.data.storenumber,
              }

              axios.post(uri2, customers).then((response) => 
              {
                res=response.data.status;
                this.setState({loading:false});
                if(res=='old keytag record is null')
                {
                  this.setState({ alertMessage: "old key tagnumber record is null" });
                }
                else if(response.data.status=='success')
                {
                  
                  swal({
                    title: "Transfer point",
                    text: "Successfully transferred the point",
                    icon: "success",
                    className:'swalclass',
                    buttons: {
                      confirm : {text:'Click here to proceed',className:'sweet-warning'}
                          
                            }
                      })
                    .then((value) => {
                      this.setState({ loading: false });
                      this.props.history.push("/points");
                    });

                    sessionStorage.setItem('data',response.data.userdata);
                    sessionStorage.setItem('tagnumber',response.data.userdata.Customer_No?response.data.userdata.Customer_No:'');
                    sessionStorage.setItem('email',response.data.userdata.eMail?response.data.userdata.eMail:'');
                    sessionStorage.setItem('firstname',response.data.userdata.FirstName?response.data.userdata.FirstName:'');
                }
                else if(res=='failure')
                {
                  this.setState({ loading: false });
                  this.setState({ alertMessage: "Transferred failure" });
                  
                }

              });


            }
          })
          .catch(error => { if(error)
            {
              this.setState({loading:false});
              swal("Something wrong in network! please refresh the page..");
            }
        });
    }
  })
  .catch(error => { if(error)
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
      else
      {
      return (
          <div>
            <header>
            <Header2/>
            </header>
 
          <main>
          {this.state.tagnumber == ''?
             <div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>Action required:</strong> You need to verify your tag number
             &nbsp;<a href="VerifyTag" class="alert-link">Click here</a>&nbsp;to verify.
             <button type="button" class="close" data-dismiss="alert" aria-label="Close">
             <span aria-hidden="true">&times;</span>
            </button>
            </div>:<div/>
                }
          {this.state.flag == '0'?
             <div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>Action required:</strong> You have not updated your account details
             &nbsp;<a href="account" class="alert-link">Click here</a>&nbsp;to update.
             <button type="button" class="close" data-dismiss="alert" aria-label="Close">
             <span aria-hidden="true">&times;</span>
            </button>
            </div>:<div/>
                }
          <div className="container" id="login">

          <h4 className="mb-1" style={{textAlign: 'left',color: '#43494d',marginTop: '20px'}}>
                  <b>Transfer Points</b>
         </h4>

          <hr className="mb-4" />

              <div className="row justify-content-center">
                <div className="col-11">
                 
                <h5 className="mb-5 text-center" style={{ textAlign: 'left', color: '#43494d', marginTop: '20px' }}>
                To Transfer Points from your old key tag you must enter the new key tag number of the key tag you were given at the gift shop.
            </h5>
        <center>
        <form onSubmit={this.handleSubmit}>
            <div class="form-group">
            <label for="tagnumber" className="mb-3" style={{color: '#43494d'}}>New Key Tag Number:</label>

            {(this.state.alertMessage) ?
                  <div class="alert alert-danger" role="alert">
                    {this.state.alertMessage}
                  </div> : null}
            <br/>
            <input type="tagnumber" style={{width:'40%'}} class="form-control mb-4" id="email" placeholder="" name="tagnumber" onChange={this.handleChange} 
            autoComplete="true"
            required/>
            </div>
            <button type="submit" class="btn btn-primary">Transfer</button>
        </form>
        </center>
    
          </div>
        </div>
    </div>
    <br/>
    <div className="py-5"></div>
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
export default transferpoints