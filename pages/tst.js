import { Listbox } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/solid';
import { Fragment, useState } from 'react';

const people = [
  { id: 1, name: 'sadio mane' },
  { id: 2, name: 'antony gordon' },
  { id: 3, name: 'mason mount' },
  { id: 4, name: 'leroy sane' },
  { id: 5, name: 'harry kane' },
];

export default function Tst() {
  const [selectedPerson, setSelectedPerson] = useState(people[0]);
  return (
    <Listbox value={selectedPerson} onChange={setSelectedPerson}>
      <Listbox.Button>{selectedPerson.name}</Listbox.Button>
      <Listbox.Options>
        {people.map((person) => (
          <Listbox.Option key={person.id} value={person} as={Fragment}>
            {({ active, selected }) => (
              <li
                className={`${
                  active ? 'bg-blue-500 text-white' : 'bg-white text-black'
                }`}
              >
                {selected}
                {person.name}
              </li>
            )}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
}
