import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import TechnicianList from './Services/TechnicianList';
import TechnicianForm from './Services/TechnicianForm';
import AppointmentList from './Services/AppointmentList'
import AppointmentForm from './Services/AppointmentForm';
import History from './Services/History';
import SalespeopleList from './Sales/SalespeopleList';
import NewSalesperson from './Sales/NewSalesperson';
import NewCustomer from './Sales/NewCustomer';
import CustomersList from './Sales/CustomersList';
import SalesList from './Sales/SalesList';
import NewSale from './Sales/NewSale';
import SalesHistoryList from './Sales/SalespersonHistory';
import ManufacturerList from './Inventory/MaufacturersList'
import NewManufacturer from './Inventory/CreateManufacturer';
import ModelList from './Inventory/ModelsList';
import CreateModel from './Inventory/CreateModel';
import AutomobileList from './Inventory/Automobilelist';
import AutomobileForm from './Inventory/AutomobileForm';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/technician">
            <Route index element={<TechnicianList />} />
            <Route path="new" element={<TechnicianForm />} />
          </Route>
          <Route path="/appointments">
            <Route index element={<AppointmentList />} />
            <Route path="new" element={<AppointmentForm />} />
          </Route>
          <Route path="/servicehistory">
            <Route index element={<History />} />
          </Route>
          <Route path='/'>
            <Route index element={<MainPage />} />
            <Route path="manufacturers" element={<ManufacturerList />} />
            <Route path="manufacturers/new" element={<NewManufacturer />} />
          </Route>
          <Route path="/models">
            <Route index element={<ModelList />} />
            <Route path="/models/new" element={<CreateModel />} />
          </Route>
          <Route path='/salespeople'>
            <Route index element={<SalespeopleList />} />
            <Route path="new" element={<NewSalesperson />} />
          </Route>
          <Route path='/customers'>
            <Route index element={<CustomersList />} />
            <Route path="new" element={<NewCustomer />} />
          </Route>
          <Route path='/sales'>
            <Route index element={<SalesList />} />
            <Route path="new" element={<NewSale />} />
            <Route path="history" element={<SalesHistoryList />} />
          </Route>
          <Route path='/automobiles'>
            <Route index element={<AutomobileList />} />
            <Route path="new" element={<AutomobileForm />} />

          </Route>
        </Routes>


      </div>
    </BrowserRouter>
  );
}
export default App;
