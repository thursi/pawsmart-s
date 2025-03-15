import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import Image from 'next/image';
import Logo from '../../../public/images/logopawsmart.png';
import PlayStore from '../../../public/images/playstore.png';
import AppStore from '../../../public/images/appstore.png';


const ModernFooter = () => {
  const navigation = {
    solutions: [
      { name: 'For pet parents', href: '#' },
      { name: 'For vets & techs', href: '#' },
      { name: 'For HR & employers', href: '#' },
      { name: 'For pet insurers', href: '#' },
      { name: 'For vet clinics', href: '#' },
    ],
    about: [
      { name: 'About us', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Offers', href: '#' },
      { name: 'Pet Connection', href: '#' },
      { name: 'Pet health conditions', href: '#' },
      { name: 'Pet health symptoms', href: '#' },
      { name: 'Reviews', href: '#' },
    ],
    support: [
      { name: 'Customer support', href: '#' },
      { name: 'Platform status', href: '#' },
      { name: 'Refer a friend', href: '#' },
      { name: 'Gift cards', href: '#' },
      { name: 'Affiliates', href: '#' },
    ],
    more: [
      { name: 'Press & media', href: '#' },
      { name: 'Privacy', href: '#' },
      { name: 'Terms', href: '#' },
      { name: 'CCPA', href: '#' },
    ],
  };

  const legalLinks = [
    { name: 'Terms & Conditions', href: '#' },
    { name: 'Privacy Policy', href: '#' },
    { name: 'Code of Conduct', href: '#' },
    { name: 'Accessibility', href: '#' },
    { name: 'Security', href: '#' },
    { name: 'Pricing', href: '#' },
  ];

  return (
    <footer className={`text-white flex flex-col gap-3 p-3 mt-10 bg-[#f5e9ff]`}>
      <div className="flex flex-row gap-3 flex-wrap md:flex-nowrap">
        <div className="basis-full md:basis-1/4 rounded-lg p-6 md:p-6 bg-black flex flex-col gap-y-5">
          <Image
            src={Logo}
            alt="pawsmart logo"
            className="w-auto h-9 object-contain self-start"
          />

          <h1 className="font-semibold text-xl md:text-2xl">
            Subscribe now & get exclusive early access!
          </h1>

          <div className="flex flex-row gap-x-2">
            <div className="border border-white rounded-xl p-4 basis-full">
              <input
                placeholder="Email Address"
                className="bg-transparent outline-none w-full"
              />
            </div>
            <button className="bg-primary rounded-xl p-5 basis-auto whitespace-nowrap">
              Subscribe
            </button>
          </div>


          <div className="flex flex-row gap-x-4">
                <button className="hover:opacity-80 transition">
                  <Facebook size={28} color="#fff" />
                </button>
                <button className="hover:opacity-80 transition">
                  <Twitter size={28} color="#fff" />
                </button>
                <button className="hover:opacity-80 transition">
                  <Instagram size={28} color="#fff" />
                </button>
                <button className="hover:opacity-80 transition">
                  <Linkedin size={28} color="#fff" />
                </button>
              </div>
        </div>

        <div className="basis-full md:basis-3/4 rounded-lg p-6 md:p-10 bg-black">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col gap-y-3">
              <h2 className="font-bold text-lg md:text-xl uppercase">
                Solutions
              </h2>
              <ul className="flex flex-col gap-y-2">
                {navigation.solutions.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="hover:text-primary transition ease-in text-sm md:text-base"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-y-3">
              <h2 className="font-bold text-lg md:text-xl uppercase">
                About PawSmart
              </h2>
              <ul className="flex flex-col gap-y-2">
                {navigation.about.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="hover:text-primary transition ease-in text-sm md:text-base"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-y-3">
              <h2 className="font-bold text-lg md:text-xl uppercase">
                Support
              </h2>
              <ul className="flex flex-col gap-y-2">
                {navigation.support.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="hover:text-primary transition ease-in text-sm md:text-base"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-y-3">
              <h2 className="font-bold text-lg md:text-xl uppercase">More</h2>
              <ul className="flex flex-col gap-y-2">
                {navigation.more.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="hover:text-primary transition ease-in text-sm md:text-base"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>

            </div>
          </div>
          <div className='mt-10'>
            <h1 className=' font-semibold'>Contact us</h1>
            <div className=" flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-sm md:text-base">
                  Email: woofsandmeows@pawsmart.ai
                </p>
                <p className="text-sm md:text-base">Phone: +1 647-684-4584</p>
              </div>

              <div className="flex flex-row gap-x-4">
              <Image
                  src={AppStore}
                  alt="Apple App Store"
                  className="w-auto h-14 object-contain"
                />
                    <Image
                  src={PlayStore}
                  alt="Google Play Store"
                  className="w-auto h-14 object-contain"
                />
           
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black rounded-lg p-4 text-center text-sm">
        <p className="mb-2">© 2025 PawSmart Inc. All rights reserved.</p>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
          {legalLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-primary transition ease-in"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default ModernFooter;
