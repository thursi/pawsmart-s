// import React, { useState } from 'react';
// import { useForm, SubmitHandler } from 'react-hook-form';
// import { Eye, EyeOff, ArrowRight } from 'lucide-react';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogFooter,
//   DialogTrigger,
// } from '@/components/ui/dialog';
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import { z } from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { COLORS } from '@/app/constants/color';

// // Define the types for form data
// interface ForgotPasswordFormData {
//   email: string;
// }

// interface ResetPasswordFormData {
//   otp: string;
//   password: string;
// }

//   const forgetPassformSchema = z.object({
//     email: z
//       .string({ required_error: 'Please enter your email!' })
//       .email('Please enter a valid email!'),
//   });

//   const resetPassFormSchema = z.object({
//     // otp: z.string({ required_error: 'Please enter your OTP!' }),
//     otp: z
//     .string()
//     .min(1, { message: 'Please enter your OTP!' }),
//     password: z
//     .string()
//     .min(1, { message: 'Please enter your new password!' }),
//     // password: z.string({ required_error: 'Please enter your new password!' }),
//   });

// interface ForgotPasswordDialogProps {
//   isForgotpasswordOpen: boolean;
//   setIsForgotPasswordOpen: (open: boolean) => void;
//   onSubmitForgotPassword: SubmitHandler<ForgotPasswordFormData>;
//   onSubmitResetPassword: SubmitHandler<ResetPasswordFormData>;
//   loading?: boolean;
//   resetPass?: boolean;
// }

// const ForgotPasswordDialog: React.FC<ForgotPasswordDialogProps> = ({
//   isForgotpasswordOpen,
//   setIsForgotPasswordOpen,
//   onSubmitForgotPassword,
//   onSubmitResetPassword,
//   loading = false,
//   resetPass = false,
// }) => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [otp, setOtp] = useState('');
//   const [password, setPassword] = useState('');

//   const form = useForm<z.infer<typeof forgetPassformSchema>>({
//     resolver: zodResolver(forgetPassformSchema),
//     defaultValues: {
//       email: '',
//     },
//   });

//     const resetPassForm = useForm<z.infer<typeof resetPassFormSchema>>({
//       resolver: zodResolver(resetPassFormSchema),
//       defaultValues: {
//         otp: '',
//         password: '',
//       },
//     });

//   const togglePasswordVisibility = () => setShowPassword(!showPassword);

//   return (
//     <Dialog open={isForgotpasswordOpen} onOpenChange={setIsForgotPasswordOpen}>
//       <DialogTrigger>
//         <div className="hidden"></div>
//       </DialogTrigger>

//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle className="text-black">
//             {resetPass ? 'Reset Your Password' : 'Forgot Password'}
//           </DialogTitle>
//           <DialogDescription className="text-black">
//             {resetPass
//               ? 'Please enter the OTP and your new password to reset your password.'
//               : 'Enter your email to receive a password reset link.'}
//           </DialogDescription>
//         </DialogHeader>

//         {resetPass ? (
//           <Form {...resetPassForm}>
//             <form
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 onSubmitResetPassword({ otp, password });
//               }}
//             >
//               <div className="flex flex-col gap-4">
//                 <FormField
//                   control={resetPassForm.control}
//                   name="otp"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="text-sm font-medium text-black">
//                         OTP
//                       </FormLabel>
//                       <FormControl>
//                         <Input
//                           className="w-full px-2 mt-2 py-2 border text-xs text-gray-700 border-[#b0afb3] rounded-md focus:outline-none focus:ring-0"
//                           placeholder="Enter OTP..."
//                           value={otp}
//                           onChange={(e) => setOtp(e.target.value)}
//                         />
//                       </FormControl>
//                       <FormMessage className="text-red-500 text-xs mt-1" />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={resetPassForm.control}
//                   name="password"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="text-sm font-medium text-black">
//                         Password
//                       </FormLabel>
//                       <FormControl>
//                         <div className="relative">
//                           <Input
//                             className="w-full px-2 mt-2 py-2 border text-xs text-gray-700 border-[#b0afb3] rounded-md focus:outline-none focus:ring-0"
//                             type={showPassword ? 'text' : 'password'}
//                             placeholder="New Password..."
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                           />
//                           <button
//                             type="button"
//                             onClick={togglePasswordVisibility}
//                             className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm"
//                           >
//                             {showPassword ? (
//                               <Eye className="text-black" />
//                             ) : (
//                               <EyeOff className="text-black" />
//                             )}
//                           </button>
//                         </div>
//                       </FormControl>
//                       <FormMessage className="text-red-500 text-xs mt-1" />
//                     </FormItem>
//                   )}
//                 />
//                 <button
//                   disabled={loading}
//                   type="submit"
//                   className={`flex items-center justify-center gap-2 group ${COLORS.bgPurple} ${COLORS.hoverbgGreen} text-white font-medium py-2 px-4 rounded-md transition-colors`}
//                 >
//                   Reset Password
//                   <ArrowRight
//                     className="ml-2 w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 text-white transition-all duration-200"
//                     size={20}
//                   />
//                 </button>
//               </div>
//             </form>
//           </Form>

//         ) : (
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmitForgotPassword)}>
//               <div className="flex flex-col gap-4">
//                 <FormField
//                   control={form.control}
//                   name="email"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="text-sm font-medium text-black">
//                         Email Address
//                       </FormLabel>
//                       <FormControl>
//                         <Input
//                           className="w-full px-2 mt-2 py-2 border text-xs text-gray-700 border-[#b0afb3] rounded-md focus:outline-none focus:ring-0"
//                           placeholder="Email Address..."
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage className="text-red-500 text-xs mt-1" />
//                     </FormItem>
//                   )}
//                 />

//                 <button
//                   disabled={loading}
//                   type="submit"
//                   className={`flex items-center justify-center gap-2 ${COLORS.bgPurple} ${COLORS.hoverbgGreen} group text-white font-medium py-2 px-4 rounded-md transition-colors`}
//                 >
//                   Submit
//                   <ArrowRight
//                     className="ml-2 w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 text-white transition-all duration-200"
//                     size={20}
//                   />
//                 </button>
//               </div>
//             </form>
//           </Form>
//         )}
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default ForgotPasswordDialog;

import React from 'react';
import { useForm } from 'react-hook-form';
import { ArrowRight } from 'lucide-react';
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

const forgotPassFormSchema = z.object({
  email: z
    .string({ required_error: 'Please enter your email!' })
    .email('Please enter a valid email!'),
});

interface ForgotPasswordFormData {
  email: string;
}

interface ForgotPasswordDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onSubmit: (data: ForgotPasswordFormData) => void;
  loading?: boolean;
}

const ForgotPasswordDialog: React.FC<ForgotPasswordDialogProps> = ({
  isOpen,
  setIsOpen,
  onSubmit,
  loading = false,
}) => {
  const form = useForm<z.infer<typeof forgotPassFormSchema>>({
    resolver: zodResolver(forgotPassFormSchema),
    defaultValues: {
      email: '',
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <div className="hidden"></div>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-black">Forgot Password</DialogTitle>
          <DialogDescription className="text-black">
            Enter your email to receive a password reset link.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-black">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="w-full px-2 mt-2 py-2 border text-xs text-gray-700 border-[#b0afb3] rounded-md focus:outline-none focus:ring-0"
                        placeholder="Email Address..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs mt-1" />
                  </FormItem>
                )}
              />

              <button
                disabled={loading}
                type="submit"
                className={`flex items-center justify-center gap-2 ${COLORS.bgPurple} ${COLORS.hoverbgGreen} group text-white font-medium py-2 px-4 rounded-md transition-colors`}
              >
                Submit
                <ArrowRight
                  className="ml-2 w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 text-white transition-all duration-200"
                  size={20}
                />
              </button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPasswordDialog;
