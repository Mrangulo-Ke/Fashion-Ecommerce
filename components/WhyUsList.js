import { CheckCircleIcon } from '@heroicons/react/solid';
import React from 'react';

export default function WhyUsListItem({ title, children }) {
  return (
    <ul className="mt-6">
      <p className="inline-flex gap-2 items-center text-veryDarkBlue font-semibold mb-2 text-lg md:text-xl">
        <CheckCircleIcon className="h-4 text-newRed md:h-6"></CheckCircleIcon>
        {title}
      </p>
      <p className="text-gray-500 text-sm md:text-base">{children}.</p>
    </ul>
  );
}
