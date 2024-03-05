
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

      const response = await fetch('http://localhost:3000/list',{
        headers:{authorization:JSON.parse(localStorage.getItem('token'))}
      });
      const data = await response.json();
      setEmployees(data);
      setFilteredEmployees(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const filteredResults = employees.filter(employee =>
      employee.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredEmployees(filteredResults);
  };

  // const navigate = useNavigate();
  // const handleEdit = (id) => {
  //   navigate('/updateproduct')
  // };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/delete/${id}`, {
        method: 'DELETE',
        headers:{authorization:JSON.parse(localStorage.getItem('token'))}
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
    <div>
      <input
        type="text"
        className="search-bar"
        placeholder="Search by Name"
        value={searchTerm}
        onChange={handleSearch}
      />
      <p>Total Results: {filteredEmployees.length}</p>
      <table>
        <thead>
          <tr>
            <th>ID</th>
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
          {filteredEmployees.map(employee => (
            <tr key={employee.id}>
              <td>{employee._id}</td>
              <td><img src={employee.image} alt={employee.name} /></td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.mobile}</td>
              <td>{employee.designation}</td>
              <td>{employee.gender}</td>
              <td>{employee.courses.join(', ')}</td>
              <td>{employee.createDate}</td>
              <td>
                {/* <button onClick={() => handleEdit(employee._id)}>Edit</button> */}
                <button ><Link to={"/update/"+employee._id}>Edit</Link></button>
              
                <button onClick={() => handleDelete(employee._id)}><Link>Delete</Link></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;
