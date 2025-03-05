'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  CalendarIcon,
  Stethoscope,
  UserCircle,
  GraduationCap,
} from 'lucide-react';
import { createDoctor } from '@/api/Doctor/route';
import { getAllspecialization } from '@/api/Specialization/route';
import { useSpecializationStore } from '@/store/specializationStore';
import { Specialization } from '@/lib/typings';
import FilterDropdown from '@/components/FilterDropdown';
import NotificationComponent from '@/components/Doctor/DocPopup';
import SignInDialog from '@/components/auth/SignInDialog';
import { loginUser } from '@/api/Auth/route';
import { useAuthStore } from '@/store/authStore';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface Option {
  label: string;
  value: number;
}
interface StepIndicatorProps {
  number: number;
  title: string;
  isActive: boolean;
  isCompleted: boolean;
}

interface NotificationState {
  isOpen: boolean;
  type: 'success' | 'error';
  title: string;
  message: string;
}

interface SignInFormData {
  userName: string;
  password: string;
}

const DoctorRegistrationForm = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSpecialization, setSelectedSpecialization] =
    useState<Option | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  console.log(selectedSpecialization);

  const [notification, setNotification] = useState<NotificationState>({
    isOpen: false,
    type: 'success',
    title: '',
    message: '',
  });

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNo: '',
    dateOfBirth: '',
    gender: '',
    bio: '',
    qualification: '',
    experience: '',
    paymentPerSession: '',
    consultationDuration: '',
    specializationId: '',
    role: 3,
  });

  const setLogin = useAuthStore((state) => state.setLogin);
  const updateForm = (field: keyof typeof formData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const specialization = useSpecializationStore(
    (state: { specialization: Specialization[] }) => state.specialization
  );
  const setAllSpecialization = useSpecializationStore(
    (state: { setAllSpecialization: (specs: Specialization[]) => void }) =>
      state.setAllSpecialization
  );

  const specializationOptions = Array.isArray(specialization)
    ? specialization.map((special: Specialization) => ({
        label: special.name,
        value: special.id,
      }))
    : [];

  const fetchData = useCallback(async () => {
    try {
      const specializations = await getAllspecialization(1, 10);
      setAllSpecialization(specializations.records);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [setAllSpecialization]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSubmit = async () => {
    try {
      const response = await createDoctor(formData);
      if (response.success) {
        setNotification({
          isOpen: true,
          type: 'success',
          title: response.message,
          message:
            'Your registration has been submitted successfully. We will review your application and get back to you soon. An email with your login credentials has been sent to your registered email address. You can use these credentials to log in to your account.',
        });
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          phoneNo: '',
          dateOfBirth: '',
          gender: '',
          bio: '',
          qualification: '',
          experience: '',
          paymentPerSession: '',
          consultationDuration: '',
          specializationId: '',
          role: 3,
        });
      } else {
        setNotification({
          isOpen: true,
          type: 'error',
          title: response.message,
          message:
            'There was an error processing your registration. Please try again.',
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSignIn = async (data: SignInFormData) => {
    try {
      const response = await loginUser({
        userName: data.userName,
        password: data.password,
      });

      // if (response.success) {
      //   setLogin(response);
      //   toast.success(response.message);
      //   setIsDialogOpen(false);
      //   // router.push('/');
      // }
      if (response.success && response.role === 'GUEST') {
        setLogin(response);
        toast.success(response.message);
        setIsDialogOpen(false);
        router.push(`/doctorprofile/${response?.userId}`);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error('Oops! Something went wrong. Try again.');
      console.error('Sign-in failed:', error);
    } finally {
    }
  };

  const closeNotification = () => {
    console.log('..isDialogOpen...........', isDialogOpen);
    setNotification((prev) => ({ ...prev, isOpen: false }));
    setTimeout(() => {
      setIsDialogOpen(true);
    }, 100);
  };
  // if (showSuccess) {
  //   return (
  //     <div className="min-h-screen bg-gradient-to-b flex flex-col items-center justify-start pt-20 px-4">
  //       <div className="text-black text-6xl font-bold mb-8">PAWSMART</div>

  //       <div className="text-black text-xl mb-16 text-center">
  //         Connecting those in need
  //       </div>

  //       <div className="bg-blue-50 rounded-lg p-8 max-w-2xl w-full mx-4">
  //         <h1 className="text-purple-600 text-4xl font-bold mb-6">
  //           Thank you! Your submission has been received and is greatly
  //           appreciated.
  //         </h1>

  //         <p className="text-purple-600 text-lg mb-8">
  //           Your details will be reviewed, and verification will take place
  //           shortly. Once verified, your information will be available for those
  //           in need.
  //         </p>

  //         <div className="bg-blue-100 p-6 rounded-lg">
  //           <p className="text-purple-600">
  //             If your situation changes and you need to update or remove your
  //             submission, simply search for your details via the help finder and
  //             click on &apos;edit&isquo;remove&apos; offer.
  //           </p>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  const StepIndicator = ({
    number,
    title,
    isActive,
    isCompleted,
  }: StepIndicatorProps) => (
    <div className="flex items-center">
      <div
        className={`
        w-10 h-10 rounded-full flex items-center justify-center
        ${
          isActive
            ? 'bg-purple-600 text-white'
            : isCompleted
            ? 'bg-green-500 text-white'
            : 'bg-gray-200 text-gray-600'
        }
      `}
      >
        {isCompleted ? '✓' : number}
      </div>
      <div className="ml-3">
        <p className="font-medium text-sm text-gray-900">{title}</p>
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="md:col-span-2">
        <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-6 mb-6">
          <div className="flex items-center space-x-4">
            <UserCircle className="w-12 h-12 text-purple-600" />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Personal Information
              </h2>
              <p className="text-gray-600">
                Let&apos;s start with your basic details
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            placeholder="Enter your first name"
            value={formData.firstName}
            onChange={(e) => updateForm('firstName', e.target.value)}
            className="border-gray-300 focus:border-purple-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            placeholder="Enter your last name"
            value={formData.lastName}
            onChange={(e) => updateForm('lastName', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <div className="relative">
            <Input
              id="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => updateForm('dateOfBirth', e.target.value)}
            />
            <CalendarIcon className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="doctor@example.com"
            value={formData.email}
            onChange={(e) => updateForm('email', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phoneNo">Phone Number</Label>
          <Input
            id="phoneNo"
            placeholder="Enter your phone number"
            value={formData.phoneNo}
            onChange={(e) => updateForm('phoneNo', e.target.value)}
          />
        </div>
      </div>

      <div className="md:col-span-2">
        <div className="space-y-2">
          <Label>Gender</Label>
          <RadioGroup
            value={formData.gender}
            onValueChange={(value) => updateForm('gender', value)}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female">Female</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="md:col-span-2">
        <div className="bg-gradient-to-r from-blue-100 to-green-100 rounded-lg p-6 mb-6">
          <div className="flex items-center space-x-4">
            <GraduationCap className="w-12 h-12 text-blue-600" />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Professional Details
              </h2>
              <p className="text-gray-600">
                Tell us about your medical expertise
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="md:col-span-2">
        <div className="space-y-2">
          <Label htmlFor="bio">Professional Bio</Label>
          <Textarea
            id="bio"
            placeholder="Tell us about your professional background and experience..."
            className="h-32"
            value={formData.bio}
            onChange={(e) => updateForm('bio', e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="qualification">Qualifications</Label>
          <Input
            id="qualification"
            placeholder="Enter your medical qualifications"
            value={formData.qualification}
            onChange={(e) => updateForm('qualification', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="specialization">Specialization</Label>
          <FilterDropdown
            options={specializationOptions}
            placeholder="👩‍⚕️ Select Specialization"
            onChange={(selectedOption: Option | null) => {
              setFormData((prev) => ({
                ...prev,
                specializationId: selectedOption?.value.toString() || '', // Convert to string
              }));
              setSelectedSpecialization(selectedOption);
            }}
            value={
              specializationOptions.find(
                (option: Option) =>
                  option.value.toString() === formData.specializationId
              ) || null
            }
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="experience">Years of Experience</Label>
          <Input
            id="experience"
            type="number"
            placeholder="Years of professional experience"
            value={formData.experience}
            onChange={(e) => updateForm('experience', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="consultationDuration">Session Duration</Label>
          <Select
            value={formData.consultationDuration}
            onValueChange={(value) => updateForm('consultationDuration', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15">15 minutes</SelectItem>
              <SelectItem value="30">30 minutes</SelectItem>
              <SelectItem value="45">45 minutes</SelectItem>
              <SelectItem value="60">60 minutes</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="md:col-span-2">
        <div className="space-y-2">
          <Label htmlFor="paymentPerSession">Payment per Session ($)</Label>
          <Input
            id="paymentPerSession"
            type="number"
            placeholder="Enter amount"
            value={formData.paymentPerSession}
            onChange={(e) => updateForm('paymentPerSession', e.target.value)}
          />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="min-h-screen py-14 bg-gray-50">
        <div className="max-w-4xl mx-auto py-12 px-4">
          <div className="text-center mb-8">
            <div className="inline-block p-2 bg-purple-100 rounded-full mb-4">
              <Stethoscope className="w-8 h-8 text-purple-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              Join Our Medical Network
            </h1>
            <p className="mt-2 text-gray-600">
              Make a difference in veterinary healthcare
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <StepIndicator
                  number={1}
                  title="Personal Details"
                  isActive={currentStep === 1}
                  isCompleted={currentStep > 1}
                />
                <div className="flex-1 mx-4 border-t-2 border-gray-200" />
                <StepIndicator
                  number={2}
                  title="Professional Info"
                  isActive={currentStep === 2}
                  isCompleted={currentStep > 2}
                />
              </div>
            </div>

            <div className="p-6">
              {currentStep === 1 ? renderStep1() : renderStep2()}
            </div>

            <div className="p-6 bg-gray-50 flex justify-between">
              {currentStep > 1 && (
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  Previous
                </Button>
              )}
              <div className="ml-auto">
                {currentStep < 2 ? (
                  <Button
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                    onClick={() => setCurrentStep(currentStep + 1)}
                  >
                    Continue
                  </Button>
                ) : (
                  <Button
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                    onClick={handleSubmit}
                  >
                    Complete Registration
                  </Button>
                )}
              </div>
            </div>
          </div>

          <div className="text-center text-sm text-gray-500">
            <p>
              By registering, you agree to our Terms of Service and Privacy
              Policy
            </p>
          </div>
        </div>
        <NotificationComponent
          isOpen={notification.isOpen}
          onClose={closeNotification}
          title={notification.title}
          message={notification.message}
          type={notification.type}
        />
        <SignInDialog
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onSignIn={(data) => {
            console.log(data);
            handleSignIn(data);
          }}
          onSignUp={() => {
            // setIsForgotPasswordOpen(false);
            setIsDialogOpen(false);
            // setIsSignupOpen(true);
          }}
          onForgotPassword={() => {
            // setIsForgotPasswordOpen(true);
            setIsDialogOpen(false);
          }}
          loading={false}
        />
        ;
      </div>
    </>
  );
};

export default DoctorRegistrationForm;
