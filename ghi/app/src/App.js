import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import SalespeopleList from './SalespeopleList';
import NewSalesperson from './NewSalesperson';
import NewCustomer from './NewCustomer';
import CustomersList from './CustomersList';
import SalesList from './SalesList';
import NewSale from './NewSale';
import SalesHistoryList from './SalespersonHistory';
import ManufacturerList from './MaufacturersList'
import NewManufacturer from './CreateManufacturer';
import ModelList from './ModelsList';
// import ManufacturerList from './MaufacturersList'


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path='/'>
            <Route index element={<MainPage />} />
            <Route path="manufacturers" element={<ManufacturerList />} />
            <Route path="manufacturers/new" element={<NewManufacturer />} />
          </Route>
          <Route path="/models">
            <Route index element={<ModelList />} />
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

        </Routes>


      </div>
    </BrowserRouter>
  );
}

export default App;
