import React, { Component } from "react";
import FacebookLogin from 'react-facebook-login';


import '../../css/index.css';
import Header2 from '../../layout/Header2.js';
import Footer from '../../layout/Footer.js';
import MyGlobleSetting from '../../layout/MyGlobleSetting';
import Success from '../../Alert/Success.js';
import Failure from '../../Alert/Failure.js';
import Error from '../../Alert/Error.js';
import axios from 'axios';

export default class loginwith extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            TagNumber: '',
            LastName: '',
            gname: '',
            gmail:'',
            providerId:'',
            alert_message:''};

    
    
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setState({alert_message:''});
      }
      componentDidMount() 
      {  
        //   let name=this.props.location.state.detail;
        //  let details1= JSON.stringify(name);
        //  alert(details1);
        this.setState({
            gname:this.props.location.state.detail.Name,
            gmail:this.props.location.state.detail.email,
            providerId:this.props.location.state.detail.ProviderId,

        });
          
        this.setState({alert_message:null});
      }

      handleChange1(e){
        this.setState({
            TagNumber: e.target.value
        })
      }
      handleChange2(e){
        this.setState({
            LastName: e.target.value
        })
      }

      

      handleSubmit(e){
        e.preventDefault();
        let res='';
        const customers = {
          TagNumber: this.state.TagNumber,
          LastName: this.state.LastName,
          Username:this.state.gmail,
          Signup_via:this.state.providerId
        }
        //alert(JSON.stringify(customers));
        let uri = MyGlobleSetting.url + '/api/SocialmediaSignup';
        axios.post(uri, customers).then((response) => {
          res=response.data.status;
          console.log(res);
         if(res=="success" || res=="registered"){
            this.props.history.push({
                pathname: '/login',
                
              });
         }
    else{
            this.setState({alert_message:"Invalid Credentials "});
        }             
    })
        
        
      }
    
     

    render() {

        return (
          <div>
            <header>
            <Header2/>
            </header>
          
          <main>
          <div className="container" id="login">

          <h4 className="mb-1" style={{textAlign: 'left',color: '#43494d',marginTop: '20px'}}>
                  <b>Welcome</b>
         </h4>
         
         
          <hr className="mb-4" />

              <div className="row justify-content-center">
                <div className="col-11">
                  
        <center>
        {this.state.alert_message=="success"?<Success/>:null}
          {this.state.alert_message=="failure"?<Failure/>:null}

          {(this.state.alert_message)?
          <div class="alert alert-danger" role="alert">
          {this.state.alert_message}
          </div>:null}

        <form onSubmit={this.handleSubmit}>
            <table>
              <tbody>
                <tr>
                    <td><label for="Tagkeynumber" className="mb-3" style={{fontFamily: 'Tahoma, Arial, Helvetica',color: '#43494d'}}>Key TagNumber:</label></td>
                    <td><input type="text"  class="form-control mb-4" onChange={this.handleChange1}/></td>
                </tr>
                <tr>
                    <td><label for="Lastname" className="mb-3" style={{fontFamily: 'Tahoma, Arial, Helvetica',color: '#43494d'}}>Lastname:</label></td>
                    <td><input type="text" class="form-control mb-4" onChange={this.handleChange2}/></td>
                </tr>
              </tbody>
            </table>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        
        </center>
    
          </div>
        </div>
    </div>
    <br/>
    <div className="py-5"></div>
    <br/>
    </main>

    <footer>
    <Footer/>
    </footer>
    
      </div>
        );
    }
}
