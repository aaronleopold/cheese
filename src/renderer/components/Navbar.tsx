import { ArrowLeftIcon, CogIcon } from '@heroicons/react/solid';
import React from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import Heading from './ui/Heading';
//@ts-ignore
import cheeseLogo from '../../assets/icons/png/32x32.png';

interface NavItemProps {
  justify: 'center' | 'end' | 'start';
  colSpan?: number;
  children: React.ReactNode | React.ReactText;
}

function NavItem({ colSpan, justify, children }: NavItemProps) {
  return (
    <div
      className={`flex items-center col-span-${
        colSpan ?? 1
      } justify-${justify}`}
    >
      {children}
    </div>
  );
}

export default function Navbar() {
  const location = useLocation();

  const isHome = location.pathname === '/';

  return (
    <nav className="fixed w-full bg-white dark:bg-dark-950 dark:text-dark-200 h-16 p-3 grid grid-cols-6 items-center">
      <NavItem justify="start">
        {isHome ? (
          <div />
        ) : (
          <Link to="/" className="p-1">
            <ArrowLeftIcon className="h-6 w-6 cursor-pointer text-gray-800 hover:text-gray-600 dark:text-dark-200 dark:hover:text-dark-300 transition-colors duration-300" />
          </Link>
        )}
      </NavItem>

      <NavItem justify="center" colSpan={4}>
        <div className="flex space-x-2 items-center">
          <Heading>Cheese</Heading>
          <img
            className="h-6 w-6 object-scale-down"
            src={cheeseLogo}
            alt="Cheese Logo"
          />
        </div>
      </NavItem>

      <NavItem justify="end">
        {isHome ? (
          <Link to="/settings" className="p-1">
            <CogIcon className="h-6 w-6 cursor-pointer text-gray-800 hover:text-gray-600 dark:text-dark-200 dark:hover:text-dark-300 transition-colors duration-300" />
          </Link>
        ) : (
          <div />
        )}
      </NavItem>
    </nav>
  );
}
