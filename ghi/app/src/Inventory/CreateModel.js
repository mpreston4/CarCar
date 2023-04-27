import React, { useEffect, useState } from 'react'

function CreateModel() {


    const [Manufacturers, setManufacturers] = useState([]);
    const [Manufacturer, setManufacturer] = useState('');
    const [PictureUrl, setPictureUrl] = useState('')
    const [Model, setModel] = useState('')


    const fetchManufacturers = async () => {
        const response = await fetch('http://localhost:8100/api/manufacturers/')
        if (response.ok) {
            const data = await response.json();
            setManufacturers(data.manufacturers)
        }
    }

    useEffect(() => {
        fetchManufacturers();
    }, []);

    const handleModelChange = (event) => {
        const value = event.target.value
        setModel(value)
    }

    const handlePictureUrlChange = (event) => {
        const value = event.target.value
        setPictureUrl(value)
    }

    const handleManufacturerChange = (event) => {
        const value = event.target.value
        setManufacturer(value)
    }




    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = {}
        data.name = Model
        data.picture_url = PictureUrl
        data.manufacturer_id = Manufacturer

        const modelsUrl = "http://localhost:8100/api/models/"
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const response = await fetch(modelsUrl, fetchConfig)

        if (response.ok) {
            const CreateModel = await response.json()
            setModel('')
            setPictureUrl('')
            setManufacturer('')

        }
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a Vehicle Model</h1>
                    <form onSubmit={handleSubmit} id="create-location-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleModelChange} value={Model} placeholder="Model" required type="text" name="Model" id="Model" className="form-control" />
                            <label htmlFor="Model">Model</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handlePictureUrlChange} value={PictureUrl} placeholder="PictureUrl" required type="text" name="PictureUrl" id="PictureUrl" className="form-control" />
                            <label htmlFor="PictureUrl">Picture Url</label>
                        </div>
                        <div className="mb-3">
                            <select onChange={handleManufacturerChange} value={Manufacturer} name="Manufacturer" required id="Manufacturer" className="form-select">
                                <option value="">Choose a Manufacturer</option>
                                {Manufacturers.map(manufacturer => {
                                    return (
                                        <option key={manufacturer.id} value={manufacturer.id}>
                                            {manufacturer.name}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>)
}
export default CreateModel