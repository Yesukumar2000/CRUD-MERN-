import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function UpdateStudent() {
    const { id } = useParams();
    const [student, setStudent] = useState(null);
    const firstNameInputRef = useRef(null);
    const lastNameInputRef = useRef(null);
    const ageInputRef = useRef(null);
    const [gender, setGender] = useState('male');
    const mobileNoInputRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const response = await axios.get(`http://localhost:9999/students/${id}`);
                setStudent(response.data);
                firstNameInputRef.current.value = response.data.firstName;
                lastNameInputRef.current.value = response.data.lastName;
                ageInputRef.current.value = response.data.age;
                setGender(response.data.gender);
                mobileNoInputRef.current.value = response.data.mobileNo;
            } catch (error) {
                console.error("Error fetching student:", error);
            }
        };
        fetchStudent();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedStudent = {
            firstName: firstNameInputRef.current.value,
            lastName: lastNameInputRef.current.value,
            age: ageInputRef.current.value,
            mobileNo: mobileNoInputRef.current.value,
            gender,
        };

        try {
            await axios.put(`http://localhost:9999/students/${id}`, updatedStudent);
            alert("Student Updated successfully");
            navigate('/');
        } catch (error) {
            console.error("Error updating student:", error);
        }
    };

    if (!student) return <div>Loading...</div>;

    return (
        <div>
            <h1>Update Student</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    FirstName:
                    <input type="text" ref={firstNameInputRef} required />
                </label>
                <label>
                    LastName:
                    <input type="text" ref={lastNameInputRef} required />
                </label>
                <label>
                    Age:
                    <input type="number" ref={ageInputRef} required />
                </label>
                <label>
                    Gender:
                    <input type="radio" value="male" checked={gender === 'male'} onChange={(e) => { setGender(e.target.value) }} required />
                    <span>Male</span>
                    <input type="radio" value="female" checked={gender === 'female'} onChange={(e) => { setGender(e.target.value) }} required />
                    <span>Female</span>
                </label>
                <label>
                    MobileNo:
                    <input type="number" ref={mobileNoInputRef} required />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default UpdateStudent;