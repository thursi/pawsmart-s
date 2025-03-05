import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent } from '../ui/dialog';
import { useAuthStore } from '@/store/authStore';
import DogNameInput from '../Input/DogNameInput';
import { MultiSelect } from '../Input/MultiSelect';

interface PetInfo {
  petType: string;
  name: string;
  genderType: string;
  breed: string;
  birthdate?: string;
  age: string;
  ageUnit?: string;
  medicalConditions: string[];
  hasHealthConditions?: boolean;
  userId?: number;
}

interface PetSelectionFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: PetInfo) => void;
}

interface BreedOption {
  value: string;
  label: string;
}

const medicalConditionOptions = [
  { value: 'skin_issues', label: 'Skin Issues' },
  { value: 'allergies', label: 'Allergies' },
  { value: 'diabetes', label: 'Diabetes' },
  { value: 'heart_disease', label: 'Heart Disease' },
  { value: 'asthma', label: 'Asthma' },
  { value: 'arthritis', label: 'Arthritis' },
  { value: 'obesity', label: 'Obesity' },
  { value: 'dental_issues', label: 'Dental Issues' },
];

const PetSelectionForm: React.FC<PetSelectionFormProps> = ({
  onSubmit,
  isOpen,
  onOpenChange,
}) => {
  const login = useAuthStore((state) => state.login);
  const [currentStep, setCurrentStep] = useState<number>(0);

  const [petInfo, setPetInfo] = useState<PetInfo>({
    petType: '',
    name: '',
    genderType: '',
    breed: '',
    birthdate: '',
    age: '',
    ageUnit: 'years',
    medicalConditions: [],
    hasHealthConditions: false,
  });

  const handlePetTypeSelect = (type: string): void => {
    setPetInfo({ ...petInfo, petType: type });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPetInfo({ ...petInfo, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string): void => {
    setPetInfo({ ...petInfo, [name]: value });
  };

  const handleGenderSelect = (genderType: string): void => {
    setPetInfo({ ...petInfo, genderType });
  };



  const handleMedicalConditionChange = (selectedConditions: string[]) => {
    setPetInfo((prev) => ({
      ...prev,
      medicalConditions: selectedConditions,
      // Automatically set hasHealthConditions to true if conditions are selected
      hasHealthConditions: selectedConditions.length > 0,
    }));
  };
  const handleHealthConditionChange = (condition: string): void => {
    const updatedConditions = [...petInfo.medicalConditions];
    if (updatedConditions.includes(condition)) {
      const index = updatedConditions.indexOf(condition);
      updatedConditions.splice(index, 1);
    } else {
      updatedConditions.push(condition);
    }
    setPetInfo({ ...petInfo, medicalConditions: updatedConditions });
  };

  const handleAddMedication = (): void => {
    const inputElement = document.getElementById(
      'medication-input'
    ) as HTMLInputElement;
    if (inputElement && inputElement.value.trim() !== '') {
      setPetInfo({
        ...petInfo,
        medicalConditions: [
          ...petInfo.medicalConditions,
          inputElement.value.trim(),
        ],
      });
      inputElement.value = '';
    }
  };

  const handleRemoveMedication = (index: number): void => {
    const updatedMedications = [...petInfo.medicalConditions];
    updatedMedications.splice(index, 1);
    setPetInfo({ ...petInfo, medicalConditions: updatedMedications });
  };

  const handleSubmit = (): void => {
    const formattedData: PetInfo = {
      name: petInfo.name,
      petType: petInfo.petType,
      breed: petInfo.breed,
      age: petInfo.age,
      //   weight: petInfo.weight,
      medicalConditions: petInfo?.medicalConditions,
      userId: Number(login?.userId),
      genderType: petInfo.genderType,
    };
    onSubmit(formattedData);
  };

  const goToNextStep = (): void => {
    // if (currentStep === 3) {
    // //   handleSubmit();
    // }
    setCurrentStep(currentStep + 1);
  };

  const goToPreviousStep = (): void => setCurrentStep(currentStep - 1);

  const getBreedOptions = (): BreedOption[] => {
    if (petInfo.petType === 'Dog') {
      return [
        { value: 'Labrador', label: 'Labrador' },
        { value: 'German Shepherd', label: 'German Shepherd' },
        { value: 'Golden Retriever', label: 'Golden Retriever' },
        { value: 'Beagle', label: 'Beagle' },
        { value: 'Poodle', label: 'Poodle' },
      ];
    } else if (petInfo.petType === 'Cat') {
      return [
        { value: 'Persian', label: 'Persian' },
        { value: 'Maine Coon', label: 'Maine Coon' },
        { value: 'Siamese', label: 'Siamese' },
        { value: 'Ragdoll', label: 'Ragdoll' },
        { value: 'Bengal', label: 'Bengal' },
      ];
    }
    return [];
  };



  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="flex flex-col items-center">
            <h1 className="text-xl font-bold text-purple-900 mb-6">
              What Kind of Pet Do You Have?
            </h1>

            <div className="grid grid-cols-2 gap-4 w-full max-w-sm mb-6">
              <div
                className={`flex flex-col items-center p-4 rounded-lg cursor-pointer transition-colors ${
                  petInfo.petType === 'Dog'
                    ? 'bg-purple-200'
                    : 'bg-purple-100 hover:bg-purple-50'
                }`}
                onClick={() => handlePetTypeSelect('Dog')}
              >
                <div className="relative mb-2">
                  <div className="w-24 h-24 bg-purple-300 rounded-lg flex items-center justify-center">
                    <span className="text-4xl">🐶</span>
                  </div>
                  {petInfo.petType === 'Dog' && (
                    <div className="absolute -bottom-2 w-full flex justify-center">
                      <div className="h-1 w-16 bg-purple-500 rounded-full"></div>
                    </div>
                  )}
                </div>
                <span className="font-medium">Dog</span>
              </div>

              <div
                className={`flex flex-col items-center p-4 rounded-lg cursor-pointer transition-colors ${
                  petInfo.petType === 'Cat'
                    ? 'bg-blue-200'
                    : 'bg-blue-100 hover:bg-blue-50'
                }`}
                onClick={() => handlePetTypeSelect('Cat')}
              >
                <div className="relative mb-2">
                  <div className="w-24 h-24 bg-blue-300 rounded-lg flex items-center justify-center">
                    <span className="text-4xl">🐱</span>
                  </div>
                  {petInfo.petType === 'Cat' && (
                    <div className="absolute -bottom-2 w-full flex justify-center">
                      <div className="h-1 w-16 bg-blue-500 rounded-full"></div>
                    </div>
                  )}
                </div>
                <span className="font-medium">Cat</span>
              </div>
            </div>

            <div className="flex justify-end w-full mt-auto">
              {/* <Button    className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-full"
                onClick={goToNextStep}
                disabled={!petInfo.petType}
              >
                Continue
              </Button> */}
              <Button
                className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-full"
                onClick={goToNextStep}
                disabled={!petInfo.petType}
              >
                Continue
              </Button>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="flex flex-col">
            <div className="flex justify-center">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center ${
                  petInfo.petType === 'Dog' ? 'bg-purple-300' : 'bg-blue-300'
                }`}
              >
                <span className="text-2xl">
                  {petInfo.petType === 'Dog' ? '🐶' : '🐱'}
                </span>
              </div>
            </div>

            <h1 className="text-xl font-bold text-purple-900 text-center mb-6">
              Let&apos;s get to Know Your {petInfo.petType}
            </h1>

            <div className="space-y-7 p-4">
              <div>
                <DogNameInput
                  value={petInfo.name}
                  onChange={(name) => setPetInfo({ ...petInfo, name })}
                  labelText={`What is your ${petInfo.petType} name?`}
                  placeholder="Type your pet's name"
                />
              </div>

              <div>
                <Label className="text-sm font-medium">
                  Gender <span className="text-red-500">*</span>
                </Label>
                <div className="grid grid-cols-2 mt-4 gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    className={`p-2 flex items-center text-black justify-center ${
                      petInfo.genderType === 'MALE'
                        ? 'bg-purple-100 border-purple-500'
                        : 'border-gray-300'
                    }`}
                    onClick={() => handleGenderSelect('MALE')}
                  >
                    <span
                      className={`mr-2 ${
                        petInfo.genderType === 'MALE' ? 'text-purple-500' : ''
                      }`}
                    >
                      ♂
                    </span>{' '}
                    Male
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className={`p-2 flex items-center justify-center ${
                      petInfo.genderType === 'FEMALE'
                        ? 'bg-purple-100 border-purple-500'
                        : 'border-gray-300'
                    }`}
                    onClick={() => handleGenderSelect('FEMALE')}
                  >
                    <span
                      className={`mr-2 ${
                        petInfo.genderType === 'FEMALE' ? 'text-purple-500' : ''
                      }`}
                    >
                      ♀
                    </span>{' '}
                    Female
                  </Button>
                </div>
              </div>

              <div className="flex space-x-4">
                <div className="flex-1">
                  <Label htmlFor="breed-select" className="text-sm font-medium">
                    Breed <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={petInfo.breed}
                    onValueChange={(value) =>
                      handleSelectChange('breed', value)
                    }
                  >
                    <SelectTrigger
                      id="breed-select"
                      className="w-full mt-1 border-0 border-b text-black border-gray-300 focus:border-primary focus:outline-none focus:ring-0 text-sm rounded-none h-12 px-0 shadow-none bg-transparent"
                    >
                      <SelectValue
                        placeholder="Select Your Dog's Breed"
                        className="text-black "
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {getBreedOptions().map((breed) => (
                        <SelectItem key={breed.value} value={breed.value}>
                          {breed.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <label htmlFor="age" className="text-sm font-medium">
                    Age <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center space-x-2 mt-1">
                    <input
                      id="age"
                      type="number"
                      name="age"
                      placeholder="Age"
                      value={petInfo.age}
                      onChange={handleInputChange}
                      className="w-full h-12 px-0 border-0 border-b bg-white border-gray-300 focus:border-primary focus:outline-none focus:ring-0 rounded-none text-sm"
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="space-y-2 mb-2">
                  <MultiSelect
                    label="Medical Conditions (if any)"
                    options={medicalConditionOptions}
                    selectedValues={petInfo.medicalConditions}
                    onChange={handleMedicalConditionChange}
                    placeholder="Select conditions..."
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between w-full mt-6">
              <Button
                variant="ghost"
                className="text-gray-500 font-medium"
                onClick={goToPreviousStep}
              >
                Back
              </Button>
              <Button
                className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-full"
                onClick={goToNextStep}
                disabled={
                  !petInfo.name ||
                  !petInfo.genderType ||
                  !petInfo.breed ||
                  !(petInfo.birthdate || petInfo.age)
                }
              >
                Continue
              </Button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-purple-900 text-center mb-2">
              Your {petInfo.petType}&apos;s Medical History
            </h1>

            <div className="space-y-4">
              <div>
                <p className="mb-2 font-medium">
                  Does your pet have any known health conditions?
                </p>
                <RadioGroup
                  value={petInfo.hasHealthConditions ? 'yes' : 'no'}
                  onValueChange={(value) =>
                    setPetInfo({
                      ...petInfo,
                      hasHealthConditions: value === 'yes',
                    })
                  }
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="health-yes" />
                      <Label htmlFor="health-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="health-no" />
                      <Label htmlFor="health-no">No</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>
              {petInfo.hasHealthConditions && (
                <div className="space-y-6">
                  <p className="font-medium">Select all that apply:</p>
                  {[
                    'Allergies',
                    'Heart Disease',
                    'Diabetes',
                    'Kidney Disease',
                    'Skin Conditions',
                    'Other',
                  ].map((condition) => (
                    <div
                      key={condition}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`health-${condition}`}
                        checked={petInfo.medicalConditions.includes(condition)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            handleHealthConditionChange(condition);
                          } else {
                            handleHealthConditionChange(condition);
                          }
                        }}
                      />
                      <label
                        htmlFor={`health-${condition}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {condition}
                      </label>
                    </div>
                  ))}
                </div>
              )}
              {petInfo.medicalConditions.includes('Other') && (
                <div className="pt-4 border-t">
                  <p className="font-medium mb-2">Medications</p>
                  <div className="space-y-2">
                    <div className="flex space-x-2">
                      <Input
                        id="medication-input"
                        type="text"
                        placeholder="Enter medication"
                        className="flex-1"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleAddMedication();
                          }
                        }}
                      />
                      <Button
                        onClick={handleAddMedication}
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                      >
                        Add
                      </Button>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-2">
                      {petInfo.medicalConditions.map((medication, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="px-3 py-1 bg-purple-100 text-purple-800"
                        >
                          {medication}
                          <button
                            onClick={() => handleRemoveMedication(index)}
                            className="ml-2 text-purple-600 hover:text-purple-800 focus:outline-none"
                            type="button"
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between w-full mt-auto pt-6">
              <Button
                variant="ghost"
                className="text-gray-500 font-medium"
                onClick={goToPreviousStep}
              >
                Back
              </Button>
              <Button
                className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-full"
                onClick={goToNextStep}
              >
                Continue
              </Button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="flex flex-col items-center">
            <h1 className="text-xl font-bold text-purple-900 mb-2">
              Hooray! {petInfo.name} Has a Profile!
            </h1>

            <div className="relative w-32 h-32 mb-4">
              <div className="w-full h-full rounded-full border-4 border-teal-100"></div>
              <div
                className="absolute inset-0 rounded-full border-4 border-teal-500 border-l-transparent border-t-transparent border-r-transparent"
                style={{ transform: 'rotate(45deg)' }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold">Thank You</span>
              </div>
              {/* <div className="text-center mt-1 text-xs">
                Customizing {petInfo.name}'s Profile
              </div> */}
            </div>

            <p className="text-center text-sm mb-6">
              You&apos;re all set to track {petInfo.name}&apos;s health, vaccinations, and
              milestones. Let&apos;s take a quick tour of the app!
            </p>

            <Button
              className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-full w-full mb-4"
              onClick={() => {
                handleSubmit();
                goToNextStep();
              }}
            >
              Explore Now
            </Button>
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-md mx-auto p-0 overflow-hidden">
        <div className="pt-2 px-4 flex items-center justify-between">
          <button
            onClick={goToPreviousStep}
            disabled={currentStep === 0}
            className={`p-2 transition-opacity ${
              currentStep === 0 ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>
        <div className="flex justify-center space-x-1 my-2">
          {[0, 1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`h-1 rounded-full transition-all ${
                step === currentStep ? 'w-6 bg-purple-600' : 'w-1 bg-gray-300'
              }`}
            ></div>
          ))}
        </div>

        <div className="flex-1 p-4 flex flex-col">{renderStep()}</div>
      </DialogContent>
    </Dialog>
  );
};

export default PetSelectionForm;
