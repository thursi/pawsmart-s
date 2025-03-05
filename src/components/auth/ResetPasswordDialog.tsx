import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
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

const resetPassFormSchema = z.object({
  otp: z.string().min(1, { message: 'Please enter your OTP!' }),
  password: z.string().min(1, { message: 'Please enter your new password!' }),
});

interface ResetPasswordFormData {
  otp: string;
  password: string;
}

interface ResetPasswordDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onSubmit: (data: ResetPasswordFormData) => void;
  loading?: boolean;
}

const ResetPasswordDialog: React.FC<ResetPasswordDialogProps> = ({
  isOpen,
  setIsOpen,
  onSubmit,
  loading = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPassFormSchema),
    defaultValues: {
      otp: '',
      password: '',
    },
  });

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <>
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <div className="hidden"></div>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-black">Reset Your Password</DialogTitle>
          <DialogDescription className="text-black">
            Please enter the OTP and your new password to reset your password.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-black">
                    OTP
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full px-2 mt-2 py-2 border text-xs text-gray-700 border-[#b0afb3] rounded-md focus:outline-none focus:ring-0"
                      placeholder="Enter OTP..."
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs mt-1" />
                </FormItem>
              )}
            />

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
                        {...field}
                        className="w-full px-2 mt-2 py-2 border text-xs text-gray-700 border-[#b0afb3] rounded-md focus:outline-none focus:ring-0"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="New Password..."
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm"
                      >
                        {showPassword ? (
                          <Eye className="text-black" />
                        ) : (
                          <EyeOff className="text-black" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs mt-1" />
                </FormItem>
              )}
            />

            <button
              disabled={loading}
              type="submit"
              className={`flex items-center justify-center gap-2 group ${COLORS.bgPurple} ${COLORS.hoverbgGreen} text-white font-medium py-2 px-4 rounded-md transition-colors`}
            >
              Reset Password
              <ArrowRight
                className="ml-2 w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 text-white transition-all duration-200"
                size={20}
              />
            </button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
    </>
  );
};

export default ResetPasswordDialog;
