import React, { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, MoreVertical } from "lucide-react";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ConfirmationDialog from "./ConfirmationDialog";
import { cancelBooking } from "@/api/Appointment/route";
import Image from "next/image";
import doctor from "../../public/images/doctor1.png";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export interface UserResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
  dateOfBirth: string;
  gender: string;
  preSignedUrl: string | null;
  createdDate: string | null;
  updatedDate: string | null;
  role: string | null;
  active: boolean;
}

export interface SpecializationResponse {
  id: number;
  name: string;
  active: boolean;
}

export interface DoctorResponse {
  id: number;
  userResponse: UserResponse;
  specializationResponse: SpecializationResponse;
  bio: string;
  qualification: string;
  experience: string;
  paymentPerSession: number;
  consultationDuration: number;
  dayTimeSlotResponses: unknown | null;
  verified: boolean;
}

export interface PetResponse {
  id: number;
  name: string;
  petType: string;
  breed: string;
  age: number;
  weight: number;
  medicalConditions: string[];
  userId: number | null;
  genderType: "MALE" | "FEMALE";
  image: string;
  createdDate: string | null;
  updatedDate: string | null;
  active: boolean;
}

export interface Appointment {
  id: string;
  bookingTime: string;
  doctorResponse: DoctorResponse;
  userResponse: UserResponse;
  petResponse: PetResponse;
  bookingDate: string;
  bookingStatus: "CONFIRMED" | "PENDING" | "CANCELED" | "COMPLETED";
  medium: "VIRTUAL" | "PHYSICAL";
  reason: string;
  note: string;
  createdDate: string;
  updatedDate: string;
  referenceNo: string;
}

interface AppointmentTabsProps {
  AppointmentList: Appointment[];
  refreshAppointments: () => void;
}
const AppointmentTabs: React.FC<AppointmentTabsProps> = ({
  AppointmentList,
  refreshAppointments,
}) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>("Upcoming");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState<Appointment>();

  const filteredAppointments = useMemo(() => {
    return AppointmentList.filter((appointment) => {
      if (activeTab === "Upcoming")
        return (
          appointment.bookingStatus === "CONFIRMED" ||
          appointment.bookingStatus === "PENDING"
        );
      if (activeTab === "Completed")
        return appointment.bookingStatus === "COMPLETED";
      if (activeTab === "Cancelled")
        return appointment.bookingStatus === "CANCELED";
      return true;
    });
  }, [AppointmentList, activeTab]);

  const groupedAppointments = useMemo(() => {
    const groups: Record<string, Appointment[]> = {};
    filteredAppointments.forEach((appointment) => {
      const date = new Date(appointment.bookingDate);
      const monthYear = date.toLocaleString("default", {
        month: "long",
        year: "numeric",
      });
      if (!groups[monthYear]) {
        groups[monthYear] = [];
      }
      groups[monthYear].push(appointment);
    });
    return groups;
  }, [filteredAppointments]);

  const handleCancelAppointment = async () => {
    if (appointmentToCancel) {
      const response = await cancelBooking(appointmentToCancel.id);
      if (response.success) {
        toast.success(response.message);
        setIsDialogOpen(false);
        refreshAppointments();
      } else {
        toast.error(response.message);
        setIsDialogOpen(false);
      }
    }
  };

  const handleOpenCancelDialog = (appointment: Appointment) => {
    if (
      appointment.bookingStatus !== "CANCELED" &&
      appointment.bookingStatus !== "COMPLETED"
    ) {
      setAppointmentToCancel(appointment);
      setIsDialogOpen(true);
    } else {
      toast.error("This appointment cannot be canceled.");
    }
  };

  const getAppointmentAction = (appointment: Appointment) => {
    if (activeTab === "Upcoming") {
      return appointment.medium === "VIRTUAL" ? (
        <Button
          onClick={() => {
            if (
              appointment.bookingStatus === "CONFIRMED" &&
              appointment?.bookingDate ===
                new Date().toISOString().split("T")[0]
            ) {

            } else {
              router.push(`/appoinmentdetails/${appointment.id}`);
            }
          }}
          className={`w-full bg-purple-600 ${
            appointment.bookingStatus === "CONFIRMED" &&
            appointment?.bookingDate === new Date().toISOString().split("T")[0]
              ? "text-white"
              : "bg-gray-100 text-gray-800"
          }  py-2 rounded-md`}
        >
          {appointment.bookingStatus === "CONFIRMED" &&
          appointment?.bookingDate === new Date().toISOString().split("T")[0]
            ? "Join Now"
            : "View Details"}
        </Button>
      ) : (
        <Button onClick={() => router.push(`/appoinmentdetails/${appointment.id}`)} className="w-full bg-gray-100 text-gray-800 py-2 rounded-md">
          View Details
        </Button>
      );
    } else if (activeTab === "Completed") {
      return (
        <Button className="w-full bg-gray-100 text-gray-800 py-2 rounded-md">
          Write a Review
        </Button>
      );
    } else if (activeTab === "Cancelled") {
      return (
        <Button className="w-full bg-gray-100 text-gray-800 py-2 rounded-md">
          Reschedule
        </Button>
      );
    }
    return null;
  };

  return (
    <div className="w-full">
      <div className="flex mb-10 space-x-2 justify-stretch md:justify-normal md:bg-white md:p-0 p-2 bg-gray-200 rounded-lg">
        {["Upcoming", "Completed", "Cancelled"].map((tab) => (
          <Button
            key={tab}
            className={`px-4 py-2 flex-grow rounded-md ${
              activeTab === tab
                ? "bg-purple-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </Button>
        ))}
      </div>

      <div className="space-y-8">
        {Object.entries(groupedAppointments).map(
          ([monthYear, appointments]) => (
            <div key={monthYear}>
              <div className="mb-4 flex items-center gap-4">
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                  {appointments.length} Appointments
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {appointments.map((appointment) => (
                  <Card
                    key={appointment.id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-4 flex flex-col justify-between gap-2 h-full">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center self-end">
                          {appointment.medium === "VIRTUAL" && (
                            <span className="text-xs font-medium px-3 py-1 bg-green-100 text-green-700 rounded-full mr-2">
                              Video Call
                            </span>
                          )}
                          {appointment.medium === "PHYSICAL" && (
                            <span className="text-xs font-medium px-3 py-1 bg-blue-100 text-blue-700 rounded-full mr-2">
                              In Person
                            </span>
                          )}
                        </div>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center">
                            <div className="w-12 h-12 mr-3 rounded-full overflow-hidden">
                              <Image
                                src={
                                  appointment.doctorResponse.userResponse
                                    .preSignedUrl || doctor
                                }
                                alt="Doctor"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-black">
                                Dr.{" "}
                                {
                                  appointment.doctorResponse.userResponse
                                    .firstName
                                }{" "}
                                {
                                  appointment.doctorResponse.userResponse
                                    .lastName
                                }
                              </h3>
                              <p className="text-sm text-black">
                                {
                                  appointment.doctorResponse
                                    .specializationResponse.name
                                }
                              </p>
                              <p className="text-xs text-black">
                                Booking ID: {appointment.referenceNo}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm">
                          <Calendar className="w-4 h-4 mr-2" />
                          {new Date(
                            appointment.bookingDate
                          ).toLocaleDateString()}
                          <Clock className="w-4 h-4 ml-4 mr-2" />
                          {appointment.bookingTime}
                        </div>
                      </div>
                      <div className="w-full flex py-1 gap-2 justify-normal items-center">
                        <div className="flex-grow">
                          {getAppointmentAction(appointment)}
                        </div>
                        <Popover>
                          <PopoverTrigger asChild>
                            <button
                              className="p-1 hover:bg-gray-100 rounded-full"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <MoreVertical className="w-5 h-5 text-gray-500" />
                            </button>
                          </PopoverTrigger>
                          <PopoverContent className="w-fit p-0">
                            <div className="py-1">
                              {activeTab === "Upcoming" && (
                                <button
                                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleOpenCancelDialog(appointment);
                                  }}
                                >
                                  Cancel Appointment
                                </button>
                              )}
                              {activeTab !== "Upcoming" && (
                                <button
                                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                  }}
                                >
                                  View Details
                                </button>
                              )}
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )
        )}
      </div>

      <ConfirmationDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleCancelAppointment}
        message={""}
      />
    </div>
  );
};

export default AppointmentTabs;
