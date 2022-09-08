import { ChevronRightIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import Link from 'next/link';

import heroImage from '../public/images/shirt1.jpg';

export default function Hero() {
  return (
    <section id="hero" className="main">
      <div className="container min-h-screen flex flex-col-reverse md:flex-row items-center px-6 mx-auto space-y-0 md:space-y-0">
        <div className="flex flex-col mb-32 space-y-12 md:w-1/2 items-center">
          <p
            className="max-w-md text-3xl font-bold text-center md:text-4xl lg:text-5xl md:text-left 
          mt-4"
          >
            At our shop we don't just sell clothes we give you a lifestyle.
          </p>
          <p className="max-w-md text-center text-veryDarkBlue md:text-left">
            Great sale this august , shop with us and get 15% discount for every
            good you buy.
          </p>
          <div className="max-w-md flex gap-5">
            <Link href="/#shop">
              <a className=" primary-button inline-flex">
                Order now
                <ChevronRightIcon className="h-5"></ChevronRightIcon>
              </a>
            </Link>
            <Link href="/shop">
              <a className="other-btn">See more products</a>
            </Link>
          </div>
        </div>
        <div className="w-1/2 flex justify-centeritems center pb-28">
          <Image src={heroImage} alt=""></Image>
        </div>
      </div>
    </section>
  );
}
