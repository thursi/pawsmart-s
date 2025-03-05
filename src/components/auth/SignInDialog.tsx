import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
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
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { COLORS } from '@/app/constants/color';

interface SignInFormData {
  userName: string;
  password: string;
}
const signInFormSchema = z.object({
  userName: z
    .string({ required_error: 'Please enter your email!' })
    .email('Please enter a valid email!'),
    password: z
    .string()
    .min(1, { message: 'Please enter your password!' }), 
});

interface SignInDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSignIn: (data: SignInFormData) => void;
  onSignUp: () => void;
  onForgotPassword: () => void;
  loading?: boolean;
  ref?: React.Ref<HTMLDivElement>;
}

const SignInDialog: React.FC<SignInDialogProps> = ({
  isOpen,
  onOpenChange,
  onSignIn,
  onSignUp,
  onForgotPassword,
  loading = false,
  ref,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      userName:'',
      password:'',
    },
    mode: 'onSubmit',
  });

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit: SubmitHandler<SignInFormData> = (data) => {
    onSignIn(data);
  };



  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent ref={ref}>
        <DialogHeader>
          <DialogTitle className="text-black">Sign In</DialogTitle>
          <DialogDescription className="text-black">
            Enter your credentials to sign in.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="py-3">
              <FormField
                control={form.control}
                name="userName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-black">
                      Email
                    </FormLabel>
                    <FormControl className="focus:outline-none focus:ring-0">
                      <Input
                        placeholder="Enter email"
                        className="w-full px-2 mt-2 py-2 border text-xs text-gray-700 border-[#b0afb3] rounded-md focus:outline-none focus:ring-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs mt-1" />
                  </FormItem>
                )}
              />
            </div>

            <div className="py-3">
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
                          className="w-full px-2 mt-2 py-2 border text-xs text-gray-700 border-[#b0afb3] rounded-md focus:outline-none focus:ring-0"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter password"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute right-3 top-1/2 transform text-gray-700 text-sm -translate-y-1/2"
                        >
                          {showPassword ? (
                            <EyeOff className="text-black" />
                          ) : (
                            <Eye className="text-black" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs mt-2" />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={onForgotPassword}
                className="text-sm underline text-black font-bold"
              >
                Forgot password?
              </button>
            </div>

            <DialogFooter>
              <button
                disabled={loading}
                type="submit"
                className={`flex w-full items-center justify-center mt-6 group ${COLORS.bgPurple} ${COLORS.hoverbgPurple} text-white font-medium py-2 px-4 rounded-md transition-colors`}
              >
                {loading ? 'Signing in...' : 'Sign In'}
                <ArrowRight
                  className="ml-2 w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 text-white transition-all duration-200"
                  size={20}
                />
              </button>
            </DialogFooter>

            <div className="pt-2 text-black">
              Need an account?{' '}
              <button
                type="button"
                onClick={onSignUp}
                className="text-sm underline text-black font-bold"
              >
                Create One as user
              </button>
             
            </div>

    
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SignInDialog;
