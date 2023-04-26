import React, { useEffect, useState } from 'react'

function NewSale() {

    const [Automobiles, setAutomobiles] = useState([]);
    const [Salespeople, setSalespeople] = useState([]);
    const [Customers, setCustomers] = useState([]);


    const [AutomobileVin, setAutomobile] = useState('')
    const [Salesperson, setSalesperson] = useState('')
    const [Customer, setCustomer] = useState('')
    const [Price, setPrice] = useState('');


    const fetchVIN = async () => {
        const response = await fetch('http://localhost:8090/api/automobiles/')

        if (response.ok) {
            const data = await response.json();
            setAutomobiles(data.autos)
        }
    }
    const FilteredAutos = Automobiles.filter((a) => a.sold === false)



    const fetchSalespeople = async () => {
        const response = await fetch('http://localhost:8090/api/salespeople/')

        if (response.ok) {
            const data = await response.json();
            setSalespeople(data.salespeople)
        }
    }

    const fetchCustomers = async () => {
        const response = await fetch('http://localhost:8090/api/customers/')

        if (response.ok) {
            const data = await response.json();
            setCustomers(data.customers)
        }
    }


    useEffect(() => {
        fetchSalespeople();
    }, []);

    useEffect(() => {
        fetchCustomers();
    }, []);

    useEffect(() => {
        fetchVIN();
    }, []);


    const handleAutoVinChange = (event) => {
        const value = event.target.value
        setAutomobile(value)
    }

    const handleSalespersonChange = (event) => {
        const value = event.target.value
        setSalesperson(value)
    }

    const handleCustomerChange = (event) => {
        const value = event.target.value
        setCustomer(value)
    }

    const handlePriceChange = (event) => {
        const value = event.target.value
        setPrice(value)
    }


    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = {}
        data.automobile = AutomobileVin
        data.salesperson = Salesperson
        data.customer = Customer
        data.price = Price

        const salesUrl = "http://localhost:8090/api/sales/"
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const response = await fetch(salesUrl, fetchConfig)

        if (response.ok) {
            const NewSale = await response.json()

            setAutomobile('')
            setSalesperson('')
            setCustomer('')
            setPrice('')
        }
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Record a Sale</h1>
                    <form onSubmit={handleSubmit} id="create-sales-form">



                        <div className="mb-3">
                            <select onChange={handleAutoVinChange} value={AutomobileVin} name="Automobile Vin" required id="Automobile Vin" className="form-select">
                                <option value="">Choose an automobile VIN</option>
                                {FilteredAutos.map(automobile => {
                                    return (
                                        <option key={automobile.id} value={automobile.vin}>
                                            {automobile.vin}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
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
                        <div className="mb-3">
                            <select onChange={handleCustomerChange} value={Customer} name="Customer" required id="Customer" className="form-select">
                                <option value="">Choose a customer</option>
                                {Customers.map(customer => {
                                    return (
                                        <option key={customer.id} value={customer.id}>
                                            {customer.first_name} {customer.last_name}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="mb-3">
                            <input onChange={handlePriceChange} value={Price} placeholder="Price" required type="number" name="Price" id="Price" className="form-control" />
                            <label htmlFor="Price"></label>
                        </div>


                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>)
}
export default NewSale