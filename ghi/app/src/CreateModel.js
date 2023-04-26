import React, { useEffect, useState } from 'react'

function CreateModel() {

    const [Model, setModel] = useState('')


    const handleModelChange = (event) => {
        const value = event.target.value
        setModel(value)
    }


    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = {}
        data.name = Model

        const manufacturerUrl = "http://localhost:8100/api/models/"
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const response = await fetch(manufacturerUrl, fetchConfig)

        if (response.ok) {
            const CreateModel = await response.json()
            setModel('')

        }
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a Model</h1>
                    <form onSubmit={handleSubmit} id="create-location-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleModelChange} value={Model} placeholder="Model" required type="text" name="Model" id="Model" className="form-control" />
                            <label htmlFor="Model">Model</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>)
}
export default CreateModel