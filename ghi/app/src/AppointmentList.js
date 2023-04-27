import React, { useEffect, useState } from 'react';

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [automobiles, setAutomobiles] = useState([]);

  const getAppointments = async () => {
    const response = await fetch("http://localhost:8080/api/appointments/");
    if (response.ok) {
      const data = await response.json();
      setAppointments(data.appointments);
    }
  };

  const getAutomobiles = async () => {
    const url = 'http://localhost:8080/api/automobiles/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setAutomobiles(data.automobiles);
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


  const handleCancel = async (event) => {
    const id = event.target.id;
    const response = await fetch(`http://localhost:8080/api/appointments/${id}/cancel`, {
      method: "PUT",
      body: JSON.stringify({ status: "created" }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      setAppointments((prev) => prev.filter((app) => app.id !== parseInt(id)));
    }
  };

  const handleFinish = async (event) => {
    const id = event.target.id;
    const response = await fetch(`http://localhost:8080/api/appointments/${id}/finish`, {
      method: "PUT",
      body: JSON.stringify({ status: "created" }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      setAppointments((prev) => prev.filter((app) => app.id !== parseInt(id)));
    }
  }
  useEffect(() => {
    getAppointments();
    getAutomobiles();
  }, []);
  const filteredAppointments = appointments.filter(app => app.status === "created");

  return (
    <div className="container">
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
          </tr>
        </thead>
        <tbody>
          {filteredAppointments.map((app) => {
            return (
              <tr key={app.id}>
                <td>{app.vin}</td>
                {isVip(app.vin)}
                <td>{app.customer}</td>
                <td>{app.date}</td>
                <td>{app.time}</td>
                <td>{app.technician.first_name}</td>
                <td>{app.reason}</td>
                <td>
                  <button className="btn btn-danger" id={app.id} onClick={handleCancel}>
                    Cancel
                  </button>
                  <button className="btn btn-success" id={app.id} onClick={handleFinish}>
                    Finish
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default AppointmentList
