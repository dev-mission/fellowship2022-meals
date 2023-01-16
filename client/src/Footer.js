import { useTranslation } from 'react-i18next';

import './Footer.scss';
function Footer() {
  const { t } = useTranslation();

  return (
    <div>
      <div
        className="contact"
        style={{ background: `#f9f9f9 url(${process.env.PUBLIC_URL}/contact-bg.png) no-repeat`, backgroundPosition: 'right' }}>
        <div className="heading">{t('footer.title')}</div>
        <div className="information">
          <div className="general-information">
            {t('footer.generalInfo')} <span style={{ fontWeight: '400' }}>{t('footer.call')} </span>
            <a className="span-phone" href="tel:4175575000">
              <i className="fa fa-phone fa-lg phone" aria-hidden="true"></i>
              (417) 557-5000
            </a>
            .
          </div>
          <div className="general-information">
            {t('footer.fasterAssistance')}
            <span style={{ fontWeight: '400' }}>{t('footer.contactPage')}</span>
          </div>
        </div>
      </div>

      <div className="footer">
        {/* <div>
          <img className="footer-img" src={`${process.env.PUBLIC_URL}/footer-logo.png`} />
        </div> */}
        {/* <h3>
          ©2022 and County of San Francisco
          <span>Human Services Agency</span>
        </h3> */}
      </div>
    </div>
  );
}

export default Footer;
