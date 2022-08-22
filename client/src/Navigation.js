import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import './Header.scss';
import Api from './Api';
import { useAuthContext } from './AuthContext';
import './Navigation.scss';

function Navigation() {
  const navigate = useNavigate();
  const { user, setUser } = useAuthContext();

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

  return (
    <nav className="navigation header navbar navbar-expand-md navbar-light fixed-top">
      <Link to="/">
        <img className="logo" src={`${process.env.PUBLIC_URL}/sfhsa-logo.png`} />
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
          <div className="flex-grow-1 d-flex justify-content-end">
            <li className="nav-item active">
              <Link className="nav-link" aria-current="page" to="/">
                HOME
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" aria-current="page" to="/sites">
                LOCATIONS
              </Link>
            </li>
            {user && (
              <li className="nav-item">
                <a className="nav-link" href="/logout" onClick={onLogout}>
                  LOG OUT
                </a>
              </li>
            )}
            {!user && (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  LOG IN
                </Link>
              </li>
            )}
          </div>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
