import React from 'react';
import { Button } from './ui/button';
import Image, { StaticImageData } from 'next/image';
import { COLORS } from '@/app/constants/color';
import { Card, CardContent } from './ui/card';

interface Cate {
  id: number;
  name: string;
  image: StaticImageData;
  alt: string;
}

interface CategoryGridProps {
  categories: Cate[];
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ categories }) => {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Top Categories
          </h2>
          <p className="text-gray-600 mt-1">
            Browse our categories and save in BULK! with group buy here
          </p>
        </div>
        <Button
          variant="default"
          className={`${COLORS.bgGreen} ${COLORS.hoverdarkGreen} text-white rounded-full px-6`}
        >
          Shop more
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {categories.map((category) => (
          <Card
            key={category.id}
            className="group cursor-pointer hover:shadow-lg transition-shadow duration-200"
          >
            <CardContent className="p-3">
              <div className="aspect-square relative mb-2 overflow-hidden rounded-lg">
                <div className="aspect-square relative mb-2 overflow-hidden rounded-lg">
                  <Image
                    src={category.image}
                    alt={category.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
              </div>
              <h3 className="text-sm font-medium text-center text-gray-700">
                {category.name}
              </h3>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;
