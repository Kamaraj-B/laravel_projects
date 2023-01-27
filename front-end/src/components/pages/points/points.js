import React, { Component } from "react";
import {  Link } from "react-router-dom";
import axios from 'axios';
import Header2 from '../../layout/Header2.js';
import Footer from '../../layout/Footer.js';
import '../../css/index.css';
import pointsImg from '../../images/Asset 3.png';
import myRewards from '../../images/MyRewards.png';
import accountNumber from '../../images/RewardsAccountNumber.png';
import pointBalance from '../../images/CurrentPointBalance.png';



import CouponLoader from '../../layout/CouponLoader.js';

import MyGlobleSetting from '../../layout/MyGlobleSetting';
import "react-datepicker/dist/react-datepicker.css";
import swal from 'sweetalert';

export default class points extends Component {
    constructor(props) {
 
        super(props)
     
        this.state = {
        tagNumber: null,
        flag:0,
        points:0,
        loading:false,
        }

        
       
    }    



 componentWillMount(){

    if(sessionStorage.getItem('data')){
    this.setState({loading:true});
    const customers = {
        eMail: sessionStorage.getItem('email'),
        tagNumber: sessionStorage.getItem('tagnumber'),
        }
          let uri = MyGlobleSetting.url + '/api/PointsBalance';
          axios.post(uri, customers).then((response) => {
            this.setState({ points: response.data.pointsbalance});
            this.setState({loading:false});
          }) 
          .catch(error => { if(error)
            {
              this.setState({loading:false});
              swal("Something wrong in network! please refresh the page..");
            }
        });

  }
  else{
    this.props.history.push("/login");
  }
        
 }


componentDidMount(){

let s=sessionStorage.getItem('data');
this.setState({
    tagNumber: sessionStorage.getItem('tagnumber')
})
this.setState({
    flag:sessionStorage.getItem('flag')
})
}


    render() {

      
           return (
            <div>

            <header>
            <Header2/>
            </header>
            

            {/* title and Horizontal line */}

            <main className="mb-5">
                {this.state.tagNumber == ''?
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
            <br/><br/>
            <div className="container-fluid">
            
                <div class="row rowbox">
                
                <div class="col-md-5 mb-5">
                {this.state.loading?<center><CouponLoader/></center>:
                
                
                <div className="mb-2">
                    
                <img src={myRewards} class="img-responsive col-md-12 col-12" alt="..."/>
                <img src={pointBalance} class="img-responsive col-md-12 col-12" alt="..."/>
                <center><p className="pointpage_text">{this.state.points}</p></center>
                <img src={accountNumber} class="img-responsive col-md-12 col-12" alt="..."/>
                <center><p className="pointpage_text1">{this.state.tagNumber}</p></center>

                {/* <div class="card-img-overlay d-flex align-items-center">
                    <p class="card-text   d-flex justify-content-center">{this.state.points}</p>
                </div> */}
                </div>
                
                }
                
        
                </div>
                
                <div class="col-md-6" style={{border:'2px solid black'}}>
                
            {/* points*/}

            
               <h4 className="mb-1 md-12" style={{textAlign: 'left',marginTop: '20px',color: '#43494d'}}>
                  <b>My Reward</b> 
               </h4>
               
               <hr className="mb-2" />
               <Link to="transactionhistory" className="header-link-points md-12 pull-right">
                <b>View Purchase History</b>
                </Link>
               

                <br/><br/>
                <div className='row'>
        
                    <ul>
                        <li>Earn 1 Rewards Point for each whole dollar that is spent (excluding tax). If your total is less than $1.00, then a point is not earned on that transaction.</li>
                        <li>You will receive a $5.00 Rewards Coupon for every 75 Rewards Points earned in the gift shop.</li>
                        <li>Sales tax is not included in your total spent balance, and any returns you make will be deducted.</li>
                        <li>Rewards Points are not earned for purchases of service items such as gift certificates, stamps, movie tickets, tokens, metro cards, parking tickets, or on Vendor Shows.</li>
                        <li>Rewards Points are not earned on magazines, newspapers, paperback novels or tobacco products.</li>
                        <li><b>Rewards Coupons will be sent within 2 days after 75 Rewards Points are earned.</b></li>
                    </ul>
                </div>

                <Link to="transactionhistory" className='footer-link-points mb-4'><b>View Purchase History</b></Link>    

            </div>
               
                
             {/* instruction/ details*/}

                
                </div>
                </div>
           
            </main>

            <footer>
            <Footer/>
            </footer>
            
        </div>
            
        );
       }
    }
// }