'use client';

import { getDoctorById } from '@/api/Doctor/route';
import { useDoctorStore } from '@/store/doctorStore';
import React, { use, useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Calendar,
  Clock,
  Award,
  BookOpen,
  DollarSign,
  User,
  Mail,
  Phone,
  Badge,
} from 'lucide-react';
import { Calendar as CalendarPicker } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
  dateOfBirth: string;
  gender: string;
  preSignedUrl: string | null;
  createdDate: string;
  updatedDate: string;
  online: boolean;
  role: {
    id: number;
    name: string;
    permissionResponses: unknown | null;
  };
  petResponseList: unknown | null;
  active: boolean;
}

export interface Specialization {
  id: number;
  name: string;
  active: boolean;
}

export interface DayTimeSlot {
  id?: number;
  day: string;
  startTime: string;
  endTime: string;
}

export interface Doctor {
  id: number;
  userResponse: User;
  specializationResponse: Specialization;
  bio: string;
  qualification: string;
  experience: string;
  licenceNo: string | null;
  paymentPerSession: number;
  consultationDuration: number;
  dayTimeSlotResponses: DayTimeSlot[];
  medicalCareTypes: unknown | null;
  doctorType: unknown | null;
  verified: boolean;
}


const Index = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const selectedDoctor = useDoctorStore(
    (state) => state.selectedDoctor
  ) as Doctor | null;
  const setSelectedDoctor = useDoctorStore((state) => state.setSelectedDoctor);
  const loading = useDoctorStore((state) => state.loading);
  const [showAvailabilityDialog, setShowAvailabilityDialog] = useState(false);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [startTime, setStartTime] = useState<string>('9');
  const [endTime, setEndTime] = useState<string>('17');

  const fetchData = useCallback(async () => {
    if (!id) return;
    try {
      const response = await getDoctorById(id);
      console.log('response:', response);
      if (response) {
        setSelectedDoctor(response);
      } else {
        console.error('Doctor not found');
      }
    } catch (error) {
      console.error('Error fetching doctor by ID:', error);
    }
  }, [id, setSelectedDoctor]);

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id, fetchData]);

  const handleSaveAvailability = () => {
    // Implement this function to save availability
    console.log('Saving availability:', {
      dates: selectedDates,
      startTime,
      endTime,
    });
    setShowAvailabilityDialog(false);
  };

  if (loading || !selectedDoctor) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const {
    userResponse,
    specializationResponse,
    bio,
    qualification,
    experience,
    licenceNo,
    paymentPerSession,
    consultationDuration,
    verified,
    dayTimeSlotResponses,
  } = selectedDoctor;

  return (
    <div className="py-8 w-full container pt-48 pb-20 px-0 md:px-7 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Section */}
        <div className="md:col-span-1">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                {userResponse.preSignedUrl ? (
                  <Image
                    src={userResponse.preSignedUrl}
                    alt={`${userResponse.firstName} ${userResponse.lastName}`}
                    width={150}
                    height={150}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="bg-gray-200 rounded-full w-32 h-32 flex items-center justify-center">
                    <User size={64} className="text-gray-500" />
                  </div>
                )}
              </div>
              <CardTitle className="text-2xl font-bold">
                Dr. {userResponse.firstName} {userResponse.lastName}
              </CardTitle>
              <CardDescription>
                {specializationResponse?.name || 'Specialist'}
                {userResponse.online && (
                  <span className="ml-2">
                    <Badge className="bg-green-500">Online</Badge>
                  </span>
                )}
                {verified && (
                  <span className="ml-2">
                    <Badge className="bg-blue-500">Verified</Badge>
                  </span>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="text-gray-500" size={18} />
                <span>{userResponse.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-gray-500" size={18} />
                <span>{userResponse.phoneNo}</span>
              </div>
              <div className="flex items-center gap-3">
                <Award className="text-gray-500" size={18} />
                <span>{qualification}</span>
              </div>
              <div className="flex items-center gap-3">
                <BookOpen className="text-gray-500" size={18} />
                <span>{experience} years of experience</span>
              </div>
              <div className="flex items-center gap-3">
                <DollarSign className="text-gray-500" size={18} />
                <span>${paymentPerSession} per session</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="text-gray-500" size={18} />
                <span>{consultationDuration} minutes consultation</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Details Section */}
        <div className="md:col-span-2">
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="w-full mb-6">
              <TabsTrigger value="about" className="flex-1">
                About
              </TabsTrigger>
              {/* {verified && ( */}
              <TabsTrigger value="appointments" className="flex-1">
                Appointments
              </TabsTrigger>
              {/* )} */}
              {/* {verified && ( */}
              <TabsTrigger value="availability" className="flex-1">
                Availability
              </TabsTrigger>
              {/* )} */}
            </TabsList>

            <TabsContent value="about">
              <Card>
                <CardHeader>
                  <CardTitle>
                    About Dr. {userResponse.firstName} {userResponse.lastName}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Bio</h3>
                      <p className="text-gray-700">
                        {bio || 'No bio available'}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Qualification
                      </h3>
                      <p className="text-gray-700">
                        {qualification || 'No qualification details available'}
                      </p>
                    </div>
                    {licenceNo && (
                      <div>
                        <h3 className="text-lg font-semibold mb-2">
                          License Information
                        </h3>
                        <p className="text-gray-700">License No: {licenceNo}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {verified ? (
              <TabsContent value="appointments">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Appointments</CardTitle>
                    <CardDescription>
                      Manage your appointments with Dr. {userResponse.firstName}{' '}
                      {userResponse.lastName}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* This section would show appointments if we had them in the payload */}
                    <div className="text-center py-8">
                      <Calendar
                        className="mx-auto text-gray-400 mb-4"
                        size={64}
                      />
                      <p className="text-gray-600">No appointments scheduled</p>
                      <Button className="mt-4">Book an Appointment</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ) : (
              <TabsContent value="appointments">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {userResponse.firstName} {userResponse.lastName} Your are
                      not verify
                    </CardTitle>
                    <CardDescription>To access appointments</CardDescription>
                  </CardHeader>
                </Card>
              </TabsContent>
            )}

            {verified ? (
              <TabsContent value="availability">
                <Card>
                  <CardHeader>
                    <CardTitle>Doctor&apos;s Availability</CardTitle>
                    <CardDescription>
                      View and manage available time slots
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {dayTimeSlotResponses && dayTimeSlotResponses.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {dayTimeSlotResponses.map(
                          (
                            slot: {
                              day: string;
                              startTime: string;
                              endTime: string;
                            },
                            index: number
                          ) => (
                            <div key={index} className="p-4 border rounded-md">
                              <div className="font-medium">{slot.day}</div>
                              <div className="text-sm text-gray-600">
                                {slot.startTime} - {slot.endTime}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Clock
                          className="mx-auto text-gray-400 mb-4"
                          size={64}
                        />
                        <p className="text-gray-600">No availability set yet</p>
                        <Button
                          className="mt-4"
                          onClick={() => setShowAvailabilityDialog(true)}
                        >
                          Set Availability
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            ) : (
              <TabsContent value="availability">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {' '}
                      {userResponse.firstName} {userResponse.lastName} Your are
                      not verify
                    </CardTitle>
                    <CardDescription>To access availability</CardDescription>
                  </CardHeader>
                </Card>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </div>

      {verified && (
        <Dialog
          open={showAvailabilityDialog}
          onOpenChange={setShowAvailabilityDialog}
        >
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Set Your Availability</DialogTitle>
              <DialogDescription>
                Select days and times when you&apos;re available for
                appointments
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 gap-4">
                <CalendarPicker
                  mode="multiple"
                  selected={selectedDates}
                  onSelect={(dates) => setSelectedDates(dates || [])}
                  className="rounded-md border"
                />

                <div>
                  <h4 className="mb-2 font-medium">Available Hours</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-sm">Start Time</label>
                      <select
                        className="w-full rounded-md border border-gray-300 p-2"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                      >
                        {Array.from({ length: 24 }).map((_, i) => (
                          <option key={i} value={i}>
                            {i}:00
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm">End Time</label>
                      <select
                        className="w-full rounded-md border border-gray-300 p-2"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                      >
                        {Array.from({ length: 24 }).map((_, i) => (
                          <option key={i} value={i}>
                            {i}:00
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAvailabilityDialog(false)}
              >
                Cancel
              </Button>
              <Button type="submit" onClick={handleSaveAvailability}>
                Save Availability
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Index;
