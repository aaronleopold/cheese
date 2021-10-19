import React from 'react';
import Navbar from './Navbar';
import Loader from './ui/Loader';

export interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <React.Fragment>
      <Navbar />
      <React.Suspense fallback={<Loader active />}>
        <main className="h-full flex-1 p-4 mt-16">{children}</main>
      </React.Suspense>
    </React.Fragment>
  );
}
