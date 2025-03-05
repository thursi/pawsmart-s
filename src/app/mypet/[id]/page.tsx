'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { usePetStore } from '@/store/petStore';
import { petById } from '@/api/Pet/route';
import PetProfileHeader from '@/components/Pet/petprofileheader';

// interface Pet {
//   id: number;
//   name: string;
//   petType: string;
//   breed: string;
//   imageUrl?: string;
//   likes?: number;
//   traits?: string[];
//   rating?: number;
// }

const Index = ({ params }: { params: Promise<{ id: string }> }) => {
  const setSelectedPet = usePetStore((state) => state.setSelectedPet);
  const [id, setId] = useState<string | null>(null);
  const pet = usePetStore((state) => state.selectedPet);

  const getpetById = useCallback(
    async (id: string) => {
      try {
        const petData = await petById(id);
        setSelectedPet(petData);
      } catch (error) {
        console.error('Error fetching appointment data:', error);
      }
    },
    [setSelectedPet]
  );

  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params;
      setId(resolvedParams.id);
    };
    fetchParams();
  }, [params]);
  useEffect(() => {
    if (id) {
      getpetById(id);
    }
  }, [id, getpetById]);
  return (
    <div className="container mx-auto p-4 mt-20 md:p-6">
      <div>
        <PetProfileHeader
          // @ts-expect-error Temporary workaround - fix typings later
          pet={pet}
          onClose={() => setSelectedPet(null)}
        />
      </div>
    </div>
  );
};

export default Index;
