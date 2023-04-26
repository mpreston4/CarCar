import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">Home</NavLink>
          <NavLink className="navbar-brand" to="/salespeople">Salespeople</NavLink>
          <NavLink className="navbar-brand" to="/salespeople/new">Add a salesperson</NavLink>
          <NavLink className="navbar-brand" to="/customers">Customers</NavLink>
          <NavLink className="navbar-brand" to="/customers/new">Add a customer</NavLink>
          <NavLink className="navbar-brand" to="/sales">Sales</NavLink>
          <NavLink className="navbar-brand" to="/sales/new">Add a sale</NavLink>
          <NavLink className="navbar-brand" to="/sales/history">Salesperson History</NavLink>
          <NavLink className="navbar-brand" to="/manufacturers">Manufacturers</NavLink>
          <NavLink className="navbar-brand" to="/automobiles">Automobile List</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>

      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/manufacturers/new">Create a Manufacturer</NavLink>
          <NavLink className="navbar-brand" to="/models">Models</NavLink>
          <NavLink className="navbar-brand" to="/models/new">Create a Model</NavLink>
          <NavLink className="navbar-brand" to="/technician">Technician List</NavLink>
          <NavLink className="navbar-brand" to="/technician/new/">Add a Technician</NavLink>
          <NavLink className="navbar-brand" to="/appointments/">Appointment List</NavLink>
          <NavLink className="navbar-brand" to="/appointments/new/">Add an Appointment</NavLink>
          <NavLink className="navbar-brand" to="/servicehistory/">Service History</NavLink>
          <NavLink className="navbar-brand" to="/automobiles/new">Create an Automobile</NavLink>

        </div>
      </nav>
    </>
  )
}

export default Nav;
