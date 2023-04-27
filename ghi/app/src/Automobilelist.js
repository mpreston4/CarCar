import React, { useEffect, useState } from 'react';

function AutomobileList() {
  const [automobiles, setAutomobile] = useState([])
  const getData = async () => {
    const response = await fetch("http://localhost:8100/api/automobiles/")
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setAutomobile(data.autos)
    }
  }
  const isSold = (sold) => {
    if (sold) {
      return <td> Yes</td>
    }
    return <td>No</td>
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container">
      <h1>Automobiles</h1>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>VIN</th>
            <th>color</th>
            <th>year</th>
            <th>Model</th>
            <th>Manufacturer</th>
            <th>Sold</th>
          </tr>
        </thead>
        <tbody>
          {automobiles.map((auto) => {
            return (
              <tr key={auto.id}>
                <td>{auto.vin}</td>
                <td>{auto.color}</td>
                <td>{auto.year}</td>
                <td>{auto.model.name}</td>
                <td>{auto.model.manufacturer.name}</td>
                {isSold(auto.sold)}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AutomobileList;