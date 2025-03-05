import React from 'react';
import { Stethoscope, Infinity, ClipboardCheck } from 'lucide-react';
import Image from 'next/image';
import phone1png from '../../public/images/phone1.png';
import phone2png from '../../public/images/phone2.png';
import phone3png from '../../public/images/phone3.png';
import { COLORS } from '@/app/constants/color';

const PetCareFeatures = () => {
  const features = [
    {
      icon: Stethoscope,
      title: 'Instant Care',
      subtitle: 'On-demand expert support available 24/7',
      screenshot: phone1png,
      alt: 'Chat interface with veterinarian',
    },
    {
      icon: Infinity,
      title: 'Better Outcomes',
      subtitle: 'Unlimited follow-ups for continuous care',
      screenshot: phone2png,
      alt: 'Video call with veterinarian',
    },
    {
      icon: ClipboardCheck,
      title: 'Designed For Your Pet',
      subtitle: 'Actionable care plans & personalized advice',
      screenshot: phone3png,
      alt: 'Pet health assessment report',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      {/* Header Section */}
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-navy-900 mb-4 text-black">
          Care that puts your pet at the center.
        </h2>
        <p className="text-gray-600 text-lg">
          Pawp focuses on providing pets with continuous care for longer,
          healthier lives. With an annual membership, you&apos;ll always have
          someone fighting in your pet&apos;s corner.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center">
            {/* Icon */}
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
              <feature.icon className="w-8 h-8 text-purple-600" />
            </div>

            {/* Text Content */}
            <h3 className="text-lg font-semibold text-purple-600 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-center mb-8">{feature.subtitle}</p>

            {/* Phone Screenshot */}
            <div className="relative w-full max-w-[280px] aspect-[9/19]">
              <div className="absolute inset-0 bg-black rounded-[3rem] shadow-xl overflow-hidden">
                <Image
                  src={feature.screenshot}
                  alt={feature.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <div className="text-center mt-16">
        <a
          href="/howitwork"
          className={`inline-block ${COLORS.bgPurple} text-white px-8 py-3 rounded-full font-medium ${COLORS.hoverbgGreen} transition-colors`}
        >
          Learn More About How It Works
        </a>
      </div>
    </div>
  );
};

export default PetCareFeatures;
