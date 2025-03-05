import React from 'react';
import Image from 'next/image';
import PetCare from '../../public/images/petcare.png';


const PetCareFeatures = () => {
  const features = [
    { id: 1, text: '24/7 access to vet professionals' },
    { id: 2, text: 'Unlimited, on-demand visits' },
    { id: 3, text: 'Guided ongoing care plans' },
    { id: 4, text: 'Personalized Recommendations' },
    { id: 5, text: 'Risk-free cancellation at anytime.' },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="w-full md:w-1/2 space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            We care for your pet so you can sit and relax!
          </h2>
          <p className="text-lg text-gray-700">
            AI-driven health scans, seamless vet bookings, and expert care—all in one place.
          </p>
          <ul className="space-y-6 mt-8">
            {features.map((feature) => (
              <li key={feature.id} className="flex items-start">
                <div className="flex-shrink-0 h-3 w-3 rounded-full bg-teal-300 flex items-center justify-center mt-1">
                </div>
                <span className="ml-3 text-lg text-gray-700">{feature.text}</span>
              </li>
            ))}
          </ul>
        </div>

   
        <div className="w-full md:w-1/2 relative">
          <div className="w-full h-full rounded-3xl bg-gray-800 overflow-hidden">
            <div className="relative aspect-square w-full">
              {/* <img 
                src="/api/placeholder/500/500" 
                alt="A gray cat and black chihuahua dog posing together"
                className="object-cover w-full h-full rounded-3xl"
              /> */}
                <Image
              src={PetCare}
              alt="Veterinary professional hugging a happy cream-colored dog"
              className="w-full h-96 rounded-xl object-cover"
            />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetCareFeatures;