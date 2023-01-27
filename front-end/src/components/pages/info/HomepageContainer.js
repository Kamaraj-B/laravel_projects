import React, { Component } from 'react'
import { Link,Redirect } from 'react-router-dom';

 import rewards from '../../images/rewards.jpg';

 import shopearn from '../../images/Asset 10.png';
 import coupon from '../../images/Asset 11.png';
 import specialPromotion from '../../images/Asset 12.png';
 import rewardsWork from '../../images/Asset 13.png';
 import existUser from '../../images/Asset 15.png';
 import newUser from '../../images/Asset 20.png';
 

class HomepageContainer extends Component
{

    render()
    {
    return(
        <div class="container">
     
    <br/><br/>
    <div class="text-center">
      <Link to="/signup">
      <img class="img-responsive col-md-4 col-6" src={newUser} alt="newUser"/>
      </Link>
    {/* <a href="login">
      <img class="img-responsive col-md-4 col-6" src={existUser} alt="existUser"/>
      </a> */}

      <Link to="/login">
      <img class="img-responsive col-md-4 col-6" src={existUser} alt="existUser"/>
      </Link>
    </div>
    
    <br/><br/>
        <div class="row">
        
        <div className="col-md-3 col-8">
        {/* <a href="signup">
        <img class="img-thumbnail" src={shopearn} alt="shopearn"/>
        </a> */}
        <Link to="/signup"> 
        <img class="img-thumbnail" src={shopearn} alt="shopearn"/>
        </Link>

        </div>
        <div className="col-md-3 col-8">
        
        {/* <a href="signup">
        <img class="img-thumbnail" src={coupon} alt="coupon"/>
        </a> */}

        <Link to="/signup"> 
        <img class="img-thumbnail" src={coupon} alt="coupon"/>
        </Link>


        </div>
        <div className="col-md-3 col-8 text-center">

        {/* <a href="signup">
        <img class="img-thumbnail" src={specialPromotion} alt="specialPromotion"/>
        </a> */}

        <Link  to="/signup"> 
        <img class="img-thumbnail" src={specialPromotion} alt="specialPromotion"/>
        </Link>

        </div>
        <div className="col-md-3 col-8">

        {/* <a href="rewardsReview">
        <img class="img-thumbnail" src={rewardsWork} alt="rewardsWork"/>
        </a> */}

        <Link  to="/rewardsReview"> 
        <img class="img-thumbnail" src={rewardsWork} alt="rewardsWork"/>
        </Link>

        </div>
        
    </div>
    <br/><br/>
        
        
    
      </div>
   
        
    )}
}

export default HomepageContainer;