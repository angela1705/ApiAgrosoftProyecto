import React from 'react';
import { Listbox } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { ViewMode } from '@/types/iot/iotmqtt';

interface ViewModeSelectorProps {
  selectedViewMode: ViewMode;
  setSelectedViewMode: (mode: ViewMode) => void;
}

export const ViewModeSelector: React.FC<ViewModeSelectorProps> = ({ selectedViewMode, setSelectedViewMode }) => {
  const viewModes: ViewMode[] = [
    { id: 'realtime', label: 'Tiempo Real' },
    { id: 'allData', label: 'Todos los Datos' },
  ];

  return (
    <Listbox value={selectedViewMode} onChange={setSelectedViewMode}>
      <div className='relative w-full sm:w-56'>
        <Listbox.Button className='relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 sm:text-sm'>
          <span className='block truncate'>{selectedViewMode.label}</span>
          <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
            <ChevronUpDownIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
          </span>
        </Listbox.Button>
        <Listbox.Options className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
          {viewModes.map((mode) => (
            <Listbox.Option
              key={mode.id}
              className={({ active }) =>
                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                  active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
                }`
              }
              value={mode}
            >
              {({ selected }) => (
                <>
                  <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                    {mode.label}
                  </span>
                  {selected ? (
                    <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600'>
                      <CheckIcon className='h-5 w-5' aria-hidden='true' />
                    </span>
                  ) : null}
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
};

export default ViewModeSelector;