import React, { useState } from "react";

function Product() {
  const [ name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [designation, setDesignation] = useState('');
  const [gender, setGender] = useState('');
  const [course, setCourse] = useState(''); // Track only one selected course
  const [file, setFile] = useState(null);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('mobile', mobile);
    formData.append('designation', designation);
    formData.append('gender', gender);
    formData.append('course', course); // Send the selected course
    formData.append('file', file);

    try {
      let result = await fetch('http://localhost:9876/api/data/create', {
          method: 'POST',
          body: formData,
          headers: {
              authorization: JSON.parse(localStorage.getItem('token'))
          }
      });
  
      if (result.ok) {
          const data = await result.json();
          console.log('API response:', data);
  
          // Clear form fields after successful creation
          setName('');
          setEmail('');
          setMobile('');
          setDesignation('');
          setGender('');
          setCourse(''); // Clear selected course
          setFile(null);
  
          alert("Employee created successfully.");
          return;
      }

      const errorData = await result.json();
      alert("An error occurred: " + errorData.error);
  
    } catch (error) {
      console.error('Fetch error:', error);
      alert("Something went wrong. Please try again later.");
    }
  }

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
  
    if (selectedFile && (selectedFile.type === 'image/jpeg' || selectedFile.type === 'image/png')) {
      setFile(selectedFile);
    } else {
      alert('Please upload only JPG or PNG files.');
    }
  };

  const handleCourseChange = (selectedCourse) => {
    setCourse(selectedCourse); // Update the selected course
  };

  return (
    <div>
      <header className="header-row">
        <h2 className="header-title">Create Employee</h2>
      </header>
  
      <form onSubmit={handleFormSubmit}>
        <div className="">
          <div className="lebel">
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required /><br />
          </div>

          <div className="lebel">
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /><br />
          </div>

          <div className="lebel">
            <label>Mobile No:</label>
            <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} required /><br />
          </div>

          <div className="lebel">
            <label className="designation">Designation:</label>
            <select  className="select" value={designation} onChange={(e) => setDesignation(e.target.value)} required>
              <option value="">Select</option>
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </select>
          </div><br />

          <div className="lebel">
            <label>Gender:</label>
            <div>
              <label>
                <input type="radio" name="gender" value="M" checked={gender === 'M'} onChange={() => setGender('M')} />
                Male
              </label>
              <label>
                <input type="radio" name="gender" value="F" checked={gender === 'F'} onChange={() => setGender('F')} />
                Female
              </label>
            </div>
          </div><br />

          <div className="lebel">
            <label className="course">Courses:</label>
            <div>
              <label>
                <input
                  type="checkbox"
                  value="MCA"
                  checked={course === 'MCA'}
                  onChange={() => handleCourseChange(course === 'MCA' ? '' : 'MCA')}
                />
                MCA
              </label>
              <label>
                <input
                  type="checkbox"
                  value="BCA"
                  checked={course === 'BCA'}
                  onChange={() => handleCourseChange(course === 'BCA' ? '' : 'BCA')}
                />
                BCA
              </label>
              <label>
                <input
                  type="checkbox"
                  value="BSC"
                  checked={course === 'BSC'}
                  onChange={() => handleCourseChange(course === 'BSC' ? '' : 'BSC')}
                />
                BSC
              </label>
            </div>
          </div><br />

          <div className="lebel">
            <label>Image Upload:</label>
            <input type="file" accept="image/jpeg, image/png" onChange={handleFileChange} /><br />
          </div>
          
          <div className="button-container">
            <button className="submit-button" type="submit">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Product;
