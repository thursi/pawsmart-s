'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import PetSelectionForm from '@/components/Pet/create';
import PetCard from '@/components/Pet/petcard';
import { useAuthStore } from '@/store/authStore';
import { usePetStore } from '@/store/petStore';
import { getPetFilterData } from '@/api/Pet/route';
import { useRouter } from 'next/navigation';

interface Pet {
  id?: number;
  name: string;
  petType: string;
  breed: string;
  imageUrl?: string;
  likes?: number;
  traits?: string[];
  rating?: number;
}


const AddPetButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer border-2 border-dashed border-gray-300 flex flex-col items-center justify-center h-full"
      onClick={onClick}
    >
      <div className="p-8 flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
          <Plus size={32} className="text-indigo-600" />
        </div>
        <h3 className="text-lg font-medium text-gray-800">Add New Pet</h3>
        <p className="text-sm text-gray-500 text-center mt-2">
          Click to register a new pet to your profile
        </p>
      </div>
    </div>
  );
};

const PetGrid = () => {
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();
  const handleOpenAddPetDialog = () => {
    setIsDialogOpen(true);
  };

  const handleSubmit = (data: Pet) => {
    console.log("data",data)
    setIsDialogOpen(false);
  };
  const login = useAuthStore((state) => state.login);

  const filteredPets = usePetStore((state) => state.filteredPets);
  const setFilteredPets = usePetStore((state) => state.setFilteredPets);

  const handlePetClick = (pet: Pet) => {
    setSelectedPet(pet);
    router.push(`/mypet/${pet.id}`);
  };

  const getAppointmentDetails = useCallback(async () => {
    try {
      const filterAppointmentList = await getPetFilterData({
        pageSize: 10,
        pageCount: 1,
        userId: Number(login?.userId),
      });

      if (filterAppointmentList?.records) {
        setFilteredPets(filterAppointmentList.records);
      }
    } catch (error) {
      console.error('Error fetching hospital data:', error);
    }
  }, [login?.userId, setFilteredPets]);

  useEffect(() => {
    getAppointmentDetails();
  }, [getAppointmentDetails]);
  console.log('filteredPets...........', filteredPets);
  return (
    <div className="container mx-auto p-4 mt-20 md:p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">My Pets</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredPets?.map((pet) => (
          <div key={pet.id}>
            <PetCard 
            // @ts-expect-error Temporary workaround - fix typings later
            pet={pet} onClick={() => handlePetClick(pet)} />
          </div>
        ))}

        <AddPetButton onClick={handleOpenAddPetDialog} />
      </div>

      <div>
        <PetSelectionForm
          onSubmit={(data) => handleSubmit(data)}
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
        />
      </div>
      {selectedPet && (
        <div>
          {/* <PetProfileHeader
            pet={selectedPet}
            onClose={() => setSelectedPet(null)}
          /> */}
          {/* <PetProfileModal
            pet={selectedPet}
            onClose={() => setSelectedPet(null)}
          /> */}
        </div>
      )}
    </div>
  );
};

export default PetGrid;
