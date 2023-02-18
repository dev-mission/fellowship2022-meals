import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import './Header.scss';
import Api from './Api';
import i18n from './i18n';
import { useAuthContext } from './AuthContext';
import './Navigation.scss';

function Navigation() {
  const navigate = useNavigate();
  const { user, setUser } = useAuthContext();
  const { t } = useTranslation();

  useEffect(
    function () {
      Api.users.me().then((response) => {
        if (response.status === 204) {
          setUser(null);
        } else {
          setUser(response.data);
        }
      });
    },
    [setUser]
  );

  async function onLogout(event) {
    event.preventDefault();
    await Api.auth.logout();
    setUser(null);
    navigate('/');
  }

  async function onChangeLanguage(language) {
    await i18n.changeLanguage(language);
  }

  return (
    <nav className="navigation header navbar navbar-expand-md navbar-light fixed-top">
      <Link to="/">
        <img alt="logo" className="logo" src={`${process.env.PUBLIC_URL}/SfReadyMeals.png`} />
      </Link>
      <div className="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul className="navbar-nav flex-grow-1 mb-2 mb-md-0">
          {user && (
            <li className="nav-item me-3">
              <span className="nav-link d-inline-block">
                Hello, <Link to="/account">{user.firstName}!</Link>
              </span>
              {user.pictureUrl && <div className="header__picture" style={{ backgroundImage: `url(${user.pictureUrl})` }}></div>}
            </li>
          )}
          <li className="nav-item active">
            <Link className="nav-link" aria-current="page" to="/">
              {t('navigation.tab.home')}
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" aria-current="page" to="/about">
              {t('navigation.tab.about')}
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" aria-current="page" to="/sites">
              {t('navigation.tab.locations')}
            </Link>
          </li>
          {user && (
            <li className="nav-item">
              <a className="nav-link" href="/logout" onClick={onLogout}>
                {t('navigation.tab.logOut')}
              </a>
            </li>
          )}
          {!user && (
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                {t('navigation.tab.logIn')}
              </Link>
            </li>
          )}
          <div className="flex-grow-1 d-flex justify-content-end">
            <li className="nav-item">
              <span className="navbar-text">
                <button onClick={() => onChangeLanguage('en')} className="btn btn-link navigation__btn">
                  English
                </button>{' '}
                |
                <button onClick={() => onChangeLanguage('es')} className="btn btn-link navigation__btn">
                  Español
                </button>{' '}
                |
                <button onClick={() => onChangeLanguage('zh')} className="btn btn-link navigation__btn">
                  中文
                </button>
              </span>
            </li>
          </div>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
