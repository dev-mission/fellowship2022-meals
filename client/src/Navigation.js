import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Api from './Api';
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

  function onTabClick(event) {
    const active = document.getElementsByClassName('active');
    const target = event.target;
    active[0].classList.remove('active');
    target.classList.add('active');
  }

  return (
    <nav className="navigation navbar navbar-expand-md navbar-light fixed-top">
      <Link to="/" className="navbar-brand">
        <img alt="logo" className="logo" src={`${process.env.PUBLIC_URL}/SfReadyMeals.png`} />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation">
        {t('navigation.menu')}
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item active" onClick={onTabClick}>
            <Link className="nav-link" aria-current="page" to="/">
              {t('navigation.tab.home')}
            </Link>
          </li>
          <li className="nav-item" onClick={onTabClick}>
            <Link className="nav-link" aria-current="page" to="/about">
              {t('navigation.tab.about')}
            </Link>
          </li>
          <li className="nav-item" onClick={onTabClick}>
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
              <Link className="nav-link" to="/login" onClick={onTabClick}>
                {t('navigation.tab.logIn')}
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
