
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:9876/api/data/list', {
        headers: { authorization: JSON.parse(localStorage.getItem('token')) }
      });
      const data = await response.json();
      console.log(data)

      if (Array.isArray(data)) {
        setEmployees(data);
        setFilteredEmployees(data);
      } else {
        setEmployees([]);
        setFilteredEmployees([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setEmployees([]);
      setFilteredEmployees([]);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    

    const filteredResults = employees.filter(employee =>
      employee.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredEmployees(filteredResults);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:9876/api/data/delete/${id}`, {
        method: 'DELETE',
        headers: { authorization: JSON.parse(localStorage.getItem('token')) }
      });
      if (response.ok) {
        fetchData();
      } else {
        console.error('Error deleting employee:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <div className="employee-list-container">
      <div className="header-row">
        <h2 className="header-title">Employee List</h2>
      </div>
      
      <div className='total-count'>
        <p className="">Total Count: {filteredEmployees.length}</p>
        <div className="employee">
          <button type='submit' className="create-employee-btn">
            <Link to={`/create`}>Create Employee</Link>
          </button>
        </div>
      </div>

      <div className='total-count'>
        <p className="p">Search</p>
        <div className="count">
          <input
            type="text"
            className="search-bar"
            placeholder="Enter Search Keyword"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      <table className="employee-table">
        <thead>
          <tr>
            <th>Unique Id</th>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile No</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Course</th>
            <th>Create Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* Ensure filteredEmployees is always an array before mapping */}
          {Array.isArray(filteredEmployees) && filteredEmployees.length > 0 ? (
            filteredEmployees.map(employee => (
              <tr key={employee._id}>
                <td>{employee._id}</td>
                <td><img src={employee.image} alt={employee.name} className="employee-image" /></td>
                <td>{employee.name}</td>
                <td><a href={`mailto:${employee.email}`}>{employee.email}</a></td>
                <td>{employee.mobile}</td>
                <td>{employee.designation}</td>
                <td>{employee.gender === 'M' ? 'Male' : 'Female'}</td>
                <td>{employee.courses.join(', ')}</td>
                <td>{new Date(employee.createDate).toLocaleDateString()}</td>
                <td>
                  <button className="edit-btn">
                    <Link to={`/update/${employee._id}`}>Edit</Link>
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(employee._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10">No employees found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;
