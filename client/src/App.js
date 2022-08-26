import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.scss';

import { AuthContextProvider, AuthProtected } from './AuthContext';
import Header from './Header';
import Navigation from './Navigation';
import Home from './Home';
import Login from './Login';
import PasswordRoutes from './Passwords/PasswordRoutes';
import Register from './Register';
import UserRoutes from './Users/UserRoutes';
import SitesForm from './Admin/SitesForm';
import Sites from './Sites/Sites';
import Footer from './Footer';
import PartnersForm from './Admin/PartnersForm';
import NutritionPartners from './NutritionPartners/NutritionPartners';
import PopulationsForm from './Admin/PopulationsForm';
import MealTypesForm from './Admin/MealTypesForm';
import ServicesForm from './Admin/ServicesForm';
import StatusesForm from './Admin/StatusesForm';

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/passwords/*" element={<PasswordRoutes />} />
          <Route path="/sites" element={<Sites />} />
          <Route path="/partners" element={<NutritionPartners />} />
          {process.env.REACT_APP_FEATURE_REGISTRATION === 'true' && <Route path="/register" element={<Register />} />}
          <Route
            path="/account/*"
            element={
              <AuthProtected>
                <UserRoutes />
              </AuthProtected>
            }
          />
          <Route
            path="/sites/new"
            element={
              <AuthProtected isAdminRequired={true}>
                <SitesForm />
              </AuthProtected>
            }
          />
          <Route
            path="/sites/:id/edit"
            element={
              <AuthProtected isAdminRequired={true}>
                <SitesForm />
              </AuthProtected>
            }
          />
          <Route
            path="/partners/new"
            element={
              <AuthProtected isAdminRequired={true}>
                <PartnersForm />
              </AuthProtected>
            }
          />
          <Route
            path="/partners/:id/edit"
            element={
              <AuthProtected isAdminRequired={true}>
                <PartnersForm />
              </AuthProtected>
            }
          />
          <Route
            path="/populations/new"
            element={
              <AuthProtected isAdminRequired={true}>
                <PopulationsForm />
              </AuthProtected>
            }
          />
          <Route
            path="/populations/:id/edit"
            element={
              <AuthProtected isAdminRequired={true}>
                <PopulationsForm />
              </AuthProtected>
            }
          />
          <Route
            path="/mealtypes/new"
            element={
              <AuthProtected isAdminRequired={true}>
                <MealTypesForm />
              </AuthProtected>
            }
          />
          <Route
            path="/mealtypes/:id/edit"
            element={
              <AuthProtected isAdminRequired={true}>
                <MealTypesForm />
              </AuthProtected>
            }
          />
          <Route
            path="/services/new"
            element={
              <AuthProtected isAdminRequired={true}>
                <ServicesForm />
              </AuthProtected>
            }
          />
          <Route
            path="/services/:id/edit"
            element={
              <AuthProtected isAdminRequired={true}>
                <ServicesForm />
              </AuthProtected>
            }
          />
          <Route
            path="/statuses/new"
            element={
              <AuthProtected isAdminRequired={true}>
                <StatusesForm />
              </AuthProtected>
            }
          />
          <Route
            path="/statuses/:id/edit"
            element={
              <AuthProtected isAdminRequired={true}>
                <StatusesForm />
              </AuthProtected>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </AuthContextProvider>
  );
}

export default App;
