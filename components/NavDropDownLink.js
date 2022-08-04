import React from 'react';
import { Menu } from '@headlessui/react';

export const NavDropDownLink = ({ href, children, ...rest }) => (
  <Menu.Item>
    {({ active }) => (
      <a
        className={`flex items-center px-4 py-2 text-sm 
        ${active ? 'bg-indigo-500 text-white' : 'text-gray-700 '}`}
        href={href}
        {...rest}
      >
        {children}
      </a>
    )}
  </Menu.Item>
);
