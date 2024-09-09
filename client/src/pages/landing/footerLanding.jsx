import React from 'react'

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
  <h6 className="footer-title">Services</h6>
  <a className="link link-hover">Food Delivery</a>
  <a className="link link-hover">Restaurant Partnerships</a>
  <a className="link link-hover">Corporate Orders</a>
  <a className="link link-hover">Special Offers</a>
</nav>
<nav>
  <h6 className="footer-title">Company</h6>
  <a className="link link-hover">About FYT</a>
  <a className="link link-hover">Contact Us</a>
  <a className="link link-hover">Careers</a>
  <a className="link link-hover">News & Press</a>
</nav>
<nav>
  <h6 className="footer-title">Legal</h6>
  <a className="link link-hover">Terms of Service</a>
  <a className="link link-hover">Privacy Policy</a>
  <a className="link link-hover">Refund Policy</a>
</nav>

      </footer>
    </>
  )
}
