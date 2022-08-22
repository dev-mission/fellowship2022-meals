import './Footer.scss';
function Footer() {
  return (
    <div>
      <div
        className="contact"
        style={{ background: `#f9f9f9 url(${process.env.PUBLIC_URL}/contact-bg.png) no-repeat`, backgroundPosition: 'right' }}>
        <div className="heading">Contact Us</div>
        <div className="information">
          <div className="general-information">
            General information: <span style={{ fontWeight: '400' }}>Call </span>
            <span className="span-phone">
              <i className="fa fa-phone fa-lg phone" aria-hidden="true"></i>
              (417) 557-5000
            </span>
            .
          </div>
          <div className="general-information">
            For faster Program assistance:{' '}
            <span style={{ fontWeight: '400' }}>
              Visit the{' '}
              <span className="span-phone" style={{ fontWeight: 'bold' }}>
                Contact
              </span>{' '}
              page to directly call the location you'd lick to reach.
            </span>
          </div>
        </div>
      </div>

      <div className="footer">
        <div>
          <img className="footer-img" src={`${process.env.PUBLIC_URL}/footer-logo.png`} />
        </div>
        <h3>
          ©2022 and County of San Francisco
          <span>Human Services Agency</span>
        </h3>
      </div>
    </div>
  );
}

export default Footer;
