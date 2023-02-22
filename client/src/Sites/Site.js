import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Map, Marker } from '../Components/Map';
import { useTranslation } from 'react-i18next';

import Api from '../Api';
import './Site.scss';
import { DateTime, Info } from 'luxon';

function Site() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [hours, setHours] = useState({});
  const { t } = useTranslation();

  useEffect(() => {
    if (id) {
      Api.sites.get(id).then((response) => {
        const { data } = response;
        setData(data);
        let hourObj = {};
        data.Hours.forEach((hour) => {
          if (hourObj[`${hour.day}`]) {
            hourObj[`${hour.day}`].push({ open: hour.open, close: hour.close });
          } else {
            hourObj[`${hour.day}`] = [{ open: hour.open, close: hour.close }];
          }
        });
        setHours(hourObj);
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
        <br>
        <a class="button" href="${'/sites/' + marker.site?.id}">${t('site.marker.seeLocation')}</a>
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
            <Map apiKey={window.env.REACT_APP_GOOGLE_MAPS_API_KEY} id="map" center={{ lat: data.lat, lng: data.lng }} zoom={14}>
              <Marker key={`marker-${data.id}`} site={data} onClick={onMarkerClick} position={{ lat: data.lat, lng: data.lng }} />
            </Map>
          </div>
          <div className="main-content row">
            {data.address && (
              <div className="col-md-4">
                <div className="address-container">
                  <i className="fa fa-map-o fa-lg"></i>
                  <div className="address-container-address">{data.address}</div>
                </div>
                <a href={'https://maps.google.com/?q=' + data.address} target="_blank" rel="noreferrer" className="get-direction">
                  {t('site.getDirection')}
                </a>
              </div>
            )}
            <div className="contact-info col-md-4">
              <div className="title"> {t('site.contactInfo')}</div>
              {data.website && (
                <div>
                  {t('site.website')}
                  <a className="link" href={data.website} target="_blank" rel="noreferrer">
                    <i className="fa fa-link fa-lg"></i> link
                  </a>
                </div>
              )}
              {data.phoneNumber && (
                <div>
                  {t('site.mainNumber')}
                  <a className="link" href={'tel:' + data.phoneNumber}>
                    {styleNumber(data.phoneNumber)}
                  </a>
                </div>
              )}
              {data.email && (
                <div>
                  {t('site.email')}
                  <a className="link" href={'mailto:' + data.email}>
                    {data.email}
                  </a>
                </div>
              )}
            </div>
            <div className="col-md-4">
              <div className="title">{t('site.hours')}</div>
              {/* {data.Hours?.map((hours) => (
                <div className="time-interval">
                  <label>{Info.weekdays('short')[(parseInt(hours.day) + 6) % 7]}</label>
                  <span className="time">
                    {DateTime.fromFormat(hours.open, 'H:mm').toLocaleString(DateTime.TIME_SIMPLE)} -{' '}
                    {DateTime.fromFormat(hours.close, 'H:mm').toLocaleString(DateTime.TIME_SIMPLE)}
                  </span>
                </div>
              ))} */}
              {Object.keys(hours).map((day) => (
                <div className="time-interval">
                  <label className="day">{Info.weekdays('short')[(parseInt(day) + 6) % 7]}</label>
                  <div className="hours">
                    {hours[`${day}`].map((hour) => (
                      <div className="hour">
                        {DateTime.fromFormat(hour.open, 'H:mm').toLocaleString(DateTime.TIME_SIMPLE)} -{' '}
                        {DateTime.fromFormat(hour.close, 'H:mm').toLocaleString(DateTime.TIME_SIMPLE)}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Site;
