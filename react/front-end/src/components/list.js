import React,{useState,useEffect} from "react"
import { Link, useNavigate } from "react-router-dom";

// const List = ()=>{
//     const [product,setProduct] = useState([]);
//     const navigate = useNavigate();
//     useEffect(()=>{
//         getproduct();
//     },[])

//     const getproduct = async()=>{
//         let result = await fetch("http://localhost:5050/list",{
//             headers:{
//                 authorization:JSON.parse(localStorage.getItem('token'))
//             }
//         })
//         result = await result.json()
//         setProduct(result);
//     }

//     // console.warn("Products",product);
//     const Deleteproduct = async(id)=>{
//         let result = await fetch(`http://localhost:5050/delete/${id}`,{
//             method:'Delete',
//             headers:{
//                 authorization:JSON.parse(localStorage.getItem('token'))
//             }
//         });
//         result =await result.json()
//         if(result){
//             getproduct();    
//         }
//     }

//     const searchbar = async(event)=>{
//         let key = event.target.value;
//         if(key){
//             let result = await fetch(`http://localhost:5050/search/${key}`,
//             {headers:{
//                 authorization:JSON.parse(localStorage.getItem('token'))
//             }
//             })
//             result = await result.json();
//             if(result){
//                 setProduct(result)
//             }
//         }else{
//             getproduct();
//         }
//     }
    


//     return(
//         <div className="product-list">
            
//             <h1>List</h1>
//             <input className="search-box" type="text" placeholder="Search Products" 
//                 onChange={searchbar}
//             />
//             <ul>
//                 <li>S.No</li>
//                 <li>Name</li>
//                 <li>Price</li>
//                 <li>Category</li>
//                 <li>company</li>
//                 <li>Operation</li>
        
//             </ul>
//            {
//             product.length>0 ? product.map((item,index)=>
//             <ul key={item._id}>
//             <li>{index+1}</li>
//             <li>{item.name}</li>
//             <li>{item.price}</li>
//             <li>{item.category}</li>
//             <li>{item.company}</li>
//             <li><button type="button" onClick={()=>Deleteproduct(item._id)} >Delete</button>
//                 <Link to={"/update/"+item._id}>Update</Link>
//             </li>
//             </ul>)
//             : <h1>NO Result Found</h1>
//            }
//         </div>
//     )
// }

// export default List;


// const Product =()=>{
//     const [name,setName] = React.useState('');
//     const [price,setPrice] = React.useState('');
//     const [category,setCategory] = React.useState('');
//     const [error,setError] = React.useState(false);
//     const [company,setCompany] = React.useState('');
//     const data = async()=>{
//         if (!name || !price || !category || !company){
//             setError(true);
//             return false;
//         }


//         console.log(name,price,category,company)
//         const userId = JSON.parse(localStorage.getItem('user'))._id;
    
//         let result = await fetch("http://localhost:5050/product",{
//             method:"post",
//             body:JSON.stringify({userId,name,price,category,company}),
//             headers:{"Content-Type":"application/json",authorization:JSON.parse(localStorage.getItem('token'))}
//         })
//         result = await result.json();
//         console.log(result)
//         if (result){
//             alert("Data Enter Successfully")
//         }
//         else{
//             alert("Please enter details properly")
//         }
//     }
//     return(
//         <div className="SignUp">
//             <h1>Create Employee</h1>
//             <input className="inputbox" value={name} onChange={(e)=>{setName(e.target.value)}} type="text" placeholder="Enter Product Name"/>
//             {error && !name &&  <span className="valid-input">Enter Valid Name</span>}
//             <input className="inputbox" type="text" value={price} onChange={(e)=>{setPrice(e.target.value)}} placeholder="Enter Product Price"/>
//             {error && !price && <span className="valid-input">Enter Valid Price</span>}
//             <input className="inputbox" type="text" value={category} onChange={(e)=>{setCategory(e.target.value)}} placeholder="Enter Product Category"/>
//             {error && !category && <span className="valid-input">Enter valid Category</span>}
//             {/* <input className="inputbox" type="text" value={userId} onChange={(e)=>{setUserId(e.target.value)}} placeholder="Enter UserId"/> */}
//             <input className="inputbox" type="text" value={company} onChange={(e)=>{setCompany(e.target.value)}} placeholder="Enter Company Name"/>
//             {error && !company && <span className="valid-input">Enter Valid Company</span>}
//             <button className="submitbutton" onClick={data} type="button">Submit</button>
//         </div>
//     )
// }
// export default Product;

// import React, { useState } from 'react';

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
        body: formData
      });

      if (result.ok) {
        // API call successful, handle response
        const data = await result.json();
        console.log('API response:', data);
      } else {
        // API call failed
        console.error('API error:', result.statusText);
      }
    } catch (error) {
    //   console.error('Error submitting form:', error);
    }
  };


  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    // Basic validation for file type
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
