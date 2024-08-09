import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function StudentDetails() {
    const [studentData, setStudentData] = useState([
        {
            id:1,
            firstName:'ram',
            lastName:'raju',
            age:25,
            gender:'male',
            mobileNo:996969999
        },
        {
            id:2,
            firstName:'ramya',
            lastName:'rani',
            age:25,
            gender:'female',
            mobileNo:996969999
        }
    ]);
    const navigate = useNavigate();

// fetch the data from server 
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:9999/students');
            setStudentData(response.data);
        } catch (error) {
            console.error("Error fetching the data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAddStudent = () => {
        navigate('/AddStudent');
    };
   
    const handleRemoveStudent = async(id)=>{
        try {
            await axios.delete(`http://localhost:9999/delete/student/${id}`);
            alert("student Deleted Successully");
            fetchData();
        } catch (error) {
            console.log(error);
        }
    }
    const handleUpdateStudent = (id)=>{
        navigate(`/UpdateStudent/${id}`);
    }
 
    return (
        <div className='container'>
            <h1>Student Details</h1>
            <button onClick={handleAddStudent}>Add Student</button>
            <table border='3'>
                <thead>
                    <tr>
                        <th>FirstName</th>
                        <th>LastName</th>
                        <th>Age</th>
                        <th>Mobile No</th>
                        <th>Gender</th>
                        <th colSpan={3}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {studentData.map((student) => (
                        <tr key={student._id}>
                            <td>{student.firstName}</td>
                            <td>{student.lastName}</td>
                            <td>{student.age}</td>
                            <td>{student.mobileNo}</td>
                            <td>{student.gender}</td>
                            <td>
                                <button onClick={()=>{
                                    handleUpdateStudent(student._id)
                                }}>Update</button>
                            </td>
                            <td>
                                <button onClick={()=>{
                                    handleRemoveStudent(student._id);
                                }}>Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default StudentDetails;