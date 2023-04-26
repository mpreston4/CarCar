import React, { useEffect, useState } from 'react'

function NewSalesperson() {

    const [FirstName, setFirstName] = useState('')
    const [LastName, setLastName] = useState('')
    const [EmployeeId, setEmployeeId] = useState('')


    const handleFirstNameChange = (event) => {
        const value = event.target.value
        setFirstName(value)
    }

    const handleLastNameChange = (event) => {
        const value = event.target.value
        setLastName(value)
    }

    const handleEmployeeIdChange = (event) => {
        const value = event.target.value
        setEmployeeId(value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = {}
        data.first_name = FirstName
        data.last_name = LastName
        data.employee_id = EmployeeId

        const salespersonUrl = "http://localhost:8090/api/salespeople/"
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const response = await fetch(salespersonUrl, fetchConfig)

        if (response.ok) {
            const newSalesperson = await response.json()

            setFirstName('')
            setLastName('')
            setEmployeeId('')
        }
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Add a Salesperson</h1>
                    <form onSubmit={handleSubmit} id="create-location-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleFirstNameChange} value={FirstName} placeholder="First Name" required type="text" name="First Name" id="First Name" className="form-control" />
                            <label htmlFor="First Name">First Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleLastNameChange} value={LastName} placeholder="Last Name" required type="text" name="Last Name" id="Last Name" className="form-control" />
                            <label htmlFor="Last Name">Last Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleEmployeeIdChange} value={EmployeeId} placeholder="Employee Id" required type="text" name="Employee Id" id="Employee Id" className="form-control" />
                            <label htmlFor="Employee Id">Employee Id</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>)
}
export default NewSalesperson