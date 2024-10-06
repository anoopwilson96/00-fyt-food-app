import React from 'react'
import { Link } from 'react-router-dom'

export const FooterLanding = () => {
  return (
    <>
          <footer className="footer bg-base-200 text-base-content p-10">
        <aside className="footer-start">
          <img
            src="https://res.cloudinary.com/aw96/image/upload/v1724584697/fyt_bfgnpm.png"
            alt="FYT Logo"
            className="h-10"
          />
          <p>
            FYT Industries Ltd.
            <br />
            Filling Your Tummy since 1992
          </p>
        </aside>
        <nav>
  <h6 className="footer-title"  >Services</h6>
  <Link className="link link-hover" to={'/food'}> Food Delivery </Link>
  <Link className="link link-hover" to={'/partnership'}>Restaurant Partnerships </Link>
  <Link className="link link-hover" to={'/bulk'}>Corporate Orders </Link>
  <Link className="link link-hover" to={'/special'}>Special Offers </Link>
</nav>
<nav>
  <h6 className="footer-title">Company</h6>
  <Link className="link link-hover" to={'/about'} >About FYT</Link>
  <Link className="link link-hover" to={'/contact-us'} >Contact Us</Link>
  <Link className="link link-hover" to={'/careers'} >Careers</Link>
  <Link className="link link-hover" to={'/news'} >News & Press</Link>
</nav>
<nav>
  <h6 className="footer-title">Legal</h6>
  <Link className="link link-hover" to={'/terms'} >Terms of Service</Link>
  <Link className="link link-hover" to={'/privacy'} >Privacy Policy</Link>
  <Link className="link link-hover" to={'/refund'} >Refund Policy</Link>
</nav>

      </footer>
    </>
  )
}
