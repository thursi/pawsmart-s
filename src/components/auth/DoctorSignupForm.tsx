import React, { useState } from 'react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '../ui/select';
import { Eye, EyeOff, ArrowRight, CalendarIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { cn } from '@/lib/utils';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { COLORS } from '@/app/constants/color';

interface signInDoc {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  email: string;
  password: string;
  confirmPassword?: string;
  phoneNo: string;
  gender: string;
  bio: string;
  qualification: string;
  experience: string;
  paymentPerSession: string;
  consultationDuration: number;
  specializationId: number;
  role: number;
}

const signInDocFormSchema = z.object({
  firstName: z.string({ required_error: 'Please enter your first name!' }),
  password: z.string({ required_error: 'Please enter your password!' }),
  // confirmPassword: z
  // .string()
  // .nonempty('Please confirm your password!')
  // .refine((val, ctx) => val === ctx.parent.password, {
  //   message: "Passwords don't match",
  // }),
  confirmPassword: z
  .string()
  .nonempty('Please confirm your password!'),
  lastName: z.string({ required_error: 'Please enter your last name!' }),
  email: z
    .string({ required_error: 'Please enter your email!' })
    .email('Please enter a valid email!'),
  phoneNo: z
    .string({ required_error: 'Phone number is required!' })
    .regex(
      /^[0]{1}[7]{1}[01245678]{1}[0-9]{7}$/,
      'Please enter a valid phone number'
    ),
  dateOfBirth: z.date({ required_error: 'Please Select the date of birth!' }),
  gender: z.string({ required_error: 'Gender is required!' }),
  bio: z.string().min(10, 'Bio should be at least 10 characters long'),
  qualification: z
    .string({ required_error: 'Qualification is required!' })
    .min(3, 'Qualification should be at least 3 characters long'),
  experience: z
    .string({ required_error: 'Experience is required!' })
    .min(3, 'Experience should be at least 3 characters long'),
  paymentPerSession: z
    .string({ required_error: 'Payment per session is required!' })
    .regex(/^\d+(\.\d{1,2})?$/, 'Please enter a valid amount'),
  consultationDuration: z
    .number({ required_error: 'Consultation duration is required!' })
    .min(1, 'Consultation duration must be at least 1 minute'),
  specializationId: z
    .number({ required_error: 'Specialization ID is required!' }),
  role: z.number({ required_error: '' }),
});

type SignInDocProps = {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  onDocSubmit: (data: signInDoc) => void;
  calendarOpen: boolean;
  setCalendarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SignInDoc: React.FC<SignInDocProps> = ({
  isOpen,
  onClose,
  onDocSubmit,
  calendarOpen,
  setCalendarOpen,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);

  const signInDocForm = useForm<z.infer<typeof signInDocFormSchema>>({
    resolver: zodResolver(signInDocFormSchema),
    defaultValues: {
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      password: undefined,
      phoneNo: undefined,
      confirmPassword: undefined,
      dateOfBirth: undefined,
      gender: undefined,
      role: 3,
      bio: '',
      qualification: undefined,
      experience: undefined,
      paymentPerSession: undefined,
      consultationDuration: 0,
      specializationId: undefined,
    },
  });

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    if (value !== signInDocForm.watch('password')) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError(null);
    }
  };

  const Submit: SubmitHandler<signInDoc> = (data) => {
    const { confirmPassword, ...signupDocData } = data;
    console.log("confirmPassword",confirmPassword)
    onDocSubmit(signupDocData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[1000px] p-4 overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-black">
            Welcome to Pawsmart.A
          </DialogTitle>
          <DialogDescription className="text-black">
            <div className="flex justify-between items-center">
              <span>Create your account to get started</span>
            </div>
          </DialogDescription>
        </DialogHeader>

        <Form {...signInDocForm}>
          <form
            onSubmit={signInDocForm.handleSubmit(Submit)}
            className="pt-3 pr-6 pl-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* First Name Field */}
              <FormField
                control={signInDocForm.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-black">
                      First Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John"
                        {...field}
                        className="h-10 transition-all focus:outline-none focus:ring-0"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs mt-1" />
                  </FormItem>
                )}
              />

              {/* Last Name Field */}
              <FormField
                control={signInDocForm.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-black">
                      Last Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Doe"
                        {...field}
                        className="h-10 transition-all focus:outline-none focus:ring-0"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs mt-1" />
                  </FormItem>
                )}
              />

              {/* Gender Field */}
              <FormField
                control={signInDocForm.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-black">
                      Gender
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-10 transition-all focus:outline-none focus:ring-0">
                          <SelectValue
                            className="text-black"
                            placeholder="Select gender"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="text-black">
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-500 text-xs mt-1" />
                  </FormItem>
                )}
              />

              {/* Date of Birth Field */}
              <FormField
                control={signInDocForm.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-black">
                      Date of Birth
                    </FormLabel>
                    <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              'h-10 w-full pl-3 text-left font-normal transition-all focus:outline-none focus:ring-0',
                              !field.value && 'text-gray-400'
                            )}
                          >
                            {field.value
                              ? format(new Date(field.value), 'PPP')
                              : 'Pick a date'}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => {
                            if (date) {
                              field.onChange(date);
                              setCalendarOpen(false);
                            }
                          }}
                          aria-label="Date Picker"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage className="text-red-500 text-xs mt-1" />
                  </FormItem>
                )}
              />
            </div>

            {/* Email, Password, Confirm Password Fields */}
            <div className="grid grid-cols-3 gap-4 pb-6">
              <FormField
                control={signInDocForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-black">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="you@example.com"
                        type="email"
                        {...field}
                        className="h-10 transition-all focus:outline-none focus:ring-0"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs mt-1" />
                  </FormItem>
                )}
              />

              <FormField
                control={signInDocForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-black">
                      Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Create a strong password"
                          {...field}
                          className="h-10 pr-10 transition-all focus:outline-none focus:ring-0"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showPassword ? (
                            <Eye className="h-4 w-4" />
                          ) : (
                            <EyeOff className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs mt-1" />
                  </FormItem>
                )}
              />

              <FormField
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-black">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder="Re-enter your password"
                          {...field}
                          onChange={(e) => {
                            handleConfirmPasswordChange(e);
                            field.onChange(e);
                          }}
                          className="h-10 pr-10 transition-all focus:outline-none focus:ring-0"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showConfirmPassword ? (
                            <Eye className="h-4 w-4" />
                          ) : (
                            <EyeOff className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    {confirmPasswordError && (
                      <FormMessage className="text-red-500 text-xs mt-1">
                        {confirmPasswordError}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
                name=""
              />
            </div>

            {/* Phone Number, Bio, Qualification, Experience Fields */}
            <div className="grid grid-cols-2 gap-4 pb-6">
              <FormField
                control={signInDocForm.control}
                name="phoneNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-black">
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="+1 (555) 000-0000"
                        {...field}
                        className="h-10 transition-all focus:outline-none focus:ring-0"
                        onInput={(e) => {
                          if (e.target instanceof HTMLInputElement) {
                            e.target.value = e.target.value.replace(
                              /[^0-9+]/g,
                              ''
                            );
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs mt-1" />
                  </FormItem>
                )}
              />

              {/* Bio Field */}
              <FormField
                control={signInDocForm.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-black">
                      Bio
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter a short bio"
                        {...field}
                        className="h-10 transition-all focus:outline-none focus:ring-0"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Qualification Field */}
              <FormField
                control={signInDocForm.control}
                name="qualification"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-black">
                      Qualification
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your qualification"
                        {...field}
                        className="h-10 transition-all focus:outline-none focus:ring-0"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Experience Field */}
              <FormField
                control={signInDocForm.control}
                name="experience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-black">
                      Experience
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter years of experience"
                        {...field}
                        className="h-10 transition-all focus:outline-none focus:ring-0"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Payment per Session and Consultation Duration Fields */}
            <div className="grid grid-cols-2 gap-4 pb-6">
              <FormField
                control={signInDocForm.control}
                name="paymentPerSession"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-black">
                      Payment per Session
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your payment per session"
                        {...field}
                        className="h-10 transition-all focus:outline-none focus:ring-0"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={signInDocForm.control}
                name="consultationDuration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-black">
                      Consultation Duration (in minutes)
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="h-10 transition-all focus:outline-none focus:ring-0">
                          <SelectValue placeholder="Select Duration" />
                        </SelectTrigger>
                        <SelectContent className="text-black">
                          {/* Predefined options for consultation duration */}
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="60">60 minutes</SelectItem>
                          <SelectItem value="90">90 minutes</SelectItem>
                          <SelectItem value="120">120 minutes</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs mt-1" />
                  </FormItem>
                )}
              />
            </div>

         
            <FormField
              control={signInDocForm.control}
              name="specializationId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-black">
                    Specialization
                  </FormLabel>
                  <FormControl>
        <Select onValueChange={field.onChange} >
          <SelectTrigger className="h-10 transition-all focus:outline-none focus:ring-0">
            <SelectValue placeholder="Select Specialization" />
          </SelectTrigger>
          <SelectContent className="text-black">
             <SelectItem value="1">Specialization 1</SelectItem>
            <SelectItem value="2">Specialization 2</SelectItem>
            <SelectItem value="3">Specialization 3</SelectItem>
            <SelectItem value="4">Specialization 4</SelectItem>
            {/* Replace with your actual data */}
          </SelectContent>
        </Select>
      </FormControl>
                </FormItem>
              )}
            />

      
            <div className="flex flex-col gap-4 pb-6">
              <Button
                type="submit"
                className={`flex items-center justify-center gap-2 group text-white font-medium py-2 px-4   ${COLORS.bgPurple} ${COLORS.hoverbgGreen} rounded-md transition-colors`}
              >
                Create Account
                <ArrowRight
                  className="ml-2 w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 text-white transition-all duration-200"
                  size={20}
                />
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SignInDoc;
