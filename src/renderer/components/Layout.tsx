import React from 'react';
import Navbar from './Navbar';

export interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <React.Fragment>
      <Navbar />
      <main className="h-full flex-1 p-4 mt-16">{children}</main>
    </React.Fragment>
  );
}
