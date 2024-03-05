import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const UpdateEmployee = ()=> {
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    courses: [],
    file: null
  });

  const params = useParams();
  useEffect(() => {
    fetchEmployeeData();
  },[]);
  const fetchEmployeeData = async () => {
      try {
        console.log(params.id)
        const response = await fetch(`http://localhost:3000/data/${params.id}`,{
          headers:{authorization:JSON.parse(localStorage.getItem('token'))}
        });
        const data = await response.json();
        setEmployee(data);

      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };






  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setEmployee({ ...employee, file: selectedFile });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const formData = new FormData();
    // formData.append('name', employee.name);
    const name = employee.name;
    // formData.append('email', employee.email);
    const email = employee.email;
    // formData.append('mobile', employee.mobile);
    const mobile = employee.mobile;
    // formData.append('designation', employee.designation);
    const designation = employee.designation;
    // formData.append('gender', employee.gender);
    const gender = employee.gender;
    // formData.append('courses',employee.courses[0])
    const courses = employee.courses[0];
    // employee.courses.forEach(course => formData.append('courses', course));
    // formData.append('file', employee.file);
    const file = employee.file;
    // console.log(formData)
    try {
      const response = await fetch(`http://localhost:3000/update/${params.id}`, {
        method: 'PUT',
        body: JSON.stringify({name,email,mobile,designation,gender,courses,file}),
        headers:{'content-Type':"application/json",authorization:JSON.parse(localStorage.getItem('token'))}
    });
    
      if (response.ok) {
        console.log(response)
        setEmployee({
          name: '',
          email: '',
          mobile: '',
          designation: '',
          gender: '',
          courses: [],
          file: null
        });
        
        // setName('');
        // setEmail('');
        // setMobile('');
        // setDesignation('');
        // setGender('');
        // setCourses('');
        // setFile(null);
        alert('Employee updated successfully.');
      } else {
    
        alert('Failed to update employee. Please try again later.');
      }
    } catch (error) {
      console.error('Error updating employee:', error);
      alert('Failed to update employee. Please try again later.');
    }
  };

  return (
    <div>
      <h2>Employee Edit</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={employee.name} onChange={handleInputChange} required /> <br/>

        <label>Email:</label>
        <input type="email" name="email" value={employee.email} onChange={handleInputChange} required /><br/>

        <label>Mobile No:</label>
        <input type="text" name="mobile" value={employee.mobile} onChange={handleInputChange} required /><br/>

        <label>Designation:</label>
        <select name="designation" value={employee.designation} onChange={handleInputChange} required>
          <option value="">Select</option>
          <option value="HR">HR</option>
          <option value="Manager">Manager</option>
          <option value="Sales">Sales</option>
        </select><br/>

        <label>Gender:</label>
        <div>
          <label>
            <input type="radio" name="gender" value="M" checked={employee.gender === 'M'} onChange={handleInputChange} />
            Male
          </label>
          <label>
            <input type="radio" name="gender" value="F" checked={employee.gender === 'F'} onChange={handleInputChange} />
            Female
          </label>
        </div><br/>

        <label>Courses:</label>
        <div>
          <label>
            <input type="checkbox" name="courses" value="MCA" checked={employee.courses.includes('MCA')} onChange={handleInputChange} />
            MCA
          </label>
          <label>
            <input type="checkbox" name="courses" value="BCA" checked={employee.courses.includes('BCA')} onChange={handleInputChange} />
            BCA
          </label>
          <label>
            <input type="checkbox" name="courses" value="BSC" checked={employee.courses.includes('BSC')} onChange={handleInputChange} />
            BSC
          </label>
        </div><br/>

        <label>Image Upload:</label>
        <input type="file" accept="image/jpeg, image/png" onChange={handleFileChange} />

        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateEmployee;
