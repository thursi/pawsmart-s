import React from 'react';
import { Heart, Calendar, PawPrint, PersonStanding } from 'lucide-react';
import { Button } from '../ui/button';
import Image from 'next/image';
import petpng from '../../../public/images/pet.png';

type PetDocument = {
  url?: string;
  name?: string;
};

type HealthRecord = {
  id: number;
  title?: string;
  pastTreatments: string[];
  petDocuments: PetDocument[];
};

type Pet = {
  id?: number;
  name?: string;
  description?: string;
  petType?: string;
  breed?: string;
  age?: number;
  weight?: number;
  medicalConditions?: string[];
  healthRecords?: HealthRecord[];
  userId?: number;
  genderType?: string;
  gender?: string;
  image?: string;
};

type PetProfileProps = {
  pet?: Pet;
};

const PetProfile = ({ pet }: PetProfileProps) => {
  return (
    <div className="flex flex-col bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          My {pet?.name || 'eerwre'}
        </h1>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Basic Info
              </h3>
              <Button
                variant="outline"
                className="text-sm font-medium hover:bg-gray-50"
              >
                Edit
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="flex justify-center">
                <div className="w-32 h-32 bg-gray-100 rounded-full overflow-hidden">
                  <Image
                    src={pet?.image || petpng}
                    alt={pet?.name || 'Pet Image'}
                    className="w-full h-full object-cover"
                    width={128}
                    height={128}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-y-4 col-span-3">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-100">
                      <PawPrint className="text-purple-500 h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Pet Name</p>
                      <p className="text-sm font-medium text-gray-800">
                        {pet?.name || 'eerwre'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-pink-100">
                      <Heart className="text-pink-500 h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Species</p>
                      <p className="text-sm font-medium text-gray-800">
                        {pet?.petType || 'Cat'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-100">
                      <PawPrint className="text-purple-500 h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Breed</p>
                      <p className="text-sm font-medium text-gray-800">
                        {pet?.breed || 'Ragdoll'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-indigo-100">
                      <PersonStanding className="text-indigo-500 h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Gender</p>
                      <p className="text-sm font-medium text-gray-800">
                        {pet?.gender || 'Male'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-100">
                      <Calendar className="text-purple-500 h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Age</p>
                      <p className="text-sm font-medium text-gray-800">
                        {pet?.age || '1'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-teal-100">
                      <PersonStanding className="text-teal-500 h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Weight</p>
                      <p className="text-sm font-medium text-gray-800">
                        {pet?.weight || '9 kg'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {pet?.healthRecords && pet.healthRecords.length > 0 && (
            <div className="p-6 border-t border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  Health Records
                </h3>
                <button className="text-purple-500 hover:text-purple-700 font-medium text-sm flex items-center">
                  View all <span className="ml-1">›</span>
                </button>
              </div>
              <div className="space-y-4">
                {pet.healthRecords.map((record: HealthRecord, index: number)=> (
                  <div
                    key={index}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
                  >
                    <h4 className="text-sm font-semibold text-gray-800 mb-1">
                      {record.title}
                    </h4>

                    {record.pastTreatments.length > 0 && (
                      <div className="mb-2">
                        <h5 className="text-sm font-semibold text-gray-800">
                          Past Treatments:
                        </h5>
                        <ul className="list-disc list-inside text-sm text-gray-700">
                          {record.pastTreatments.map(
                            (treatment: string, idx: number) => (
                              <li key={idx}>{treatment}</li>
                            )
                          )}
                        </ul>
                      </div>
                    )}

                    {record.petDocuments.length > 0 && (
                      <div className="mb-2">
                        <h5 className="text-sm font-semibold text-gray-800">
                          Pet Documents:
                        </h5>
                        <ul className="list-disc list-inside text-sm text-gray-700">
                          {record.petDocuments.map(
                            (doc: PetDocument, idx: number) => (
                              <li key={idx}>
                                <a
                                  href={doc.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 underline"
                                >
                                  {doc.name}
                                </a>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PetProfile;
