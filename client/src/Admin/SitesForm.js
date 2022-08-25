import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../AuthContext';
import { Link } from 'react-router-dom';

import Api from '../Api';
import './SitesForm.scss';
import { doc } from 'prettier';

function SitesForm() {
  const navigate = useNavigate();
  const user = useAuthContext();
  const { id } = useParams();
  const [partners, setPartners] = useState(null);
  const [populations, setPopulations] = useState(null);
  const [data, setData] = useState({
    name: '',
    address: '',
    phoneNumber: '',
    email: '',
    website: '',
    NutritionPartnerIds: [],
    Hours: [],
    PopulationIds: [],
  });
  const [hour, setHour] = useState({
    day: 0,
    open: '12:00',
    close: '12:00',
    type: '',
  });

  useEffect(() => {
    if (id) {
      Api.sites.get(id).then((response) => {
        const { data } = response;
        data.NutritionPartnerIds = data.NutritionPartners?.map((np) => np.id);
        data.PopulationIds = data.Populations?.map((p) => p.id);
        data.Hours = [];
        setData(data);
      });
    }
  }, [id]);

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

  async function onSubmit(event) {
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

  function updateAssociation(event) {
    const newData = { ...data };
    if (event.target.checked) {
      newData[event.target.name].push(parseInt(event.target.value));
    } else {
      const index = newData[event.target.name].indexOf(parseInt(event.target.value));
      if (index >= 0) {
        newData[event.target.name].splice(index, 1);
      }
    }
    setData(newData);
  }

  function updateHourList(event) {
    let openElement = document.getElementById('open');
    let closeElement = document.getElementById('close');
    let dayElement = document.getElementById('day');
    let hourList = document.getElementById('time-list');

    let openSplit = hour['open'].split(':');
    let closeSplit = hour['close'].split(':');

    hourList.innerHTML += `<div class="time-interval">
      <label>${dayElement.value}</label> <span class="time">${openSplit[0] % 12 || 12}:${openSplit[1]} ${
      openSplit[0] >= 12 ? 'pm' : 'am'
    } - ${closeSplit[0] % 12 || 12}:${closeSplit[1]} ${closeSplit[0] >= 12 ? 'pm' : 'am'}</span> <span class="remove-button" id="${
      data['Hours'].length
    }"> Remove</span>
    </div>`;
    var buttons = document.getElementsByClassName('remove-button');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].onclick = onRemoveHour;
    }

    const newData = { ...data };
    newData['Hours'].push(hour);
    setData(newData);
    console.log(data);

    openElement.value = openElement.defaultValue;
    closeElement.value = closeElement.defaultValue;
    dayElement.selectedIndex = 0;

    setHour({
      day: 0,
      open: '12:00',
      close: '12:00',
      type: '',
    });
  }

  function onHourChange(event) {
    const newHour = { ...hour };
    if (event.target.name == 'day') {
      newHour[event.target.name] = event.target.selectedIndex;
    } else {
      newHour[event.target.name] = event.target.value;
    }
    setHour(newHour);
  }

  function onRemoveHour(event) {
    const newData = { ...data };
    newData['Hours'].splice(event.target.id, 1);
    event.target.parentElement.remove();
    setData(newData);
    console.log(newData);
  }

  return (
    <main className="container">
      <div className="row justify-content-center">
        <div className="col col-sm-10 col-md-8 col-lg-6 col-xl-8">
          <h1>Site</h1>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label className="form-label" htmlFor="name">
                Name
              </label>
              <input type="text" className="form-control" id="name" name="name" onChange={onChange} value={data.name} />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="address">
                Address
              </label>
              <input type="text" className="form-control" id="address" name="address" onChange={onChange} value={data.address} />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="phoneNumber">
                Phone Number
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
                Email
              </label>
              <input type="text" className="form-control" id="email" name="email" onChange={onChange} value={data.email} />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="website">
                Website
              </label>
              <input type="text" className="form-control" id="website" name="website" onChange={onChange} value={data.website} />
            </div>
            <div className="mb-3">
              <label className="form-label">Nutrition Partners</label>
              <div className="partner-container">
                <div>
                  {partners?.map((partner) => (
                    <div key={`partner-${id}`} className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={`partner-${partner.id}`}
                        name="NutritionPartnerIds"
                        value={partner.id}
                        onChange={updateAssociation}
                        checked={data.NutritionPartnerIds.includes(partner.id)}
                      />
                      <div className="form-check-label" htmlFor={`partner-${partner.id}`}>
                        {partner.name}
                        <Link className="edit" to={'/partners/' + partner.id + '/edit'}>
                          <i className="fa fa-pencil "></i> edit
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="button">
                  <Link style={{ textDecoration: 'none', width: 'fit' }} to="/partners/new">
                    <i className="fa fa-plus phone" style={{ marginRight: 12 }} aria-hidden="true"></i>
                    Add Partner
                  </Link>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Hours</label>
              <div className="time-list" id="time-list"></div>
              <div onChange={onHourChange}>
                <select size="1" id="day" name="day">
                  <option>Sun</option>
                  <option>Mon</option>
                  <option>Tue</option>
                  <option>Wed</option>
                  <option>Thu</option>
                  <option>Fri</option>
                  <option>Sat</option>
                </select>

                <input type="time" name="open" id="open" defaultValue="12:00"></input>
                <input type="time" name="close" id="close" defaultValue="12:00"></input>
                <span className="add-hours" onClick={updateHourList}>
                  Add Hours
                </span>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Populations</label>
              <div className="population-container">
                <div>
                  {populations?.map((population) => (
                    <div key={`population-${id}`} className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={`population-${population.id}`}
                        name="PopulationIds"
                        value={population.id}
                        onChange={updateAssociation}
                        checked={data.PopulationIds.includes(population.id)}
                      />
                      <div className="form-check-label" htmlFor={`population-${population.id}`}>
                        {population.name}
                        <Link className="edit" to={'/populations/' + population.id + '/edit'}>
                          <i className="fa fa-pencil "></i> edit
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="button">
                  <Link style={{ textDecoration: 'none', width: 'fit' }} to="/populations/new">
                    <i className="fa fa-plus phone" style={{ marginRight: 12 }} aria-hidden="true"></i>
                    Add Population
                  </Link>
                </div>
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
