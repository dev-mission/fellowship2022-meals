import './SiteItem.scss';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../AuthContext';
import { useTranslation } from 'react-i18next';

import Api from '../Api';

function SiteItem({ data }) {
  const { user, setUser } = useAuthContext();
  const { id, name, address, phoneNumber, Populations } = data;
  const { t } = useTranslation();

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
  let number = '';

  if (phoneNumber) {
    let match = phoneNumber.match(/^(\d{3})(\d{3})(\d{4})$/);

    number = '(' + match[1] + ') ' + match[2] + '-' + match[3];
  }

  return (
    <div className="site-item">
      <div>
        <Link to={'/sites/' + id} style={{ textDecoration: 'none' }}>
          <div className="site-name">{name}</div>
        </Link>
        <div className="site-address">{address}</div>
        {phoneNumber && (
          <div className="site-phone-number">
            <i className="fa fa-phone fa-lg phone" aria-hidden="true"></i>
            <a href={'tel:' + number}>{number}</a>
          </div>
        )}
        <div className="population">
          {t('site.marker.serve')}
          {Populations.map((population) => (
            <span>
              {population.name}
              {Populations[Populations.length - 1] != population && ' | '}
            </span>
          ))}
        </div>
      </div>
      {user?.isAdmin && (
        <Link className="edit" to={'/sites/' + id + '/edit'}>
          <i className="fa fa-pencil fa-lg"></i> edit
        </Link>
      )}
    </div>
  );
}

export default SiteItem;
