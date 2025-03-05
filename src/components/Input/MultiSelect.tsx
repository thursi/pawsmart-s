import React, { useState, useRef, useEffect } from 'react';

// Define types
interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

interface TagProps {
  label: string;
  onRemove: () => void;
  disabled?: boolean;
}

const Tag: React.FC<TagProps> = ({ label, onRemove, disabled = false }) => {
  return (
    <div className="inline-flex items-center px-2 py-1 rounded-md bg-purple-100 text-sm">
      <span>{label}</span>
      {!disabled && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-1 focus:outline-none"
          aria-label={`Remove ${label}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      )}
    </div>
  );
};

// Dropdown component
const Dropdown: React.FC<{
  options: Option[];
  onSelect: (value: string) => void;
  filter: string;
  selectedValues: string[];
}> = ({ options, onSelect, filter, selectedValues }) => {
  const filteredOptions = options.filter(
    (option) =>
      !selectedValues.includes(option.value) &&
      option.label.toLowerCase().includes(filter.toLowerCase())
  );

  if (filteredOptions.length === 0) {
    return (
      <div className="py-2 px-3 text-sm text-gray-500">
        No options available
      </div>
    );
  }

  // Determine if scrolling is needed based on number of options
  // Each option is roughly 36px tall (py-2 = 16px + some text height)
  // Max height will be applied only when necessary
  const needsScroll = filteredOptions.length > 5;
  const dropdownClasses = needsScroll ? 'max-h-10 overflow-y-auto' : '';

  return (
    <div className={dropdownClasses}>
      {filteredOptions.map((option) => (
        <div
          key={option.value}
          className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
          onClick={() => onSelect(option.value)}
        >
          {option.label}
        </div>
      ))}
    </div>
  );
};

// Main MultiSelect component
export const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  selectedValues,
  onChange,
  label,
  placeholder = 'Select options...',
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle selection
  const handleSelect = (value: string) => {
    if (!selectedValues.includes(value)) {
      onChange([...selectedValues, value]);
    }
    // Clear input value
    setInputValue('');
    // Close dropdown after selection
    setIsOpen(false);
  };

  // Handle removal
  const handleRemove = (valueToRemove: string) => {
    onChange(selectedValues.filter((value) => value !== valueToRemove));
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Find selected options for display
  const selectedOptions = options.filter((option) =>
    selectedValues.includes(option.value)
  );

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium mb-2 text-gray-700">
          {label}
        </label>
      )}

      <div ref={containerRef} className="relative">
        <div
          className={`flex flex-wrap gap-2 p-2 border rounded-md ${
            isOpen ? 'ring-2 ring-blue-500 border-blue-500' : 'border-gray-300'
          } ${disabled ? 'bg-gray-50' : 'bg-white'}`}
          onClick={() => {
            if (!disabled) {
              setIsOpen(true);
              inputRef.current?.focus();
            }
          }}
        >
          {selectedOptions.map((option) => (
            <Tag
              key={option.value}
              label={option.label}
              onRemove={() => handleRemove(option.value)}
              disabled={disabled}
            />
          ))}

          <input
            ref={inputRef}
            type="text"
            className="flex-grow bg-transparent border-none focus:ring-0 focus:outline-none text-sm min-w-[20px]"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => setIsOpen(true)}
            placeholder={selectedValues.length === 0 ? placeholder : ''}
            disabled={disabled}
          />
        </div>

        {isOpen && !disabled && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
            <Dropdown
              options={options}
              onSelect={handleSelect}
              filter={inputValue}
              selectedValues={selectedValues}
            />
          </div>
        )}
      </div>
    </div>
  );
};
