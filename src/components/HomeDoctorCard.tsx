// import React from 'react';
// import Image from 'next/image';
// import { Star, } from 'lucide-react';
// import doctorImage from '../../public/images/doctor.png';

// const DoctorCard = ({ doctor }: any) => {
//   return (
//     <div className="flex flex-col relative">
//       <div className="rounded-t-xl">
//         <Image
//           src={doctor.imageUrl || doctorImage}
//           alt={doctor.name}
//           className="w-auto h-72 object-cover"
//           width={300}
//           height={300}
//         />
//         <div className="flex flex-row gap-x-2 absolute top-2.5 left-2.5">
//           <h1 className="text-white bg-primary px-2 py-1 text-xs rounded-full">
//             In Person
//           </h1>
//           <h1 className="text-white bg-primary px-2 py-1 text-xs rounded-full">
//             Video
//           </h1>
//           <h1 className="text-white bg-primary px-2 py-1 text-xs rounded-full">
//             Clinic Visit
//           </h1>
//         </div>
//         <div className="flex flex-row gap-x-2 absolute top-2.5 left-2.5">
//           {doctor.availability?.map((availability: any, index: any) => (
//             <h1
//               key={index}
//               className="text-white bg-primary px-2 py-1 text-xs rounded-full"
//             >
//               {availability}
//             </h1>
//           ))}
//         </div>
//       </div>
//       <div className="bg-[#E7F3FF] p-3 flex flex-col gap-y-2 rounded-b-xl">
//         <div className="flex flex-row justify-between">
//           <h1 className="font-bold text-black">{`${doctor.userResponse?.firstName} ${doctor.userResponse?.lastName}`}</h1>
//           <div className="flex flex-row gap-x-2 items-center">
//             <Star color="#F8B400" size={21} />
//             {doctor.rating || 'N/A'}
//           </div>
//         </div>
//         <h1>{doctor.specializationResponse.name}</h1>
//         <div className="flex flex-row justify-between items-center">
//           <h1 className="font-bold">{doctor.fee || 'LKR 0.00/h'}</h1>

//           <button className="bg-primary text-white py-1.5 px-2 rounded-full text-sm">
//             Book Now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DoctorCard;

import React from 'react';
import Image from 'next/image';
import { Star, } from 'lucide-react';
import doctorImage from '../../public/images/doctor.png';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

interface UserResponse {
  firstName?: string;
  lastName?: string;
}

interface SpecializationResponse {
  name?: string;
}

interface Doctor {
  id?: string;
  preSignedUrl?: string;
  name?: string;
  availability?: string[];
  rating?: number;
  fee?: string;
  userResponse?: UserResponse;
  specializationResponse: SpecializationResponse;
}

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  const router = useRouter();
  const handleBookNow = () => {
    if (doctor?.id) {
      router.push(`/doctor-details/${doctor?.id}`);
    }
  };
  return (
    <div className="flex flex-col relative">
      <div className="rounded-t-xl">
        <Image
          src={doctor.preSignedUrl || doctorImage}
          alt={'image'}
          className="w-auto h-72 object-cover"
          width={300}
          height={300}
        />
        <div className="flex flex-row gap-x-2 absolute top-2.5 left-2.5">
          <h1 className="text-white bg-primary px-2 py-1 text-xs rounded-full">
            In Person
          </h1>
          <h1 className="text-white bg-primary px-2 py-1 text-xs rounded-full">
            Video
          </h1>
          <h1 className="text-white bg-primary px-2 py-1 text-xs rounded-full">
            Clinic Visit
          </h1>
        </div>
        <div className="flex flex-row gap-x-2 absolute top-2.5 left-2.5">
          {doctor.availability?.map((availability: string, index: number) => (
            <h1
              key={index}
              className="text-white bg-primary px-2 py-1 text-xs rounded-full"
            >
              {availability}
            </h1>
          ))}
        </div>
      </div>
      <div className="bg-[#E7F3FF] p-3 flex flex-col gap-y-2 rounded-b-xl">
        <div className="flex flex-row justify-between">
          <h1 className="font-bold text-black">
            {`${doctor.userResponse?.firstName} ${doctor.userResponse?.lastName}`}
          </h1>
          <div className="flex flex-row gap-x-2 items-center">
            <Star color="#F8B400" fill="#F8B400" size={21} />
            {doctor.rating || 'N/A'}
          </div>
        </div>
        <h1>{doctor.specializationResponse.name}</h1>
        <div className="flex flex-row justify-between items-center">
          <h1 className="font-bold">{doctor.fee || 'LKR 0.00/h'}</h1>
          <Button
            className="bg-primary text-white py-1 px-6 rounded-full text-lg"
            onClick={handleBookNow}
          >
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
