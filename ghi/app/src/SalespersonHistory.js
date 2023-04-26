import React, { useEffect, useState } from 'react';

function SalesHistoryList() {
    const [Sales, setSales] = useState([])

    const getData = async () => {
        const response = await fetch("http://localhost:8090/api/sales/")

        if (response.ok) {
            const data = await response.json()
            setSales(data.sales)
        }
    }

    const [Salespeople, setSalespeople] = useState([]);
    const [Salesperson, setSalesperson] = useState('')
    const getSalespeople = async () => {
        const response = await fetch('http://localhost:8090/api/salespeople/')

        if (response.ok) {
            const data = await response.json();
            setSalespeople(data.salespeople)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        getSalespeople()
    }, [])

    const handleSalespersonChange = (event) => {
        const value = event.target.value
        setSalesperson(value)
    }

    return (

        <div className="container">
            <div>
                <h1>Salesperson History</h1>
                <div className="mb-3">
                    <select onChange={handleSalespersonChange} value={Salesperson} name="Salesperson" required id="Salesperson" className="form-select">
                        <option value="">Choose a salesperson</option>
                        {Salespeople.map(salesperson => {
                            return (
                                <option key={salesperson.id} value={salesperson.employee_id}>
                                    {salesperson.employee_id}
                                </option>
                            )
                        })}
                    </select>
                </div>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Salesperson</th>
                        <th>Customer</th>
                        <th>VIN</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {Sales.filter(sale => sale.salesperson.employee_id === Salesperson)
                        .map(sale => {
                            return (
                                <tr key={sale.id}>
                                    <td>{sale.salesperson.first_name} {sale.salesperson.last_name}</td>
                                    <td>{sale.customer.first_name} {sale.customer.last_name}</td>
                                    <td>{sale.automobile.vin}</td>
                                    <td>{sale.price}</td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    )
}

export default SalesHistoryList;