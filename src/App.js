// guest-app/src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GuestForm from './components/GuestForm';
import './index.css';

function App() {
    return (
        <BrowserRouter>
            <div className="bg-gray-200">
                <Routes>
                    <Route path="/:eventId" element={<GuestForm />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
