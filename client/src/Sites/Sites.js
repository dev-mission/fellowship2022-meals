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
  const [partners, setPartners] = useState(null);
  const [populations, setPopulations] = useState(null);

  useEffect(() => {
    fetch(`/api/sites`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`This is an HTTP error: The status is ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
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

  useEffect(() => {
    Api.nutritionpartners.getall().then((response) => {
      setPartners(response.data);
    });
  }, []);

  useEffect(() => {
    Api.populations.getall().then((response) => {
      setPopulations(response.data);
    });
  }, []);

  return (
    <div className="sites">
      <div className="line"></div>
      <div className="heading">Locations</div>
      {user?.isAdmin && (
        <Link style={{ textDecoration: 'none' }} to="new">
          <div className="add-site">
            <i className="fa fa-plus fa-lg phone" aria-hidden="true"></i>
            Add new site
          </div>
        </Link>
      )}
      <div className="filter">
        <div className="filter-text">Filter</div>
        <div>
          <button
            class="btn filter-button dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false">
            Nutrition Partner
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {partners?.map((partner) => (
              <a class="dropdown-item" href="#">
                {partner.name}
              </a>
            ))}
          </div>
        </div>
        <div>
          <button
            class="btn filter-button dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false">
            Population
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {populations?.map((population) => (
              <a class="dropdown-item" href="#">
                {population.name}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="sites-list">
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
