'use client';

import { useSpecializationStore } from '@/store/specializationStore';
import { getAllspecialization } from '@/api/Specialization/route';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Star, Stethoscope } from 'lucide-react';
import ServiceCard from '../components/ServiceCard';
import { useDoctorStore } from '@/store/doctorStore';
import { getDoctorData } from '@/api/Doctor/route';
import { Doctor, Specialization } from '@/lib/typings';
import PetCareSection from '../components/navbar/Section';
import Image, { StaticImageData } from 'next/image';
import earScanning from '../../public/images/ear_scanning.png';
import PetCareFeatures from '@/components/PetCare';
import ProductCategories from '@/components/products';
import petshopproduct from '../../public/images/petshopproduct.png';
import FeaturesSection from '@/components/FeaturesSection';
import HomeDoctorCard from '@/components/HomeDoctorCard';
import { getAllcity } from '@/api/City/route';
import { useCityStore } from '@/store/cityStore';
import { useRouter } from 'next/navigation';

// interface Option {
//   label: string;
//   value: number;
// }

type ProductData = Omit<Product, 'onAdd'>;
interface Product {
  id: string;
  name: string;
  badge?: string;
  image: string | StaticImageData;
  onAdd: (product: ProductData) => void;
}

export default function Home() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  // const [nameSpecialization, setSelectedSpecialization] =
  //   useState<Option | null>(null);
  const setAllfilterallcities = useCityStore(
    (state) => state.setAllfilterallcities
  );

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

  const specializationOptions = Array.isArray(specialization)
    ? specialization.map((special: Specialization) => ({
        label: special.name,
        value: special.id,
      }))
    : [];

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
          <Stethoscope size={22} color="#05C1AF" />
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
        text: "PawSmart's AI scan detected an early skin issue in my dog, and the virtual vet consultation made getting expert advice effortless. The Paw Pod readings provide real-time health insights, making pet care easier than he virtual vet consultation made getting expert advice effortlessever. Highly recommend for all pet parents!",
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

  // const plans = [
  //   {
  //     name: 'Basic',
  //     price: '$99',
  //     description: 'For pet parents who need essential AI health scans',
  //     features: [
  //       'AI Quick Scan',
  //       'Pet Health Report',
  //       'Reminders & Notifications',
  //       { missing: 'No vet consultations' },
  //       { missing: 'No emergency support' },
  //     ],
  //   },
  //   {
  //     name: 'StandardStandardStandardStandardStandard',
  //     price: '$199',
  //     description: 'For pet parents who want AI-powered insights + vet support',
  //     popular: true,
  //     features: [
  //       'Everything in Basic Plan',
  //       'AI Advanced Scan',
  //       'Instant Vet Booking',
  //       'Personalized Care Tips',
  //       { missing: 'No emergency support' },
  //     ],
  //   },
  //   {
  //     name: 'Premium',
  //     price: '$399',
  //     description: 'For pet parents who want full AI + vet + emergency care',
  //     features: [
  //       'Everything in Standard Plan',
  //       '24/7 Vet Access',
  //       'Emergency Care Support',
  //       'Advanced Health Monitoring',
  //       'Exclusive Discounts on Pet Products',
  //     ],
  //   },
  // ];

  // const nextSlide = () => setCurrent((current + 1) % reviews.length);
  // const prevSlide = () =>
  //   setCurrent((current - 1 + reviews.length) % reviews.length);

  // const handleSearch = async () => {};

  const Products: Product[] = [
    {
      id: '1',
      name: 'Pedigree Chicken & Vegetables 3Kg - Adult Dog',
      image: petshopproduct,
      onAdd: (product) => alert(`Added ${product.name} to cart`),
    },
    {
      id: '2',
      name: 'SmartphoneSmartphoneSmartphoneSmartphone',
      image: petshopproduct,
      onAdd: (product) => alert(`Added ${product.name} to cart`),
    },
    {
      id: '3',
      name: 'Headphones',
      image: petshopproduct,
      onAdd: (product) => alert(`Added ${product.name} to cart`),
    },
    {
      id: '4',
      name: 'Laptop',
      image: petshopproduct,
      onAdd: (product) => alert(`Added ${product.name} to cart`),
    },
    {
      id: '5',
      name: 'Smartphone',
      image: petshopproduct,
      onAdd: (product) => alert(`Added ${product.name} to cart`),
    },
    {
      id: '6',
      name: 'Smartphone',
      image: petshopproduct,
      onAdd: (product) => alert(`Added ${product.name} to cart`),
    },
    {
      id: '7',
      name: 'Smartphone',
      image: petshopproduct,
      onAdd: (product) => alert(`Added ${product.name} to cart`),
    },
  ];

  console.log('specializationOptions', specializationOptions);

  const fetchData = useCallback(async () => {
    try {
      const specializations = await getAllspecialization(1, 10);
      const cities = await getAllcity(1, 10);

      const doctorFilter = await getDoctorData(1, 10, true);
      console.log('specializations.records', specializations.records);
      console.log('cities,.............', cities);

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

  useEffect(() => {
    if (reviews && reviews.length > 0) {
      const interval = setInterval(() => {
        setCurrent((prev) => (prev + 1) % reviews.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [reviews]);

  const handleSeeAllDoctors = () => {
    const queryString = ' ';
    console.log('Query String:', queryString);
    router.push(`/doctors${queryString ? `?${queryString}` : ''}`);
  };

  return (
    <>
      <main className="bg-white flex flex-col  gap-y-16">
        <div className="flex flex-col items-center justify-between">
          <PetCareSection />
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

        {/* <div className="flex flex-col items-center justify-center max-w-7xl mx-auto space-y-3">
          <h1 className="text-3xl font-bold">Meet Our Specialists</h1>
          <p>Certified Veterinarians Ready to Help You!</p>

          <div className="grid grid-cols-4 gap-10 pt-5 container mx-auto max-w-7xl">
            {[1, 2, 3, 4]?.map((item, key) => (
              <div key={key} className="flex flex-col relative">
                <div className="rounded-t-xl">
                  <Image
                    src={doctor}
                    alt="doctor"
                    className="w-auto h-72  fit-cover"
                    objectFit={'contain'}
                  />
                  <div className="flex flex-row gap-x-2 absolute top-2.5 left-2.5">
                    <h1 className="text-white bg-primary px-2 py-1 text-xs rounded-full">
                      In Person
                    </h1>
                    <h1 className="text-white bg-primary px-2 py-1 text-xs rounded-full">
                      Video
                    </h1>
                    <h1 className="text-white bg-primary px-2 py-1 text-xs rounded-full">
                      Clinic Visit
                    </h1>
                  </div>
                </div>
                <div className="bg-[#E7F3FF] p-3 flex flex-col gap-y-2 rounded-b-xl">
                  <div className="flex flex-row justify-between">
                    <h1 className="font-bold">Dr. Sara Fernando</h1>
                    <div className="flex flex-row gap-x-2 items-center">
                      <StarOff color="#F8B400" size={21} />
                      4.5
                    </div>
                  </div>
                  <h1>Cardiologist</h1>
                  <div className="flex flex-row justify-between items-center">
                    <h1 className="font-bold">LKR 1500.00/h</h1>

                    <button className="bg-primary text-white py-1.5 px-2 rounded-full text-sm">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div> */}

        <div className="flex flex-col mx-auto space-y-3">
          <h1 className="mx-auto text-3xl items-center justify-center font-bold">
            Meet Our Specialists
          </h1>
          <p className="mx-auto items-center justify-center">
            Certified Veterinarians Ready to Help You!
          </p>

          <div className="grid grid-cols-4 gap-10 pt-5 container mx-auto">
            {doctors?.slice(0, 4).map((doctor, key) => (
              <HomeDoctorCard key={key} doctor={doctor} />
            ))}
          </div>
          <div className="flex items-center justify-center pt-8">
            <button
              onClick={handleSeeAllDoctors}
              className="px-4 py-2 text-sm font-normal text-black bg-white border border-primary rounded-md hover:bg-blue-50 transition-colors duration-200"
            >
              See More
            </button>
          </div>
        </div>
        <FeaturesSection />
        <PetCareFeatures />

        <div className="justify-center container mx-auto p-1 align-middle">
          <ProductCategories
            products={Products}
            title="Top Product Categories"
          />
        </div>
        <div className="items-center flex flex-col">
          <h1 className="text-3xl font-bold">How PAW POD Works</h1>
          <p>Paw Pod uses advanced AI to scan symptoms, detect</p>
          <p>risks, and recommend care.</p>

          <div className="flex flex-row items-start gap-12 py-8 container mx-auto">
            <div className="w-1/3">
              <Image
                src={earScanning}
                alt="Ear scanning icon with stylized ear design"
                className="w-full rounded-lg object-cover"
              />
            </div>

            <div className="flex flex-col gap-4 w-2/3">
              <h1 className="text-2xl font-bold text-black">Ear Scanning</h1>
              <p className="text-gray-800 leading-relaxed">
                PawSmart&apos;s advanced AI-powered ear scanning technology helps pet
                owners detect early signs of infections, inflammation, or ear
                mites with just a quick scan. Using cutting-edge image analysis,
                the AI assesses ear health by identifying redness, swelling, wax
                buildup, or abnormal discharge. Integrated with the Paw Pod,
                this feature provides instant insights, guiding pet owners with
                next steps—whether it&apos;s a home remedy or a virtual vet
                consultation. Stay ahead of potential ear problems and ensure
                your pet&apos;s comfort with fast, accurate, and stress-free AI
                diagnostics!{' '}
                <a href="#" className="text-purple-500 font-semibold">
                  Learn more
                </a>
              </p>
              <div>
                <button className="text-white py-3 px-6 rounded-lg flex items-center bg-primary w-fit">
                  Book a Demo
                </button>
              </div>
            </div>
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
          <div className="flex flex-row items-center mx-auto max-w-7xl justify-center w-full">
            {reviews.map((review, index) => (
              <div
                key={review.id}
                className={`transition-opacity duration-500 w-full ${
                  index === current ? 'opacity-100' : 'opacity-0 hidden'
                }`}
              >
                <div className="flex flex-row items-center gap-4 w-full">
                  <div className="flex-1 w-full items-end justify-end">
                    <Image
                      src={review.image}
                      alt="Pet and Owner"
                      width={600}
                      height={600}
                      className="rounded-lg object-cover"
                    />
                  </div>
                  <div className="flex-1 w-full">
                    <div className="flex text-yellow-400 mb-2">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} />
                      ))}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      {review.title}
                    </h3>
                    <p className="text-gray-700 mb-4 w-xl space-y-1">
                      {review.text}
                    </p>
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

        {/* <div className=" items-center justify-center max-w-7xl flex flex-col space-y-3"> */}

        {/* <div>
          <HeroSection />
        </div> */}
      </main>
    </>
  );
}
