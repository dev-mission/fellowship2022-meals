import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../AuthContext';
import { Link } from 'react-router-dom';

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
          <div className="main-content">
            {data.address && (
              <div className="address-container">
                <i className="fa fa-map-o fa-lg"></i>
                <div>
                  <div>{data.address}</div>
                  <button>GET DIRECTIONS</button>
                </div>
              </div>
            )}
            <div className="contact-info">
              <div className="title"> Contact Information</div>
              {data.website && (
                <div>
                  Website:{' '}
                  <a className="link" href={data.website} target="_blank">
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
          </div>
        </div>
      )}
    </main>
  );
}

export default Site;
