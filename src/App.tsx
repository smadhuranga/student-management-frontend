import Login from './pages/Login'
import {BrowserRouter as React, BrowserRouter, Route, Routes} from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Students from './pages/Students'


const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/dashboard' element={<Dashboard/>}/>
                <Route path='/students' element={<Students/>}/>
            </Routes>
        </BrowserRouter>
    )
};

export default App;

