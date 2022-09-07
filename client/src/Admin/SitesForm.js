import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { DateTime, Info } from 'luxon';

import Api from '../Api';
import './SitesForm.scss';

function hoursComparator(a, b) {
  if (a.day === b.day) {
    return a.open.localeCompare(b.open);
  }
  return a.day - b.day;
}

function SitesForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [partners, setPartners] = useState(null);
  const [populations, setPopulations] = useState(null);
  const [mealtypes, setMealTypes] = useState(null);
  const [services, setServices] = useState(null);
  const [statuses, setStatuses] = useState(null);
  const [data, setData] = useState({
    name: '',
    address: '',
    phoneNumber: '',
    email: '',
    website: '',
    NutritionPartnerIds: [],
    Hours: [],
    PopulationIds: [],
    MealTypeIds: [],
    ServiceIds: [],
    CovidStatusIds: [],
  });
  const [hour, setHour] = useState({
    day: 0,
    open: '09:00',
    close: '17:00',
    type: '',
  });

  useEffect(() => {
    if (id) {
      Api.sites.get(id).then((response) => {
        const { data } = response;
        data.NutritionPartnerIds = data.NutritionPartners?.map((np) => np.id);
        data.PopulationIds = data.Populations?.map((p) => p.id);
        data.MealTypeIds = data.MealTypes?.map((mt) => mt.id);
        data.ServiceIds = data.Services?.map((s) => s.id);
        data.CovidStatusIds = data.CovidStatuses.map((cs) => cs.id);
        data.Hours.sort(hoursComparator);
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
    Api.mealtypes.getall().then((response) => {
      setMealTypes(response.data);
    });
  }, []);

  useEffect(() => {
    Api.populations.getall().then((response) => {
      setPopulations(response.data);
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
    const newData = { ...data };
    newData['Hours'].push(hour);
    newData['Hours'].sort(hoursComparator);
    setData(newData);

    setHour({
      day: 0,
      open: '09:00',
      close: '17:00',
      type: '',
    });
  }

  function onHourChange(event) {
    const newHour = { ...hour };
    newHour[event.target.name] = event.target.value;
    setHour(newHour);
  }

  function onRemoveHours(index) {
    const newData = { ...data };
    newData['Hours'].splice(index, 1);
    setData(newData);
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
              <div className="time-list" id="time-list">
                {data.Hours.map((hours, index) => (
                  <div key={`hours-${index}`} className="time-interval">
                    <label>{Info.weekdays('short')[(parseInt(hours.day) + 6) % 7]}</label>
                    <span className="time">
                      {DateTime.fromFormat(hours.open, 'H:mm').toLocaleString(DateTime.TIME_SIMPLE)} -{' '}
                      {DateTime.fromFormat(hours.close, 'H:mm').toLocaleString(DateTime.TIME_SIMPLE)}
                    </span>
                    <span className="remove-button" onClick={() => onRemoveHours(index)}>
                      Remove
                    </span>
                  </div>
                ))}
              </div>
              <div>
                <select size="1" id="day" name="day" value={hour.day} onChange={onHourChange}>
                  <option value={0}>Sun</option>
                  <option value={1}>Mon</option>
                  <option value={2}>Tue</option>
                  <option value={3}>Wed</option>
                  <option value={4}>Thu</option>
                  <option value={5}>Fri</option>
                  <option value={6}>Sat</option>
                </select>
                <input type="time" name="open" id="open" value={hour.open} onChange={onHourChange}></input>
                <input type="time" name="close" id="close" value={hour.close} onChange={onHourChange}></input>
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
                    <div key={`population-${population.id}`} className="form-check">
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
            <div className="mb-3">
              <label className="form-label">Meal Types</label>
              <div className="mealtype-container">
                <div>
                  {mealtypes?.map((mealtype) => (
                    <div key={`mealtype-${id}`} className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={`mealtype-${mealtype.id}`}
                        name="MealTypeIds"
                        value={mealtype.id}
                        onChange={updateAssociation}
                        checked={data.MealTypeIds.includes(mealtype.id)}
                      />
                      <div className="form-check-label" htmlFor={`mealtype-${mealtype.id}`}>
                        {mealtype.name}
                        <Link className="edit" to={'/mealtypes/' + mealtype.id + '/edit'}>
                          <i className="fa fa-pencil "></i> edit
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="button">
                  <Link style={{ textDecoration: 'none', width: 'fit' }} to="/mealtypes/new">
                    <i className="fa fa-plus phone" style={{ marginRight: 12 }} aria-hidden="true"></i>
                    Add Meal Type
                  </Link>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Services</label>
              <div className="service-container">
                <div>
                  {services?.map((service) => (
                    <div key={`service-${id}`} className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={`service-${service.id}`}
                        name="ServiceIds"
                        value={service.id}
                        onChange={updateAssociation}
                        checked={data.ServiceIds.includes(service.id)}
                      />
                      <div className="form-check-label" htmlFor={`service-${service.id}`}>
                        {service.name}
                        <Link className="edit" to={'/services/' + service.id + '/edit'}>
                          <i className="fa fa-pencil "></i> edit
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="button">
                  <Link style={{ textDecoration: 'none', width: 'fit' }} to="/services/new">
                    <i className="fa fa-plus phone" style={{ marginRight: 12 }} aria-hidden="true"></i>
                    Add Service
                  </Link>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Statuses</label>
              <div className="status-container">
                <div>
                  {statuses?.map((status) => (
                    <div key={`status-${id}`} className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={`status-${status.id}`}
                        name="CovidStatusIds"
                        value={status.id}
                        onChange={updateAssociation}
                        checked={data.CovidStatusIds.includes(status.id)}
                      />
                      <div className="form-check-label" htmlFor={`status-${status.id}`}>
                        {status.name}
                        <Link className="edit" to={'/statuses/' + status.id + '/edit'}>
                          <i className="fa fa-pencil "></i> edit
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="button">
                  <Link style={{ textDecoration: 'none', width: 'fit' }} to="/statuses/new">
                    <i className="fa fa-plus phone" style={{ marginRight: 12 }} aria-hidden="true"></i>
                    Add Status
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
