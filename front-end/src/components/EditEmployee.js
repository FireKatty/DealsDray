import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const UpdateEmployee = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    courses: [], // Keep courses as an array
    file: null
  });

  const params = useParams();

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  const fetchEmployeeData = async () => {
    try {
      const response = await fetch(`http://localhost:9876/api/data/editdata/${params.id}`, {
        headers: { authorization: JSON.parse(localStorage.getItem('token')) }
      });
      const data = await response.json();
      console.log(data)
      setEmployee({ ...data, courses: Array.isArray(data.courses) ? data.courses : [] });
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

  const handleCourseChange = (event) => {
    const { value, checked } = event.target;
    // Automatically deselect the previously selected course
    const updatedCourses = checked ? [value] : [];
    setEmployee({ ...employee, courses: updatedCourses });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', employee.name);
    formData.append('email', employee.email);
    formData.append('mobile', employee.mobile);
    formData.append('designation', employee.designation);
    formData.append('gender', employee.gender);

    // Safely append courses to formData
    if (Array.isArray(employee.courses)) {
      employee.courses.forEach((course) => formData.append('courses', course));
    }

    if (employee.file) {
      formData.append('file', employee.file);
    }

    try {
      
      const response = await fetch(`http://localhost:9876/api/data/update/${params.id}`, {
        method: 'PUT',
        body: formData,
        headers: {
          authorization: JSON.parse(localStorage.getItem('token'))
        }
      });

      if (response.ok) {
        alert('Employee updated successfully.');
        setEmployee({
          name: '',
          email: '',
          mobile: '',
          designation: '',
          gender: '',
          courses: [],
          file: null
        });
        navigate("/add");
      } else {
        const errorData = await response.json();
        alert(`Failed to update employee. Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error updating employee:', error);
      alert('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div>
      <div className="header-row">
        <h2 className="header-title">Edit Employee</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="lebel">
          <label>Name:</label>
          <input type="text" name="name" value={employee.name} onChange={handleInputChange} required />
        </div>
        <div className="lebel">
          <label>Email:</label>
          <input type="email" name="email" value={employee.email} onChange={handleInputChange} required />
        </div>
        <div className="lebel">
          <label>Mobile No:</label>
          <input type="text" name="mobile" value={employee.mobile} onChange={handleInputChange} required />
        </div>
        <div className="lebel">
          <label className='designation-edit'>Designation:</label>
          <select className='select-edit' name="designation" value={employee.designation} onChange={handleInputChange} required>
            <option value="">Select</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>
        <div className="lebel">
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
          </div>
        </div>
        <div className="lebel">
          <label className='course'>Courses:</label>
          <div>
            {/* Checkboxes but only one can be selected at a time */}
            <label>
              <input type="checkbox" name="courses" value="MCA" checked={employee.courses.includes('MCA')} onChange={handleCourseChange} />
              MCA
            </label>
            <label>
              <input type="checkbox" name="courses" value="BCA" checked={employee.courses.includes('BCA')} onChange={handleCourseChange} />
              BCA
            </label>
            <label>
              <input type="checkbox" name="courses" value="BSC" checked={employee.courses.includes('BSC')} onChange={handleCourseChange} />
              BSC
            </label>
          </div>
        </div>
        <div className="lebel">
          <label>Image Upload:</label>
          <input type="file" accept="image/jpeg, image/png" onChange={handleFileChange} />
        </div>
        <div className="button-container">
          <button className="submit-button" type="submit">Update</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateEmployee;
