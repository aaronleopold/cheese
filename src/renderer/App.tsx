import React, { useEffect, useState } from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import shallow from 'zustand/shallow';
import useStore from '../store';
import Layout from './components/Layout';
import { ApplicationContext, ApplicationFlow } from './context';

const Home = React.lazy(() => import('./pages/Home'));
const Settings = React.lazy(() => import('./pages/Settings'));

export default function App() {
  const [flow, setFlow] = useState<ApplicationFlow>(ApplicationFlow.Home);
  const { theme } = useStore((state) => state, shallow);

  useEffect(() => {
    if (theme === 'dark') {
      document.querySelector('html')?.classList.add('dark');
    } else {
      document.querySelector('html')?.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    if (flow !== ApplicationFlow.Home) {
      setFlow(ApplicationFlow.Home);
    }

    return () => {
      setFlow(ApplicationFlow.Home);
    };
  }, []);

  return (
    <ApplicationContext.Provider value={{ flow, setFlow }}>
      <MemoryRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
      </MemoryRouter>
    </ApplicationContext.Provider>
  );
}
