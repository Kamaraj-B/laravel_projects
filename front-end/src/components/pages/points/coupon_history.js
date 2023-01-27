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
import NewUserCoupon from '../../images/NewUserCoupon.png';
import coupon2 from '../../images/coupon2.png';
import MyGlobleSetting from '../../layout/MyGlobleSetting';
import CouponLoader from '../../layout/CouponLoader.js';


 
class coupon_history extends React.Component {
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
            statusMsg: '',
            ImageLink: MyGlobleSetting.imageURL,
        }

        this.handleChange = this.handleChange.bind(this);
        this.generateTableData = this.generateTableData.bind(this);
        this.generateTableSplData = this.generateTableSplData.bind(this);

    }
    
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
              let uri = MyGlobleSetting.url + '/api/CouponHistory';                                     //Fetch Reaward points Coupons
                  axios.post(uri, customers).then((response) => {
                      this.setState({ tablerows: response.data.coupons })                               
               
                      this.setState({loading:false});
                  }) .catch(error => { if(error)
                      {
                        this.setState({loading:false});
                        swal("Something wrong in network! please refresh the page..");
                      }
                  } );

                let uri1 = MyGlobleSetting.url + '/api/SpecialCouponHistory';                           //Fetch Special Coupons
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
        swal({
            title: "Please Confirm",
            text: "Click the Redeem button to proceed",
            icon: "info",
            buttons: [true, "Redeem"],
          })
          .then((isConfirmed) => {
            if (isConfirmed) {
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
          });
    
      }

      redeemGeneric(code){
        swal({
            title: "Please Confirm",
            text: "Click the Redeem button to proceed",
            icon: "info",
            buttons: [true, "Redeem"],
          })
          .then((isConfirmed) => {
            if (isConfirmed) {
                const toRedeem = 
                {
                 tag: sessionStorage.getItem('tagnumber'),
                 code: code
                }
                this.setState({loading:true});
                let uri = MyGlobleSetting.url + '/api/redeemGenericCoupon';
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
          });
    
      }
    
    
    
    generateTableData(){
        let res1=[];
        let data=[];
        let selectedValue='';
        data=this.state.tablerows;
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
                                          <Barcode  value={data[i].GiftCertificate_no }  width={1}/>
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
        let sdata=[];
        let selectedValue='';
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
        // for (var i=0; i<sdata.length; i++){ 
            sdata.map((val) => {
  
            // this.state.statusMsg = '';
            
            // var Start_date=Moment(val.StartDate).format('YYYY-MM-DD');
            // var Exp_date=Moment(val.ExpirationDate).format('YYYY-MM-DD');
            // Start_date = Start_date + ' 00:00';
            // Exp_date = Exp_date + ' 23:59';
            var StartDate = new Date(val.StartDate);
            var ExpDate = new Date(val.ExpirationDate);
            ExpDate.setDate(ExpDate.getDate() + 1);
            //available
            if(selectedValue=='available' && (val.Redeemed=='N' || val.Redeemed == null) && StartDate <= CurrentDate && ExpDate >=CurrentDate)
            {
               
                // && val.Redeemed=='N' && StartDate <= CurrentDate && ExpDate >=CurrentDate
                this.state.avlCoupons = false;
                
                // console.log('fromLoop');
                // console.log(i);
                // console.log(splCouponID);
                // console.log(sdata[0].barcode);
                if (res2.length == 0)
                {
                    res2.push(
                        <div className="row col-md-12">
                            <left>
                                <p class="card-text2 leftalign col-md-12"><b>Special Coupons/Promotions</b></p>
                            </left>
                        </div>
                        )
                }
                if (val.CouponCode == 'BD' && val.CouponType == 'Conditional')
                {
                    res2.push(

                        <div class="col-md-5 mt-5">
                        <div class="card1 couponcard1 h-100">
                            
                               <div className="row">
                                
                                   <div className="col-12">
                                       <img class="bdaycouponimg" src={BdayCoupon} alt="Card image cap" />
                                   </div>
                               </div>
                                   <div class="card-footer">
                                       
                                   <div className="bdaybrcode">
                                          <center>
                                          <p className="description">Expires on:{val.ExpirationDate} This coupon may be redeemed for 1 20 oz beverageat Lori's Gifts. Limit one coupon per Customer/Account. Cannot be Transfered, Copied or Duplicated in any way. See more for additional details</p>
                                            
                                            {/* <Barcode value={val.barcode} className="bdaybrcode"/> */}
                                           
                                          </center>
                                          </div>
                                          < div>
                                           <table className="table table-bordered table-sm reduce" id="tableCoupon">
                                               <tr>
                                                   <td className="tableDataTextNC"><center>{val.barcode != null ? <Barcode value={val.barcode} width={1}  className="bdaybrcode"/> : ''}</center></td>
                                                   
                                                   <td><button type="button" class="btn btn-danger btn-sm margtop" onClick={() => this.redeem(val.ID)}>Click to Note as Redeemed</button></td>
                                                   {/* {console.log(splCouponID)} */}
                                                   {console.log(val)}
                                                   
                                               </tr>
                                            </table>
                                             
                                           </div>
                                       </div>
                                       
                       </div>  
                   </div>
                )
                }
                if (val.CouponCode == 'NC' && val.CouponType == 'Conditional')
                {
                    res2.push(
                    
                    
                        <div class="col-md-5 mt-5">
                        <div class="card1 couponcard1 h-100">
                       
                               <div className="row">
                                   <div className="col-12">
                                       <img class="bdaycouponimg" src={NewUserCoupon} alt="Card image cap" />
                                   </div>
                                
        
                               </div>
        
        
                                   <div class="card-footer">
                                       
                                   <div className="bdaybrcode">
                                          <center>
                                          <p className="descriptionNC">Expires on:{val.ExpirationDate} This coupon may be redeemed for 1 free 20 oz and bag of chips or 2 free candy bars at Lori’s Gifts.  Limit one coupon per customer/account.  Cannot be transferred, copied or duplicated in any way.  See store for additional details.</p>
                                          
                                             
                                             
                                             
                                              
                                          </center>
                                          </div>
                                          < div>
                                           
                                           <table className="table table-bordered table-sm reduceNC" id="tableCoupon">
                                               <tr>
                                                   
                                                   <td className="tableDataTextNC">{val.barcode != "" ? <center><Barcode value={val.barcode} width={1} className="bdaybrcode"/></center> : ''}</td>
                                                   <td><button type="button" class="btn btn-danger btn-sm margtop" onClick={() => this.redeem(val.ID)}>Click to Note as Redeemed</button></td>
                                                   
                                               </tr>
                                            </table>
                                             
                                           </div>
                                       </div>
                                      
                       </div>  
                   </div>
                )
                } 

                if (val.CouponType == 'Generic' && val.IsRedeemable == 'N')
                {
                    res2.push(
                    
                    
                        <div class="col-md-5 mt-5">
                        
                        <div class="card1 couponcard1 h-100">
                        
                               <div className={val.barcode != "" && val.barcode != null ? "row" : "row h-100"}>
                                   <div className="col-12">
                                       <img class={val.barcode != "" && val.barcode != null ? "bdaycouponimg" : "bdaycouponimg h-100"} src={this.state.ImageLink + val.ImagePath}  alt="Card image cap" />
                                   </div>
                               </div>
                                 
                                    {val.barcode != "" && val.barcode != null ?
                                      <div class="card-footer">
                                   <div className="setHeight">
                                          <center>
                                         
                                              <br/>
                                              {val.barcode != "" && val.barcode != null ? <Barcode value={val.barcode} width={1} className="bdaybrcode"/> : <br/>}
                                              {/* <br/> */}

                                          </center>
                                          </div>
                                          </div> : '' }
                                         
                                       
                                       
                       </div>  
                   </div>
                )
                } 

                if (val.CouponType == 'Generic' && val.IsRedeemable == 'Y')
                {
                    res2.push(
                    
                    
                        <div class="col-md-5 mt-5">
                        <div class="card1 couponcard1 h-100">
                        
                               <div className="row">
                                   <div className="col-12">
                                       <img class="bdaycouponimg" src={this.state.ImageLink + val.ImagePath}  alt="Card image cap" />
                                   </div>
                               </div>
                                   <div class="card-footer">
                                       
                                   <div className="bdaybrcode">
                                          <center>
                        

                                          </center>
                                          </div>
                                          < div>
                                           <center>
                                           <table className="table table-bordered table-sm marg-top" id="tableCoupon">
                                               <tr>
                                                    {val.barcode != "" ? <td className="tableDataTextNC"><center><Barcode value={val.barcode}  width={1} className="bdaybrcode"/></center></td> : ''}
                                                   <td><center><button type="button" class={val.barcode != "" && val.barcode != null ? "btn btn-danger btn-sm margtop" : "btn btn-danger btn-lg"} onClick={() => this.redeemGeneric(val.CouponCode)}>Click to Note as Redeemed</button></center> </td>
                                                   
                                               </tr>
                                            </table>
                                            </center>  
                                           </div>
                                       </div>
                                      
                       </div>  
                   </div>
                )
                } 
    
                
                    
            }
            if(selectedValue=='used' && val.Redeemed=='Y')
            {
                this.state.usdCoupons = false;
                if (res2.length == 0)
                {
                    res2.push(
                        <div className="row col-md-12">
                            <left>
                                <p class="card-text2 leftalign col-md-12"><b>Special Coupons/Promotions</b></p>
                            </left>
                        </div>
                        )
                }
                if (val.CouponCode == 'BD')
                {
                    res2.push(
                    
                    
                        <div class="col-md-5 mt-5">
                        <div class="card1 couponcard1  h-100">
                        <center>
                    <h6 class="col-8 col-sm-8 col-md-8">Redeemed on {val.RedeemedDate}</h6>
                        </center>    
                               <div className="row">
                                   <div className="col-12">
                                       <img class="bdaycouponimg" src={BdayCoupon} alt="Card image cap" />
                                   </div>
                               </div>
                                   <div class="card-footer">
                               
                                         <div className="bdaybrcode">
                                          <center>
                                          {/* {isset(val.barcode) ? <p class="bdaycardtext"><b>{val.barcode}</b></p> : ''} */}
                                          {val.barcode != null ? <p class="bdaycardtext"><b>{val.barcode}</b></p> : ''}
                                          {/* <p class="bdaycardtext"><b>{val.barcode}</b></p> */}
                                          </center>
                                          </div>
                                          < div>
                                           </div>
                                       </div>          
                       </div>  
                   </div>
                )
                }
                if (val.CouponCode == 'NC')
                {
                    res2.push(
                    
                    
                        <div class="col-md-5 mt-5">
                        <div class="card1 couponcard1 h-100">
                        <center>
                    <h6 class="col-8 col-sm-8 col-md-8">Redeemed on {val.RedeemedDate}</h6>
                        </center>    
                               <div className="row">
                                   <div className="col-12">
                                       <img class="bdaycouponimg" src={NewUserCoupon} alt="Card image cap" />
                                   </div>
                               </div>
                                   <div class="card-footer">
                               
                                         <div className="bdaybrcode">
                                          <center>
                                          {val.barcode != null ? <p class="bdaycardtext"><b>{val.barcode}</b></p> : ''}
                                          {/* <p class="bdaycardtext"><b>{val.barcode}</b></p> */}
                                          </center>
                                          </div>
                                          < div>
                                           </div>
                                       </div>          
                       </div>  
                   </div>
                )
                }

                if (val.CouponType == 'Generic')
                {
                    res2.push(
                    
                    
                        <div class="col-md-5 mt-5">
                        <div class="card1 couponcard1 h-100">
                        <center>
                    <h6 class="col-8 col-sm-8 col-md-8">Redeemed on {val.RedeemedDate}</h6>
                        </center>    
                               <div className="row">
                                   <div className="col-12">
                                       <img class="bdaycouponimg" src={this.state.ImageLink + val.ImagePath} alt="Card image cap" />
                                   </div>
                               </div>
                                   <div class="card-footer">
                               
                                         <div className="bdaybrcode">
                                          <center>
                                          {val.barcode != null ? <p class="bdaycardtext"><b>{val.barcode}</b></p> : ''}
                                          {/* <p class="bdaycardtext"><b>{val.barcode}</b></p> */}
                                          </center>
                                          </div>
                                          < div>
                                           </div>
                                       </div>          
                       </div>  
                   </div>
                )
                }
                    
            }
            if(selectedValue=='expired' && val.Redeemed !='Y' && ExpDate < CurrentDate && val.ShowInExpired != 'N')
            {
                
                // console.log(sdata[0].barcode);
                this.state.expCoupons = false;
                if (res2.length == 0)
                {
                    res2.push(
                        <div className="row col-md-12">
                            <left>
                                <p class="card-text2 leftalign col-md-12"><b>Special Coupons/Promotions</b></p>
                            </left>
                        </div>
                        )
                }
                if (val.CouponCode == 'BD' && val.CouponType == 'Conditional')
                {
                    res2.push(
                    
                    
                        <div class="col-md-5 mt-5">
                        <div class="card1 couponcard1 h-100">
                        <center>
                        <h6 class="col-8 col-sm-8 col-md-8">Expired on {val.ExpirationDate}</h6>
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
                                        <div className="bdaybrcode">
                                          <center>
                                          {val.barcode != null ? <p class="bdaycardtext"><b>{val.barcode}</b></p> : ''}
                                          {/* <p class="bdaycardtext"><b>{val.barcode}</b></p> */}
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
                if (val.CouponCode == 'NC' && val.CouponType == 'Conditional')
                {
                    res2.push(
                    
                    
                        <div class="col-md-5 mt-5">
                        <div class="card1 couponcard1 h-100">
                        <center>
                        <h6 class="col-8 col-sm-8 col-md-8">Expired on {val.ExpirationDate}</h6>
                        </center>    
                               <div className="row">
                                   <div className="col-12">
                                       <img class="bdaycouponimg" src={NewUserCoupon} alt="Card image cap" />
                                   </div>
                               </div>
                                   <div class="card-footer">
                                        <div className="bdaybrcode">
                                          <center>
                                          {val.barcode != null ? <p class="bdaycardtext"><b>{val.barcode}</b></p> : ''}
                                          {/* <p class="bdaycardtext"><b>{val.barcode}</b></p>
                                              <br/> */}
                                          </center>
                                        </div>
                                    < div>                                     
                               </div>
                                       </div>
                       </div>  
                   </div>
                )
                }

                if (val.CouponType == 'Generic')
                {
                    res2.push(
                    
                    
                        <div class="col-md-5 mt-5">
                        <div class="card1 couponcard1 h-100">
                        <center>
                        <h6 class="col-8 col-sm-8 col-md-8">Expired on {val.ExpirationDate}</h6>
                        </center>    
                               <div className="row">
                                   <div className="col-12">
                                       <img class="bdaycouponimg" src={this.state.ImageLink + val.ImagePath} alt="Card image cap" />
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
                                        <div className="bdaybrcode">
                                          <center>
                                          {val.barcode != null ? <p class="bdaycardtext"><b>{val.barcode}</b></p> : ''}
                                          {/* <p class="bdaycardtext"><b>{val.barcode}</b></p>
                                              <br/> */}
                                          </center>
                                          </div>
                                          < div>                                     
                                           </div>
                                       </div>
                       </div>  
                   </div>
                )
                }
    
                
            }
     });
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




    render() {

      

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
                            <b>Coupons/Promotions - Last 12 Months</b>
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
                           
                            <div className="row display-flex justify-content-center">                          
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
export default coupon_history