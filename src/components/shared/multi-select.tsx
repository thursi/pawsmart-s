import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from '@/components/ui/select';
import { X } from 'lucide-react';

interface Option {
  id: number;  // Ensure 'id' is treated as a number
  name: string;
}

interface Props {
  options: Option[];
  selectedValues: number[]; 
  onChange: (values: number[]) => void;
  placeholder?: string;
}

export function MultiSelect({
  options,
  selectedValues,
  onChange,
  placeholder,
}: Props) {
  const handleSelect = (value: string) => {
    console.log(value)
    const numericValue = Number(value);  // Convert the value to a number
    if (numericValue && !selectedValues.includes(numericValue)) {
      console.log('conditon fullfiled')
      onChange([...selectedValues, numericValue]); // Add the numeric value
    }
  };

  const handleRemove = (id: number) => {
    onChange(selectedValues.filter((v:number) => v !== id)); // Remove the numeric value
  };

  // Get the available options by filtering out the selected ones
  const availableOptions = options?.filter(
    (option) => !selectedValues.includes(option.id)
  );

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {selectedValues.map((id:number) => {
          const option = options.find((o) => o.id === id);
          return (
            option?.name && (
              <span
                key={id}
                className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-gray-200"
              >
                {option.name}
                <button
                  onClick={() => handleRemove(id)}
                  className="ml-1 p-1 rounded-full hover:bg-gray-300"
                >
                  <X size={12} />
                </button>
              </span>
            )
          );
        })}
      </div>
      <Select onValueChange={handleSelect}>
        <SelectTrigger className="w-full">
          {placeholder || 'Select options'}
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Options</SelectLabel>
            {availableOptions?.map((option) => {
              return (
                <SelectItem key={option.id} value={String(option.id)}>  {/* Convert the number to string for compatibility with SelectItem */}
                  {option.name}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
