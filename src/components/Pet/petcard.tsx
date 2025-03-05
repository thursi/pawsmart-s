import Image from 'next/image';
import petpng from '../../../public/images/pet.png';
import { Button } from '../ui/button';

interface Pet {
  id?: number;
  name: string;
  petType: string;
  breed: string;
  imageUrl?: string;
  likes?: number;
  rating?: number;
  traits?: string[];
}

interface PetCardProps {
  pet: Pet;
  onClick: (pet: Pet) => void;
}

const PetCard = ({ pet, onClick }: PetCardProps) => {
  console.log('pet....', pet);
  const breedParts = pet.breed.split('-');
  const breedSubtype = breedParts.length > 1 ? breedParts[1] : '';
  return (
    <div className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer bg-white transform hover:-translate-y-1">
      <div className="relative">
        <Image
          src={pet.imageUrl || petpng}
          alt={pet.name}
          className="w-full aspect-square object-cover"
          width={300}
          height={300}
        />

        <div className="absolute top-3 right-3">
          <span className="bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full shadow-md">
            {pet.petType}
          </span>
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold text-gray-800">{pet.name}</h3>
            <p className="text-sm text-gray-600 mt-1 font-medium">
              {pet.breed}
            </p>
            {breedSubtype && (
              <p className="text-xs text-gray-500 mt-1 italic">
                {breedSubtype}
              </p>
            )}
          </div>
        </div>

        <div className="mt-4">
          <Button
            className="w-full bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium py-2 px-4 rounded-lg text-sm transition-colors duration-300"
            onClick={() => onClick(pet)}
          >
            View Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PetCard;
