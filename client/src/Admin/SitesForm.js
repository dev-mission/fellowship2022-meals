import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Api from '../Api';

function SitesForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState({
    name: '',
    address: '',
    phonenumber: '',
    email: '',
  });

  useEffect(() => {
    if (id) {
      Api.sites.get(id).then((response) => setData(response.data));
    }
  }, [id]);

  async function onSubmit(event) {
    event.preventDefault();
    try {
      let response;
      if (id) {
        response = await Api.sites.update(id, data);
      } else {
        response = await Api.sites.create(data);
      }
      //   navigate(`/sites/${response.data.id}`);
    } catch (error) {
      console.log(error);
    }
  }

  function onChange(event) {
    const newData = { ...data };
    newData[event.target.name] = event.target.value;
    setData(newData);
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
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default SitesForm;
