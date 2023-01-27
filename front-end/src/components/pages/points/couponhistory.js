import React from 'react'
import axios from 'axios';
import Barcode  from 'react-barcode';
import Header2 from '../../layout/Header2.js';
import { Link } from 'react-router-dom';
import 'react-tabs/style/react-tabs.css';
import swal from 'sweetalert';
import Moment from 'moment';

import Footer from '../../layout/Footer.js';
import '../../css/couponhistory.css';
import BdayCoupon from '../../images/BdayCoupon.png';
import coupon2 from '../../images/coupon2.png';
import MyGlobleSetting from '../../layout/MyGlobleSetting';
import CouponLoader from '../../layout/CouponLoader.js';


 
class couponhistory extends React.Component {
    constructor(props) {
 
        super(props)
     
        this.state = {
     
            tagnumber: null,
            flag:0,
            tablerows: [],
            specialrows: [],
            records: [],
            selectedValue:'available',
            loading:false,
            avlCoupons:true,
            expCoupons:true,
            usdCoupons:true,
            statusMsg: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.generateTableData = this.generateTableData.bind(this);
        this.generateTableSplData = this.generateTableSplData.bind(this);

    }
    
    // componentWillMount(){
    //     if(sessionStorage.getItem('data')){
    //       const customers = 
    //       {
    //           tagNumber: sessionStorage.getItem('tagnumber'),
    //       }
    //     if(sessionStorage.getItem('tagnumber'))
    //     {
    //         this.setState({loading:true});
    //         let uri = MyGlobleSetting.url + '/api/CouponHistory';
    //             axios.post(uri, customers).then((response) => {
    //                 this.setState({ tablerows: response.data.coupons });
    //                 this.setState({loading:false});
    //             }) .catch(error => { if(error)
    //                 {
    //                   this.setState({loading:false});
    //                   swal("Something wrong in network! please refresh the page..");
    //                 }
    //             } );
    //     }
        
            
      
    //     }
    //     else{
    //       this.props.history.push("/login");
    //     }
              
    //    }
      
      
    
    componentDidMount()
    {
        // this.state.specialrows=[];
        this.state.avlCoupons = true;
        this.state.expCoupons = true;
        this.state.usdCoupons = true;
        if(sessionStorage.getItem('data')){
            const customers = 
            {
                tagNumber: sessionStorage.getItem('tagnumber'),
            }
            const specialCust =
            {
                Customer_ID: sessionStorage.getItem('tagnumber'),
            }
          if(sessionStorage.getItem('tagnumber'))
          {
              this.state.statusMsg = 'Fetching Coupons';
              this.setState({loading:true});
              let uri = MyGlobleSetting.url + '/api/CouponHistory';
                  axios.post(uri, customers).then((response) => {
                      this.setState({ tablerows: response.data.coupons })
               
                      this.setState({loading:false});
                  }) .catch(error => { if(error)
                      {
                        this.setState({loading:false});
                        swal("Something wrong in network! please refresh the page..");
                      }
                  } );

                let uri1 = MyGlobleSetting.url + '/api/SpecialCouponHistory';
                axios.post(uri1, specialCust).then((response) => {
                   
                    this.setState({ specialrows: response.data.coupons })
                     
                    this.setState({loading:false});
                }) .catch(error => { if(error)
                    {
                    this.setState({loading:false});
                    swal("Something wrong in network! please refresh the page..");
                    }
                } );

          }
          
          this.setState({
            tag:sessionStorage.getItem('tagnumber')
        })
        this.setState({
         flag:sessionStorage.getItem('flag')
         })
              
        
          }
          else{
            this.props.history.push("/login");
          }
      
    }

    handleChange(event) {
        this.setState({selectedValue: event.target.value});
    }

    handleClick(e) {
        if(e==0)
        {
            this.setState({selectedValue: 'available'});   
        }
        if(e==1)
        {
            this.setState({selectedValue: 'used'});   
        }
        if(e==2)
        {
            this.setState({selectedValue: 'expired'});   
        }
      }

    redeem(code){
     
  
      const toRedeem = 
      {
          ref: code,
      }
      this.setState({loading:true});
      let uri = MyGlobleSetting.url + '/api/redeemSplCoupon';
            axios.post(uri, toRedeem).then((rdm_response) => {
            //   this.setState({ tablerows: response.data.coupons })
            this.state.specialrows=[];
            this.setState({loading:false});
            
            if(rdm_response.data.status == 'success')
            {
                this.componentDidMount();
                swal("Thank you! Your Coupon is Redeemed");
            }
            else
            {
                this.setState({loading:false});
                swal("Something wrong in network! please refresh the page..");
            }
    
          }) .catch(error => { if(error)
              {
                this.setState({loading:false});
                swal("Something wrong in network! please refresh the page..");
              }
          } );

      }
    
    
    generateTableData(){
        let res1=[];
        let data=[];
        let sdata=[];
        let selectedValue='';
        data=this.state.tablerows;
        sdata=this.state.specialrows;
        selectedValue=this.state.selectedValue;
        var CurrentDate = new Date();
        this.state.noCoupons = false;
        
        
        
        // if (data.length == 0)
        // {
        //     // this.state.statusMsg = '';
        // } 
        
        for (var i=0; i<data.length; i++){
            // this.state.statusMsg = '';

          var tran_date=Moment(data[i].ExpirationDate).format('YYYY-MM-DD');
        //   var tran_date=Moment(data[i].ExpirationDate.format('YYYY-MM-DD HH:MM:SS'));
        
          var GivenDate = new Date(tran_date);
          var copuon_balance=Math.trunc(data[i].GiftCertificate_Amt);

         
            //available
            if(selectedValue=='available' && data[i].Redeemed=='N' && GivenDate>CurrentDate)
            {
                this.state.avlCoupons = false;
                //findout the balance days
                let balancedate=GivenDate-CurrentDate;
                const oneDay = 1000 * 60 * 60 * 24;
                balancedate=Math.round(Math.abs((balancedate) / oneDay));

                if (res1.length == 0)
                {
                    res1.push(
                        <div className="row col-md-12">
                            <left>
                                <p class="card-text2 leftalign col-md-12"><b>Coupons from Points</b></p>
                            </left>
                        </div>
                        )
                }

                res1.push(
                    
                    
                    <div class="col-md-5 my-5">
                    <div class="card1 couponcard1">
                    <center>
                    <h6 class="col-8 col-sm-8 col-md-8">Expires in {balancedate?balancedate:0} days</h6>
                    </center>    
                           <div className="row">
                               <div className="col-3">
                                   <img class="couponimg" src={coupon2} alt="Card image cap" />
                               </div>
                               <div className="col-9">
                                   <div class="card-body">
                                       {/* <h5 class="card-title">Coupon</h5> */}
                                       <p ><b class="card-text">${copuon_balance} OFF</b></p>
                                       <p class="card-text1"><b>YOUR ENTIRE PURCHASE</b></p>
                                   </div>
                               </div>

                           </div>


                               <div class="card-footer">
                                       {/* <small class="text-muted">Terms of use</small> */}
                                       <div className="table-responsive">
                                       <table className="table table-bordered table-sm" id="tableCoupon">
                                           <tr>
                                               <th>Member ID:</th>
                                               <th>Coupon Code</th>
                                               <th>Expiration Date</th>
                                           </tr>
                                           <tr>
                                               <td>{data[i].Customer_no?data[i].Customer_no:null}</td>
                                               <td>{data[i].GiftCertificate_no?data[i].GiftCertificate_no:null}</td>
                                               <td>{data[i].ExpirationDate?data[i].ExpirationDate.substring(0,10):null}</td>
                                           </tr>
                                       </table>
                                       
                                       </div>
                                      <center>
                                          <Barcode value={data[i].GiftCertificate_no}/>
                                          <br/>
                                          <Link to="termscondition" className="footer-link-coupon">TERMS OF USE</Link>
                                          
                                      </center>
                                   </div>
                                     
                   </div>  
               </div>
               


            )
                    
            }

            
            //used
            if(selectedValue=='used' && data[i].Redeemed=='Y')
            {
                this.state.usdCoupons = false;
                if (res1.length == 0)
                {
                    res1.push(
                        <div className="row col-md-12">
                            <left>
                                <p class="card-text2 leftalign col-md-12"><b>Coupons from Points</b></p>
                            </left>
                        </div>
                        )
                }
                res1.push(
                    
                   <div class="col-md-5 my-5">
                    <div class="card1 couponcard1">
                    <center>
                    <h6 class="col-8 col-sm-8 col-md-8">Redeemed on {data[i].RedeemedDate?data[i].RedeemedDate.substring(0,10):null}</h6>
                    </center>    
                           <div className="row">
                               <div className="col-3">
                                   <img class="couponimg" src={coupon2} alt="Card image cap" />
                               </div>
                               <div className="col-9">
                                   <div class="card-body">
                                       {/* <h5 class="card-title">Coupon</h5> */}
                                       <p ><b class="card-text">${copuon_balance} OFF</b></p>
                                       <p class="card-text1"><b>YOUR ENTIRE PURCHASE</b></p>
                                   </div>
                               </div>

                           </div>


                               <div class="card-footer">
                                       {/* <small class="text-muted">Terms of use</small> */}
                                       
                                       <table class="table table-bordered table-sm" id="tableCoupon">
                                           <tr>
                                               <th>Member ID:</th>
                                               <th>Coupon Code</th>
                                               <th>Expiration Date</th>
                                           </tr>
                                           <tr>
                                             <td>{data[i].Customer_no?data[i].Customer_no:null}</td>
                                             <td>{data[i].GiftCertificate_no?data[i].GiftCertificate_no:null}</td>
                                             <td>{data[i].ExpirationDate?data[i].ExpirationDate.substring(0,10):null}</td>
                                           </tr>
                                       </table>
                                      <center>
                                          <Link to="termscondition" className="footer-link-coupon">TERMS OF USE</Link>
                                      </center>
                                   </div>
                                   
                                   
                                   
                                   

                                     
                   </div>  
               </div>


            )

            

            }

            //expired
                        
            if(selectedValue=='expired' && data[i].Redeemed=='N' && GivenDate<CurrentDate)
            {
                this.state.expCoupons = false;
                if (res1.length == 0)
                {
                    res1.push(
                        <div className="row col-md-12">
                            <left>
                                <p class="card-text2 leftalign col-md-12"><b>Coupons from Points</b></p>
                            </left>
                        </div>
                        )
                }
                
                res1.push(
                    
                    <div class="col-md-5 my-5">
                    <div class="card1 couponcard1">
                    <center>
                    <h6 class="col-8 col-sm-8 col-md-8">Expired on {data[i].ExpirationDate?data[i].ExpirationDate.substring(0,10):null}</h6>
                    </center>    
                           <div className="row">
                               <div className="col-3">
                                   <img class="couponimg" src={coupon2} alt="Card image cap" />
                               </div>
                               <div className="col-9">
                                   <div class="card-body">
                                       {/* <h5 class="card-title">Coupon</h5> */}
                                       <p ><b class="card-text">${copuon_balance} OFF</b></p>
                                       <p class="card-text1"><b>YOUR ENTIRE PURCHASE</b></p>
                                   </div>
                               </div>

                           </div>


                               <div class="card-footer">
                                       {/* <small class="text-muted">Terms of use</small> */}
                                       
                                       <table class="table table-bordered table-sm" id="tableCoupon">
                                           <tr>
                                               <th>Member ID:</th>
                                               <th>Coupon Code</th>
                                           </tr>
                                           <tr>
                                                <td>{data[i].Customer_no?data[i].Customer_no:null}</td>
                                                <td>{data[i].GiftCertificate_no?data[i].GiftCertificate_no:null}</td>
                                           </tr>
                                       </table>
                                      <center>
                                          <Link to="termscondition" className="footer-link-coupon">TERMS OF USE</Link>
                                      </center>
                                   </div>
                                     
                   </div>  
               </div>


            )
            

            }

     }
     
     if(res1=='')
     {
         console.log('res1');
        //  console.log(sdata);
        // this.state.noCoupons = true;
        // res1.push(<p className="nodata">{this.state.statusMsg} </p>)
     
        //this.state.statusMsg = 'No Coupon Found';
     
       console.log(this.state.statusMsg);
    //  return <p className="nodata">No coupon found </p> ;
     }
     return res1;

    
    //  console.log(sdata);

          
      }
      generateTableSplData(){
        let res2=[];
        let data=[];
        let sdata=[];
        let selectedValue='';
        data=this.state.tablerows;
        sdata=this.state.specialrows;
        selectedValue=this.state.selectedValue;
        this.state.noSplCoupons = false;    
        //this.state.statusMsg = '';
        // this.state.statusMsg = '';
        
        var CurrentDate = new Date();
       
        if (sdata.length == 0)
        {
            // this.state.statusMsg = '';
        } 
        for (var i=0; i<sdata.length; i++){ 
  
            // this.state.statusMsg = '';
            
            var Start_date=Moment(sdata[i].StartDate).format('YYYY-MM-DD');
            var Exp_date=Moment(sdata[i].ExpirationDate).format('YYYY-MM-DD');
            Start_date = Start_date + ' 00:00';
            Exp_date = Exp_date + ' 23:59';
            var StartDate = new Date(Start_date);
            var ExpDate = new Date(Exp_date);
        
            //available
            if(selectedValue=='available' && sdata[i].Redeemed=='N' && StartDate <= CurrentDate && ExpDate >=CurrentDate)
            {
                this.state.avlCoupons = false;
                var splCouponID = sdata[i].ID;
                // console.log('fromLoop');
                // console.log(i);
                // console.log(splCouponID);
                // console.log(sdata[0].barcode);
                if (res2.length == 0)
                {
                    res2.push(
                        <div className="row col-md-12">
                            <left>
                                <p class="card-text2 leftalign col-md-12"><b>Special Coupons</b></p>
                            </left>
                        </div>
                        )
                }
    
                res2.push(
                    
                    
                    <div class="col-md-5 my-5">
                    <div class="card1 couponcard1">
                 
                           <div className="row">
                               <div className="col-12">
                                   <img class="bdaycouponimg" src={BdayCoupon} alt="Card image cap" />
                               </div>
                            
    
                           </div>
    
    
                               <div class="card-footer">
                                   
                               <div className="bdaybrcode">
                                      <center>
                                      <p class="bdaycardtext"><b>Print or show this coupon at any Lori's Gifts location</b></p>
                                          <Barcode value={sdata[i].barcode} className="bdaybrcode"/>
                                          <br/>
                                         
                                          
                                      </center>
                                      </div>
                                      < div>
                                       
                                       <table className="table table-bordered table-sm" id="tableCoupon">
                                           <tr>
                                               
                                               <td className="tableDataText"><b>Expires on:{sdata[i].ExpirationDate} This coupon may be redeemed for 1 20 oz beverageat Lori's Gifts. Limit one coupon per Customer/Account. Cannot be Transfered, Copied or Duplicated in any way. See more for additional details</b></td>
                                               <td><button type="button" class="btn btn-danger btn-sm" onClick={() => this.redeem(splCouponID)}>Click to Note as Redeemed</button></td>
                                               
                                           </tr>
                                        </table>
                                         
                                       </div>
                                   </div>
                   </div>  
               </div>
            )
                    
            }
            if(selectedValue=='used' && sdata[i].Redeemed=='Y' )
            {
                this.state.usdCoupons = false;
                if (res2.length == 0)
                {
                    res2.push(
                        <div className="row col-md-12">
                            <left>
                                <p class="card-text2 leftalign col-md-12"><b>Special Coupons</b></p>
                            </left>
                        </div>
                        )
                }
                res2.push(
                    
                    
                    <div class="col-md-5 my-5">
                    <div class="card1 couponcard1">
                    <center>
                <h6 class="col-8 col-sm-8 col-md-8">Redeemed On : {sdata[i].RedeemedDate}</h6>
                    </center>    
                           <div className="row">
                               <div className="col-12">
                                   <img class="bdaycouponimg" src={BdayCoupon} alt="Card image cap" />
                               </div>
                           </div>
                               <div class="card-footer">
                           
                                     <div className="bdaybrcode">
                                      <center>
                                      <p class="bdaycardtext"><b>{sdata[i].barcode}</b></p>
                                      </center>
                                      </div>
                                      < div>
                                       </div>
                                   </div>
                                     
                   </div>  
               </div>
               
    
    
    
    
            )
                    
            }
            if(selectedValue=='expired' && sdata[i].Redeemed=='N' && ExpDate < CurrentDate)
            {
                
                // console.log(sdata[0].barcode);
                this.state.expCoupons = false;
                if (res2.length == 0)
                {
                    res2.push(
                        <div className="row col-md-12">
                            <left>
                                <p class="card-text2 leftalign col-md-12"><b>Special Coupons</b></p>
                            </left>
                        </div>
                        )
                }
    
    
                res2.push(
                    
                    
                    <div class="col-md-5 my-5">
                    <div class="card1 couponcard1">
                    <center>
                    <h6 class="col-8 col-sm-8 col-md-8">Expired on: {sdata[i].ExpirationDate}</h6>
                    </center>    
                           <div className="row">
                               <div className="col-12">
                                   <img class="bdaycouponimg" src={BdayCoupon} alt="Card image cap" />
                               </div>
                               {/* <div className="col-9">
                                   <div class="card-body">
                                       <h5 class="card-title">Coupon</h5>
                                       <p ><b class="card-text"> OFF</b></p>
                                       <p class="card-text1"><b>YOUR ENTIRE PURCHASE</b></p>
                                   </div>
                               </div> */}
    
                           </div>
    
    
                               <div class="card-footer">
                                       {/* <small class="text-muted">Terms of use</small> */}
                                       {/* <div className="table-responsive">
                                       <table className="table table-bordered table-sm" id="tableCoupon">
                                           <tr>
                                               <th>Coupon ID:</th>
                                               <th>Coupon Type</th>
                                               <th>Bsrcode</th>
                                           </tr>
                                           <tr>
                                                 <td>{sdata[i].ID?sdata[i].ID:""}</td> 
                                               <td>{sdata[i].CouponType?sdata[i].CouponType:""}</td>
                                               <td>{sdata[i].barcode?sdata[i].barcode:""}</td>
                                           </tr>
                                       </table>
                                       
                                       </div> */}
                                    <div className="bdaybrcode">
                                      <center>
                                      <p class="bdaycardtext"><b>{sdata[i].barcode}</b></p>
                                          {/* <Barcode value={sdata[i].barcode} /> */}
                                          <br/>
                                         
                                          
                                      </center>
                                      </div>
                                      < div>
                                       
                                                                              
                                       </div>
                                   </div>
                                     
                   </div>  
               </div>
               
    
    
            )
                    
            }
    
            
            //used
                       
                        
            
    
     }
            
         
         if(res2=='')
         {
            // console.log(this.state.statusMsg);
            //  console.log(sdata);
            console.log('res2');
            //this.state.statusMsg = 'No Coupon Found';
            // this.state.statusMsg = 'No Coupon Found';
            
            
            //res2.push(<p className="nodata">{this.state.statusMsg} </p>)
            
            // this.state.noSplCoupons = true;
        //  return <p className="nodata">No coupon found </p>
         }
         console.log(this.state.statusMsg + 'spl');
         console.log('end');
         return res2;

      }
    //   noCouponFound()
    //   {
    //     this.state.statusMsg = '';
    //     if (this.state.noCoupons && this.state.noSplCoupons)
    //     {
    //         this.state.statusMsg = 'No Coupons Found';
    //         return <p className="nodata">{this.state.statusMsg} </p>;
    //     }
    //     return <p className="nodata">{this.state.statusMsg} </p>;
    //   }



    render() {

        const { tablerows } = this.state;

        return(
            <div id="wrapper">
                <header>
                <Header2 />
                </header>
                {this.state.tagnumber == ''?
                <div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>Action required:</strong> You need to verify your tag number
                     &nbsp;<a href="VerifyTag" class="alert-link">Click here</a>&nbsp;to verify.
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>:
            <div/>
                }
                      {this.state.flag == '0'?
             <div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>Action required:</strong> You have not updated your account details
             &nbsp;<a href="account" class="alert-link">Click here</a>&nbsp;to update.
             <button type="button" class="close" data-dismiss="alert" aria-label="Close">
             <span aria-hidden="true">&times;</span>
            </button>
            </div>:<div/>
                }

            <main>

                <div id="content">

                    <div className="container">
                        <h4 className="mb-1" style={{ textAlign: 'left', marginTop: '20px', color: '#43494d' }}>
                            <b>Coupon History - Last 12 Months</b>
                        </h4>
                        
                        <hr className="mb-4" />

    </div>

            </div>

            <div class="container">
              <div class="row justify-content-center">
                <div class="col-md-12 col-xs-12">
                  <nav>
                    <div class="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                      <a class="nav-item nav-link active" onClick={() => this.handleClick(0)} id="nav-home-tab" data-toggle="tab" href="#nav-available" role="tab" aria-controls="nav-home" aria-selected="true"><b>Available</b></a>
                      <a class="nav-item nav-link" onClick={() => this.handleClick(1)} id="nav-profile-tab" data-toggle="tab" href="#nav-used" role="tab" aria-controls="nav-profile" aria-selected="false"><b>Used</b></a>
                      <a class="nav-item nav-link" onClick={() => this.handleClick(2)} id="nav-contact-tab" data-toggle="tab" href="#nav-expired" role="tab" aria-controls="nav-contact" aria-selected="false"><b>Expired</b></a>
                    </div>
                  </nav>


                    <div class="tab-content py-3 px-3 px-sm-0" id="nav-tabContent">
                        <div class="tab-pane fade show active" id="nav-available" role="tabpanel" aria-labelledby="nav-home-tab">
                           
                            <div className="row justify-content-center">                          
                                {this.state.loading?<CouponLoader/>:this.generateTableSplData()}                              
                            </div>
                          
                            <div className="row justify-content-center">
                                {this.generateTableData()}
                            </div>
                            <div className="row justify-content-center">
                                <p className="nodata">
                                    {this.state.avlCoupons ? 'No Coupons Found': ''}
                                </p>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="nav-used" role="tabpanel" aria-labelledby="nav-profile-tab">
                        
                        
                        <div className="row justify-content-center">
                            {this.state.loading?<CouponLoader/>:this.generateTableSplData()}
                        </div>
                       
                        <div className="row justify-content-center">
                            {this.state.loading?<CouponLoader/>:this.generateTableData()}
                        </div>
                        <div className="row justify-content-center">
                            <p className="nodata">
                                {this.state.usdCoupons ? 'No Coupons Found': ''}
                            </p>
                        </div>
                    </div>

                    
                    <div class="tab-pane fade" id="nav-expired" role="tabpanel" aria-labelledby="nav-contact-tab">
                        
                        
                        <div className="row justify-content-center">
                            {this.state.loading?<CouponLoader/>:this.generateTableSplData()}
                        </div>
                      
                        <div className="row justify-content-center">
                            {this.state.loading?<CouponLoader/>:this.generateTableData()}
                        </div>
                        <div className="row justify-content-center">
                            <p className="nodata">
                                {this.state.expCoupons ? 'No Coupons Found': ''}
                            </p>
                        </div>

                     
                    </div>
                  </div>
                
                </div>
              </div>
        </div>
      


    

                <div className="py-4"></div><div className="py-5"></div>
                <br/><br/><br/><br/><br/>
                </main>

                <footer>
                    <Footer />
                </footer>
                
            </div>
        );
                    }
  
}
export default couponhistory