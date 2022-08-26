import axios from 'axios';
import { get, update } from 'lodash';

const instance = axios.create({
  headers: {
    Accept: 'application/json',
  },
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      window.location = '/login';
    }
    return Promise.reject(error);
  }
);

const Api = {
  assets: {
    create(data) {
      return instance.post('/api/assets', data);
    },
    upload(url, headers, file) {
      return instance.put(url, file, { headers });
    },
  },
  auth: {
    login(email, password) {
      return instance.post('/api/auth/login', { email, password });
    },
    logout() {
      return instance.get('/api/auth/logout');
    },
    register(data) {
      return instance.post('/api/auth/register', data);
    },
  },
  passwords: {
    reset(email) {
      return instance.post('/api/passwords', { email });
    },
    get(token) {
      return instance.get(`/api/passwords/${token}`);
    },
    update(token, password) {
      return instance.patch(`/api/passwords/${token}`, { password });
    },
  },
  users: {
    me() {
      return instance.get('/api/users/me');
    },
    update(id, data) {
      return instance.patch(`/api/users/${id}`, data);
    },
  },
  sites: {
    getall() {
      return instance.get('/api/sites');
    },
    get(id) {
      return instance.get(`/api/sites/${id}`);
    },
    create(data) {
      return instance.post('/api/sites/', data);
    },
    update(id, data) {
      return instance.patch(`/api/sites/${id}`, data);
    },
    delete(id) {
      return instance.delete(`/api/sites/${id}`);
    },
  },
  nutritionpartners: {
    getall() {
      return instance.get('/api/nutritionpartners');
    },
    get(id) {
      return instance.get(`/api/nutritionpartners/${id}`);
    },
    create(data) {
      return instance.post('/api/nutritionpartners/', data);
    },
    update(id, data) {
      return instance.patch(`/api/nutritionpartners/${id}`, data);
    },
    delete(id) {
      return instance.delete(`/api/nutritionpartners/${id}`);
    },
  },
  populations: {
    getall() {
      return instance.get('/api/populations');
    },
    get(id) {
      return instance.get(`/api/populations/${id}`);
    },
    create(data) {
      return instance.post('/api/populations/', data);
    },
    update(id, data) {
      return instance.patch(`/api/populations/${id}`, data);
    },
    delete(id) {
      return instance.delete(`/api/populations/${id}`);
    },
  },
  mealtypes: {
    getall() {
      return instance.get('/api/mealtypes');
    },
    get(id) {
      return instance.get(`/api/mealtypes/${id}`);
    },
    create(data) {
      return instance.post('/api/mealtypes/', data);
    },
    update(id, data) {
      return instance.patch(`/api/mealtypes/${id}`, data);
    },
    delete(id) {
      return instance.delete(`/api/mealtypes/${id}`);
    },
  },

  services: {
    getall() {
      return instance.get('/api/services');
    },
    get(id) {
      return instance.get(`/api/services/${id}`);
    },
    create(data) {
      return instance.post('/api/services/', data);
    },
    update(id, data) {
      return instance.patch(`/api/services/${id}`, data);
    },
    delete(id) {
      return instance.delete(`/api/services/${id}`);
    },
  },

  statuses: {
    getall() {
      return instance.get('/api/covidstatuses');
    },
    get(id) {
      return instance.get(`/api/covidstatuses/${id}`);
    },
    create(data) {
      return instance.post('/api/covidstatuses/', data);
    },
    update(id, data) {
      return instance.patch(`/api/covidstatuses/${id}`, data);
    },
    delete(id) {
      return instance.delete(`/api/covidstatuses/${id}`);
    },
  },
};

export default Api;
