import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Video from './components/jsx_files/BackgroundVideoComponent'
import Login from './web_pages/sites/Login'
import Home from './web_pages/sites/Home'
import Garden from './web_pages/sites/Garden'
import BigData from './web_pages/sites/BigData'
import Business from './web_pages/sites/Business'
import ARScene from './web_pages/sites/ARScene'

function App() {
    return (
        <div className="App">
            <Router><Routes>
                <Route path="/" element={<Login />} />
                <Route path="/intro" element={<Video />} />
                <Route path="/home" element={<Home />} />
                <Route path="/home/business" element={<Business />} />
                <Route path="/home/garden" element={<Garden />} />
                <Route path="/home/garden/data" element={<BigData />} />
                <Route path="/home/AR" element={<ARScene />} />
            </Routes></Router>
        </div>
    )
}

export default App
