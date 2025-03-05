import React from 'react';
import Image from 'next/image';
import FeederImage from '../../public/images/pet1.png';
import FountainImage from '../../public/images/pet2.png';
import { COLORS } from '@/app/constants/color';

const ProductShowcase = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-12">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="flex-1">
          <Image
            src={FeederImage}
            alt="Smart Pet Feeder"
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="flex-1 space-y-4">
          <h2 className="text-lg font-semibold text-gray-500">
            SMART PET FEEDER
          </h2>
          <h1 className="text-3xl font-bold text-gray-800">Remote feeding</h1>
          <p className="text-gray-600">
            Is your pet’s diet irregular? Our equipment uses the most advanced
            feeding technology to ensure your pet gets the exact amount of
            nutrition at the best time.
          </p>
          <button
            className={`px-6 py-3 border border-gray-800 text-gray-800 rounded-lg ${COLORS.hoverGreen} hover:text-white transition`}
          >
            View details
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-500">
            SMART PET DRINKING FOUNTAIN
          </h2>
          <h1 className="text-3xl font-bold text-gray-800">
            Smart Purification
          </h1>
          <p className="text-gray-600">
            With multi-layer purification technology, every drop of water that
            flows into the pet’s mouth is carefully filtered to remove
            impurities and residual chlorine in the water, keeping it away from
            bacteria, and ensuring the health and purity of the pet’s drinking
            water.
          </p>
          <button
            className={`px-6 py-3 border border-gray-800 text-gray-800 rounded-lg ${COLORS.hoverGreen} hover:text-white transition`}
          >
            View details
          </button>
        </div>

        <div>
          <Image
            src={FountainImage}
            alt="Smart Pet Drinking Fountain"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductShowcase;
