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
  const [partners, setPartners] = useState(null);
  const [populations, setPopulations] = useState(null);
  const [mealtypes, setMealTypes] = useState(null);
  const [services, setServices] = useState(null);
  const [statuses, setStatuses] = useState(null);

  const [filters, setFilters] = useState({
    populationId: null,
    nutritionPartnerId: null,
    mealTypeId: null,
    serviceId: null,
    statusId: null,
  });

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

  function onMarkerClick(event, marker, map, infoWindow) {
    infoWindow.close();
    infoWindow.setContent(`
      <h3>${marker.site?.name}</h3>
      <p>${marker.site?.address}</p>
    `);
    infoWindow.open({
      anchor: marker,
      map,
    });
  }

  function onFilterClick(type, value) {
    const newFilters = { ...filters };
    if (newFilters[type] === value) {
      newFilters[type] = null;
    } else {
      newFilters[type] = value;
    }
    setFilters(newFilters);
  }

  function resetFilter() {
    setFilters({
      populationId: null,
      nutritionPartnerId: null,
      mealTypeId: null,
      serviceId: null,
      statusId: null,
    });
  }

  let filteredData = data;
  if (filters.populationId) {
    filteredData = filteredData.filter((site) => site.Populations.find((p) => p.id === filters.populationId));
  }

  if (filters.nutritionPartnerId) {
    filteredData = filteredData.filter((site) => site.NutritionPartners.find((np) => np.id === filters.nutritionPartnerId));
  }

  if (filters.mealTypeId) {
    filteredData = filteredData.filter((site) => site.MealTypes.find((mt) => mt.id === filters.mealTypeId));
  }

  if (filters.serviceId) {
    filteredData = filteredData.filter((site) => site.Services.find((s) => s.id === filters.serviceId));
  }

  if (filters.statusId) {
    filteredData = filteredData.filter((site) => site.CovidStatuses.find((s) => s.id === filters.statusId));
  }

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
              <a onClick={() => onFilterClick('nutritionPartnerId', partner.id)} class="dropdown-item" href="#">
                {filters.nutritionPartnerId === partner.id && <span>*</span>}
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
              <a onClick={() => onFilterClick('populationId', population.id)} class="dropdown-item" href="#">
                {filters.populationId === population.id && <span>*</span>}
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
              <a onClick={() => onFilterClick('mealTypeId', mealtype.id)} class="dropdown-item" href="#">
                {filters.mealTypeId === mealtype.id && <span>*</span>}
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
              <a onClick={() => onFilterClick('serviceId', service.id)} class="dropdown-item" href="#">
                {filters.serviceId === service.id && <span>*</span>}
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
              <a onClick={() => onFilterClick('statusId', status.id)} class="dropdown-item" href="#">
                {filters.statusId === status.id && <span>*</span>}
                {status.name}
              </a>
            ))}
          </div>
        </div>

        <button onClick={resetFilter} className="reset-button">
          Reset
        </button>
      </div>
      <div className="sites-list">
        {filteredData &&
          filteredData.map((site) => (
            <div>
              <SiteItem data={site} />
            </div>
          ))}
        <div className="row">
          <div className="col-md-4">
            {filteredData &&
              filteredData.map((site) => (
                <div>
                  <SiteItem data={site} />
                </div>
              ))}
          </div>
          <div className="col-md-8">
            <Map apiKey={window.env.REACT_APP_GOOGLE_MAPS_API_KEY} id="map" center={{ lat: 37.7749, lng: -122.4194 }} zoom={14}>
              {filteredData
                ?.filter((site) => site.lat && site.lng)
                .map((site) => (
                  <Marker key={`marker-${site.id}`} site={site} onClick={onMarkerClick} position={{ lat: site.lat, lng: site.lng }} />
                ))}
            </Map>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sites;
