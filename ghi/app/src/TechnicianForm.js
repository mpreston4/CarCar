import React, { useState } from 'react';
function TechnicianForm() {
    const [first_name, setFirstName] = useState("")
    const [last_name, SetLastName] = useState("")
    const [employee_id, setEmployeeID] = useState("")

    const handleFirstName = (event) => {
        const value = event.target.value
        setFirstName(value)
    }
    const handleLastName = (event) => {
        const value = event.target.value
        SetLastName(value)
    }
    const handleEmployeeID = (event) => {
        const value = event.target.value
        setEmployeeID(value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.first_name = first_name;
        data.last_name = last_name;
        data.employee_id = employee_id;
  
        const technicianUrl = 'http://localhost:8080/api/technicians/'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'applicaiton/json',
            },
        }

        const response = await fetch(technicianUrl, fetchConfig);
        if (response.ok){
            const newTechnician = await response.json();
            console.log(newTechnician);

            setFirstName('');
            SetLastName('');
            setEmployeeID('');

        }
    }

    return (
    <div className="row">
    <div className="offset-3 col-6">
    <div className="shadow p-4 mt-4">
        <h1>Create a new Hat</h1>
        <form onSubmit={handleSubmit} id="create-technician-form">
        <div className="form-floating mb-3">
            <input onChange={handleFirstName} value={first_name} placeholder="first_name" required type="text" name="first_name" id="first_name" className="form-control"/>
            <label htmlFor="style_name">First Name</label>
        </div>
        <div className="form-floating mb-3">
            <input onChange={handleLastName} value={last_name} placeholder="last_name" required type="text" name = "last_name" id="last_name" className="form-control"/>
            <label htmlFor="">Last Name</label>
        </div>
        <div className="form-floating mb-3">
            <input onChange={handleEmployeeID} value={employee_id} placeholder="employee_id" required type="text" name = "employee_id" id="employee_id" className="form-control"/>
            <label htmlFor="Color">Employee ID</label>
        </div>
        <button className="btn btn-primary">Create</button>
        </form>
    </div>
    </div>
    </div>
    );
}
export default TechnicianForm;