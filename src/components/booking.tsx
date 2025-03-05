import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, MapPin, Star, Video } from 'lucide-react';
import Image from 'next/image';

const DoctorBookingPage = () => {
  const [bookingData, setBookingData] = useState({
    bookingDate: '2025-02-05',
    appointmentTime: '20:00:00',
    reason: '',
    note: '',
    medium: 'VIRTUAL',
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Booking Data:', bookingData);
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white">
          <CardHeader>
            <div className="flex items-start gap-4">
              <div className="w-32 h-32 relative rounded-lg overflow-hidden">
                <Image
                  src="/api/placeholder/128/128"
                  alt="Dr. Willie Andrews"
                  width={128}
                  height={128}
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <CardTitle>Dr. Willie Andrews</CardTitle>
                  <div className="flex items-center text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="ml-1">5.0</span>
                  </div>
                </div>
                <p className="text-blue-600 font-medium">Urology</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                    <Video className="w-4 h-4 mr-1" />
                    Video Consultation
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                    Taking New Patient
                  </span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-gray-600">
                Experienced urologist specializing in comprehensive urological
                care with over 15 years of practice.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <span>Agha Khan Hospital</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <span>Available Today</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Book an Appointment</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Appointment Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <input
                      type="date"
                      name="bookingDate"
                      value={bookingData.bookingDate}
                      onChange={handleChange}
                      className="w-full pl-10 p-2 border border-gray-300 rounded"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Appointment Time
                  </label>
                  <div className="relative">
                    <Clock className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <input
                      type="time"
                      name="appointmentTime"
                      value={bookingData.appointmentTime}
                      onChange={handleChange}
                      className="w-full pl-10 p-2 border border-gray-300 rounded"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Reason for Visit
                </label>
                <input
                  type="text"
                  name="reason"
                  value={bookingData.reason}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Brief description of your condition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Additional Notes
                </label>
                <textarea
                  name="note"
                  value={bookingData.note}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded h-24"
                  placeholder="Any additional information you'd like to share"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Consultation Type
                </label>
                <select
                  name="medium"
                  value={bookingData.medium}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="VIRTUAL">Video Consultation</option>
                  <option value="IN_PERSON">In-Person Visit</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Confirm Booking
              </button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DoctorBookingPage;
