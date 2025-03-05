import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
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
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { COLORS } from '@/app/constants/color';

interface SignupFormData {
  userName: string;
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  role: number;
  confirmPassword?: string;
}

const formSchema = z
  .object({
    userName: z.string()
      .min(1, { message: 'Username is required' }),
      email: z
      .string({ required_error: 'Please enter your email!' })
      .email('Please enter a valid email!'),
    password: z.string().min(1, { message: 'Please enter your password!' }),
    confirmPassword: z.string().nonempty('Please confirm your password!'),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: "Passwords don't match",
        path: ['confirmPassword'],
      });
    }
  });
interface SignupDialogProps {
  isSignupOpen: boolean;
  setIsSignupOpen: (open: boolean) => void;
  onSubmit: (data: SignupFormData) => void;
  loading?: boolean;
}

const SignupDialog: React.FC<SignupDialogProps> = ({
  isSignupOpen,
  setIsSignupOpen,
  onSubmit,
  loading = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: '',
      firstName: '',
      lastName: '',
      password: '',
      email: '',
      confirmPassword: '',
      role: 4,
    },
  });

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleSubmit = (data: SignupFormData) => {
    const nameParts = data.userName.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || undefined;

    const submissionData: SignupFormData = {
      userName: data.userName,
      firstName,
      lastName,
      email: data.email,
      password: data.password,
      role: 4,
    };

    onSubmit(submissionData);
  };

  return (
    <Dialog open={isSignupOpen} onOpenChange={setIsSignupOpen}>
      <DialogContent className="sm:max-w-[600px] p-4 overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex mt-6 justify-between text-black">
            Welcome to Pawsmart.A
          </DialogTitle>
          <DialogDescription className="text-black">
            Create your account to get started
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="pt-3 pr-6 pl-6"
          >
            <FormField
              control={form.control}
              name="userName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-black">
                    User Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your user name"
                      {...field}
                      className="h-10 transition-all focus:outline-none focus:ring-0"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs mt-1" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
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

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
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
                          onClick={togglePasswordVisibility}
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
                control={form.control}
                name="confirmPassword"
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
                          className="h-10 pr-10 transition-all focus:outline-none focus:ring-0"
                        />
                        <button
                          type="button"
                          onClick={toggleConfirmPasswordVisibility}
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
                    <FormMessage className="text-red-500 text-xs mt-1" />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <button
                disabled={loading}
                type="submit"
                className={`flex w-full items-center justify-center mt-6 group ${COLORS.bgPurple} ${COLORS.hoverbgPurple} text-white font-medium py-2 px-4 rounded-md transition-colors`}
              >
                {loading ? 'Creating...' : ' Create Account'}
                <ArrowRight
                  className="ml-2 w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 text-white transition-all duration-200"
                  size={20}
                />
              </button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SignupDialog;
