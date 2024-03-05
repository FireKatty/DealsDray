import React,{useState,useEffect} from "react"
import { Link, useNavigate } from "react-router-dom";

function Product() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [designation, setDesignation] = useState('');
  const [gender, setGender] = useState('');
  const [courses, setCourses] = useState([]);
  const [file, setFile] = useState(null);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('mobile', mobile);
    formData.append('designation', designation);
    formData.append('gender', gender);
    courses.forEach(course => formData.append('courses', course));
    formData.append('file', file);

    try {
        let result = await fetch('http://localhost:3000/create', {
        method: 'POST',
        body: formData,
        headers:{authorization:JSON.parse(localStorage.getItem('token'))}
      });

      if (result.ok) {
  
        const data = await result.json();
        
        console.log('API response:', data);
        setName('');
        setEmail('');
        setMobile('');
        setDesignation('');
        setGender('');
        setCourses('');
        setFile(null);
        alert("Employee Created successfully.")
      } else {
        alert("Please enter different email.")
        console.error('API error:', result.statusText);
      }
    } catch (error) {
  
    }
  };


  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
  
    if (selectedFile && (selectedFile.type === 'image/jpeg' || selectedFile.type === 'image/png')) {
      setFile(selectedFile);
    } else {
      alert('Please upload only JPG or PNG files.');
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label>Name:</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} required /><br/>

      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /><br/>

      <label>Mobile No:</label>
      <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} required /><br/>

      <label>Designation:</label>
      <select value={designation} onChange={(e) => setDesignation(e.target.value)} required>
        <option value="">Select</option>
        <option value="HR">HR</option>
        <option value="Manager">Manager</option>
        <option value="Sales">Sales</option>
      </select><br/>

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
      </div><br/>

      <label>Courses:</label>
      <div>
        <label>
          <input type="checkbox" value="MCA" checked={courses.includes('MCA')} onChange={() => setCourses([...courses, 'MCA'])} />
          MCA
        </label>
        <label>
          <input type="checkbox" value="BCA" checked={courses.includes('BCA')} onChange={() => setCourses([...courses, 'BCA'])} />
          BCA
        </label>
        <label>
          <input type="checkbox" value="BSC" checked={courses.includes('BSC')} onChange={() => setCourses([...courses, 'BSC'])} />
          BSC
        </label>
      </div><br/>

      <label>Image Upload:</label>
      <input type="file" accept="image/jpeg, image/png" onChange={handleFileChange} /><br/>

      <button  type="submit">Submit</button>
    </form>
  );
}

export default Product;
