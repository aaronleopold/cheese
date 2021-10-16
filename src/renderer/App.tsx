import React, { useEffect } from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import shallow from 'zustand/shallow';
import useStore from '../store';
import Layout from './components/Layout';
import Home from './pages/Home/Home';
import Settings from './pages/Settings/Settings';

export default function App() {
  const theme = useStore((state) => state.theme, shallow);

  useEffect(() => {
    if (theme === 'dark') {
      document.querySelector('html')?.classList.add('dark');
    } else {
      document.querySelector('html')?.classList.remove('dark');
    }
  }, [theme]);

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
