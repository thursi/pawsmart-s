import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Dog from '../../public/images/dog.png';
import Image from 'next/image';

const PawpTestimonial = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      rating: 5,
      title: 'I love having Pawp in my pocket for peace of mind!',
      text: '"Having a second opinion from a team of knowledgeable pet people is wonderful. You can message, video call, or call them as many times as you see fit with one steady cost. My pup means the world to me and I love having the comfort of Pawp advice on everything from bumps on her body from bugs to the big stuff."',
      author: 'Margaret R.',
      location: 'San Francisco, CA',
      image: Dog,
    },
    {
      rating: 5,
      title: "Best decision for my pets' health!",
      text: "The 24/7 access to veterinary care has been invaluable. Whether it's a minor concern or an emergency, having professional advice instantly available gives me complete peace of mind.",
      author: 'James B.',
      location: 'Austin, TX',
      image: Dog,
    },
    {
      rating: 5,
      title: 'Exceptional pet care service!',
      text: 'The ability to connect with veterinarians anytime has saved us countless unnecessary trips to the emergency vet. The professionals are knowledgeable and caring.',
      author: 'Sarah M.',
      location: 'Portland, OR',
      image: Dog,
    },
  ];

  const isImageOnRight = currentSlide % 2 === 0;

  return (
    <div className="max-w-5xl mx-auto px-4 py-16 mb-10">
      {/* Header */}
      <div className="text-center mb-16">
        <h3 className="text-indigo-600 text-lg font-medium mb-3">
          What Members Say
        </h3>
        <h2 className="text-[32px] font-bold text-[#1a1f36]">
          Pets (and their parents) get better
          <br />
          outcomes with Pawp.
        </h2>
      </div>

      {/* Testimonial Container */}
      <div className="relative">
        <div
          className={`flex items-center gap-16 ${
            isImageOnRight ? 'flex-row' : 'flex-row-reverse'
          }`}
        >
          {/* Left Content */}
          <div className="w-1/2 space-y-6">
            {/* Stars */}
            <div className="flex gap-2">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-6 h-6 text-indigo-600"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
              ))}
            </div>

            {/* Title */}
            <h3 className="text-[28px] font-bold text-[#1a1f36] leading-tight">
              {testimonials[currentSlide].title}
            </h3>

            {/* Text */}
            <p className="text-lg text-gray-600 leading-relaxed">
              {testimonials[currentSlide].text}
            </p>

            {/* Author */}
            <div className="pt-2">
              <p className="font-semibold text-[#1a1f36]">
                {testimonials[currentSlide].author}
              </p>
              <p className="text-gray-500">
                {testimonials[currentSlide].location}
              </p>
            </div>
          </div>

          {/* Right Image */}
          <div className="w-1/2">
            <div className="rounded-3xl overflow-hidden shadow-lg">
              <Image
                src={testimonials[currentSlide].image}
                alt="Pet testimonial"
                className="w-full h-[480px] object-cover"
              />
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="absolute left-0 right-0 flex justify-between items-center mt-8">
          <div className="flex gap-3">
            {/* Navigation Buttons */}
            <button
              onClick={() =>
                setCurrentSlide(
                  (prev) =>
                    (prev - 1 + testimonials.length) % testimonials.length
                )
              }
              className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <button
              onClick={() =>
                setCurrentSlide((prev) => (prev + 1) % testimonials.length)
              }
              className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Dots */}
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? 'bg-indigo-600 w-8'
                    : 'bg-gray-300 w-2'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PawpTestimonial;
