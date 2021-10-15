import React from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home/Home';
import Settings from './pages/Settings/Settings';

export default function App() {
    return (
        <MemoryRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/settings" element={<Settings />} />
                </Routes>
            </Layout>
        </MemoryRouter>
    );
}
