import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../AuthContext';

import Api from '../Api';

function PartnersForm() {
  const navigate = useNavigate();
  const user = useAuthContext();
  const { id } = useParams();
  const [data, setData] = useState({
    name: '',
    phonenumber: '',
    email: '',
    website: '',
  });

  useEffect(() => {
    if (id) {
      Api.sites.get(id).then((response) => setData(response.data));
    }
  }, [id]);

  async function onSubmit(event) {
    console.log(data);
    event.preventDefault();
    try {
      let response;
      if (id) {
        response = await Api.nutritionpartners.update(id, data);
      } else {
        response = await Api.nutritionpartners.create(data);
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
        response = await Api.nutritionpartners.delete(id);
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

  return (
    <main className="container">
      <div className="row justify-content-center">
        <div className="col col-sm-10 col-md-8 col-lg-6 col-xl-4">
          <h1>Nutrition Partner</h1>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label className="form-label" htmlFor="name">
                name
              </label>
              <input type="text" className="form-control" id="name" name="name" onChange={onChange} value={data.name} />
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
export default PartnersForm;
