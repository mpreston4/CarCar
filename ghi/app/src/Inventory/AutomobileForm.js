import React, { useEffect, useState } from 'react';

function AutomobileForm() {

    const [models, setModel] = useState([]);
    const [vin, setVin] = useState("");
    const [color, setColor] = useState("");
    const [year, setYear] = useState("");
    const [model, setModels] = useState("");

    const handleVin = (event) => {
        const value = event.target.value
        setVin(value);
    }

    const handleColor = (event) => {
        const value = event.target.value
        setColor(value);
    }

    const handleYear = (event) => {
        const value = event.target.value
        setYear(value);
    }

    const handleModel = (event) => {
        const value = event.target.value
        setModels(value);
    }

    const fetchData = async () => {
        const url = 'http://localhost:8100/api/models/'
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setModel(data.models);
        }
    }
    const handlesubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.color = color
        data.vin = vin
        data.model_id = model
        data.year = year

        const automobileUrl = 'http://localhost:8100/api/automobiles/'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'applicaiton/json',
            },
        }
        const response = await fetch(automobileUrl, fetchConfig);
        if (response.ok) {
            const newAutomobiles = await response.json();
            console.log(newAutomobiles);
            setVin('');
            setColor('');
            setYear('');
            setModels('');

        }
    }
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Add an Automobile to the Inventory</h1>
                    <form onSubmit={handlesubmit} id="create-technician-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleColor} value={color} placeholder="color" required type="text" name="color" id="color" className="form-control" />
                            <label htmlFor="color">Color</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleYear} value={year} placeholder="year" required type="text" name="year" id="year" className="form-control" />
                            <label htmlFor="year">Year</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleVin} value={vin} placeholder="vin" required type="text" name="vin" id="vin" className="form-control" />
                            <label htmlFor="vin">Vin</label>
                        </div>
                        <div className="mb-3">
                            <select onChange={handleModel} value={model} required name="model" id="model" className="form-select">
                                <option value="">Choose a model</option>
                                {models.map(mod => {
                                    return (
                                        <option key={mod.id} value={mod.id}>
                                            {mod.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AutomobileForm;