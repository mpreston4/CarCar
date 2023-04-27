import React, { useEffect, useState } from 'react';

function ModelList() {
    const [Models, setModels] = useState([])

    const getData = async () => {
        const response = await fetch("http://localhost:8100/api/models/")

        if (response.ok) {
            const data = await response.json()
            setModels(data.models)
        }

    }

    useEffect(() => {
        getData()
    }, [])



    return (
        <div className="container">
            <h1>Models</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Manufacturer</th>
                        <th>Picture</th>
                    </tr>
                </thead>
                <tbody>
                    {Models.map(model => {
                        return (
                            <tr key={model.id}>
                                <td>{model.name}</td>
                                <td>{model.manufacturer.name}</td>
                                <td><img style={{ width: 500, height: 400 }} className="card-img-top" src={model.picture_url} /></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ModelList;