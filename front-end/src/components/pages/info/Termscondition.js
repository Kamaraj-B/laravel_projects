import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Header from '../../layout/Header.js';
import Header2 from '../../layout/Header2.js';
import Footer from '../../layout/Footer.js';
import '../../css/index.css';


class termscondition extends Component {

  componentWillMount() {
    if (sessionStorage.getItem('data')) {
      this.props.history.push("/termscondition");
    }
    else if (sessionStorage.getItem('isInfo')) {
      sessionStorage.setItem('isInfo', '')
      this.props.history.push("/login");
    }
    else {
      this.props.history.push("/termscondition");
    }

  }

  render() {
    return (
      <div>
        <header>
          {sessionStorage.getItem('data') ? <Header2 /> : <Header />}
        </header>
        <main>
          <div className='container'>
            <h4 className="mb-1" style={{ textAlign: 'left', marginTop: '20px', color: '#43494d' }}>
              <b>Lori’s Gifts Rewards
                Program Terms &amp; Conditions</b>
            </h4>
            <hr className="mb-4" />
            <div className='row' style={{ textAlign: 'left', marginLeft: '0%' }}>
              <p className='termsHeading'><b><span>General </span></b></p>
              <p><span >Welcome
                to the Lori’s Gifts Rewards Program! These Terms &amp; Conditions (“Terms”)
                apply to your participation in the Rewards Program. The Rewards Program is
                operated by Lori’s Gifts, Inc. (“Lori’s Gifts”).</span></p>
              <p style={{ color: 'rgb(67, 73, 77)' }}><b><span >Please
                read these Terms &amp; Conditions carefully</span></b><span >. <b>Several provisions in these Terms
                  &amp; Conditions affect your legal rights. By participating in the Rewards
                  Program, you agree that you have read, understand, and agree to be bound by the
                  terms and conditions described herein and all terms and conditions incorporated
                  by reference.</b> <b>If you do not agree to all of these terms and conditions,
                    do not participate in the Rewards Program.</b> </span></p>
              <p><span >If
                at any time you do not agree to these Terms, you must immediately stop
                participating in the Rewards Program. The Rewards Program is void where
                prohibited or restricted by law. You may enroll in the Rewards Program if you:
                (i)&nbsp;are a legal resident of the United States; (ii)&nbsp;are at least 18
                years of age at the time you enroll; and (iii)&nbsp;have an active, valid
                e-mail address. No corporations, partnerships, limited liability companies, or
                other legal entities or business associations can participate in the Rewards
                Program. The Rewards Program is neither targeted for nor intended for use by
                any person under the age of 18.</span></p>
              <p><span >Lori’s
                Gifts reserves the right to change, modify, and/or eliminate the Rewards
                Program, these Terms, and/or any policy or guideline pertaining to the Rewards
                Program at any time and in its sole discretion. Any changes, modifications, or
                eliminations will be effective immediately upon posting of the same to </span><a target="_blank" href="https://www.lorisheroes.com/termscondition"><span >https://www.lorisheroes.com</span></a><span > (the “Website”)&nbsp; You
                  waive any right that you may have to receive specific notice of such changes,
                  modifications, or eliminations. Your sole and exclusive remedy if you do not
                  agree to any such changes, modifications, or eliminations is to withdraw from
                  the Rewards Program. Your continued participation in the Rewards Program after
                  any such changes, modifications, or eliminations confirms your acceptance of
                  such changes, modifications, or eliminations. You should review these Terms and
                  applicable policies frequently to keep abreast of any changes, modifications,
                  or eliminations that apply to the Rewards Program. </span></p>
              <p className='termsHeading' style={{ pageBreakAfter: 'avoid' }}><b><span>The Rewards
                Program</span></b></p>
              <p><span >Lori’s
                Gifts uses the Rewards Program to thank loyal customers for making purchases
                from Lori’s Gifts locations. Members of the Rewards Program are eligible to
                earn and accumulate points that can be redeemed for benefits at participating Lori’s
                Gift locations. </span></p>
              <p><span >To
                enroll in the Rewards Program, you must obtain a key tag from a Lori’s Gifts
                location and register your key tag number at </span><a target="_blank" href="https://www.lorisheroes.com/signup"><span >https://www.lorisheroes.com/signup</span></a><span >.&nbsp; You must follow the
                  directions to create an account (“Account”). There are no membership fees
                  associated with the Rewards Program. You may cancel your Account at any time by
                  contacting us at </span><a target="_blank" href="https://www.lorisheroes.com/contactus"><span >https://www.lorisheroes.com/contactus</span></a><span >. When you cancel your
                    Account, Lori’s Gifts will deactivate your Account and you will forfeit all
                    rewards, coupons, points, and other benefits of being a Rewards Program member
                    that you may have earned. </span></p>
              <p><span >The
                benefits that are available to you through the Rewards Program are based on the
                number of “Points” that you earn. When making a purchase at a Lori’s Gifts
                location, present your key tag at the cash register prior to making your
                purchase.&nbsp; Points cannot be rewarded for prior purchases.&nbsp; Points will be
                automatically credited to your Account on our next business day for any
                qualifying purchase. You can track the Points and rewards that you have earned
                by logging into your Account.</span></p>
              <p><span >You
                will receive one (1) Point for $1 spent (excluding tax, shipping and delivery charges),
                except during limited time promotions when Lori’s Gifts may offer bonus points
                on featured products and/or services. Points cannot be earned on vendor show
                merchandise or service items, such as magazines, newspapers, movie tickets,
                gift cards, transportation tokens and stamps. No partial points will be earned or
                accumulated; points will be earned on whole dollars spent.</span></p>
              <p><span >You
                will receive a $5 reward coupon for every 75 points earned.&nbsp; We will email the
                reward coupon to you on our next business day using the email that you provided
                when registering your Account.&nbsp; Your rewards may be redeemed for merchandise
                only, excluding vendor show merchandise or service items.</span></p>
              <p><span >We
                may award rewards coupons, points or other items to you for certain events.&nbsp; If
                you included your birthday information in your Account prior to the first day
                of the month of your birthday, we will email to you a special rewards coupon
                during the month of your birthday.&nbsp; </span></p>
              <p><span >You
                may select up to two (2) “changemakers” (bite-sized candy) from the available
                stock of “changemakers” at the Lori’s Gifts location where you are making a
                purchase during any paid transaction of $5 or more (pre-tax).&nbsp; </span></p>
              <p><span >Rewards
                coupons will expire 45 days after being issued to you by email.&nbsp; No cash back
                will be given if the coupon is not used or the full amount of the coupon is not
                used.&nbsp; Lori’s Gifts is not responsible for lost or stolen key tags or rewards
                coupons.&nbsp; Points cannot be transferred to another account and coupons cannot be
                reissued.</span></p>
              <p><span >Points
                accumulated under the Rewards Program are promotional and have no cash value.
                Your Account, any Points in your Account and coupons are personal to you and
                may not be sold, gifted, bartered, pledged, transferred, and/or assigned, or
                shared with family, friends, or others. You may only have one Account. Your
                Account may not include any fictitious, inaccurate, or offensive information. Lori’s
                Gifts reserves the right to terminate your Account and/or your participation in
                the Rewards Program if Lori’s Gifts determines, in its sole discretion, that
                you have violated these Terms or that your use of your Account is unauthorized,
                fraudulent, and/or unlawful. Lori’s Gifts also reserves the right to deactivate
                any Account that has been inactive for 3 consecutive years, meaning no new
                points were earned as a result of your purchases in that time.</span></p>
              <p className='termsHeading' style={{ pageBreakAfter: 'avoid' }}><b><span>Electronic
                Communications </span></b></p>
              <p><span >When
                you visit the Website or send e-mails to Lori’s Gifts, you are communicating
                with Lori’s Gifts electronically. By participating in the Rewards Program, you
                consent to receive communications from Lori’s Gifts electronically, including
                targeted e-mails, surveys, and promotional offers. Lori’s Gifts will
                communicate with you by e-mail. You agree that all agreements, notices,
                disclosures, and other communications that Lori’s Gifts provides to you
                electronically satisfy any legal requirement that such communication be in
                writing. You further agree that any notices provided by Lori’s Gifts
                electronically are deemed to be given and received on the date that Lori’s
                Gifts transmits such electronic communication. Lori’s Gifts reserves the right
                to send you e-mails for administrative purposes even if you opt out of these
                communications. </span></p>
              <p className='termsHeading' style={{ pageBreakAfter: 'avoid' }}><b><span>Privacy</span></b></p>
              <p><span >Read
                the Privacy Policy carefully to understand how Lori’s Gifts collects, uses, and
                discloses information about customers. Any personal information that you
                provide in connection with your participation in the Rewards Program will be
                collected, used, and disclosed in accordance with that Privacy Policy. If Lori’s
                Gifts revises its Privacy Policy, then these Terms will automatically refer to
                that revised Privacy Policy once it is published at </span><a target="_blank" href="https://www.lorisgifts.com/privacy-policy"><span >https://www.lorisgifts.com/privacy-policy</span></a><span >.&nbsp; </span><span >Lori’s Gifts</span><span > is committed to taking
                  appropriate measures to keep your personal information secure; however, you
                  alone are responsible for keeping the login information that you use to access
                  the Rewards Program private and secure. Your participation in the Rewards
                  Program confirms your acceptance of the Privacy Policy and uses of your
                  personal information thereunder. </span></p>
              <p className='termsHeading' style={{ pageBreakAfter: 'avoid' }}><b><span>Warranties</span></b></p>
              <p><span >The
                Rewards Program is provided on an “as is” and/or “as available” basis. To the
                fullest extent permitted under applicable law, Lori’s Gifts hereby expressly
                disclaims any and all representations and warranties, whether express, implied,
                or statutory, including, without limitation, the implied warranties of title,
                non-infringement, accuracy, merchantability, or fitness for a particular
                purpose. Without limiting the foregoing, Lori’s Gifts does not guarantee that
                the Website will be error-free, uninterrupted, and/or free of viruses and/or
                other harmful components, or that any defects will be corrected. </span></p>
              <p className='termsHeading' style={{ pageBreakAfter: 'avoid' }}><b><span>Limitations of
                Liability</span></b></p>
              <p><span >In
                no event shall Lori’s Gifts, any of its affiliates, or any of its or their
                respective officers, directors, employees, agents, representatives, advisors,
                or consultants be liable to you or to any third party for any damages
                (including incidental, indirect, special, punitive, exemplary, or consequential
                damages and/or attorney’s fees), direct or indirect, whether in contract, tort,
                strict liability, statute, or any other legal or equitable theory, arising out
                of or in connection with your use of the Website, your participation in the Rewards
                Program, and/or these Terms, whether or not Lori’s Gifts may have been advised
                that any such damages might or could occur and notwithstanding the failure of
                essential purpose of any remedy. Some states do not permit the exclusion or
                limitation of certain damages. In such jurisdictions, liability is limited to
                the fullest extent permitted by such state law. </span></p>
              <p className='termsHeading' style={{ pageBreakAfter: 'avoid' }}><b><span>Governing Law</span></b></p>
              <p><span >This
                agreement will be governed by and construed in accordance with the laws of the
                State of Texas, without giving effect to any choice or conflict of law
                provision or rule (whether of the State of Texas or any other jurisdiction)
                that would cause the application of the laws of any jurisdiction other than the
                State of Texas. </span></p>
              <p><span>&nbsp;</span></p>
            </div>
          </div>
        </main>

        <footer>
          <Footer />
        </footer>

      </div>

    )
  }
}
export default termscondition