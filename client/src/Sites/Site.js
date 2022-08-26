import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../AuthContext';
import { Link } from 'react-router-dom';
import { Map, Marker } from '../Components/Map';

import Api from '../Api';
import './Site.scss';
import { map } from 'lodash';

function Site() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (id) {
      Api.sites.get(id).then((response) => {
        const { data } = response;
        console.log(data);
        setData(data);
      });
    }
  }, [id]);

  function styleNumber(number) {
    let match = number.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return '';
  }

  function onMarkerClick(event, marker, map, infoWindow) {
    let match = marker.site?.phoneNumber.match(/^(\d{3})(\d{3})(\d{4})$/);

    let number = '(' + match[1] + ') ' + match[2] + '-' + match[3];

    infoWindow.close();
    infoWindow.setContent(`
      <div class="marker">
        <a class="marker-header" href="${'/sites/' + marker.site?.id}">${marker.site?.name}</a>
        <p>${marker.site?.address} <a href="${
      'https://maps.google.com/?q=' + marker.site?.address
    }" target="_blank">Get Directions <i class="fa fa-location-arrow" aria-hidden="true"></i></a></p>
        <div class="phone-number">
          <i class="fa fa-phone fa-lg phone" aria-hidden="true"></i>
          <a href="${'tel:' + number}">${number}</a>
        </div>
        <br>
        <div>
          Serves:
            ${marker.site?.Populations.map((population) => population.name)}
        </div>
        <br>
        <br>
        <a class="button" href="${'/sites/' + marker.site?.id}">SEE LOCATION DETAILS</a>
      <div>
    `);
    infoWindow.open({
      anchor: marker,
      map,
    });
  }

  return (
    <main>
      {data && (
        <div>
          <div className="image-backdrop">
            <div className="Heading">
              <div className="site-name">{data.name}</div>
              <div className="site-info">
                <div className="site-info-entry">
                  <i className="fa fa-users" style={{ marginRight: 12 }} aria-hidden="true"></i>
                  {data.Populations?.map((p) => (
                    <span>
                      {p.name} {data.Populations[data.Populations.length - 1] != p && <i className="fa fa-circle fa-1 "></i>}{' '}
                    </span>
                  ))}
                  {data.CovidStatuses?.length != 0 && (
                    <span>
                      (
                      {data.CovidStatuses.map((status) => (
                        <span>
                          {status.name}
                          {data.CovidStatuses[data.CovidStatuses.length - 1] != status && ', '}
                        </span>
                      ))}
                      )
                    </span>
                  )}
                </div>
                <div className="site-info-entry">
                  <i className="fa fa-cutlery" style={{ marginRight: 12 }} aria-hidden="true"></i>
                  {data.MealTypes?.map((mt) => (
                    <span>
                      {mt.name}
                      {data.MealTypes[data.MealTypes.length - 1] != mt && ', '}
                    </span>
                  ))}{' '}
                  {data.Services?.length != 0 && (
                    <span>
                      (
                      {data.Services.map((service) => (
                        <span>
                          {service.name}
                          {data.Services[data.Services.length - 1] != service && ', '}
                        </span>
                      ))}
                      )
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="map">
            <Map apiKey={window.env.REACT_APP_GOOGLE_MAPS_API_KEY} id="map" center={{ lat: 37.7749, lng: -122.4194 }} zoom={14}>
              <Marker key={`marker-${data.id}`} site={data} onClick={onMarkerClick} position={{ lat: data.lat, lng: data.lng }} />
            </Map>
          </div>
          <div className="main-content row">
            {data.address && (
              <div className="address-container col-md-4">
                <i className="fa fa-map-o fa-lg"></i>
                <div>
                  <div>{data.address}</div>

                  <br></br>
                  <a href={'https://maps.google.com/?q=' + data.address} target="_blank" rel="noreferrer">
                    GET DIRECTIONS
                  </a>
                  <br></br>
                  <br></br>
                </div>
              </div>
            )}
            <div className="contact-info col-md-4">
              <div className="title"> Contact Information</div>
              {data.website && (
                <div>
                  Website:{' '}
                  <a className="link" href={data.website} target="_blank" rel="noreferrer">
                    <i className="fa fa-link fa-lg"></i> link
                  </a>
                </div>
              )}
              {data.phoneNumber && (
                <div>
                  Main number:{' '}
                  <a className="link" href={'tel:' + data.phoneNumber}>
                    {styleNumber(data.phoneNumber)}
                  </a>
                </div>
              )}
              {data.email && (
                <div>
                  Email:{' '}
                  <a className="link" href={'mailto:' + data.email}>
                    {data.email}
                  </a>
                </div>
              )}
            </div>
            <div className="col-md-4">
              <div className="title">Hours</div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Site;
