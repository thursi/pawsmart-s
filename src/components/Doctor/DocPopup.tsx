import React, { JSX } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react';

type NotificationType = 'success' | 'error' | 'warning' | 'info';

interface NotificationProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  type?: NotificationType;
  buttonText?: string;
}

const NotificationComponent: React.FC<NotificationProps> = ({
  isOpen,
  onClose,
  title = 'Success',
  message = 'Operation completed successfully',
  type = 'success',
  buttonText = 'Done',
}) => {
  if (!isOpen) return null;

  const icons: Record<NotificationType, JSX.Element> = {
    success: <CheckCircle className="w-6 h-6 text-teal-600" />,
    error: <XCircle className="w-6 h-6 text-red-600" />,
    warning: <AlertCircle className="w-6 h-6 text-amber-600" />,
    info: <Info className="w-6 h-6 text-blue-600" />
  };

  const buttonStyles: Record<NotificationType, string> = {
    success: 'bg-teal-600 hover:bg-teal-700 text-white',
    error: 'bg-red-600 hover:bg-red-700 text-white',
    warning: 'bg-amber-600 hover:bg-amber-700 text-white',
    info: 'bg-blue-600 hover:bg-blue-700 text-white'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <Card className="max-w-sm p-6 mx-auto text-center bg-white shadow-xl">
        <div className="space-y-4">
          <div className="flex items-center justify-center mb-2">
            {icons[type]}
          </div>
          
          <h2 className="text-xl font-semibold">
            {title}
          </h2>
          
          <p className="text-sm text-gray-600">
            {message}
          </p>
          
          <Button 
            className={`w-full ${buttonStyles[type]}`}
            onClick={onClose}
          >
            {buttonText}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default NotificationComponent;