'use client';

import { createPetEffect, PetCreateProps } from '@/api/Pet/route';
import PetRegistrationForm from '@/components/PetRegistrationForm';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const PetCreate = () => {
  const router = useRouter();
  const handleSubmit = async (pet: PetCreateProps) => {
    console.log("pet...........",pet);
    try {
      const response = await createPetEffect(pet)
      console.log("API Response:", response); 
      if (response.success) {
        toast.success(response.message);
        router.push('/mypets');
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log("error",error)
      toast.error('An error occurred!');
    }
  };

  return (
    <PetRegistrationForm
      onSubmit={(data: PetCreateProps) => {
        console.log('object', data);
        handleSubmit(data);
      }}
    />
  );
};
export default PetCreate;
