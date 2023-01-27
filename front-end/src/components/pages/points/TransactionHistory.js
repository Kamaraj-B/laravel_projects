import React, { Component } from "react";
import {  Link } from "react-router-dom";
import axios from 'axios';
import Login from '../register&login/Login';
import Header2 from '../../layout/Header2.js';
import Footer from '../../layout/Footer.js';
import '../../css/index.css';
import '../../css/couponhistory.css';
import celeb from '../../images/celeb.png';
import TableLoader from '../../layout/TableLoader';
import MyGlobleSetting from '../../layout/MyGlobleSetting';
import DatePicker from "react-datepicker";
import $ from 'jquery';
//import 'jquery/dist/jquery-ui.js';
// import "react-datepicker/dist/react-datepicker.css";
import swal from "sweetalert";
import Moment from 'moment';

export default class points extends Component {
    constructor(props) {
 
        super(props)
     
        this.state = {
        tagnumber: null,
        flag:0,
        points:0,
        tablerows: [],
        StartDate:'',
        EndDate:'',
        SelectedOption:'6',
        custom:false,
        alert_message:'',
        isAlert:true,
        loading:false,
        startDate: new Date(),
        endDate: new Date()
        }

        this.TransactionHistory = this.TransactionHistory.bind(this);
        this.StartDate = this.StartDate.bind(this);
        this.EndDate = this.EndDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }    

   

    StartDate(event)
    {
      this.setState({
            StartDate: event.target.value
          });
        $( "#StartDate" ).datepicker();
    }

    EndDate(event)
    {
      this.setState({
            EndDate: event.target.value
          });
          $( "#EndDate" ).datepicker();  
    }
    
 componentWillMount(){
  
  if(sessionStorage.getItem('data')){
    const customers = {
        eMail: sessionStorage.getItem('eMail'),
        tagNumber: sessionStorage.getItem('tagnumber'),
        }
        this.setState({loading:true});
          let uri = MyGlobleSetting.url + '/api/getallTransactionHistory';
            axios.post(uri, customers).then((response) => {
                this.setState({ points: response.data.data});
                this.setState({ tablerows: response.data.transaction});
                this.setState({loading:false});
            })
              .catch(error => { if(error)
                  {
                    this.setState({loading:false});
                    swal("Something wrong in network! please refresh the page..");
                  }
              } );
          
          // .catch(function (error) {
          //   if(error)
          //             {
          //               this.setState({alert_message:"error"});
          //               this.setState({loading:false});
          //             }
          // });

  }
  else{
    this.props.history.push("/login");
  }
        
 }

componentDidMount()
{
  $( "#StartDate" ).datepicker();
  $( "#EndDate" ).datepicker();  
this.setState({
  tagnumber: sessionStorage.getItem('tagnumber')
})
this.setState({
    flag:sessionStorage.getItem('flag')
})
}

handleChange(event) {
  this.setState({SelectedOption: event.target.value});
  if(event.target.value==0)
  {
    this.setState({custom: true});
  }
  else
  {
    this.setState({custom: false});
  }
}


    onSubmit(e){
        e.preventDefault();
        let Month='';
        
        var startDate = new Date($('#StartDate').val());
        var endDate   = new Date($('#EndDate').val());

        
        if(this.state.SelectedOption==0)
        {
          if($('#StartDate').val()=='')
          {
            $('#error_date').text("Please choose start date").css('color','red');
            return false;
          }

          if($('#EndDate').val()=='')
          {
            $('#error_date').text("Please choose end date").css('color','red');
            return false;
          }
        }
        $('#error_date').text("");
        
        if(startDate.getTime() >= endDate.getTime())
        {
          $('#error_date').text("StartDate greater than Enddate").css('color','red');
          return false;
        }

        $('#error_date').text("");
        
        const customers = {
          StartDate :$('#StartDate').val(),
          EndDate: $('#EndDate').val(),
          tagNumber:this.state.tagnumber,
          Month:this.state.SelectedOption,
        }



        if(sessionStorage.getItem('tagnumber'))
        {
          
                   this.setState({loading:true})
                   this.setState({isAlert:false})
                  let uri = MyGlobleSetting.url + '/api/TransactionHistory';
                  axios.post(uri, customers).then((response) => {
                  if(response.error)
                    {
                      alert("error");
                    }
                    this.setState({ tablerows: response.data.transaction});
                    this.setState({loading:false})
                    console.log(response);
                    
                  })
                  .catch(error => { if(error)
                    {
                      this.setState({loading:false});
                      swal("Something wrong in network! please refresh the page..");
                    }
                } );
                }
                else
                {
                  swal("Please add TagNumber");
                }
      }
     
 
TransactionHistory()
{
    let records=this.state.tablerows;
    return <tbody>
    {
     (records!='')?records.map(data => (
      <tr>
        <td>{data.StoreNum}</td>
        <td>{data.hospitalname}</td>
        <td>{data.RegisterNum+'-'+data.BatchNum+'-'+data.TransNum}</td>
        <td>{Moment(data.TranDate.substring(0,10)).format('MM-DD-YYYY')}</td>
        <td>{parseFloat(data.TtlSales).toFixed(2)}</td>
        <td>{parseFloat(data.QualSales).toFixed(2)}</td>
        <td>{parseFloat(data.QualifiedPoints).toFixed(2)}</td>
      </tr>
    
    )):<tr><td colSpan="7"><center>No data</center></td></tr>
    
    }
    </tbody>
 
}



    render() {


       
           return (
            <div>

            <header>
            <Header2/>
            </header>
            

            {/* title and Horizontal line */}

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

            
  
            <div className="container">
                <h4 className="mb-1" style={{textAlign: 'left',marginTop: '20px',color: '#43494d'}}>
                  <b>Purchase History</b>
               </h4>
                <hr className="mb-4" />

    <form onSubmit={this.onSubmit}>
        <div class="row">
            
            <div className="col-md-3 sm-3">
            <div className="form-group">
            <label  class="label">Filter by</label>
               <select class="form-control" value={this.state.SelectedOption} onChange={this.handleChange}>
                <option value="1">Last 1 Month</option>
                <option value="3">Last 3 Month</option>
                <option value="6">Last 6 Month</option>
                <option value="12">Last 1 year</option>
                <option value="0">Custom Date Range</option>
               </select>
               </div>
            </div>
          
          {this.state.custom?
          <div className="col-md-3 sm-3">
              <div className="form-group">
                <label class="label">Start Date</label>
                <input type="text" id="StartDate" autoComplete="off" readonly='true' placeholder="mm/dd/yyyy" 
                className="form-control" onFocus={this.StartDate} onSelect={this.StartDate} />
                <span id="error_date"/>
                {/* <DatePicker
                  selected={this.state.startDate}
                  onChange={this.handleChange1}
                  dateFormat="MM/dd/yyyy"
                  className="form-control"
                /> */}

                </div>
            </div>
            :null}

            {this.state.custom?
            <div className="col-md-3 sm-3">
            <div className="form-group">
                <label  class="label">End Date</label>
                {/* <DatePicker
                  selected={this.state.endDate}
                  onChange={this.handleChange2}
                  dateFormat="MM/dd/yyyy" 
                  className="form-control"
                /> */}

              <input type="text" id="EndDate" readonly='true' autoComplete="off" 
              className="form-control" placeholder="mm/dd/yyyy" onSelect={this.EndDate} onFocus={this.EndDate}/>

                </div>
            </div>
            :null}

          <div className="col-md-3 sm-3">
            <center>
            <button type="submit" id="submitButton" className="btn btn-primary signin">Go</button>
            </center>
            </div>
        </div>
        <br/>
       
        </form>
                
<div className="table-responsive">
<table  className="table table-bordered table-striped">
    <thead>
    <tr>
        <td>Store Number</td>
        <td>Store Name</td>
        <td>Transaction No</td>
        <td>Transaction Date</td>
        <td>Tax Sales (pre-tax)</td>
        <td>Sales Towards Rewards Points</td>
        <td>Rewards Points Earned</td>
    </tr>
    </thead>
    
    {this.state.loading?<tbody><tr><td colSpan="9"><TableLoader /></td></tr></tbody>:this.TransactionHistory()}

    
    </table>
    </div>
                
            </div>

          {/* <div className="container-fluid">
            {this.TransactionHistory()}
            </div> */}

            </main>
            <br/><br/><br/><br/><br/><br/><br/>
            <footer>
            <Footer/>
            </footer>
          
        </div>
            
        );
       }
    }
// }