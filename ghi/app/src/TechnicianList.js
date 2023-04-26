import React, { useEffect, useState } from 'react';

function TechnicanList() {
  const [Technicans, setTechnician] = useState([]);

  const getData = async () => {
    const response = await fetch("http://localhost:8080/api/technicians/");
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setTechnician(data.technicians);
    }
  };


  useEffect(() => {
    getData();
  }, []);


  return (
    <div className="container">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {Technicans.map((tech) => {
            return (
              <tr key={tech.id}>
                <td>{tech.employee_id}</td>
                <td>{tech.first_name}</td>
                <td>{tech.last_name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TechnicanList;