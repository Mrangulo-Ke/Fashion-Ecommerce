import Image from 'next/image';
import Link from 'next/link';

import Landing from '../public/images/ha.jpg';

export default function Hero() {
  return (
    <div className="container min-h-screen flex flex-col-reverse md:flex-row items-center px-6 mx-auto mt-24 space-y-0 md:space-y-0">
      <div className="flex flex-col mb-32 space-y-12 md:w-1/2 items-center justify-center">
        <h1 className="max-w-md text-3xl font-bold text-center md:text-5xl md:text-left sm:text-4xl">
          At our shop we don't just sell clothes we give you a lifestyle.
        </h1>
        <p className="max-w-sm text-center text-veryDarkBlue md:text-left">
          Great sale this august , shop with us and get 15% discount for every
          good you buy.
        </p>
        <div className="flex justify-center md:justify-start">
          <Link href="/#shop">
            <a className="inline-flex justify-center primary-button">
              Shop now
            </a>
          </Link>
        </div>
      </div>
      <div className="w-1/2 flex justify-centeritems center">
        <Image src={Landing} alt=""></Image>
      </div>
    </div>
  );
}
