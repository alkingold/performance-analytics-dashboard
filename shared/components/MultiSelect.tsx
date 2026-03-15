import { Option } from '@/shared/components/SingleSelect';
import { Key, useEffect, useRef, useState } from 'react';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';

type MultiSelectProps<T extends Key> = {
  options: Option<T>[];
  values: Option<T>[];
  label: string;
  maxSelectedOptions?: number;
  onChange: (values: Option<T>[], numberLimit: number | undefined) => void;
};

function MultiSelect<T extends Key>({
  values,
  options,
  label,
  maxSelectedOptions,
  onChange,
}: MultiSelectProps<T>) {
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

  const disableSelect = maxSelectedOptions
    ? values.length >= maxSelectedOptions
    : false;

  const toggle = (option: Option<T>) => {
    const selected = values.some((value) => value.value === option.value);

    if (selected) {
      onChange(
        values.filter((value) => value.value !== option.value),
        maxSelectedOptions,
      );
    } else {
      onChange([...values, option], maxSelectedOptions);
    }
  };

  return (
    <div ref={selectContainerRef} className="relative w-96 text-gray-500">
      <label className="text-sm font-medium text-gray-600 mb-1 block">
        {label}
      </label>
      <button
        type="button"
        className={`flex align-center justify-between border border-gray-300 text-gray-500 text-lg px-3 py-2 rounded w-full transition ${
          open
            ? 'bg-indigo-50 border-indigo-300 text-indigo-700'
            : 'bg-white border-gray-300 text-gray-600 hover:bg-indigo-50 hover:border-indigo-200'
        }`}
        onClick={() => setOpen((open) => !open)}
      >
        <span>Graphs ({values.length})</span>
        <span>
          {open ? <HiChevronUp size={25} /> : <HiChevronDown size={25} />}
        </span>
      </button>
      {open && (
        <ul className="absolute border border-gray-200 bg-white z-10 top-full left-0 rounded-lg p-3 mt-1 shadow-2xl w-full">
          {disableSelect && (
            <p className="text-xs text-amber-600 mb-2">
              You can select up to {maxSelectedOptions} options
            </p>
          )}
          {options.map((option) => {
            const checked = values.some(
              (value) => value.value === option.value,
            );
            return (
              <li
                key={option.value}
                onClick={() => toggle(option)}
                className="border-b border-gray-300 py-1 flex gap-2 cursor-pointer hover:bg-gray-100 hover:text-gray-700 transition px-1"
              >
                <input
                  type="checkbox"
                  readOnly
                  checked={checked}
                  disabled={disableSelect && !checked}
                />
                {option.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default MultiSelect;
