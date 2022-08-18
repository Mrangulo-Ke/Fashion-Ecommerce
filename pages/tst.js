import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { Fragment, useState } from 'react';
import Layout from '../components/Layout';

export default function Tst() {
  return (
    <div className="min-h-screen flex justify-end p-4">
      <Menu as="div" className="relative pt-24">
        {({ open }) => (
          <Fragment>
            <Menu.Button
              className="inline-flex justify-center w-full rounded-md border border-gray-300
        shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none
         focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
            >
              Options Menu
              <ChevronDownIcon
                className="-mr-1 ml-2 h-5 w-5"
                aria-hidden="true"
              />
            </Menu.Button>
            <Transition show={open}>
              <Menu.Items
                className="mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black
          ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
              >
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        className={`flex items-center px-4 py-2 text-sm ${
                          active ? 'bg-indigo-500 text-white' : 'text-gray-700'
                        }`}
                      >
                        Mane
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        className={`flex items-center px-4 py-2 text-sm ${
                          active ? 'bg-indigo-500 text-white' : 'text-gray-700'
                        }`}
                      >
                        Kane
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        className={`flex items-center px-4 py-2 text-sm ${
                          active ? 'bg-indigo-500 text-white' : 'text-gray-700'
                        }`}
                      >
                        Son
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        className={`flex items-center px-4 py-2 text-sm ${
                          active ? 'bg-indigo-500 text-white' : 'text-gray-700'
                        }`}
                      >
                        Sane
                      </a>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Fragment>
        )}
      </Menu>
    </div>
  );
}
