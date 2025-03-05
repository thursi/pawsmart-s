import React from 'react';
import { Check } from 'lucide-react';
// import Loader from '../Loader';
import { Button } from './ui/button';

interface PSuccessModalProps {
  loading: string;
  successMessage: string | null;
  link?: string;
  handleClick?:  () => void;
}

const SuccessModal: React.FC<PSuccessModalProps> = ({
  loading,
  successMessage,
  handleClick,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="flex flex-col items-center bg-slate-50 rounded-lg shadow-lg p-10 w-full max-w-3xl mx-auto md:w-2/3 lg:w-1/2">
        {loading ? (
          <div className="flex items-center justify-center p-10">
          </div>
        ) : (
          <>
            <div className="relative mb-6">
              <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="text-white" size={48} />
              </div>
              <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-1 left-2 w-2 h-2 bg-blue-400 rounded-full" />
                <div className="absolute top-3 right-0 w-4 h-1 bg-purple-400 rounded-full transform rotate-45" />
                <div className="absolute bottom-2 left-0 w-3 h-3 bg-red-400 rounded-full" />
              </div>
            </div>

            {/* <div className="relative">
            <div className="absolute top-0 right-0 w-full h-full">
                <div className="absolute top-1 right-2 w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
                <div className="absolute top-3 right-0 w-4 h-1 bg-purple-400 rounded-full transform rotate-70 animate-pulse" />
                <div className="absolute bottom-2 right-0 w-3 h-3 bg-red-400 rounded-full animate-pulse" />
              </div>
            </div> */}
            <h2 className="text-3xl font-bold mb-4 text-center">
              Successfully
            </h2>
            <p className="text-gray-600 text-center mb-6">
              {successMessage || 'Operation completed successfully!'}
            </p>

            <Button
              className="bg-green-500 text-white px-12 py-3 rounded-md hover:bg-green-600 transition-colors cursor-pointer"
              onClick={handleClick}
            >
              OK
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default SuccessModal;
