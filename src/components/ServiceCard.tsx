import { COLORS } from '@/app/constants/color';
import React from 'react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  isMain?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  subtitle,
  isMain,
}) => {
  return (
    <div
      className={`
      flex items-start justify-between gap-4 rounded-xl drop-shadow-md max-w-7xl shadow-sm hover:shadow-md transition-all
      ${isMain ? `${COLORS.bgPurple}` : 'bg-white'}
    `}
    >
      <div className="flex items-start gap-4 pt-14 pb-14 pr-8 pl-4 flex-grow">
        <div className="flex-shrink-0">{icon}</div>
        <div>
          <h3
            className={`font-bold mb-1 text-base ${isMain ? 'text-white' : 'text-black'}`}
          >
            {title}
          </h3>
          <p
            className={`text-sm font-normal ${
              isMain ? 'text-blue-100/80' : 'text-black'
            }`}
          >
            {subtitle}
          </p>
        </div>
      </div>
      
    </div>
  );
};

export default ServiceCard;
