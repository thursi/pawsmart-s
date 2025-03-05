'use client';

import { useSpecializationStore } from '@/store/specializationStore';
import { getAllspecialization } from '@/api/Specialization/route';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Check, Star, Stethoscope, X } from 'lucide-react';
import ServiceCard from '../components/ServiceCard';
import { useDoctorStore } from '@/store/doctorStore';
import { getDoctorData } from '@/api/Doctor/route';
import { Doctor, Specialization } from '@/lib/typings';
import PetCareSection from '../components/navbar/Section';
import Image from 'next/image';
import earScanning from '../../public/images/ear_scanning.png';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import PetCareInsights from '@/components/PetCareInsights';
import FeaturesSection from '@/components/FeaturesSection';
import HomeDoctorCard from '@/components/HomeDoctorCard';
import { getAllcity } from '@/api/City/route';
import { useCityStore } from '@/store/cityStore';

export default function Home() {
  const [current, setCurrent] = useState(0);

  const specialization = useSpecializationStore(
    (state: { specialization: Specialization[] }) => state.specialization
  );
  const setAllSpecialization = useSpecializationStore(
    (state: { setAllSpecialization: (specs: Specialization[]) => void }) =>
      state.setAllSpecialization
  );

  const doctors = useDoctorStore(
    (state: { doctors: Doctor[] }) => state.doctors
  );

  const setAllDoctors = useDoctorStore(
    (state: { setAllDoctors: (doctors: Doctor[]) => void }) =>
      state.setAllDoctors
  );
  const setAllfilterallcities = useCityStore((state) => state.setAllfilterallcities);

  const specializationOptions = Array.isArray(specialization)
    ? specialization.map((special: Specialization) => ({
        label: special.name,
        value: special.id,
      }))
    : [];

  console.log('specializationOptions', specializationOptions);

  const fetchData = useCallback(async () => {
    try {
      const specializations = await getAllspecialization(1, 10);
      const cities = await getAllcity(1, 10);

      console.log("cities,.............",cities);
      const doctorFilter = await getDoctorData(1, 10,true);
      setAllSpecialization(specializations.records);
      setAllDoctors(doctorFilter.records);
      setAllfilterallcities(cities.records);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [setAllDoctors, setAllSpecialization,setAllfilterallcities]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const services = [
    {
      id: 1,
      isMain: false,
      title: 'Veterinarian Channeling',
      subtitle: 'Avoid wait time at clinics',
      icon: (
        <div className="p-3 rounded-full bg-[#D5F7F3]">
          <Stethoscope size={22} color="#05C1AF" />
        </div>
      ),
    },
    {
      id: 2,
      title: 'E-Consultation',
      subtitle: 'Member Benefits',
      icon: (
        <div className="p-3 rounded-full bg-[#D5F7F3]">
          <Star size={22} color="#05C1AF" />
        </div>
      ),
    },
    {
      id: 3,
      title: 'Real time scans & follow ups',
      subtitle: 'Book an Appointment',
      icon: (
        <div className="p-3 rounded-full bg-[#D5F7F3]">
          <Stethoscope size={22} color="#05C1AF" />
        </div>
      ),
    },
    {
      id: 4,
      title: '24/7 Emergency care',
      subtitle: '',
      icon: (
        <div className="p-3 rounded-full bg-[#D5F7F3]">
          <Stethoscope size={22} color="#05C1AF" />
        </div>
      ),
    },
  ];

  // const handleSearch = async () => {
  //   try {
  //     const specializationId = nameSpecialization?.value
  //       ? String(nameSpecialization.value)
  //       : '';

  //       const formattedDate = selectedDate ? selectedDate.toISOString() : '';
  //       const doctorFilter = await getDoctorData(1, 10, specializationId, formattedDate);

  //     if (
  //       doctorFilter &&
  //       doctorFilter.records &&
  //       doctorFilter.records.length > 0
  //     ) {
  //       // const url = {
  //       //   pathname: '/doctors',
  //       //   query: {
  //       //     specializationId: specializationId,
  //       //     date: formattedDate,
  //       //   },
  //       // };
  //       // const queryString = new URLSearchParams(url.query).toString();
  //       // router.push(`${url.pathname}?${queryString}`);
  //     } else {
  //       toast.error('No doctors found for the selected criteria...');
  //       alert('No doctors found for the selected criteria.');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching doctor data:', error);
  //   }
  // };
  const reviews = useMemo(
    () => [
      {
        id: 1,
        image: '/images/walking-with-dog.png',
        rating: 5,
        title: 'A Lifesaver for My Pet!',
        text: "PawSmart's AI scan detected an early skin issue in my dog, and the virtual vet consultation made getting expert advice effortless. The Paw Pod readings provide real-time health insights, making pet care easier than ever. Highly recommend for all pet parents!",
        author: 'Emma, Dog Mom',
        authorImage: '/images/pet1.png',
      },
      {
        id: 2,
        image: '/images/dog.png',
        rating: 5,
        title: 'A Lifesaver for My Pet!',
        text: "PawSmart's AI scan detected an early skin issue in my dog, and the virtual vet consultation made getting expert advice effortless. The Paw Pod readings provide real-time health insights, making pet care easier than ever. Highly recommend for all pet parents!",
        author: 'Emma, Dog Mom',
        authorImage: '/images/pet1.png',
      },
      {
        id: 3,
        image: '/images/walking-with-dog.png',
        rating: 5,
        title: 'A Lifesaver for My Pet!',
        text: "PawSmart's AI scan detected an early skin issue in my dog, and the virtual vet consultation made getting expert advice effortless. The Paw Pod readings provide real-time health insights, making pet care easier than ever. Highly recommend for all pet parents!",
        author: 'Emma, Dog Mom',
        authorImage: '/images/pet1.png',
      },
    ],
    []
  );

  const plans = [
    {
      name: 'Basic',
      price: '$99',
      description: 'For pet parents who need essential AI health scans',
      features: [
        'AI Quick Scan',
        'Pet Health Report',
        'Reminders & Notifications',
        { missing: 'No vet consultations' },
        { missing: 'No emergency support' },
      ],
    },
    {
      name: 'Standard',
      price: '$199',
      description: 'For pet parents who want AI-powered insights + vet support',
      popular: true,
      features: [
        'Everything in Basic Plan',
        'AI Advanced Scan',
        'Instant Vet Booking',
        'Personalized Care Tips',
        { missing: 'No emergency support' },
      ],
    },
    {
      name: 'Premium',
      price: '$399',
      description: 'For pet parents who want full AI + vet + emergency care',
      features: [
        'Everything in Standard Plan',
        '24/7 Vet Access',
        'Emergency Care Support',
        'Advanced Health Monitoring',
        'Exclusive Discounts on Pet Products',
      ],
    },
  ];

  // const nextSlide = () => setCurrent((current + 1) % reviews.length);
  // const prevSlide = () =>
  //   setCurrent((current - 1 + reviews.length) % reviews.length);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((current + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [current, setCurrent, reviews]);

  return (
    <>
      <main className="bg-white  flex flex-col gap-y-16">
        <div className="flex flex-col items-center justify-between">
          <PetCareSection />
        </div>

        {/* <div className="relative z-5 max-w-5xl px-4 pb-4 mt-6 mx-auto">
          <div className="flex flex-row justify-between space-x-4">
            <div className="bg-white rounded-lg shadow-lg p-4 flex-grow flex-shrink-0 w-full md:w-2/3">
              <div className="container mx-auto">
                <h3 className=" text-2xl font-bold mb-2">
                  Start Your Search Doctor
                </h3>
                <hr className="my-2 border-t-2 border-gray-300" />

                <div className="relative z-2 home-first w-full pt-4">
                  <section className="mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-2">
                      <FilterDropdown
                        options={specializationOptions}
                        placeholder="👩‍⚕️ Select Specialization"
                        onChange={setSelectedSpecialization}
                        value={nameSpecialization}
                      />

                      <div className="relative">
                        <Popover open={open} onOpenChange={setOpen}>
                          <PopoverTrigger asChild>
                            <button className="bg-white border border-gray-500 rounded-lg px-4 py-2 w-full flex justify-between items-center text-sm font-medium hover:bg-gray-50">
                              {selectedDate
                                ? format(selectedDate, 'PPP')
                                : '📅 Select Date'}
                              <CalendarIcon className="h-4 w-4 text-gray-500" />
                            </button>
                          </PopoverTrigger>
                          <PopoverContent align="start" className="p-0 z-50">
                            <Calendar
                              mode="single"
                              selected={selectedDate}
                              onSelect={(date) => {
                                setSelectedDate(date);
                                setOpen(false);
                              }}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <button
                        onClick={handleSearch}
                        // className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center group transition-colors"
                        className={`flex items-center justify-center group ${COLORS.bgPurple}  ${COLORS.hoverbgGreen} text-white font-medium py-2 px-4 rounded-md transition-colors`}
                      >
                        Search
                        <ArrowRight
                          className="ml-2 w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 text-white transition-all duration-200"
                          size={20}
                        />
                      </button>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        {/* <div className="items-center flex flex-col space-y-3">
          <h1 className="text-3xl font-bold">
            Step Into the Future of Pet Health
          </h1>
          <p>
            Your pet’s health is just a scan away! AI-powered insights,
            real-time monitoring, and instant vet access—all in one app.
          </p>

          <div className="grid grid-cols-3 gap-14 pt-5">
            <div className="flex flex-col">
              <h1 className="text-center font-bold mb-2">Quick AI Scan</h1>
              <p className="text-center">
                Utilize advanced AI technology to instantly
              </p>
              <p className="text-center">
                assess your pet's health by capturing or
              </p>
              <p className="text-center mb-6">uploading a photo.</p>

              <Image
                src={mobileScreen}
                alt="Veterinary professional hugging a happy cream-colored dog"
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="flex flex-col">
              <h1 className="text-center font-bold">Paw Pod Analytics</h1>
              <p className="text-center">Connect with the Paw Pod device to</p>
              <p className="text-center">monitor your pet's vital signs and</p>
              <p className="text-center mb-6">
                behaviors through comprehensive health analytics.
              </p>

              <Image
                src={mobileScreen2}
                alt="Veterinary professional hugging a happy cream-colored dog"
                className="w-full h-auto  object-cover"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-center font-bold">Virtual Appointments</h1>
              <p className="text-center">
                Easily schedule virtual consultations with
              </p>
              <p className="text-center">
                certified veterinarians for various health
              </p>
              <p className="text-center mb-6">concerns.</p>

              <Image
                src={mobileScreen3}
                alt="Veterinary professional hugging a happy cream-colored dog"
                className="w-full h-auto  object-cover"
              />
            </div>
          </div>
          <div className="absolute bottom-80 left-0 w-full -mb-10">
            <div className="bg-purple-600 text-center text-xl p-10">
              <a href="" className="text-white font-semibold hover:underline">
                See How It Works
              </a>
            </div>
          </div>
        </div> */}
        <FeaturesSection />

        <div className="items-center mx-auto flex flex-col">
          <h1 className="text-3xl font-bold  space-y-3">How PAW POD Works</h1>
          <p>Paw Pod uses advanced AI to scan symptoms, detect</p>
          <p>risks, and recommend care.</p>

          <div className="flex flex-row gap-10 pt-5 container mx-auto">
            <Image
              src={earScanning}
              alt="Veterinary professional hugging a happy cream-colored dog"
              className="w-full h-96 rounded-xl object-cover"
            />
            <div className="flex flex-col gap-y-5 justify-around">
              <h1 className="text-lg font-bold text-black">Ear Scanning</h1>
              <p>
                PawSmart&apos;s advanced AI-powered ear scanning technology
                helps pet owners detect early signs of infections, inflammation,
                or ear mites with just a quick scan. Using cutting-edge image
                analysis, the AI assesses ear health by identifying redness,
                swelling, wax buildup, or abnormal discharge. Integrated with
                the Paw Pod, this feature provides instant insights, guiding pet
                owners with next steps—whether it&apos;s a home remedy or a
                virtual vet consultation. Stay ahead of potential ear problems
                and ensure your pet&apos;s comfort with fast, accurate, and
                stress-free AI diagnostics!{' '}
                <a href="" className="text-primary font-semibold">
                  Learn more
                </a>
              </p>
              <button className="text-white py-3 px-6 rounded-lg flex items-center bg-primary w-fit">
                Book a Demo
              </button>
            </div>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center space-y-3">
          Our Medical Services
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 container mx-auto">
          {services?.map((service) => (
            <ServiceCard
              key={service.id}
              isMain={service.isMain}
              title={service.title}
              subtitle={service.subtitle}
              icon={service.icon}
            />
          ))}
        </div>
        <div className="flex flex-col items-center justify-center mx-auto space-y-3">
          <h1 className="text-3xl font-bold">Meet Our Specialists</h1>
          <p>Certified Veterinarians Ready to Help You!</p>
          
          <div className="grid grid-cols-4 gap-10 pt-5 container mx-auto">
            {doctors?.slice(0, 4).map((doctor, key) => (
              <HomeDoctorCard key={key} doctor={doctor} />
            ))}
          </div>
        </div>
        <div className="justify-center items-center w-full">
          {/* <ServiceSection /> */}
          <PetCareInsights />
        </div>

        <div className="flex flex-col items-center p-8 space-y-16">
          <div>
            <h1 className="text-2xl font-bold">
              PawSome Pricing for our Awesome Pets!
            </h1>

            <p className="text-gray-500 text-center">
              Affordable plans designed for every pet parent. Choose what suits
              your furry friend best!
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 w-full max-w-6xl">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`p-8 rounded-2xl shadow-md relative ${
                  plan.popular
                    ? 'bg-primary text-white transform scale-105 mb-10'
                    : 'bg-white text-black'
                }`}
              >
                <div className="mb-4 flex items-center space-x-3">
                  <div className="w-8 h-8 rounded bg-purple-200"></div>
                  <h2 className="text-xl font-semibold">{plan.name}</h2>
                  {plan.popular && (
                    <span className="bg-white/30 text-white px-3 py-1.5 rounded-lg text-sm">
                      Popular
                    </span>
                  )}
                </div>
                <p className="mb-4 text-sm">{plan.description}</p>
                <h3 className="text-4xl font-bold mb-4">
                  {plan.price}
                  <span className="text-base font-normal"> /monthly</span>
                </h3>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      {typeof feature === 'string' ? (
                        <div className="rounded-full bg-white p-1">
                          <Check className="text-primary" />
                        </div>
                      ) : (
                        <div className="rounded-full  p-1">
                          <X className="text-red-500" />
                        </div>
                      )}
                      <span>
                        {typeof feature === 'string'
                          ? feature
                          : feature.missing}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`
                    w-full
                    ${
                      plan.popular
                        ? 'bg-white text-primary'
                        : 'bg-primary text-white'
                    }
                  `}
                >
                  Get Started
                </Button>
              </Card>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center container mb-10 mx-auto">
          <h2 className="text-2xl font-bold mb-2">What Our Pet Parents Say</h2>
          <p className="text-gray-500 text-center">
            Real experiences from pet parents who trust PawSmart for fast,
          </p>
          <p className="text-gray-500 mb-4 text-center">
            reliable health scans and seamless vet care.
          </p>
          <div className="flex flex-row items-center mx-auto max-w-7xl justify-center">
            {reviews.map((review, index) => (
              <div
                key={review.id}
                className={`transition-opacity duration-500 ${
                  index === current ? 'opacity-100' : 'opacity-0 hidden'
                }`}
              >
                <div className="flex flex-row items-center gap-4">
                  <Image
                    src={review.image}
                    alt="Pet and Owner"
                    width={400}
                    height={400}
                    className="rounded-lg"
                  />
                  <div className="flex flex-col">
                    <div className="flex text-yellow-400 mb-2">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} />
                      ))}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      {review.title}
                    </h3>
                    <p className="text-gray-700 mb-4 ">{review.text}</p>
                    <div className="flex items-center gap-2">
                      <Image
                        src={review.authorImage}
                        alt={review.author}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <span className="text-gray-600 font-medium">
                        {review.author}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-4">
            {reviews.map((_, index) => (
              <button
                key={index}
                className={`h-2 w-2 rounded-full transition-all duration-500 ${
                  current === index ? 'bg-primary w-7' : 'bg-gray-300'
                }`}
                onClick={() => setCurrent(index)}
              />
            ))}
          </div>
        </div>

        {/* <div>
          <HeroSection />
        </div> */}
      </main>
    </>
  );
}
