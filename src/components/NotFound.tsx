import React from 'react';
import { UserX } from 'lucide-react';

interface NotFoundProps {
  name?: string; 
}

const NotFound: React.FC<NotFoundProps> = ({ name }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center rounded-sm p-8">
      <UserX size={48} className="text-gray-400 mb-4" />
      <h3 className="text-xl font-semibold text-gray-700 mb-2">{name} not found</h3>
      {/* <p className="text-gray-500">The doctor you're looking for is currently unavailable or doesn't exist in our system.</p> */}
    </div>
  );
};

export default NotFound;