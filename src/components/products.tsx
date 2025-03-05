import Image from 'next/image';
import React from 'react';
import { StaticImageData } from 'next/image';

type ProductData = Omit<Product, 'onAdd'>;
interface Product {
  id: string;
  name: string;
  image: string | StaticImageData;
  badge?: string;
  onAdd?: (product: ProductData) => void;
}

interface ProductCategoriesProps {
  products: Product[];
  title?: string;
}

const ProductCategories: React.FC<ProductCategoriesProps> = ({
  products = [],
  title = 'Top Product Categories',
}) => {
  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4">{title}</h2>

      <div className="flex overflow-x-auto gap-6 pb-2=">
        {products.map(({ id, name, image, badge, onAdd }) => (
          <div key={id} className="flex-shrink-0 w-48">
            <div className="bg-gray-100 rounded-md p-4 flex flex-col items-center relative">
              {badge && (
                <div
                  className={`absolute top-2 right-2 text-xs text-white py-1 px-2 rounded ${
                    badge === 'Sale' ? 'bg-purple-400' : 'bg-blue-500'
                  }`}
                >
                  {badge}
                </div>
              )}

              <div className="mb-4 relative w-full h-48 flex items-center justify-center">
                <div>
                <Image
                  src={image}
                  alt={name}
                  className="max-h-full max-w-full object-contain"
                  width={200}
                  height={200}
                />
                </div>
                <button
                  className="absolute bottom-0 right-0 bg-gray-200 text-black font-bold w-7 h-7 rounded-full flex items-center justify-center shadow-md hover:bg-gray-100"
                  onClick={() => onAdd && onAdd({ id, name, image, badge })}
                >
                 <b className='font-bold text-xl'>+</b> 
                </button>
              </div>
            </div>
            <h3 className="text-xs text-start font-medium mt-2 w-32 break-words">
              {name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCategories;
