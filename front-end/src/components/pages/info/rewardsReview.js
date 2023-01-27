import React from 'react'
import '../../css/index.css';
import {Link} from "react-router-dom";
import Header from '../../layout/Header.js';
import Footer from '../../layout/Footer';


class rerwardsReview extends React.Component {
  render() {
    return (
      
      <div>
        <header>
        <Header/>
        </header>
        <main>
<div className='container'>

<h4 className="mb-1" style={{textAlign: 'left',marginTop: '20px',color: '#43494d'}}>
                  <b>Rewards review</b>
    </h4>
    
    <hr className="mb-4" />
<p style={{textAlign: 'left',paddingRight:"19%",fontSize: '28px',color:'#43494d'}}>The Gift Shop Reward  Program</p>
    <div className='row' style={{textAlign: 'left', marginLeft:"0%"}}>
    <p>The more you shop, the more <b>FREE</b> product you can earn in the gift shop! AND since we know you #love2shophere, we will be emailing you special sales, promotions and even a few special discounts exclusive only to our very best customers enrolled in Lori’s Rewards! </p>
       
    <p>Here are the Rewards Program details:</p>
    
    <p>All facility employees, hospital volunteers, patients, guests and other frequent shoppers are invited to enroll in Lori’s Rewards. As a Rewards Member, you will be given a key tag containing a unique barcoded number. When making a purchase, present the key tag to the Lori’s Team member in the gift shop to scan into the cash register. You will earn 1 point for every full dollar spent before sales tax on all purchases (excludes service items such as movie tickets, gift cards, transportation tokens and stamps). Points from the new purchase will be added to your account the next day.  </p>

   <p>Once you accumulate 75 points, a $5 Rewards Coupon will be automatically emailed to you by the next day. Balances over 75 points remain in your account until the next 75 points are accumulated. Simply print out the coupon or show the Lori’s Team Member the coupon number on your mobile device for redemption. Reward members can check their Lori’s Rewards point balance and access any available coupons anytime by visiting, <Link to="/" style={{color:"#007bff",fontWeight:"bold",textDecoration:"underline"}}>www.lorisheroes.com</Link>.</p>

   <p>To get started, register your key tag number provided by the Lori’s Team Member here: <Link to="/signup" style={{color:"#007bff",fontWeight:"bold",textDecoration:"underline"}}>Sign Up Now</Link>.</p>
  
    
   <p>If you have any questions, please email us at <a href="" style={{color:"#007bff",fontWeight:"bold",textDecoration:"underline"}}>rewardssupervisor@lorisgifts.com</a> or contact us 888-609-8857, opt 1 and then opt 2. Our help desk will be happy to answer your questions Monday through Friday, 8 a.m. – 5 p.m. CST.</p>
    <p>
    <Link to="/termscondition" style={{color:"#007bff",fontWeight:"bold",textDecoration:"underline"}}>Click Here</Link> to view all <Link to="/termscondition" style={{color:"#007bff",fontWeight:"bold",textDecoration:"underline"}}>Terms & Condition</Link> of the of Lori’s Rewards.
    <br ></br>
    <p style={{marginTop:"6%"}}>Thank you for shopping with us,<br/>Lori's Gifts</p>
</p>

    </div>
   
  </div></main>

      <footer>
        <Footer/>
      </footer>
      </div>
      
    )
  }
}
export default rerwardsReview