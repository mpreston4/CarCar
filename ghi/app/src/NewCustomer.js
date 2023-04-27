import React, { useEffect, useState } from 'react'

function NewCustomer() {

    const [FirstName, setFirstName] = useState('')
    const [LastName, setLastName] = useState('')
    const [Address, setAddress] = useState('')
    const [PhoneNumber, setPhoneNumber] = useState('')


    const handleFirstNameChange = (event) => {
        const value = event.target.value
        setFirstName(value)
    }

    const handleLastNameChange = (event) => {
        const value = event.target.value
        setLastName(value)
    }

    const handleAddressChange = (event) => {
        const value = event.target.value
        setAddress(value)
    }

    const handlePhoneNumberChange = (event) => {
        const value = event.target.value
        setPhoneNumber(value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = {}
        data.first_name = FirstName
        data.last_name = LastName
        data.address = Address
        data.phone_number = PhoneNumber

        const customerUrl = "http://localhost:8090/api/customers/"
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const response = await fetch(customerUrl, fetchConfig)

        if (response.ok) {
            const newCustomer = await response.json()

            setFirstName('')
            setLastName('')
            setAddress('')
            setPhoneNumber('')
        }
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Add a Customer</h1>
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
                            <input onChange={handleAddressChange} value={Address} placeholder="Adrress" required type="text" name="Adress" id="Adress" className="form-control" />
                            <label htmlFor="Adress">Adress</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handlePhoneNumberChange} value={PhoneNumber} placeholder="Phone Number" required type="text" name="Phone Number" id="Phone Number" className="form-control" />
                            <label htmlFor="Phone Number">Phone Number</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>)
}
export default NewCustomer