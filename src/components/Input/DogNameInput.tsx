import React from 'react';

interface DogNameInputProps {
  value: string;
  onChange: (value: string) => void;
  labelText?: string;
  placeholder?: string;
}

const DogNameInput: React.FC<DogNameInputProps> = ({
  value,
  onChange,
  labelText = 'What is your Dog name?',
  placeholder = "Enter your dog's name",
}) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium">
        {labelText} <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full py-2 px-0 mt-1 bg-transparent border-0 border-b border-gray-300 focus:border-primary focus:outline-none focus:ring-0 rounded-none text-sm"
        placeholder={placeholder}
      />
    </div>
  );
};

export default DogNameInput;
