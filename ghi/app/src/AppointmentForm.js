import React, {useEffect, useState } from 'react';


function AppointmentForm() {
    const [technicians, setTechnician] = useState([])
    const [vin, setVin] = useState("")
    const [customer, setCustomer] = useState("")
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [reason, setReason] = useState("")
    const [technician, setTech] = useState("")

    const handleVin = (event) => {
        const value = event.target.value
        setVin(value)
    }

    const handleCustomer = (event) => {
        const value = event.target.value
        setCustomer(value)
    }

    const handleDate = (event) => {
        const value = event.target.value
        setDate(value)
    }

    const handleTime = (event) => {
        const value = event.target.value
        setTime(value)
    }

    const handleReason= (event) => {
        const value = event.target.value
        setReason(value)
    }

    const handleTechnican= (event) => {
        const value = event.target.value
        setTech(value)
    }

    const fetchData = async () => {
        const url = 'http://localhost:8080/api/technicians/';
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setTechnician(data.technicians);
        }
      }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.vin = vin;
        data.customer = customer;
        data.technician = technician;
        data.date = date
        data.time = time
        data.reason = reason
        data.status = "created"
  
        const appointmentUrl = 'http://localhost:8080/api/appointments/'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'applicaiton/json',
            },
        }

        const response = await fetch(appointmentUrl, fetchConfig);
        if (response.ok){
            const newAppointment = await response.json();
            console.log(newAppointment);

            setVin('');
            setCustomer('');
            setDate('');
            setTime('');
            setReason('');
            setTech('');
        }
    }
      useEffect(() => {
        fetchData();
      }, []);
    
      return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new Appointment!</h1>
            <form onSubmit={handleSubmit} id="create-conference-form">
              <div className="form-floating mb-3">
                <input onChange={handleVin} value={vin} placeholder="vin" required type="text" name="vin" id="vin" className="form-control"/>
                <label htmlFor="vin">Automobile VIN</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleCustomer} value={customer} placeholder="customer" required type="text" name = "customer" id="customer" className="form-control"/>
                <label htmlFor="customer">Customer</label>
              </div>
              <div className="form-floating mb-3">
                <input  onChange={handleDate} value={date} placeholder="date" required type="date" name = "date" id="date" className="form-control"/>
                <label htmlFor="date">Date</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleTime} value={time} placeholder="time" required type="time" name = "time" id="time" className="form-control"/>
                <label htmlFor="time">Time</label>
              </div>
              <div className="mb-3">
                <select onChange={handleTechnican} value={technician} required id="technician"  name = "technician" className="form-select">
                  <option>Choose a Technician</option>
                    {technicians.map(technician => {
                    return (
                        <option key={technician.id} value={technician.first_name}>
                            {technician.first_name}
                        </option>
                    )
                })}
                </select>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleReason} value={reason} placeholder="reason" required type="text" name = "reason" id="reason" className="form-control"/>
                <label htmlFor="room_count">Reason</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
}
export default AppointmentForm