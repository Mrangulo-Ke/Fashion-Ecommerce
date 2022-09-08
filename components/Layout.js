import { signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import Cookies from 'js-cookie';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Menu, Transition } from '@headlessui/react';
import 'react-toastify/dist/ReactToastify.css';
import { Store } from '../utils/Store';
import { NavDropDownLink } from './NavDropDownLink';
import Image from 'next/image';

import Logo from '../public/images/logoblack.svg';
import Facebook from '../public/images/icon-facebook.svg';
import Instagram from '../public/images/icon-instagram.svg';
import Twitter from '../public/images/icon-twitter.svg';
import {
  ArchiveIcon,
  HomeIcon,
  LoginIcon,
  LogoutIcon,
  MenuIcon,
  SearchIcon,
  ShoppingBagIcon,
  UserIcon,
  XIcon,
} from '@heroicons/react/solid';
import { useRouter } from 'next/router';

export default function Layout({ title, children }) {
  const router = useRouter();
  const { status, data: session } = useSession();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  const [query, setQuery] = useState('');
  const queryChangeHandler = (e) => {
    setQuery(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/search?query=${query}`);
  };

  const logoutClickHandler = () => {
    Cookies.remove('cart');
    dispatch({ type: 'CART_RESET' });
    signOut({ callbackUrl: '/login' });
  };
  return (
    <>
      <Head>
        <title>{title ? title + ' - Link Masters' : 'Link Masters'}</title>
        <meta
          name="description"
          content="Computer and phones repair &#38; shop webapp."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer position="bottom-center" limit={1} />

      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="fixed w-full top-0 h-24 z-[100] bg-[#f8fafc] shadow-md">
            <div className=" container flex items-center justify-between mx-auto px-4  pt-8">
              <Link href="/">
                <a>
                  <Image src={Logo} alt=""></Image>
                </a>
              </Link>
              <div className="hidden space-x-6 md:flex">
                <div className="inline-flex pr-2 pb-1 justify-between">
                  <form onSubmit={submitHandler}>
                    <input
                      className="rounded border p-2 outline-none ring-lightNewRed focus:ring;"
                      name="query"
                      type="text"
                      placeholder="I'm looking for..."
                      onChange={queryChangeHandler}
                    />
                    {/* <SearchIcon
                      onClick={submitHandler}
                      className="h-8 w-8 pt-2"
                    ></SearchIcon> */}
                  </form>
                </div>

                <Link href="/cart">
                  <a className="">
                    <div className=" p-2 justify-between flex group hover:text-newRed">
                      Cart
                      {cartItemsCount > 0 && (
                        <span className="ml-1 rounded-full bg-newRed px-2 py-1 text-xs font-bold text-white">
                          {cartItemsCount}
                        </span>
                      )}
                      <div className="pl-2">
                        <ShoppingBagIcon className="h-5 w-5"></ShoppingBagIcon>
                      </div>
                    </div>
                  </a>
                </Link>
                {status === 'loading' ? (
                  'loading'
                ) : session?.user ? (
                  <Menu as="div" className="relative inline-block pt-2">
                    {({ open }) => (
                      <Fragment>
                        <Menu.Button className="text-veryDarkBlue">
                          <div className="group hover:text-newRed pr-2 pb-1 inline-flex">
                            {session.user.name}
                            <span>
                              <MenuIcon className="h-5 pl-2 "></MenuIcon>
                            </span>
                          </div>
                        </Menu.Button>
                        <Transition
                          show={open}
                          enter="transform transition duration-100 ease-in"
                          enterFrom="opacity-0 scale-95"
                          enterTo="opacity-100 scale-100"
                          leave="transform transition duration-75 ease-in"
                          leaveFrom="opacity-100 scale-100"
                          leaveTo="opacity-0 scale-95"
                        >
                          <Menu.Items
                            className="absolute right-0 w-56 bg-white origin-top-righT justify-end 
                          shadow-lg mt-12 rounded-md ring-1 ring-block ring-opacity-5 divide-y divide-gray-100 
                          focus:outline-none "
                          >
                            <NavDropDownLink href="/profile">
                              <UserIcon className="h-6 w-6 pr-2"></UserIcon>
                              Profile
                            </NavDropDownLink>

                            <NavDropDownLink href="/order-history">
                              <ArchiveIcon className="h-6 w-6 pr-2"></ArchiveIcon>
                              Order History
                            </NavDropDownLink>

                            <NavDropDownLink
                              href="#"
                              onClick={logoutClickHandler}
                            >
                              <LogoutIcon className="h-6 w-6 pr-2"></LogoutIcon>
                              Logout
                            </NavDropDownLink>
                          </Menu.Items>
                        </Transition>
                      </Fragment>
                    )}
                  </Menu>
                ) : (
                  <Link href="/login">
                    <div className="group hover:text-newRed pt-2 inline-flex">
                      <a className="">Login</a>
                      <LoginIcon className="h-6 pl-1 "></LoginIcon>
                    </div>
                  </Link>
                )}
              </div>
              <div className="fixed right-2 top-3 text-right">
                <Menu as="div" className="relative inline-block">
                  {({ open }) => (
                    <Fragment>
                      <Menu.Button
                        className={`${
                          open ? 'text-veryDarkBlue ' : 'text-veryDarkBlue '
                        }
                            inline-flex rounded-md justify-center w-fullborder shadow-sm text-sm font-medium 
                            py-1 md:hidden mt-4
                            `}
                      >
                        {open ? (
                          <XIcon className="h-8 w-14"></XIcon>
                        ) : (
                          <MenuIcon className="h-8 w-14"></MenuIcon>
                        )}
                      </Menu.Button>
                      <Transition
                        show={open}
                        enter="transform transition duration-100 ease-in"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="transform transition duration-75 ease-in"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                      >
                        <Menu.Items
                          className="flex-col origin-top-right absolute right-0 w-72 bg-white shadow-lg mt-12 
                            rounded-md ring-1 ring-block ring-opacity-5 divide-y divide-gray-100 
                            focus:outline-none md:hidden"
                        >
                          <div className="py-1">
                            <NavDropDownLink href="/">
                              <div className="flex flex-col pr-2 pb-1">
                                <HomeIcon className="h-5 w-5"></HomeIcon>
                              </div>
                              Home
                            </NavDropDownLink>
                            <NavDropDownLink href="/#services">
                              <div className="flex flex-col pr-2 pb-1">
                                <HomeIcon className="h-5 w-5"></HomeIcon>
                              </div>
                              Shop
                            </NavDropDownLink>
                            <NavDropDownLink href="/cart">
                              <div className="flex flex-col pr-2 pb-1">
                                <ShoppingBagIcon className="h-5 w-5"></ShoppingBagIcon>
                              </div>
                              Cart
                              {cartItemsCount > 0 && (
                                <span className="ml-1 rounded-full bg-veryDarkViolet px-2 py-1 text-xs font-bold text-white">
                                  {cartItemsCount}
                                </span>
                              )}
                            </NavDropDownLink>
                            {status === 'loading' ? (
                              'loading'
                            ) : session?.user ? (
                              <div>
                                <NavDropDownLink href="/profile">
                                  <div className="flex flex-col pr-2 pb-1">
                                    <UserIcon className="h-5 w-5"></UserIcon>
                                  </div>
                                  {session.user.name}
                                </NavDropDownLink>
                                <NavDropDownLink href="/order-history">
                                  <div className="flex flex-col pr-2 pb-1">
                                    <ArchiveIcon className="h-5 w-5"></ArchiveIcon>
                                  </div>
                                  Order History
                                </NavDropDownLink>
                                <NavDropDownLink
                                  href="#"
                                  onClick={logoutClickHandler}
                                >
                                  <LogoutIcon className="h-6 w-6 pr-2"></LogoutIcon>
                                  Logout
                                </NavDropDownLink>
                              </div>
                            ) : (
                              <div>
                                <NavDropDownLink href="/login">
                                  <div className="flex flex-col pr-2 pb-1">
                                    <LoginIcon className="h-5 w-5"></LoginIcon>
                                  </div>
                                  Login/Register
                                </NavDropDownLink>
                              </div>
                            )}

                            <div className="inline-flex justify-start pb-1">
                              <form onSubmit={submitHandler}>
                                <input
                                  name="query"
                                  className="w-[250px] pl-4"
                                  type="text"
                                  placeholder="I'm looking for..."
                                  onChange={queryChangeHandler}
                                />
                              </form>
                              <SearchIcon
                                onClick={submitHandler}
                                className="h-8 w-8 pt-2"
                              ></SearchIcon>
                            </div>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Fragment>
                  )}
                </Menu>
              </div>
            </div>
          </nav>
        </header>
        <main>{children}</main>

        <footer className="bg-lightNewRed">
          <div className="container flex flex-col-reverse justify-between px-6 py-10 mx-auto space-y-8 md:flex-row md:space-y-0">
            <div className="flex flex-col-reverse items-center justify-between space-y-12 md:flex-col md:space-y-0 md:items-start">
              <div className="mx-auto my-6 text-center text-newRed text-sm md:hidden">
                Copyright &copy; {new Date().getFullYear()} by Mwangeka
                Mrangulo. All Rights Reserved.
              </div>
              <div>
                <Link href="/">
                  <Image src={Logo} alt="" className="h-10"></Image>
                </Link>
              </div>

              <div className="flex justify-center space-x-4">
                <Link href="/#">
                  <a>
                    <Image src={Facebook} alt="" className="h-8"></Image>
                  </a>
                </Link>

                <Link href="/#">
                  <a>
                    <Image src={Instagram} alt="" className="h-8"></Image>
                  </a>
                </Link>

                <Link href="/#">
                  <a>
                    <Image src={Twitter} alt="" className="h-8"></Image>
                  </a>
                </Link>
              </div>
            </div>

            <div className="flex justify-around space-x-32">
              <div className="flex flex-col space-y-3  text-sm">
                <Link href="/">
                  <a className="hover:text-newRed text-veryDarkBlue">Home</a>
                </Link>
                <Link href="/">
                  <a className="hover:text-newRed text-veryDarkBlue">
                    All Products
                  </a>
                </Link>
              </div>
              <div className="flex flex-col space-y-3 text-veryDarkBlue text-sm">
                <a className="text-">Working Hours</a>
                <a>Weekdays 7.00am-8.00pm</a>
                <a>Weekends 8.00am-7.00pm</a>
                <a>Holidays 8.00am-7.00pm</a>
              </div>
            </div>
          </div>

          <div className="justify-center">
            <div className="hidden text-center text-newRed text-sm md:block">
              {' '}
              Copyright &copy; {new Date().getFullYear()} Link Masters by
              Mwangeka Mrangulo. All Rights Reserved.{' '}
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
