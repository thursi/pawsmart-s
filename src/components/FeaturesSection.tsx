import React from 'react';
import mobileScreen from '../../public/images/mobileScreen.png';
import mobileScreen2 from '../../public/images/mockup1.png';
import mobileScreen3 from '../../public/images/mockup2.png';
import Image from 'next/image';

const FeaturesSection = () => {
  const features = [
    {
      title: "Quick AI Scan",
      description: [
        "Utilize advanced AI technology to instantly",
        "assess your pet's health by capturing or",
        "uploading a photo."
      ],
      image: mobileScreen
    },
    {
      title: "Paw Pod Analytics",
      description: [
        "Connect with the Paw Pod device to",
        "monitor your pet's vital signs and",
        "behaviors through comprehensive health analytics."
      ],
      image: mobileScreen2
    },
    {
      title: "Virtual Appointments",
      description: [
        "Easily schedule virtual consultations with",
        "certified veterinarians for various health",
        "concerns."
      ],
      image: mobileScreen3
    }
  ];

  return (
    <div className="relative w-full min-h-screen">
      <div className="items-center flex flex-col space-y-3 max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold">
          Step Into the Future of Pet Health
        </h1>
        <p className="text-center max-w-2xl">
          Your pet&apos;s  health is just a scan away! AI-powered insights,
          real-time monitoring, and instant vet access—all in one app.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-14 pt-5 w-full">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col relative">
              <div className="p-6 rounded-lg mb-4 z-10">
                <h1 className="text-center font-bold text-black mb-2">{feature.title}</h1>
                <div className="text-center">
                  {feature.description.map((line, i) => (
                    <p key={i} className="text-black">{line}</p>
                  ))}
                </div>
              </div>

         
              <div className="relative z-0 mb-[-3px]">
                <Image
                  src={feature.image}
                  alt={`${feature.title} interface`}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

   
      <div className="absolute left-0 right-0 bottom-0 bg-[#3D0B58] w-full z-20">
        <div className="text-center text-xl p-16">
          <a href="" className="text-white font-semibold hover:underline">
            See How It Works
          </a>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;