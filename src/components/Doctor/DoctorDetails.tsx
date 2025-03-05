import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Award, PlusCircle, Stethoscope } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import doctorImage from '../../../public/images/doctor.png';
import { Pet } from '@/lib/typings';
import { createAppointment } from '@/api/Appointment/route';
import { toast } from 'sonner';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import NotificationComponent from './DocPopup';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Checkbox } from '../ui/checkbox';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Button } from '../ui/button';
import SignInDialog from '../auth/SignInDialog';
import { useAuthStore } from '@/store/authStore';
import { loginUser } from '@/api/Auth/route';
import {
  createPetEffect,
  getPetFilterData,
  PetCreateProps,
} from '@/api/Pet/route';
import PetSelectionForm from '../Pet/create';
import { usePetStore } from '@/store/petStore';

const formSchema = z
  .object({
    bookingTimeId: z.number(),
    bookingDate: z.string().min(1, 'Please select a date'),
    appointmentTime: z.string().min(1, 'Please select an appointment time'),
    reason: z.string().min(1, 'Reason is required'),
    note: z.string().optional(),
    medium: z.enum(['VIRTUAL', 'PHYSICAL']),
    emergencyReason: z.string().optional(),
    emergency: z.boolean().default(false),
    medicalCareTypes: z.enum(['OPD', 'IPD', 'OT']),
    petId: z.number(),
  })
  .refine(
    (data) => {
      if (!data.petId) {
        return false;
      }
      return true;
    },
    {
      message: 'Please select a valid pet for registered users',
    }
  );

type FormValues = z.infer<typeof formSchema>;

interface TimeSlot {
  id: number;
  appointmentTime: string;
}

interface DaySchedule {
  startTime: string;
  endTime: string;
  hospitalId: number;
  hospitalName: string;
  mediumList: string[];
  appointmentTimeResponses: TimeSlot[];
}

interface DayTimeSlot {
  day: string;
  date: string;
  hospitalTimeSlotResponses: {
    appointmentTimeResponses: TimeSlot[];
    hospitalId: number;
    hospitalName: string;
    timeSlotResponses: DaySchedule[];
  }[];
}

interface UserResponse {
  firstName?: string;
  lastName?: string;
  experience?: string;
  consultationDuration?: number;
}

interface SignInFormData {
  userName: string;
  password: string;
}
interface SpecializationResponse {
  name: string;
}

interface Doctor {
  userResponse?: UserResponse;
  specializationResponse?: SpecializationResponse;
  preSignedUrl?: string;
  dayTimeSlotResponses: DayTimeSlot[];
}

// interface BookingFormData {
//   bookingTimeId: number;
//   petId?: number;
//   bookingDate: string;
//   appointmentTime: string;
//   reason: string;
//   note: string;
//   medium: 'VIRTUAL' | 'PHYSICAL';
//   guest: boolean;
//   medicalCareTypes: 'OPD' | 'IPD';
//   emergency: boolean;
//   emergencyReason: string;
// }
interface NotificationState {
  isOpen: boolean;
  type: 'success' | 'error';
  title: string;
  message: string;
}

const formatTime = (time: string): string => {
  return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
};

const useAvailableTimeSlots = (
  dayTimeSlotResponses: DayTimeSlot[],
  date: string
) => {
  console.log(
    '🚀 ~ useAvailableTimeSlots ~ dayTimeSlotResponses:',
    dayTimeSlotResponses
  );
  const [selectedDate, setSelectedDate] = useState<string>(date ? date : '');
  console.log('🚀 ~ setSelectedDate:', selectedDate);

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (date < today) {
      return true;
    }
    const dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' });

    return !dayTimeSlotResponses?.some(
      (day) => day.day === dayOfWeek.toUpperCase()
    );
  };

  const availableTimeSlots = useMemo(() => {
    if (dayTimeSlotResponses?.length === 0) return [];

    const selected = new Date(selectedDate);
    const dayName = selected
      .toLocaleString('en-US', { weekday: 'long' })
      .toUpperCase();
    console.log('🚀 ~ availableTimeSlots ~ dayName:', dayName);

    const daySlot = dayTimeSlotResponses.find((slot) => {
      return slot.day === dayName || slot.date === selectedDate;
    });
    console.log('🚀 ~ daySlot ~ daySlot:', daySlot);

    if (daySlot?.hospitalTimeSlotResponses.length === 0) {
      return [];
    }
    console.log('first');

    return daySlot?.hospitalTimeSlotResponses[0].appointmentTimeResponses.map(
      (slot) => ({
        ...slot,
        formattedTime: formatTime(slot.appointmentTime),
      })
    );
  }, [selectedDate, dayTimeSlotResponses]);

  return {
    selectedDate,
    setSelectedDate,
    availableTimeSlots,
    isDateDisabled,
  };
};

const DoctorBookingPage: React.FC<{
  doctor: Doctor;
  filteredPets?: Pet[];
  isLoggedIn?: boolean;
}> = ({ doctor, filteredPets, isLoggedIn }) => {
  console.log('🚀 ~ doctor:', doctor);
  const params = useParams<{ id: string; time: string; date: string }>();
  const router = useRouter();
  console.log('🚀 ~ params:', params);
  const searchParams = useSearchParams();
  console.log('🚀 ~ query:', searchParams.get('hospitalId'));
  const time = searchParams.get('time');
  console.log('🚀 ~ time:', time);
  const date = searchParams.get('date');
  console.log('🚀 ~ date:', date);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bookingTimeId:
        time && typeof time === 'string' ? parseInt(time) : undefined,
      bookingDate: date && typeof date === 'string' ? date : undefined,
      appointmentTime: undefined,
      reason: undefined,
      note: undefined,
      medium: 'VIRTUAL',
      emergency: false,
      emergencyReason: undefined,
      medicalCareTypes: 'OPD',
    },
  });

  console.log(form.watch('appointmentTime'));

  // const initialFormState: FormValues = {
  //   bookingTimeId: 0,
  //   bookingDate: "",
  //   appointmentTime: "",
  //   reason: "",
  //   note: "",
  //   medium: "VIRTUAL",
  //   emergency: false,
  //   emergencyReason: "",
  //   medicalCareTypes: "OPD",
  //   petId: 0,
  // };
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const login = useAuthStore((state) => state.login);
  const setFilteredPets = usePetStore((state) => state.setFilteredPets);
  const setLogin = useAuthStore((state) => state.setLogin);
  const [notification, setNotification] = useState<NotificationState>({
    isOpen: false,
    type: 'success',
    title: '',
    message: '',
  });
  const [bookingData, setBookingData] = useState<FormValues>(form.getValues());
  const { setSelectedDate, availableTimeSlots } = useAvailableTimeSlots(
    doctor.dayTimeSlotResponses,
    date ? date : form.getValues().bookingDate
  );

  // const handleInputChange = (
  //   e: React.ChangeEvent<
  //     HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  //   >
  // ) => {
  //   const { name, value } = e.target;
  //   setBookingData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    setBookingData((prev) => ({
      ...prev,
      bookingDate: date,
      appointmentTime: '',
    }));
  };

  const handleTimeChange = (timeSlot: TimeSlot) => {
    setBookingData((prev) => ({
      ...prev,
      appointmentTime: timeSlot.appointmentTime,
      bookingTimeId: timeSlot.id,
    }));
  };

  const onSubmit = async (data: FormValues) => {
    try {
      // const selectedTimeSlot = availableTimeSlots.find(
      //   (slot) => slot.appointmentTime === data.appointmentTime
      // );
      const payload = {
        bookingTimeId: bookingData?.bookingTimeId,
        petId: data.petId,
        bookingDate: data.bookingDate,
        appointmentTime: data.appointmentTime,
        reason: data.reason,
        note: data.note,
        medium: data.medium,
        emergency: data.emergency,
        emergencyReason: data.emergency ? data.emergencyReason : '',
        medicalCareTypes: data.medicalCareTypes,
      };

      console.log('Booking payload:', payload);

      const createAppo = await createAppointment(payload);

      if (createAppo.success) {
        setNotification({
          isOpen: true,
          type: 'success',
          title: createAppo.message,
          message: 'Thank You',
        });
        router.push(`/`);
      } else {
        setNotification({
          isOpen: true,
          type: 'error',
          title: createAppo.message,
          message: 'Failed to create appointment',
        });
        toast.error(createAppo.message);
      }
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('Failed to submit booking. Please try again.');
    }
  };

  // const formatDateToLocal = (date: Date) => {
  //   const year = date.getFullYear();
  //   const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  //   const day = String(date.getDate()).padStart(2, '0');
  //   return `${year}-${month}-${day}`; // Returns YYYY-MM-DD
  // };

  const closeNotification = () => {
    setNotification((prev) => ({ ...prev, isOpen: false }));
    setTimeout(() => {
      router.push(`/`);
    }, 100);
  };

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
  const fetchUpdatedPetList = async () => {
    try {
      const filterAppointmentList = await getPetFilterData({
        pageSize: 10,
        pageCount: 1,
        userId: Number(login?.userId),
      });
      setFilteredPets(filterAppointmentList.records);
    } catch (error) {
      console.error('Failed to fetch pet list:', error);
    }
  };

  const handleSubmit = async (pet: PetCreateProps) => {
    try {
      const response = await createPetEffect(pet);
      console.log('API Response:', response);
      if (response.success) {
        toast.success(response.message);
        window.location.reload();
        await fetchUpdatedPetList();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log('error', error);
      toast.error('An error occurred!');
    }
  };
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="gap-6 space-y-6 md:space-y-10">
        <Card className="bg-white shadow-lg w-full">
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
              <div className="w-full md:w-72 h-52 md:h-72">
                <Image
                  src={doctor?.preSignedUrl || doctorImage}
                  alt={`Dr. ${doctor?.userResponse?.firstName || 'Doctor'}`}
                  className="w-full h-full object-cover rounded-lg"
                  width={288}
                  height={288}
                  priority
                />
              </div>

              <div className="flex-1">
                <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                  Dr. {doctor?.userResponse?.firstName || 'John'}{' '}
                  {doctor?.userResponse?.lastName || 'Doe'}
                </h1>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Stethoscope className="w-5 h-5 text-blue-500" />
                    <p className="text-gray-600">
                      {doctor?.specializationResponse?.name || 'Veterinarian'}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-blue-500" />
                    <p className="text-gray-600">
                      Years of experience:{' '}
                      {doctor?.userResponse?.experience || '5+'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className={`bg-white shadow-lg ${!isLoggedIn ? 'opacity-80' : ''}`}
        >
          <CardContent className="p-4 md:p-6">
            <div className="relative">
              <div className="w-full h-full absolute bg-gradient-to-t from-white to-white/40"></div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-blue-900">
                  Schedule Appointment
                </h2>

                {!isLoggedIn && (
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild></DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Login to your account</DialogTitle>
                      </DialogHeader>
                      <SignInDialog
                        isOpen={isDialogOpen}
                        onOpenChange={setIsDialogOpen}
                        onSignIn={(data) => {
                          handleSignIn(data);
                        }}
                        // onSignUp={() => {
                        //   setIsForgotPasswordOpen(false);
                        //   setIsDialogOpen(false);
                        //   setIsSignupOpen(true);
                        // }}
                        // onForgotPassword={() => {
                        //   setIsForgotPasswordOpen(true);
                        //   setIsDialogOpen(false);
                        // }}
                        loading={false}
                        onSignUp={function (): void {
                          throw new Error('Function not implemented.');
                        }}
                        onForgotPassword={function (): void {
                          throw new Error('Function not implemented.');
                        }}
                      />
                    </DialogContent>
                  </Dialog>
                )}
              </div>

              <Form {...form}>
                <form
                  // onSubmit={form.handleSubmit(onSubmit)}
                  onSubmit={form.handleSubmit(onSubmit)}
                  onClick={() => console.log('form clicked')}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="medicalCareTypes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Select Date</FormLabel>

                            <FormControl>
                              <Input
                                type="date"
                                {...field}
                                min={new Date().toISOString().split('T')[0]}
                                disabled={!isLoggedIn}
                                onChange={(e) => {
                                  field.onChange(e);
                                  handleDateChange(e.target.value);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="appointmentTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Select Time</FormLabel>
                            <FormControl>
                              <Select
                                disabled={!form.watch('bookingDate')}
                                onValueChange={(value) => {
                                  // const selectedSlot = availableTimeSlots.find(
                                  //   (slot) => slot.appointmentTime === value
                                  // );
                                  const selectedSlot = (
                                    availableTimeSlots ?? []
                                  ).find(
                                    (slot) => slot.appointmentTime === value
                                  );

                                  if (selectedSlot) {
                                    handleTimeChange(selectedSlot);
                                    field.onChange(value);
                                  }
                                }}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Choose time" />
                                </SelectTrigger>
                                <SelectContent className="space-y-4">
                                  {availableTimeSlots?.map((slot) => (
                                    <SelectItem
                                      key={slot.id}
                                      value={slot.appointmentTime}
                                    >
                                      {formatTime(slot.appointmentTime)}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="petId"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex justify-between items-center">
                              <FormLabel>Select Pet</FormLabel>

                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 p-0 text-blue-500"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (isLoggedIn) {
                                    setIsDialogOpen(true);
                                  }
                                }}
                              >
                                <PlusCircle className="h-4 w-4 mr-1" />
                                <span className="text-xs">Add Pet</span>
                              </Button>
                            </div>

                            {isLoggedIn && isDialogOpen && (
                              <PetSelectionForm
                                onSubmit={() => (data: PetCreateProps) => {
                                  handleSubmit(data);
                                }}
                                isOpen={isDialogOpen}
                                onOpenChange={setIsDialogOpen}
                              />
                            )}

                            <FormControl>
                              <Select
                                disabled={!isLoggedIn} // Disable if not logged in
                                onValueChange={(value) =>
                                  field.onChange(Number(value))
                                }
                                value={
                                  field.value ? field.value.toString() : ''
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {(filteredPets ?? []).map((pet: Pet) => (
                                    <SelectItem
                                      key={pet.id}
                                      value={pet.id?.toString() ?? ''}
                                    >
                                      {pet.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="medicalCareTypes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Medical Care Type</FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                disabled={!isLoggedIn}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="OPD">OPD</SelectItem>
                                  <SelectItem value="IPD">IPD</SelectItem>
                                  <SelectItem value="OT">OT</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="medium"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Consultation Type</FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                disabled={!isLoggedIn}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="VIRTUAL">
                                    Virtual Consultation
                                  </SelectItem>
                                  <SelectItem value="PHYSICAL">
                                    In-Person Visit
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Reason and Notes */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-2">
                        <FormField
                          control={form.control}
                          name="reason"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Reason for Visit</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Please describe the reason for your visit"
                                  className="min-h-24"
                                  disabled={!isLoggedIn}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="md:col-span-1">
                        <FormField
                          control={form.control}
                          name="note"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Additional Notes</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Additional notes (optional)"
                                  className="min-h-24"
                                  disabled={!isLoggedIn}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Emergency section */}
                  <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                    <FormField
                      control={form.control}
                      name="emergency"
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-2">
                          <div className="flex items-center gap-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                disabled={!isLoggedIn}
                              />
                            </FormControl>
                            <FormLabel className="!mt-0 font-medium text-gray-700 flex items-center gap-1">
                              This is an emergency
                            </FormLabel>
                          </div>

                          {/* Emergency Reason Field - Only shows when emergency is checked */}
                          {field.value && (
                            <FormField
                              control={form.control}
                              name="emergencyReason"
                              render={({ field: reasonField }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea
                                      placeholder="Please describe the emergency"
                                      className="w-full"
                                      disabled={!isLoggedIn}
                                      {...reasonField}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          )}
                        </FormItem>
                      )}
                    />
                  </div>
                  {isLoggedIn ? (
                    <button
                      type="submit"
                      className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
                      // disabled={!isLoggedIn}
                    >
                      {'Confirm Booking'}
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
                      onClick={() => setIsDialogOpen(true)}
                      // disabled={!isLoggedIn}
                    >
                      {'Login to Book Appointment'}
                    </button>
                  )}
                  {/* <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
                  // disabled={!isLoggedIn}
                >
                  {isLoggedIn ? 'Confirm Booking' : 'Login to Book Appointment'}
                </button> */}
                </form>
              </Form>
            </div>
          </CardContent>
        </Card>
      </div>

      <NotificationComponent
        isOpen={notification.isOpen}
        onClose={closeNotification}
        title={notification.title}
        message={notification.message}
        type={notification.type}
      />
    </div>
  );
};

export default DoctorBookingPage;
