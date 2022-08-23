import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../AuthContext';
import { Link } from 'react-router-dom';

import Api from '../Api';
import './SitesForm.scss';

function SitesForm() {
  const navigate = useNavigate();
  const user = useAuthContext();
  const { id } = useParams();
  const [partners, setPartner] = useState(null);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [data, setData] = useState({
    name: '',
    address: '',
    phonenumber: '',
    email: '',
    website: '',
  });

  useEffect(() => {
    if (id) {
      Api.sites.get(id).then((response) => setData(response.data));
    }
  }, [id]);

  useEffect(() => {
    Api.nutritionpartners.getall().then((response) => {
      setPartner(response.data);
    });
  }, []);

  async function onSubmit(event) {
    console.log(data);
    event.preventDefault();
    try {
      let response;
      if (id) {
        response = await Api.sites.update(id, data);
      } else {
        response = await Api.sites.create(data);
      }
      navigate(`/sites/`);
    } catch (error) {
      console.log(error);
    }
  }

  async function onDelete() {
    try {
      let response;
      if (id) {
        // console.log(id);
        response = await Api.sites.delete(id);
      }
      navigate(`/sites/`);
    } catch (error) {
      console.log(error);
    }
  }

  function onChange(event) {
    const newData = { ...data };
    newData[event.target.name] = event.target.value;
    setData(newData);
  }

  function updatePartner(index) {
    let dropdownMenuButton = document.getElementById('dropdownMenuButton');
    dropdownMenuButton.innerHTML = partners[index].name;
    setSelectedPartner(partners[index]);
  }

  return (
    <main className="container">
      <div className="row justify-content-center">
        <div className="col col-sm-10 col-md-8 col-lg-6 col-xl-4">
          <h1>Site</h1>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label className="form-label" htmlFor="name">
                name
              </label>
              <input type="text" className="form-control" id="name" name="name" onChange={onChange} value={data.name} />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="address">
                address
              </label>
              <input type="text" className="form-control" id="address" name="address" onChange={onChange} value={data.address} />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="phoneNumber">
                phoneNumber
              </label>
              <input
                type="text"
                className="form-control"
                id="phoneNumber"
                name="phoneNumber"
                onChange={onChange}
                value={data.phoneNumber}
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="email">
                email
              </label>
              <input type="text" className="form-control" id="email" name="email" onChange={onChange} value={data.email} />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="website">
                website
              </label>
              <input type="text" className="form-control" id="website" name="website" onChange={onChange} value={data.website} />
            </div>
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false">
                Nutrition Partner
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <Link style={{ textDecoration: 'none' }} to="/partners/new">
                  <div className="dropdown-item">
                    <i className="fa fa-plus phone" aria-hidden="true"></i>
                    Add a new partner
                  </div>
                </Link>
                {partners &&
                  partners.map((partner, index) => (
                    <div className="dropdown-item" onClick={() => updatePartner(index)}>
                      {partner.name}
                    </div>
                  ))}
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
          {id && (
            <button
              className="btn btn-primary"
              style={{ background: '#dd4a68', border: '1px solid #dd4a68', marginTop: '10px' }}
              onClick={onDelete}>
              Delete
            </button>
          )}
        </div>
      </div>
    </main>
  );
}

export default SitesForm;
