import './Footer.scss';
function Footer() {
  return (
    <div className="fixed-bottom footer">
      <div>
        <img className="footer-img" src={`${process.env.PUBLIC_URL}/footer-logo.png`} />
      </div>
      <h3>
        ©2022 and County of San Francisco
        <span>Human Services Agency</span>
      </h3>
    </div>
  );
}

export default Footer;
