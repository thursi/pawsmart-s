import React from 'react';
import { Card, CardContent } from './ui/card';
interface Stat {
  icon: React.ElementType; 
  color: string;
  value: string | number; 
  title: string;
}

interface StatsCardsProps {
  stats: Stat[]; 
}

const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  return (
    <div className="w-full max-w-5xl mx-auto p-2">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-white rounded-lg shadow-md">
            <CardContent className="p-4">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-full bg-purple-50">
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className="space-y-2">
                  <h2 className="text-4xl font-bold text-purple-600">
                    {stat.value}
                  </h2>
                  <p className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StatsCards;
