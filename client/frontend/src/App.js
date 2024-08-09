import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StudentDetails from './components/StudentDetails';
import AddStudent from './components/AddStudent';
import UpdateStudent from './components/UpdateStudent';

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<StudentDetails />} />
                    <Route path="/AddStudent" element={<AddStudent />} />
                    <Route path="/UpdateStudent/:id" element={<UpdateStudent />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;