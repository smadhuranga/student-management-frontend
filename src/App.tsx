import Login from './pages/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Students from './pages/Students'
import Courses from "./pages/Courses.tsx";
import StudentDetails from "./pages/StudentDetails";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/dashboard' element={<Dashboard/>}/>
                <Route path='/students' element={<Students/>}/>
                <Route path="/courses" element={<Courses />} />
                <Route path="/students/:id" element={<StudentDetails />} />
            </Routes>
        </BrowserRouter>
    )
};

export default App;