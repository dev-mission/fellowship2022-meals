import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../AuthContext';

import Api from '../Api';
import { Map, Marker } from '../Components/Map';

import './Sites.scss';

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
          <Link style={{ textDecoration: 'none' }} to="new">
            <div className="add-site">
              <i className="fa fa-plus fa-lg phone" aria-hidden="true"></i>
              Add new site
            </div>
          </Link>
        )}
        <div className="row">
          <div className="col-md-4">
            {data &&
              data.map((site) => (
                <div key={site.id}>
                  <SiteItem data={site} />
                </div>
              ))}
          </div>
          <div className="col-md-8">
            <Map apiKey={window.env.REACT_APP_GOOGLE_MAPS_API_KEY} id="map" center={{ lat: 37.7749, lng: -122.4194 }} zoom={14}>
              <Marker onClick={(m, e) => console.log('!', m, e)} position={{ lat: 37.7749, lng: -122.4194 }} />
            </Map>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sites;
