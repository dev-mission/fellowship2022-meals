import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../AuthContext';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  useEffect(() => {
    fetch(`/api/sites`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`This is an HTTP error: The status is ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
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
    let match = marker.site?.phoneNumber.match(/^(\d{3})(\d{3})(\d{4})$/);

    let number;

    if (match) {
      number = '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }

    infoWindow.close();
    infoWindow.setContent(`
    <div class="marker">
      <a class="marker-header" href="${'/sites/' + marker.site?.id}">${marker.site?.name}</a>
      <p>
        ${marker.site?.address} 
        <a href="${'https://maps.google.com/?q=' + marker.site?.address}" target="_blank">
          ${t('site.marker.getDirection')}
          <i class="fa fa-location-arrow" aria-hidden="true"></i>
        </a>
      </p>
      <div class="phone-number">
        <i class="fa fa-phone fa-lg phone" aria-hidden="true"></i>
        <a href="${'tel:' + number}">${number}</a>
      </div>
      <br>
      <div>
        ${t('site.marker.serve')}
        ${marker.site?.Populations.map((population) => population.name)}
      </div>
      <br>
      <a class="button" href="${'/sites/' + marker.site?.id}">${t('site.marker.seeLocation')}</a>
    <div>
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
      <div className="heading">{t('sites.title')}</div>
      {user?.isAdmin && (
        <Link style={{ textDecoration: 'none' }} to="/sites/new">
          <div className="add-site">
            <i className="fa fa-plus fa-lg phone" aria-hidden="true"></i>
            Add new site
          </div>
        </Link>
      )}
      <div className="filter">
        <div className="filter-options">
          <div className="filter-text">{t('sites.filter.title')}</div>
          <div className="filter-button">
            <button
              class="btn filter-button dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              style={filters.nutritionPartnerId && { border: '1px solid #037493' }}>
              {(filters.nutritionPartnerId && partners?.map((partner) => filters.nutritionPartnerId === partner.id && partner.name)) ||
                t('sites.filter.nutritionPartner')}
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              {partners?.map((partner) => (
                <div onClick={() => onFilterClick('nutritionPartnerId', partner.id)} class="dropdown-item" key={partner.id}>
                  {filters.nutritionPartnerId === partner.id && <span>*</span>}
                  {partner.name}
                </div>
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
              aria-expanded="false"
              style={filters.populationId && { border: '1px solid #037493' }}>
              {(filters.populationId && populations?.map((population) => filters.populationId === population.id && population.name)) ||
                t('sites.filter.population')}
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              {populations?.map((population) => (
                <div onClick={() => onFilterClick('populationId', population.id)} class="dropdown-item" key={population.id}>
                  {filters.populationId === population.id && <span>*</span>}
                  {population.name}
                </div>
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
              aria-expanded="false"
              style={filters.mealTypeId && { border: '1px solid #037493' }}>
              {(filters.mealTypeId && mealtypes?.map((mealtype) => filters.mealTypeId === mealtype.id && mealtype.name)) ||
                t('sites.filter.mealType')}
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              {mealtypes?.map((mealtype) => (
                <div onClick={() => onFilterClick('mealTypeId', mealtype.id)} class="dropdown-item" key={mealtype.id}>
                  {filters.mealTypeId === mealtype.id && <span>*</span>}
                  {mealtype.name}
                </div>
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
              aria-expanded="false"
              style={filters.serviceId && { border: '1px solid #037493' }}>
              {(filters.serviceId && services?.map((service) => filters.serviceId === service.id && service.name)) ||
                t('sites.filter.service')}
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              {services?.map((service) => (
                <div onClick={() => onFilterClick('serviceId', service.id)} class="dropdown-item" key={service.id}>
                  {filters.serviceId === service.id && <span>*</span>}
                  {service.name}
                </div>
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
              aria-expanded="false"
              style={filters.statusId && { border: '1px solid #037493' }}>
              {(filters.statusId && statuses?.map((status) => filters.statusId === status.id && status.name)) || t('sites.filter.status')}
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              {statuses?.map((status) => (
                <div onClick={() => onFilterClick('statusId', status.id)} class="dropdown-item" key={status.id}>
                  {filters.statusId === status.id && <span>*</span>}
                  {status.name}
                </div>
              ))}
            </div>
          </div>

          <button onClick={resetFilter} className="reset-button">
            {t('sites.filter.reset')}
          </button>
        </div>
      </div>
      <div className="sites-list">
        <div className="row">
          <div className="col-md-4">
            {filteredData &&
              filteredData.map((site) => (
                <div key={site.id}>
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
