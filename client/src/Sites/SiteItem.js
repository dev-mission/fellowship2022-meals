import './SiteItem.scss';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../AuthContext';

import Api from '../Api';

function SiteItem({ data }) {
  const { user, setUser } = useAuthContext();
  const { id, name, address, phoneNumber, email, Populations } = data;

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

  let match = phoneNumber.match(/^(\d{3})(\d{3})(\d{4})$/);

  let number = '(' + match[1] + ') ' + match[2] + '-' + match[3];

  return (
    <div className="site-item">
      <div>
        <div className="site-name">{name}</div>
        <div className="site-address">{address}</div>
        <div className="site-phone-number">
          <i className="fa fa-phone fa-lg phone" aria-hidden="true"></i>
          <a href={'tel:' + number}>{number}</a>
        </div>
        <div className="population">
          Serves:{' '}
          {Populations.map((population) => (
            <span>{population.name}</span>
          ))}
        </div>
      </div>
      {user?.isAdmin && (
        <Link className="edit" to={id + '/edit'}>
          <i className="fa fa-pencil fa-lg"></i> edit
        </Link>
      )}
    </div>
  );
}

export default SiteItem;
