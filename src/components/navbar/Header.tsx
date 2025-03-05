'use client';
import Link from 'next/link';
import Logoeffect from '../../../public/images/logopawsmart.png';
import Image from 'next/image';
import { COLORS } from '@/app/constants/color';
import { useState } from 'react';
import {
  forgotPassword,
  loginUser,
  registerUser,
  resetPassword,
} from '@/api/Auth/route';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import SignInDialog from '../auth/SignInDialog';
import ForgotPasswordDialog from '../auth/ForgotPasswordDialog';
import SignupDialog from '../auth/SignupDialog';
import { toast } from 'sonner';
import ResetPasswordDialog from '../auth/ResetPasswordDialog';
import { User, Video } from 'lucide-react';

interface ForgotPasswordFormData {
  email: string;
}

interface ResetPasswordFormData {
  otp: string;
  password: string;
}
interface SignInFormData {
  userName: string;
  password: string;
}

interface SignupFormData {
  firstName: string;
  // lastName?: string;
  email: string;
  password: string;
  confirmPassword?: string;
  role: number;
}

const Navbar = () => {
  // const [setIsScrolled] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isForgotpasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY > 64) {
  //       setIsScrolled(true);
  //     } else {
  //       setIsScrolled(false);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  const setLogin = useAuthStore((state) => state.setLogin);

  async function onSubmitForgotPassword(values: ForgotPasswordFormData) {
    const response = await forgotPassword(values.email);
    if (response.success) {
      toast.success(response.message);
      setIsResetPasswordOpen(true);
    } else {
      toast.error(response.message);
    }
  }

  async function onSubmitResetPassword(values: ResetPasswordFormData) {
    const response = await resetPassword({
      otp: values?.otp,
      password: values?.password,
    });

    if (response.success) {
      toast.success(response.message);
      setIsDropdownOpen(false);
      setIsForgotPasswordOpen(false);
      setIsDialogOpen(true);
      setIsResetPasswordOpen(false);
    } else {
      toast.error(response.message);
    }
  }

  async function onSubmit(values: SignupFormData) {
    try {
      const response = await registerUser(values);
      if (response.success) {
        setLogin(response);
        setIsDropdownOpen(false);
        setIsSignupOpen(false);
        setIsForgotPasswordOpen(false);
        setIsResetPasswordOpen(false);
        setIsDialogOpen(false);
        toast.success(response.message);
        router.push('/');
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('An error occurred. Please try again.');
    }
  }

  const handleSignIn = async (data: SignInFormData) => {
    try {
      const response = await loginUser({
        userName: data.userName,
        password: data.password,
      });
      if (response.success && response.role === 'DOCTOR') {
        setLogin(response);
        toast.success(response.message);
        setIsDialogOpen(false);
        setIsDropdownOpen(false);
        // router.push('/');
        router.push(`/doctorprofile/${response?.userId}`);
      }
      if (response.success && response.role === 'USER') {
        setLogin(response);
        toast.success(response.message);
        setIsDialogOpen(false);
        router.push('/');
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error('Oops! Something went wrong. Try again.');
      console.error('Sign-in failed:', error);
    } finally {
    }
  };
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleMenuItemClick = () => {
    setIsDropdownOpen(false);
  };
  const handleLogout = () => {
    setLogin(undefined);
  };
  return (
    <>
      <nav className="fixed top-10 left-1/2 transform -translate-x-1/2 w-[90%] bg-white z-50 p-4 transition-all duration-300 rounded-lg shadow-md">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-around align-middle items-center h-8">
            <div>
              <Link href="/" className="flex-shrink-0">
                <Image
                  src={Logoeffect}
                  alt="pawsmart logo"
                  width={160}
                  height={38}
                />
              </Link>
            </div>
            <div className="flex items-center space-x-10">
              <div className="hidden md:block">
                <div className="flex space-x-4">
                  <Link
                    className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                    href={''}
                  >
                    About Us
                  </Link>
                  {login && (
                    <Link
                      href="/appointments"
                      className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Appointments
                    </Link>
                  )}
                  {/* <div className="relative group">
                    <button className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium inline-flex items-center">
                      Pet Parents
                      <svg
                        className="ml-2 h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    <div className="absolute z-10 hidden group-hover:block w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div className="py-1">
                        <Link
                          href="/petprofile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50"
                        >
                          Pet Sitting
                        </Link>
                        <Link
                          href="/settings"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50"
                        >
                          Settings
                        </Link>
                      </div>
                    </div>
                  </div> */}

                  <div className="relative group">
                    <button className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium inline-flex items-center">
                      Pet Parents
                      <svg
                        className="ml-2 h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    <div className="absolute z-10 hidden group-hover:block w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div className="py-1">
                        <Link
                          href="/find-vet"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50"
                        >
                          Find a Vet
                        </Link>
                        <Link
                          href="/get-prescription"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50"
                        >
                          Get a Prescription
                        </Link>
                        <Link
                          href="/community"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50"
                        >
                        
                          Join the Pet Parents&apos; Community

                        </Link>
                        <Link
                          href="/knowledge-hub"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50"
                        >
                          Visit the Knowledge Hub
                        </Link>
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/blog"
                    className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    PAW POD
                  </Link>
                  <Link
                    href="/shop"
                    className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Shop
                  </Link>
                  <Link
                    href="/payment-plan"
                    className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4 ml-6">
              {/* <button
                onClick={() => setIsDialogOpen(true)}
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Log in
              </button> */}

              <div className="hidden md:flex items-center space-x-4 ml-6">
                {!login ? (
                  <>
                    {/* Log in button */}
                    <button
                      onClick={() => setIsDialogOpen(true)}
                      className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Log in
                    </button>
                  </>
                ) : (
                  <>
                    {/* <div className="relative">
                      <div
                        className="text-gray-700  hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-x-2"
                        // onClick={toggleDropdown}
                      >
                        <User />
                        <span className="text-black">{login?.firstName}</span>
                        <div onClick={toggleDropdown}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 15l7-7 7 7"
                            />
                          </svg>
                        </div>
                      </div>

                      {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg">
                          <button
                            onClick={handleLogout}
                            className="block text-gray-700 px-4 py-2 text-sm"
                          >
                            Log out
                          </button>
                        </div>
                      )}
                    </div> */}

                    <div className="relative">
                      <div
                        className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-x-2 cursor-pointer"
                        onClick={toggleDropdown} // Toggle dropdown on click
                      >
                        <User />
                        <span className="text-black">{login?.firstName}</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 15l7-7 7 7"
                          />
                        </svg>
                      </div>

                      {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50">
                          <Link
                            href="/mypets"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50"
                            onClick={handleMenuItemClick} // Close dropdown after clicking
                          >
                            Pet Sitting
                          </Link>
                          <Link
                            href="/settings"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50"
                            onClick={handleMenuItemClick} // Close dropdown after clicking
                          >
                            Settings
                          </Link>
                          <button
                            onClick={() => {
                              handleLogout();
                              setIsDropdownOpen(false); // Close dropdown after logout
                            }}
                            className="block w-full text-left text-gray-700 px-4 py-2 text-sm hover:bg-purple-50"
                          >
                            Log out
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
              <Link
                href="/try-free"
                className={`${COLORS.bgPurple} text-white px-4 py-2 rounded-md text-sm font-medium ${COLORS.hoverbgGreen}, flex flex-row gap-x-2 items-center`}
              >
                <Video size={22} />
                <p>Free Consultation</p>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <SignInDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSignIn={(data) => {
          console.log(data);
          handleSignIn(data);
        }}
        onSignUp={() => {
          setIsForgotPasswordOpen(false);
          setIsDialogOpen(false);
          setIsSignupOpen(true);
        }}
        onForgotPassword={() => {
          setIsForgotPasswordOpen(true);
          setIsDialogOpen(false);
        }}
        loading={false}
      />

      <ForgotPasswordDialog
        isOpen={isForgotpasswordOpen}
        setIsOpen={setIsForgotPasswordOpen}
        onSubmit={onSubmitForgotPassword}
        loading={false}
      />

      <ResetPasswordDialog
        isOpen={isResetPasswordOpen}
        setIsOpen={setIsResetPasswordOpen}
        onSubmit={onSubmitResetPassword}
        loading={false}
      />

      <SignupDialog
        isSignupOpen={isSignupOpen}
        setIsSignupOpen={setIsSignupOpen}
        onSubmit={(data) => {
          console.log(data);
          onSubmit(data);
        }}
        loading={false}
      />
    </>
  );
};

export default Navbar;
