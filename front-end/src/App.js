import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'


import Home from './components/pages/info/Homepage';
import SuccessRegistration from './components/pages/register&login/SuccessRegistration';
import Termscondition from './components/pages/info/Termscondition';
import forgotpassword from './components/pages/register&login/forgotpassword';
import updatepassword from './components/pages/register&login/updatepassword';
import Contactus from './components/pages/info/Contactus';
import Account from './components/pages/register&login/accountDetails';
import Login from './components/pages/register&login/Login';
import VerifyeMail from './components/pages/register&login/VerifyeMail';
import transferpoints from './components/pages/points/transferpoints';
import coupon_history from "./components/pages/points/coupon_history";
import points from "./components/pages/points/points";
import TransactionHistory from "./components/pages/points/TransactionHistory";
import rewardsReview from "./components/pages/info/rewardsReview";

import Signup from './components/pages/register&login/Signup';
import loginwith from './components/pages/register&login/loginwith';
import forgotUsername from './components/pages/register&login/forgotUsername';
import changePassword from './components/pages/register&login/changePassword';


function App() {
  return (
    <div className="App">
     
     <Router>
        <div>
        <Switch> 
            <Route exact path='/' component={Home} />
            <Route path='/verifyeMail' component={VerifyeMail} />
            <Route path='/termscondition' component={Termscondition} />
            <Route path='/contactus' component={Contactus} />
            <Route path='/account' component={Account} /> 
            <Route path='/login' component={Login} />
            <Route path='/SuccessRegistration' component={SuccessRegistration} />
            <Route path='/couponhistory' component={coupon_history} />
            <Route path='/transferpoints' component={transferpoints} />
            <Route path='/transactionhistory' component={TransactionHistory} />
            <Route path='/changePassword' component={changePassword} />
            <Route path='/points' component={points} />
            <Route path='/rewardsReview' component={rewardsReview} />
            <Route path='/signup' component={Signup} />
            <Route path='/loginwith' component={loginwith} />
            <Route path='/forgotpassword' component={forgotpassword} />
            <Route path='/updatepassword/:token/:email' component={updatepassword} />
            
            <Route path='/forgotusername' component={forgotUsername} />
          </Switch> 
        </div>
        </Router>

    </div>
  );
}

export default App;
