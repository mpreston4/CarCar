import React, { useEffect, useState } from 'react'

function NewManufacturer() {

    const [Manufacturer, setManufacturer] = useState('')


    const handleManufacturerChange = (event) => {
        const value = event.target.value
        setManufacturer(value)
    }


    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = {}
        data.name = Manufacturer

        const manufacturerUrl = "http://localhost:8100/api/manufacturers/"
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const response = await fetch(manufacturerUrl, fetchConfig)

        if (response.ok) {
            const NewManufacturer = await response.json()
            setManufacturer('')

        }
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a Manufacturer</h1>
                    <form onSubmit={handleSubmit} id="create-location-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleManufacturerChange} value={Manufacturer} placeholder="Manufacturer" required type="text" name="Manufacturer" id="Manufacturer" className="form-control" />
                            <label htmlFor="Manufacturer">Manufacturer Name</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>)
}
export default NewManufacturer