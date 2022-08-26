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
  const [mealtypes, setMealTypes] = useState(null);
  const [services, setServices] = useState(null);
  const [statuses, setStatuses] = useState(null);

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

  useEffect(() => {
    Api.mealtypes.getall().then((response) => {
      setMealTypes(response.data);
    });
  }, []);

  useEffect(() => {
    Api.services.getall().then((response) => {
      setServices(response.data);
    });
  }, []);

  useEffect(() => {
    Api.statuses.getall().then((response) => {
      setStatuses(response.data);
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
        <div className="filter-button">
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
        <div className="filter-button">
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
        <div className="filter-button">
          <button
            class="btn filter-button dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false">
            Meal Type
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {mealtypes?.map((mealtype) => (
              <a class="dropdown-item" href="#">
                {mealtype.name}
              </a>
            ))}
          </div>
        </div>
        <div className="filter-button">
          <button
            class="btn filter-button dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false">
            Services
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {services?.map((service) => (
              <a class="dropdown-item" href="#">
                {service.name}
              </a>
            ))}
          </div>
        </div>
        <div className="filter-button">
          <button
            class="btn filter-button dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false">
            Statuses
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {statuses?.map((status) => (
              <a class="dropdown-item" href="#">
                {status.name}
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
