import React, { useState,useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 

function AddStudent() {
  let firstNameInputRef = useRef(null); 
  let lastNameInputRef = useRef(null);
  let ageInputRef = useRef(null);
  let [gender,setGender]= useState('male');
  let mobileNoInputRef = useRef(null);
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
     
    const newStudent = {
      firstName: firstNameInputRef.current.value,
      lastName: lastNameInputRef.current.value,
      age:ageInputRef.current.value, 
      mobileNo: mobileNoInputRef.current.value,
      gender,
    };

    try {
      const response = await axios.post("http://localhost:9999/students", newStudent);
      console.log("Success:", response.data);
      alert("Student Added successfully");
      navigate('/'); 

    } catch (error) {
      console.error("Error:", error);
    }
    
  };

  return (
    <div>
      <h1>Add the Student</h1>
      <form onSubmit={handleSubmit}>
        <label>
          FirstName:
          <input type="text" ref={firstNameInputRef} required/>
        </label>
        <label>
          LastName:
          <input type="text" ref={lastNameInputRef} required />
        </label>
        <label>
          Age:
          <input type="number" ref={ageInputRef} required/>
        </label>
        <label>
          Gender:
          <input type="radio" value="male" checked={gender === 'male'} onChange={(e)=>{setGender(e.target.value)}} required/>
          <span>Male</span>
          <input type="radio" value="female" checked={gender === 'female'} onChange={(e)=>{setGender(e.target.value)}} required/>
          <span>Female</span>
        </label>
        <label>
          MobileNo:
          <input type="number" ref={mobileNoInputRef} required/>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddStudent;
