// import React from 'react';
// import { Calendar, Clock, User, Mail, FileText, CreditCard } from 'lucide-react';
// import { Card, CardContent, CardHeader } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import Image from "next/image";
// import { Appointment } from '@/lib/typings';

// interface ConsultationDetailsProps {
//   consultationData: Appointment;
// }

// const ConsultationDetails: React.FC<ConsultationDetailsProps> = ({ consultationData }) => {
//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       day: '2-digit',
//       month: 'short',
//       year: 'numeric'
//     });
//   };

//   const formatTime = (timeString: string) => {
//     return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-4">
//       <div className="mb-6">
//         <Button variant="ghost" className="flex items-center gap-2">
//           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//           </svg>
//           Consulta {consultationData.id}
//         </Button>
//       </div>

//       <div className="flex gap-4 mb-6">
//         <button className="px-4 py-2 text-blue-500 bg-blue-50 rounded-md font-medium">
//         Historial clinic
//         </button>
//         <button className="px-4 py-2 text-gray-600 rounded-md font-medium">
//           Historial clínico
//         </button>
//       </div>

//       <div className="flex items-center gap-4 mb-6">
//       <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
//   <Image
//     src={consultationData.doctorResponse?.userResponse?.preSignedUrl || "/api/placeholder/48/48"}
//     alt="Doctor"
//     width={48}
//     height={48}
//     className="w-full h-full object-cover"
//   />
// </div>
//         <div className="flex-1">
//           <div className="flex items-center gap-2">
//             <span className="text-blue-500 font-medium">CITA PROGRAMADA</span>
//             <Clock className="w-4 h-4 text-blue-500" />
//             <span>{formatDate(consultationData.bookingDate)} | {formatTime(consultationData.bookingTime)}</span>
//           </div>
//         </div>
//         <div className="flex gap-2">
//           <Button variant="outline">Cancelar cita</Button>
//           <Button variant="outline">Cambiar profesional</Button>
//           <Button variant="outline" className="text-blue-500">Reagendar</Button>
//         </div>
//       </div>

//       <Card className="mb-6">
//         <CardHeader className="flex flex-row items-center justify-between">
//           <h3 className="text-lg font-semibold">Estado de cita</h3>
//           <span className="px-3 py-1 bg-green-100 text-green-600 rounded-md">
//             {consultationData.bookingStatus}
//           </span>
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-2 gap-6">
//             <div>
//               <div className="mb-6">
//                 <h4 className="text-lg font-medium mb-2">
//                   {consultationData.doctorResponse?.userResponse?.firstName} {consultationData.doctorResponse?.userResponse?.lastName}
//                 </h4>
//                 <p className="text-gray-600">{consultationData.doctorResponse?.specializationResponse?.name}</p>
//               </div>

//               <div className="space-y-4">
//                 <div className="flex items-center gap-2">
//                   <Calendar className="w-5 h-5 text-gray-500" />
//                   <div>
//                     <p className="text-sm text-gray-600">Fecha de cita agendada</p>
//                     <p>{formatDate(consultationData.bookingDate)} | {formatTime(consultationData.bookingTime)}</p>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <CreditCard className="w-5 h-5 text-gray-500" />
//                   <div>
//                     <p className="text-sm text-gray-600">Estado de pago</p>
//                     <p className="text-green-600">Aprobado</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="space-y-4">
//               <div className="flex items-center gap-2">
//                 <User className="w-5 h-5 text-gray-500" />
//                 <div>
//                   <p className="text-sm text-gray-600">Nombre del paciente</p>
//                   <p>{consultationData.userResponse?.firstName} {consultationData.userResponse?.lastName}</p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-2">
//                 <Mail className="w-5 h-5 text-gray-500" />
//                 <div>
//                   <p className="text-sm text-gray-600">Correo electrónico</p>
//                   <p>{consultationData.userResponse?.email}</p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-2">
//                 <FileText className="w-5 h-5 text-gray-500" />
//                 <div>
//                   <p className="text-sm text-gray-600">Motivo de la consulta</p>
//                   <p>{consultationData.reason}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default ConsultationDetails;

import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  User,
  FileText,
  CreditCard,
  Heart,
  ChevronLeft,
  Star,
  Stethoscope,
  PawPrint,
  Weight,
  Pill,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Appointment } from '@/lib/typings';
import dogpng from '../../public/images/dog.png';
import { useRouter } from 'next/navigation';
import ConfirmationDialog from './ConfirmationDialog';
import { cancelBooking } from '@/api/Appointment/route';
import { toast } from 'sonner';

interface ConsultationDetailsProps {
  consultationData: Appointment;
  refreshAppointments: () => void;

}

const ConsultationDetails: React.FC<ConsultationDetailsProps> = ({
  consultationData,
  refreshAppointments

}) => {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState<Appointment>();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleClick = () => {
    router.push('/appointments');
  };

  const handleEditClick = (appointment: Appointment) => {
    setIsDialogOpen(false);
    console.log('appointment.bookingStatus', appointment.bookingStatus);
  
    if (appointment.bookingStatus !== "CANCELED") {
      setAppointmentToCancel(appointment);
      setIsDialogOpen(true);
    } else {
      setIsDialogOpen(false);
      alert('This appointment has already been canceled.');
    }
  };
  
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
      setIsDialogOpen(false);
    }
  };
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50">
      <div className="mb-8">
        <Button
          variant="ghost"
          className="flex items-center gap-2 hover:bg-blue-50 mb-4"
          onClick={handleClick}
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="text-blue-600">Back to Consultations</span>
        </Button>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Consultation #{consultationData.id}
        </h1>
      </div>
      <div className="flex justify-end items-end gap-4 mb-6">
        <Button
          variant="outline"
          className="text-red-500 hover:bg-red-50"
          onClick={() => handleEditClick(consultationData)}
        >
          Cancel Appointment
        </Button>
      </div>
      <Card className="mb-8 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden ring-4 ring-blue-100">
              <Image
                src={
                  consultationData.doctorResponse?.userResponse?.preSignedUrl ||
                  dogpng
                }
                alt="Doctor"
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-800">
                Dr. {consultationData.doctorResponse?.userResponse?.firstName}{' '}
                {consultationData.doctorResponse?.userResponse?.lastName}
              </h2>
              <p className="text-blue-600 font-medium">
                {consultationData.doctorResponse?.specializationResponse?.name}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-gray-600">4.9 (120 reviews)</span>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <span className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium inline-flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {formatTime(consultationData.bookingTime)} |{' '}
                {formatDate(consultationData.bookingDate)}
              </span>
              <span className="px-4 py-2 bg-green-50 text-green-600 rounded-full text-sm items-center justify-center text-center font-medium">
                {consultationData?.bookingStatus}
              </span>
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Doctor Information
            </h3>
            <div className="flex space-x-14 bg-white p-4 rounded-lg">
              <div className="flex items-center gap-3">
                <Stethoscope className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-500">Specialization</p>
                  <p className="font-medium">
                    {
                      consultationData.doctorResponse?.specializationResponse
                        ?.name
                    }
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Star className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-500">Experience</p>
                  <p className="font-medium">
                    {consultationData.doctorResponse?.experience} years
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-500">Consultation Fee</p>
                  <p className="font-medium">
                    ${consultationData.doctorResponse?.paymentPerSession}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-500">Qualification</p>
                  <p className="font-medium">
                    {consultationData.doctorResponse?.qualification}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Patient Information
              </h3>
              <div className="space-y-4 bg-white p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">Patient Name</p>
                    <p className="font-medium">
                      {consultationData.userResponse?.firstName}{' '}
                      {consultationData.userResponse?.lastName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Heart className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">Pet Name</p>
                    <p className="font-medium">
                      {consultationData.petResponse?.name}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">Pet Age</p>
                    <p className="font-medium">
                      {consultationData.petResponse?.age} years
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">Reason for Visit</p>
                    <p className="font-medium">{consultationData.reason}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Pet Details
              </h3>
              <div className="bg-white p-4 rounded-lg space-y-4">
                <div className="flex items-center gap-3">
                  <Heart className="w-5 h-5 text-pink-500" />
                  <div>
                    <p className="text-sm text-gray-500">Pet Name</p>
                    <p className="font-medium">
                      {consultationData.petResponse?.name}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <PawPrint className="w-5 h-5 text-amber-500" />
                  <div>
                    <p className="text-sm text-gray-500">Type & Breed</p>
                    <p className="font-medium">
                      {consultationData.petResponse?.petType} -{' '}
                      {consultationData.petResponse?.breed}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">Age & Gender</p>
                    <p className="font-medium">
                      {consultationData.petResponse?.age} years •{' '}
                      {consultationData.petResponse?.genderType.toLowerCase()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Weight className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-sm text-gray-500">Weight</p>
                    <p className="font-medium">
                      {consultationData.petResponse?.weight} kg
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Pill className="w-5 h-5 text-purple-500 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Medical Conditions</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {consultationData.petResponse?.medicalConditions.map(
                        (condition, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-sm"
                          >
                            {condition}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">Reason for Visit</p>
                    <p className="font-medium">{consultationData.reason}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <ConfirmationDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onConfirm={handleCancelAppointment}
        message={`Are you sure you want to cancel the appointment with Dr. ${appointmentToCancel?.doctorResponse.userResponse.firstName} ${appointmentToCancel?.doctorResponse.userResponse.lastName}?`}
      />
    </div>
  );
};

export default ConsultationDetails;
