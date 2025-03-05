import React from 'react';
import Image from 'next/image';
import dogpng from '../../public/images/dog.png';

const PetCarePlan = () => {
  return (
    <div className=" flex flex-col lg:flex-row items-center  max-w-5xl mx-auto px-4 py-16 mb-10 gap-6">

     {/* <div className="flex flex-col lg:flex-row items-center bg-white rounded-lg max-w-6xl shadow-md p-6  gap-6 lg:p-12"> */}
      <div className="lg:w-1/2 mb-6 lg:mb-0">
        <Image
          src={dogpng}
          alt={'dogpng'}
          className="w-full h-full object-cover"
        />
        {/* <img
          src="/path-to-image.jpg" 
          alt="Pet Care"
          className="rounded-lg object-cover w-full h-auto"
        /> */}
      </div>

      <div className="lg:w-1/2">
        <h2 className="text-2xl font-bold text-indigo-900 mb-4">
          What We Offer
        </h2>
        <p className="text-xl text-gray-700 mb-6">
          Your best friend deserves the best in care.
        </p>
        <ul className="space-y-4 ">
          <li className="flex items-start">
            <svg
              className="flex-shrink-0 h-6 w-6 text-green-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="ml-4 text-black text-lg">
              24/7 access to vet professionals
            </span>
          </li>
          <li className="flex items-start">
            <svg
              className="flex-shrink-0 h-6 w-6 text-green-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="ml-4 text-black text-lg">Unlimited, on-demand visits</span>
          </li>
          <li className="flex items-start">
            <svg
              className="flex-shrink-0 h-6 w-6 text-green-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="ml-4 text-black text-lg">Guided ongoing care plans</span>
          </li>
          <li className="flex items-start">
            <svg
              className="flex-shrink-0 h-6 w-6 text-green-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="ml-4 text-black text-lg">Personalized recommendations</span>
          </li>
          <li className="flex items-start">
            <svg
              className={`flex-shrink-0 h-6 w-6 text-green-500`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="ml-4 text-black text-lg">
              Risk-free cancellation at anytime
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PetCarePlan;
