import React from 'react';
import Image, { StaticImageData } from 'next/image';
import styles from './InfiniteScrollPartners.module.css'; // Ensure the correct path to the CSS module

interface Partner {
  name: string;
  image: StaticImageData;
  alt: string;
}

interface InfiniteScrollPartnersProps {
  partners: Partner[];
}

const InfiniteScrollPartners: React.FC<InfiniteScrollPartnersProps> = ({
  partners,
}) => {
  return (
    <div className=" overflow-hidden max-w-full bg-white">
      <div className="max-w-full mx-auto relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10"></div>

        <div className="relative flex overflow-hidden">
          <div
            className={`flex shrink-0 items-center ${styles.animateScrollRtl}`}
          >
            {partners.map((partner: Partner) => (
              <div
                key={`${partner.name}-1`}
                className="flex-shrink-0 w-32 mx-6 transition-transform hover:scale-110 duration-300"
              >
                <Image
                  src={partner.image}
                  alt={partner.alt}
                  className="w-full h-auto object-contain"
                  priority
                />
              </div>
            ))}
          </div>

          <div
            className={`flex shrink-0 items-center ${styles.animateScrollRtl}`}
          >
            {partners.map((partner: Partner) => (
              <div
                key={`${partner.name}-2`}
                className="flex-shrink-0 w-32 mx-6 transition-transform hover:scale-110 duration-300"
              >
                <Image
                  src={partner.image}
                  alt={partner.alt}
                  className="w-full h-auto object-contain"
                  priority
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfiniteScrollPartners;
