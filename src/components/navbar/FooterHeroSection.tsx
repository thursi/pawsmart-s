import React from 'react';
import { Button } from '../ui/button';
import { COLORS } from '@/app/constants/color';

const HeroSection = () => {
  return (
    <div className="min-h-[400px] flex items-center bg-[#f5e9ff] px-4 py-8">
      <div className="max-w-7xl mx-auto w-full flex flex-col items-center text-center space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold text-purple-800">
          Ready to Revolutionize Your Pet Care?
        </h1>
        <p className="text-gray-600 text-lg max-w-lg">
          Join thousands of pet owners who&apos;ve discovered the power of
          AI-assisted pet health.
        </p>

        <Button
          className={`${COLORS.bgPurple} ${COLORS.hoverGreen} text-white px-6 py-4 rounded-full text-lg`}
        >
          Start Your Free Scan Now
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
