import React from 'react';
import Navbar from './Navbar';

export interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <React.Fragment>
      <Navbar />
      <main className="bg-gray-100 dark:bg-dark-850 h-full flex-1 p-4">
        {children}
      </main>
    </React.Fragment>
  );
}
