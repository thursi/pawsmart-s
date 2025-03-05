import { Stethoscope } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import Dog from '../../../public/images/dog.png';

interface SpecialistUserResponse {
  firstName: string;
  lastName: string;
  preSignedUrl?: string;
}

interface SpecialistSpecializationResponse {
  name: string;
}

interface Specialist {
  id: number;
  userResponse: SpecialistUserResponse;
  specializationResponse: SpecialistSpecializationResponse;
}

interface TopSpecialistCardProps {
  specialist: Specialist;
  onClick?: () => void;
}

const TopSpecialistCard = ({ specialist, onClick }: TopSpecialistCardProps) => {
  const imageUrl = specialist?.userResponse?.preSignedUrl || Dog;

  return (
    <Link href={`/doctor-details/${specialist.id}`} passHref>
      <div className="p-6 bg-blue-50 rounded-lg hover:shadow-lg transition-shadow duration-300 cursor-pointer" onClick={onClick}>
        <div className="flex flex-col items-center text-center space-y-4 relative">
          <div className="w-16 h-16 relative">
            <Image src={imageUrl} alt="Doctor" width={200} height={200} className="object-cover rounded-full" />
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
              <Stethoscope className="w-4 h-4 text-blue-500" />
            </div>
          </div>
          <h3 className="text-lg font-medium text-gray-700">
            {specialist?.userResponse?.firstName} {specialist?.userResponse?.lastName}
          </h3>
          <p className="text-sm text-gray-600 max-w-xs">
            {specialist?.specializationResponse?.name || 'Specialist'}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default TopSpecialistCard;
