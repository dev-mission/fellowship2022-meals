import { set } from 'lodash';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../AuthContext';

import './Sites.scss';
import Api from '../Api';

import SiteItem from './SiteItem';

function Sites() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { user, setUser } = useAuthContext();

  useEffect(() => {
    fetch(`/api/sites`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`This is an HTTP error: The status is ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        setData(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setData(null);
      });
  }, []);

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

  return (
    <div className="sites">
      <div className="line"></div>
      <div className="heading">Locations</div>
      <div className="sites-list">
        {user?.isAdmin && (
          <Link to="new">
            <div className="add-site">
              <i className="fa fa-plus fa-lg phone" aria-hidden="true"></i>
              Add new site
            </div>
          </Link>
        )}
        {data &&
          data.map((site) => (
            <div>
              <SiteItem data={site} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default Sites;
