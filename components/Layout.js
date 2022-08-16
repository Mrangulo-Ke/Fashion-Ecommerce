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
import LogoWhite from '../public/images/logowhite.svg';
import Facebook from '../public/images/icon-facebook.svg';
import Instagram from '../public/images/icon-instagram.svg';
import Twitter from '../public/images/icon-twitter.svg';
import {
  ArchiveIcon,
  HomeIcon,
  LoginIcon,
  LogoutIcon,
  MenuIcon,
  PhoneIcon,
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
    router.push(`/shop?query=${query}`);
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
          <nav className="fixed w-full top-0 h-16 z-[100] bg-[#f8fafc] shadow-md">
            <div className=" container flex items-center justify-between mx-auto px-4  pt-5">
              <Link href="/">
                <a>
                  <Image src={Logo} alt=""></Image>
                </a>
              </Link>
              <div className="hidden space-x-6 md:flex">
                <form onSubmit={submitHandler}>
                  <input
                    name="query"
                    placeholder="Search Products"
                    onChange={queryChangeHandler}
                  />
                  <button type="submit" aria-label='="search'>
                    <SearchIcon />
                  </button>
                </form>
                <Link href="/cart">
                  <a className="">
                    <div className=" p-2 justify-between flex">
                      Cart
                      {cartItemsCount > 0 && (
                        <span className="ml-1 rounded-full bg-veryDarkViolet px-2 py-1 text-xs font-bold text-white">
                          {cartItemsCount}
                        </span>
                      )}
                      <ShoppingBagIcon className="h-5 w-5"></ShoppingBagIcon>
                    </div>
                  </a>
                </Link>
                {status === 'loading' ? (
                  'loading'
                ) : session?.user ? (
                  <Menu as="div" className="relative inline-block pt-2">
                    {({ open }) => (
                      <Fragment>
                        <Menu.Button className="text-veryDarkViolet">
                          {session.user.name}
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
                            className="absolute right-0 w-56 bg-white origin-top-right 
                          shadow-lg mt-2 rounded-md ring-1 ring-block ring-opacity-5 divide-y divide-gray-100 
                          focus:outline-none "
                          >
                            <NavDropDownLink
                              className="dropdown-link"
                              href="/profile"
                            >
                              <UserIcon className="h-6 w-6 pr-2"></UserIcon>
                              Profile
                            </NavDropDownLink>

                            <NavDropDownLink
                              className="dropdown-link"
                              href="/order-history"
                            >
                              <ArchiveIcon className="h-6 w-6 pr-2"></ArchiveIcon>
                              Order History
                            </NavDropDownLink>

                            <NavDropDownLink
                              className="dropdown-link"
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
                    <a className="pt-2">Login</a>
                  </Link>
                )}
              </div>
              <div className="fixed right-2 top-3 text-right">
                <Menu as="div" className="relative inline-block">
                  {({ open }) => (
                    <Fragment>
                      <Menu.Button
                        className={`${
                          open
                            ? 'bg-veryDarkBlue text-white '
                            : 'bg-veryDarkViolet  text-white '
                        }
          inline-flex rounded-md justify-center w-fullborder shadow-sm text-sm font-medium 
          py-1 md:hidden
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
                          className="flex-col origin-top-right absolute right-0 w-96 bg-white shadow-lg mt-2 
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
                            <NavDropDownLink href="+254703352705">
                              <button
                                className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm 
                                px-4 py-2 bg-veryDarkViolet text-sm font-medium text-white hover:bg-gray-50 focus:outline-none 
                                hover:text-gray-700 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                              >
                                <PhoneIcon className="h-5 w-5 pr-1"></PhoneIcon>
                                Call us
                              </button>
                            </NavDropDownLink>
                            {/* <div className="px-4 py-2 ">
                  <button className="flex bg-veryDarkViolet justify-center space-x-4 w-full rounded-md px-4 py-2">
                    <a href="">
                      <Image src={Facebook} alt="" className="h-6"></Image>
                    </a>
                    <a href="">
                      <Image src={Instagram} alt="" className="h-6"></Image>
                    </a>
                    <a href="">
                      <Image src={Twitter} alt="" className="h-6"></Image>
                    </a>
                  </button>
                </div> */}
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
        <main className="container m-auto mt-4 px-4">{children}</main>

        <footer className=" bg-veryDarkBlue">
          <div className="container flex flex-col-reverse justify-between px-6 py-10 mx-auto space-y-8 md:flex-row md:space-y-0">
            <div className="flex flex-col-reverse items-center justify-between space-y-12 md:flex-col md:space-y-0 md:items-start">
              <div className="mx-auto my-6 text-center text-white text-xs md:hidden">
                Copyright &copy; {new Date().getFullYear()} Link Masters by
                Mwangeka Mrangulo. All Rights Reserved.
              </div>
              <div>
                <Image src={LogoWhite} alt="" className="h-10"></Image>
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
              <div className="flex flex-col space-y-3 text-white text-xs md:text-sm">
                <Link href="/">
                  <a className="hover:text-brightRed">Home</a>
                </Link>
                <Link href="/#services">
                  <a className="hover:text-brightRed">Pc Services</a>
                </Link>
                <Link href="/#services">
                  <a className="hover:text-brightRed">Phone Services</a>
                </Link>
                <Link href="/#other-services">
                  <a className="hover:text-brightRed">Other Services</a>
                </Link>
                <Link href="/#supplies">
                  <a className="hover:text-brightRed">Supplies</a>
                </Link>
              </div>
              <div className="flex flex-col space-y-3 text-white text-xs md:text-sm">
                <a className="text-">Working Hours</a>
                <a>Weekdays 7.00am-8.00pm</a>
                <a>Weekends 8.00am-7.00pm</a>
                <a>Holidays 8.00am-7.00pm</a>
              </div>
            </div>
          </div>

          <div className="justify-center">
            <div className="hidden text-center text-white text-sm md:block">
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
