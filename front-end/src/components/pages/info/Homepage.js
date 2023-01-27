import React, { Component } from 'react'
import Header from '../../layout/Header.js';
import Footer from '../../layout/Footer.js';
import '../../css/Homepage.css';
import HomepageContainer from './HomepageContainer.js';


class Homepage extends Component
{

  tagverify(){
    // this.props.history.push({
    //   pathname: '/loginwith',
    //   state: { detail: googleresponse }
    // });
  }

  userUpdate(){
    // this.props.history.push({
    //   pathname: '/signup',
    //   state: { detail: googleresponse }
    // });
  }

    render()
    {
    return(
      <div>
        <header>
        <Header/>
        </header>
      
        <main>
        <HomepageContainer/>
        </main>
        
        <footer>
        <Footer/>
        </footer>
        
        </div>
    )}
}

export default Homepage;