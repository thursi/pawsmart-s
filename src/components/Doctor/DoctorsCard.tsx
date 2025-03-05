'use-client';
import Image from 'next/image';
import doctorImage from '../../../public/images/doctor.png';
import { User, BriefcaseMedical, ChevronDown } from 'lucide-react'; // Import icons
import { useEffect, useRef, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { loadStripe } from '@stripe/stripe-js';
import { DayTimeSlotResponses } from '@/lib/typings';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Calendar } from '../ui/calendar';
import { Button } from '../ui/button';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import SignInDialog from '../auth/SignInDialog';
import { loginUser } from '@/api/Auth/route';
import { toast } from 'sonner';
import { usePetStore } from '@/store/petStore';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createAppointment } from '@/api/Appointment/route';

interface DoctorCardProps {
  id?: string;
  preSignedUrl?: string;
  gender: string;
  name: string;
  departmentName: string;
  specializationName?: string;
  dayTimeSlotResponses?: {
    day: string;
    hospitalTimeSlotResponses: {
      appointmentTimeResponses: {
        id: number;
        appointmentTime: string;
      }[];
      hospitalId: number;
      hospitalName: string;
      timeSlotResponses: {
        startTime: string;
        endTime: string;
        mediumList: string[];
      }[];
    }[];
  }[];
}

const formSchema = z.object({
  reason: z
    .string({ required_error: 'Reason is required' })
    .min(1, 'Reason is required'),
  note: z.string().optional(),
  medium: z.enum(['VIRTUAL', 'PHYSICAL']),
  emergencyReason: z.string().optional(),
  emergency: z.boolean().default(false),
  medicalCareTypes: z.enum(['OPD', 'IPD', 'OT'], {
    required_error: 'Please select a medical care type',
  }),
  medicalConditions: z
    .array(z.string(), {
      required_error: 'Please enter at least one medical condition',
    })
    .min(1, 'Please enter at least one medical condition'),
});

const DoctorCard: React.FC<DoctorCardProps> = ({
  id,
  preSignedUrl,
  name,
  specializationName,
  dayTimeSlotResponses,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const router = useRouter();
  const setLogin = useAuthStore((state) => state.setLogin);
  const handleSignIn = async (data: { userName: string; password: string }) => {
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
      if (response.success && response.role === 'USER') {
        setLogin(response);
        toast.success(response.message);
        setLoginModal(false);
        router.push(
          `/doctor-details/${id}?date=${selectedDate}&hospitalId=${selectedHospital}&time=${selectedAppointmentTime?.id}`
        );
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error('Oops! Something went wrong. Try again.');
      console.error('Sign-in failed:', error);
    } finally {
    }
  };
  const [expanded, setExpanded] = useState(false);
  const login = useAuthStore((state) => state.login);
  const { filteredPets } = usePetStore((state) => state);
  const isLoggedIn = !!login?.userId;
  const [calenderOpen, setCalenderOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedHospital, setSelectedHospital] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedPet, setSelectedPet] = useState<number | null>(null);
  const [selectedTime, setSelectectedTime] = useState<string | null>(null);
  const [selectedAppointmentTime, setSelectedAppointmentTime] = useState<{
    id: number;
    appointmentTime: string;
  } | null>(null);
  const [loginModal, setLoginModal] = useState(false);

  // Create a ref for the card
  const cardRef = useRef<HTMLDivElement>(null);

  const dialogRef = useRef<HTMLDivElement>(null);

  const selectRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside the card
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click is outside the card
      if (
        cardRef.current &&
        !cardRef.current.contains(event.target as Node) &&
        (!dialogRef.current ||
          !dialogRef.current.contains(event.target as Node))
      ) {
        if (
          selectRef.current &&
          selectRef.current.contains(event.target as Node)
        ) {
          return; // Do nothing if the click is inside the Select dropdown
        }
        // Check if the click is inside the Select dropdown
        const popoverContent = document.querySelector('.popover-content');
        if (popoverContent && popoverContent.contains(event.target as Node)) {
          return; // Do nothing if the click is inside the Select dropdown
        }

        // Collapse the card and reset states if clicked outside
        setExpanded(false);
        setSelectedDay(null); // Reset selected day
        setSelectedHospital(null); // Reset selected hospital
      }
    };

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleBooking = async () => {
    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
    );
    if (!stripe) {
      return;
    }
    try {
      console.log(selectedTime);
      const res = await createAppointment({
        petId: selectedPet!,
        bookingDate: selectedDate!,
        bookingTimeId: selectedAppointmentTime?.id,
        appointmentTime: selectedTime!,
      });

      if (res.success) {
        toast.success(res.message);
        await stripe.redirectToCheckout({
          sessionId: res.sessionId,
        });
        setExpanded(false);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong. Please try again.');
    }
  };

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to compare only dates

    // Get the day of the week for the given date
    const dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' });
    // Disable dates before today and dates that don't match any available day in dayTimeSlotResponses
    return (
      date < today ||
      !dayTimeSlotResponses?.some((day) => day.day === dayOfWeek.toUpperCase())
    );
  };

  // Reset selectedDay and selectedHospital when the card is collapsed
  useEffect(() => {
    if (!expanded) {
      setSelectedDay(null);
      setSelectedHospital(null);
      setSelectedDate(null);
      setSelectedAppointmentTime(null);
      setSelectedPet(null);
      setSelectectedTime(null);
    }
  }, [expanded]);

  // Group timeSlots by hospitalId for the selected day
  // const groupedHospitals = selectedDay
  //   ? dayTimeSlotResponses
  //       ?.find((dayTimeSlot) => dayTimeSlot.day === selectedDay)
  //       ?.timeSlots.reduce((acc, timeSlot) => {
  //         const { hospitalId, hospitalName } = timeSlot;

  //         // If the hospitalId doesn't exist in the accumulator, add it
  //         if (!acc[hospitalId]) {
  //           acc[hospitalId] = {
  //             hospitalId,
  //             hospitalName,
  //             timeSlots: [],
  //           };
  //         }

  //         // Push the current timeSlot into the corresponding hospitalId array
  //         acc[hospitalId].timeSlots.push(timeSlot);

  //         return acc;
  //       }, {} as Record<number, { hospitalId: number; hospitalName: string; timeSlots: any[] }>)
  //   : null;

  console.log('form values', form.formState.errors, form.getValues());

  return (
    <div
      ref={cardRef} // Attach the ref to the card
      onClick={(e) => {
        e.stopPropagation();
      }}
      className={`${
        expanded ? 'max-h-[500px]' : 'h-fit'
      } cursor-pointer flex flex-col transition-all duration-300 ease-in-out overflow-hidden relative hover:scale-105 shadow-lg rounded-lg p-4`}
    >
      <div
        onClick={() => {
          router.push(`/doctor-details/${id}`);
        }}
        className={`relative z-10 `}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
            setExpanded(!expanded);
          }}
          className={`absolute duration-300 transition-all bottom-1 p-2 rounded-full hover:scale-105 hover:bg-gray-100 active:scale-95 right-1 ${
            expanded ? 'rotate-180' : 'rotate-0'
          }`}
        >
          <ChevronDown size={18} />
        </div>
        <div className="flex justify-center">
          <div className="rounded-t-xl">
            <Image
              src={preSignedUrl ? preSignedUrl : doctorImage}
              alt={'image'}
              className="w-auto h-48 object-cover"
              width={300}
              height={150}
            />
          </div>
        </div>

        <div className="text-start text-black font-bold mt-2 flex items-center gap-2">
          <User className="w-5 h-5 text-gray-700" /> {/* Name Icon */}
          {name}
        </div>
        {specializationName && (
          <div className="text-start text-sm text-gray-600 flex items-center gap-2">
            <BriefcaseMedical className="w-4 h-4 text-gray-500" />{' '}
            {/* Specialization Icon */}
            {specializationName}
          </div>
        )}
      </div>

      {/* Expanded Content */}
      <div
        className={`${
          expanded
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 hidden -translate-y-full'
        } transform  transition-all duration-300 flex flex-col gap-2 ease-in-out mt-4`}
      >
        {login ? (
          <>
            {/* Date Selector */}
            <div className="w-full">
              <Popover modal onOpenChange={setCalenderOpen} open={calenderOpen}>
                <PopoverTrigger
                  onClick={(e) => {
                    e.stopPropagation();
                    setCalenderOpen(!calenderOpen);
                  }}
                  className="border-[1px] rounded-lg h-10 w-full"
                >
                  <div
                    className={`font-semibold ${
                      selectedDate ? 'text-gray-700' : ''
                    }text-gray-400`}
                  >
                    {selectedDate || 'Select a date'}
                  </div>
                </PopoverTrigger>
                <PopoverContent
                  onClick={(e) => e.stopPropagation()}
                  className="popover-content"
                >
                  <Calendar
                    mode="single"
                    fromDate={new Date()}
                    disabled={isDateDisabled}
                    onDayClick={(e) => {
                      setSelectedDate(new Date(e).toISOString().split('T')[0]);
                      setSelectedDay(
                        e
                          .toLocaleString('en-US', { weekday: 'long' })
                          .toUpperCase()
                      );
                      setCalenderOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Hospital Selector (only visible when a day is selected) */}
            {selectedDate && (
              <div className="w-full">
                <Select
                  value={selectedHospital?.toString() || ''} // Controlled value
                  onValueChange={(value) => setSelectedHospital(Number(value))}
                >
                  <SelectTrigger className="select-trigger">
                    <SelectValue placeholder="Select a hospital" />
                  </SelectTrigger>
                  <SelectContent className="select-dropdown" ref={selectRef}>
                    {' '}
                    {/* Add a class to the Select dropdown */}
                    {dayTimeSlotResponses
                      ?.find((day) => day.day === selectedDay)
                      ?.hospitalTimeSlotResponses.map((hospital) => (
                        <SelectItem
                          key={hospital.hospitalId}
                          value={hospital.hospitalId.toString()}
                        >
                          {hospital.hospitalName}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            {selectedDate && selectedHospital && (
              <Select
                value={selectedPet?.toString() || ''} // Controlled value
                onValueChange={(value) => setSelectedPet(Number(value))}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a Pet" />
                </SelectTrigger>
                <SelectContent className="select-dropdown" ref={selectRef}>
                  {' '}
                  {/* Add a class to the Select dropdown */}
                  {filteredPets?.length > 0 ? (
                    filteredPets?.map((pet, index) => (
                      <SelectItem
                        key={index}
                        // @ts-expect-error Temporary workaround - fix typings later
                        value={pet.id.toString()}
                      >
                        {pet.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem
                      onSelect={() => {
                        console.log('No Pets Available');
                      }}
                      value=""
                    >
                      No Pets Available
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            )}
            {selectedDate && selectedHospital && selectedPet && (
              <ScrollArea className="pt-1 pb-2">
                <div className="flex w-full gap-2 overflow-x-auto">
                  {dayTimeSlotResponses
                    ?.find((day) => day.day === selectedDay)
                    ?.hospitalTimeSlotResponses?.find(
                      (hospital) => hospital.hospitalId === selectedHospital
                    )
                    ?.appointmentTimeResponses.map((time, index) => (
                      <div
                        onClick={() => {
                          if (selectedAppointmentTime !== time) {
                            setSelectedAppointmentTime(time);
                            setSelectectedTime(time?.appointmentTime);
                          } else {
                            setSelectedAppointmentTime(null);
                            setSelectectedTime(null);
                          }
                        }}
                        key={index}
                        className={`text-[13px] transition-all ${
                          selectedAppointmentTime === time
                            ? 'bg-white text-primary border-primary border-[1px]'
                            : 'text-white bg-primary'
                        } cursor-pointer font-semibold  px-2 py-1 rounded-lg w-1/3`}
                      >
                        {time?.appointmentTime}
                      </div>
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            )}
            {selectedDate &&
              selectedHospital &&
              selectedAppointmentTime &&
              selectedPet && (
                <Button
                  onClick={() => {
                    if (isLoggedIn) {
                      handleBooking();
                    } else {
                      setLoginModal(true);
                    }
                  }}
                  className="text-white mb-1"
                >
                  {isLoggedIn ? 'Book Now' : 'Login to book'}
                </Button>
              )}
          </>
        ) : (
          <Button onClick={() => setLoginModal(true)}>Login to book</Button>
        )}
      </div>
      <SignInDialog
        isOpen={loginModal}
        onOpenChange={setLoginModal}
        ref={dialogRef}
        onSignIn={(values) => handleSignIn(values)}
        onSignUp={() => console.log('values')}
        onForgotPassword={() => console.log('values')}
      />
    </div>
  );
};

interface DoctorsCardProps {
  title: string;
  description: string;
  doctors: {
    id: string;
    userResponse?: {
      preSignedUrl?: string;
      firstName?: string;
      lastName?: string;
      gender?: string;
    };
    specializationResponse?: {
      name?: string;
    };
    petResponses?: { name: string }[];
    hospitalName?: string;
    dayTimeSlotResponses?: DayTimeSlotResponses[];
  }[];
}

const DoctorsCard: React.FC<DoctorsCardProps> = ({
  title,
  description,
  doctors,
}) => {
  console.log('🚀 ~ doctors:', doctors);
  return (
    <div className="w-full container pt-20 pb-20 px-0 md:px-7 mx-auto">
      <div className="border-l-2 border-red-500 pl-2">
        <h2 className="font-bold text-black text-2xl">{title}</h2>
      </div>
      <div className="flex flex-row justify-between items-center">
        <p className="text-l text-gray-600 border-l-2 border-white-500 pl-2">
          {description}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-5">
        {doctors?.map((doctor, index) => (
          <DoctorCard
            key={index}
            id={doctor.id}
            preSignedUrl={doctor.userResponse?.preSignedUrl}
            name={`${doctor.userResponse?.firstName || ''} ${
              doctor.userResponse?.lastName || ''
            }`}
            gender={doctor.userResponse?.gender || 'Unknown'}
            departmentName={doctor.specializationResponse?.name || 'General'}
            specializationName={
              doctor.specializationResponse?.name || 'Specialist'
            }
            petResponses={doctor.petResponses}
            hospitalName={doctor.hospitalName}
            // @ts-expect-error Temporary workaround - fix typings later
            dayTimeSlotResponses={doctor?.dayTimeSlotResponses}
          />
        ))}
      </div>
    </div>
  );
};

export default DoctorsCard;
