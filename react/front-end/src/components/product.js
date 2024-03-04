// import React,{useState,useEffect} from "react"
// import { Link, Navigate, useNavigate } from "react-router-dom";

// const List = ()=>{
//     const [product,setProduct] = useState([]);
    // const navigate = useNavigate();
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



import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);


  useEffect(() => {
    // Simulated fetch data
    const fetchData = async () => {
      try {
        // Fetch data from an API
        const response = await fetch('http://localhost:3000/list');
        const data = await response.json();
        setEmployees(data);
        setFilteredEmployees(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const filteredResults = employees.filter(employee =>
      employee.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredEmployees(filteredResults);
  };

  const navigate = useNavigate();
  const handleEdit = (id) => {

    navigate('/updateproduct')
    
    
    
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/delete/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        // Remove the deleted employee from the state
        setEmployees(employees.filter(employee => employee.id !== id));
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
                <Link to={"/update/"+employee._id}>Update</Link>
              
                <button onClick={() => handleDelete(employee._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;
