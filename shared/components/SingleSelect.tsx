import { Key, useEffect, useRef, useState } from 'react';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';

export type Option<T extends Key> = {
  value: T;
  label: string;
};

type SingleSelectProps<T extends Key> = {
  value: Option<T> | null;
  label: string;
  options: Option<T>[];
  onChange: (option: Option<T>) => void;
};

export default function SingleSelect<T extends Key>({
  label,
  options,
  value,
  onChange,
}: SingleSelectProps<T>) {
  const [open, setOpen] = useState<boolean>(false);

  const selectContainerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (open && !selectContainerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    window.addEventListener('mousedown', closeOnOutsideClick);

    return () => {
      window.removeEventListener('mousedown', closeOnOutsideClick);
    };
  });

  if (!options.length) return;

  const handleOptionClick = (option: Option<T>) => {
    onChange(option);
  };

  return (
    <div className="relative w-56 text-gray-500" ref={selectContainerRef}>
      <label className="text-sm font-medium text-gray-600 mb-1 block">
        {label}
      </label>
      <button
        className={`flex items-center justify-between border text-lg font-bold px-3 py-2 w-full rounded transition ${
          open
            ? 'bg-indigo-50 border-indigo-300 text-indigo-700'
            : 'bg-white border-gray-300 text-gray-700 hover:bg-indigo-50 hover:border-indigo-200'
        }`}
        onClick={() => setOpen(!open)}
      >
        <span>{value?.label ?? options[0].label}</span>
        <span>
          {open ? <HiChevronUp size={25} /> : <HiChevronDown size={25} />}
        </span>
      </button>
      {open && (
        <ul className="absolute top-full left-0 border border-gray-200 rounded-lg bg-white p-3 mt-1 shadow-2xl z-10 w-56 max-h-60 overflow-y-auto">
          {options.map((option) => (
            <li
              className="border-b border-gray-300 py-1 cursor-pointer hover:bg-gray-100 transition px-1"
              key={option.value}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
