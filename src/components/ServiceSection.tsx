// import React from 'react';
// import { PlusCircle, Heart, Check } from 'lucide-react';

// const ServiceSection = ({
//   title = "Real care, real results",
//   description = "Vetster veterinarians can provide helpful advice for thousands of issues.",
//   primaryButtonText = "Talk to a vet",
//   secondaryButtonText = "Discover the Pet Connection",
//   onPrimaryButtonClick = () => {},
//   onSecondaryButtonClick = () => {},
//   stats = [
//     { 
//       icon: <Heart className="text-pink-500 mb-4" size={32} />,
//       value: "1000's",
//       description: "of ailments treated"
//     },
//     {
//       icon: <Check className="text-blue-500 mb-4" size={32} />,
//       value: "97%",
//       description: "resolution rate"
//     },
//     {
//       icon: (
//         <div className="text-blue-300 mb-4">
//           <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//             <path d="M10 5.172C10 3.12 8.21 1.55 6.17 1.95a4.001 4.001 0 0 0-2.89 4.9c.42 1.33 1.4 3.45 4.72 4.45v2.37c0 1.13.6 2.18 1.57 2.75l.63.37c.4.23.87.35 1.33.35.87 0 1.71-.37 2.3-1.02l2.33-2.58c.48-.53.43-1.34-.12-1.8a1.34 1.34 0 0 0-1.8.12l-2.17 2.28]"></path>
//             <path d="M16 18a4 4 0 0 0-4 4M12 22h8M19 15v7"></path>
//           </svg>
//         </div>
//       ),
//       value: "20+",
//       description: "species treated"
//     }
//   ],
//   services = [
//     { title: "Respiratory symptoms" },
//     { title: "Quality of life assessment" },
//     { title: "Dental/mouth health", expandable: true },
//     { title: "Lumps & bumps" },
//     { title: "Wound care", expandable: true },
//     { title: "Allergy management", expandable: true },
//     { title: "Changes in appetite/drinking" },
//     { title: "Arthritis & mobility", expandable: true },
//     { title: "Skin & ear problems", expandable: true },
//     { title: "Reproductive health" },
//     { title: "Chronic disease management" },
//   ],
//   onServiceClick = (service:any) => {},
//   backgroundColor = "bg-gray-900",
//   textColor = "text-white",
//   primaryButtonColor = "bg-pink-500 hover:bg-pink-600",
//   secondaryButtonColor = "bg-white hover:bg-gray-100 text-gray-800",
//   serviceCardColor = "bg-gray-800 hover:bg-gray-700"
// }) => {
//   return (
//     <div className={`${backgroundColor} ${textColor} p-6 md:p-12 flex flex-col items-center justify-center max-w-7xl`}>
   
//       <div className="text-center mb-8">
//         <h2 className="text-3xl font-bold mb-4">{title}</h2>
//         <p className="text-lg">{description}</p>
//       </div>
      

//       <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
//         <button 
//           className={`${primaryButtonColor} text-white font-semibold py-2 px-6 rounded-full`}
//           onClick={onPrimaryButtonClick}
//         >
//           {primaryButtonText}
//         </button>
//         <button 
//           className={`${secondaryButtonColor} font-semibold py-2 px-6 rounded-full`}
//           onClick={onSecondaryButtonClick}
//         >
//           {secondaryButtonText}
//         </button>
//       </div>
      
 
//       <div className="flex flex-col sm:flex-row justify-center sm:space-x-16 space-y-8 sm:space-y-0 mb-12 w-full max-w-4xl">
//         {stats.map((stat, index) => (
//           <div key={index} className="flex flex-col items-center">
//             {stat.icon}
//             <h3 className="text-2xl font-bold mb-2">{stat.value}</h3>
//             <p className="text-sm text-gray-400">{stat.description}</p>
//           </div>
//         ))}
//       </div>
      
  
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
//         {services.map((service, index) => (
//           <div 
//             key={index}
//             className={`${serviceCardColor} rounded-md p-4 flex justify-between items-center cursor-pointer transition-colors`}
//             onClick={() => onServiceClick(service)}
//           >
//             <span>{service.title}</span>
//             {service.expandable && <PlusCircle size={20} className="text-gray-400" />}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ServiceSection;



import React from 'react';
import { PlusCircle, Heart, Check } from 'lucide-react';

// Define the type for service
interface Service {
  title: string;
  expandable?: boolean;
}

interface ServiceSectionProps {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryButtonClick?: () => void;
  onSecondaryButtonClick?: () => void;
  stats?: {
    icon: React.ReactNode;
    value: string;
    description: string;
  }[];
  services: Service[];
  onServiceClick?: (service: Service) => void;
  backgroundColor?: string;
  textColor?: string;
  primaryButtonColor?: string;
  secondaryButtonColor?: string;
  serviceCardColor?: string;
}

const ServiceSection: React.FC<ServiceSectionProps> = ({
  title = "Real care, real results",
  description = "Vetster veterinarians can provide helpful advice for thousands of issues.",
  primaryButtonText = "Talk to a vet",
  secondaryButtonText = "Discover the Pet Connection",
  onPrimaryButtonClick = () => {},
  onSecondaryButtonClick = () => {},
  stats = [
    { 
      icon: <Heart className="text-pink-500 mb-4" size={32} />,
      value: "1000's",
      description: "of ailments treated"
    },
    {
      icon: <Check className="text-blue-500 mb-4" size={32} />,
      value: "97%",
      description: "resolution rate"
    },
    {
      icon: (
        <div className="text-blue-300 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 5.172C10 3.12 8.21 1.55 6.17 1.95a4.001 4.001 0 0 0-2.89 4.9c.42 1.33 1.4 3.45 4.72 4.45v2.37c0 1.13.6 2.18 1.57 2.75l.63.37c.4.23.87.35 1.33.35.87 0 1.71-.37 2.3-1.02l2.33-2.58c.48-.53.43-1.34-.12-1.8a1.34 1.34 0 0 0-1.8.12l-2.17 2.28"></path>
            <path d="M16 18a4 4 0 0 0-4 4M12 22h8M19 15v7"></path>
          </svg>
        </div>
      ),
      value: "20+",
      description: "species treated"
    }
  ],
  services = [
    { title: "Respiratory symptoms" },
    { title: "Quality of life assessment" },
    { title: "Dental/mouth health", expandable: true },
    { title: "Lumps & bumps" },
    { title: "Wound care", expandable: true },
    { title: "Allergy management", expandable: true },
    { title: "Changes in appetite/drinking" },
    { title: "Arthritis & mobility", expandable: true },
    { title: "Skin & ear problems", expandable: true },
    { title: "Reproductive health" },
    { title: "Chronic disease management" },
  ],
  onServiceClick = (service: Service) => {
    // Handle service click here
    console.log(service);
  },
  backgroundColor = "bg-gray-900",
  textColor = "text-white",
  primaryButtonColor = "bg-pink-500 hover:bg-pink-600",
  secondaryButtonColor = "bg-white hover:bg-gray-100 text-gray-800",
  serviceCardColor = "bg-gray-800 hover:bg-gray-700"
}) => {
  return (
    <div className={`${backgroundColor} ${textColor} p-6 md:p-12 flex flex-col items-center justify-center max-w-7xl`}>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="text-lg">{description}</p>
      </div>

      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
        <button
          className={`${primaryButtonColor} text-white font-semibold py-2 px-6 rounded-full`}
          onClick={onPrimaryButtonClick}
        >
          {primaryButtonText}
        </button>
        <button
          className={`${secondaryButtonColor} font-semibold py-2 px-6 rounded-full`}
          onClick={onSecondaryButtonClick}
        >
          {secondaryButtonText}
        </button>
      </div>

      <div className="flex flex-col sm:flex-row justify-center sm:space-x-16 space-y-8 sm:space-y-0 mb-12 w-full max-w-4xl">
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col items-center">
            {stat.icon}
            <h3 className="text-2xl font-bold mb-2">{stat.value}</h3>
            <p className="text-sm text-gray-400">{stat.description}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
        {services.map((service, index) => (
          <div
            key={index}
            className={`${serviceCardColor} rounded-md p-4 flex justify-between items-center cursor-pointer transition-colors`}
            onClick={() => onServiceClick(service)}
          >
            <span>{service.title}</span>
            {service.expandable && <PlusCircle size={20} className="text-gray-400" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceSection;
