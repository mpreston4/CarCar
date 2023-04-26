import React, { useEffect, useState } from 'react';

function History() {
  const [appointments, setAppointment] = useState([]);
  const [automobiles, setAutomobile] = useState([]);
  const [filtervalue, setFiltervalue] = useState("")

  const Handlefiltervaluechange= (event) => {
    const value = event.target.value
    setFiltervalue(value)
  }  
  const getData = async () => {
    const response = await fetch("http://localhost:8080/api/appointments/");
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setAppointment(data.appointments);
    }
  };

  const fetchAutomobiles = async () => {
    const url = 'http://localhost:8080/api/automobiles/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setAutomobile(data.automobiles);
    }
  };

  const isVip = (vin) => {
    for (let i = 0; i < automobiles.length; i++) {
      if (automobiles[i].vin === vin) {
        return <td>Yes</td>;
      }
    }
    return <td>No</td>;
  };

  useEffect(() => {
    getData();
    fetchAutomobiles();
  }, []);

  return (
    <div className="container">
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px'}}>
        <h1>Service History </h1>
      </div>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px'}}>
        <input onChange={Handlefiltervaluechange} value={filtervalue} placeholder="Type in a VIN" style={{width: '300px'}} /> 
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>VIN</th>
            <th>Is VIP?</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Time</th>
            <th>Technician</th>
            <th>Reason</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.filter(app => app.vin.includes(filtervalue))
          .map((app) => {
            return (
              <tr key={app.id}>
                <td>{app.vin}</td>
                {isVip(app.vin)}
                <td>{app.customer}</td>
                <td>{app.date}</td>
                <td>{app.time}</td>
                <td>{app.technician.first_name}</td>
                <td>{app.reason}</td>
                <td>{app.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

}
export default History;