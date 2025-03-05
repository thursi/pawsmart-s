// import React, { useState } from 'react';
// import { ChevronRight } from 'lucide-react';

// const PetCareInsights = () => {
//   const [selectedCategory, setSelectedCategory] = useState('Respiratory symptoms');

//   const articles = [
//     {
//       id: 1,
//       title: 'Understanding Respiratory Problems',
//       desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate tincto et velit interdum, ac aliquet odio mattis.',
//       date: '16/02/2023',
//       author: 'Simin Read',
//       category: 'Respiratory symptoms'
//     },
//     {
//       id: 2,
//       title: 'Common Coughing Issues in Pets',
//       desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate tincto et velit interdum, ac aliquet odio mattis.',
//       date: '16/02/2023',
//       author: 'Simin Read',
//       category: 'Coughing in Pets'
//     },
//     {
//       id: 3,
//       title: 'Managing Pet Skin Allergies',
//       desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate tincto et velit interdum, ac aliquet odio mattis.',
//       date: '16/02/2023',
//       author: 'Simin Read',
//       category: 'Skin Allergies'
//     },
//     {
//       id: 4,
//       title: 'Pet Digestive Health Guide',
//       desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate tincto et velit interdum, ac aliquet odio mattis.',
//       date: '16/02/2023',
//       author: 'Simin Read',
//       category: 'Digestive Issues'
//     },
//     {
//       id: 5,
//       title: 'Essential Pet Vaccinations',
//       desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate tincto et velit interdum, ac aliquet odio mattis.',
//       date: '16/02/2023',
//       author: 'Simin Read',
//       category: 'Common Vaccinations'
//     },
//     {
//       id: 6,
//       title: 'Proper Pet Nutrition Guide',
//       desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate tincto et velit interdum, ac aliquet odio mattis.',
//       date: '16/02/2023',
//       author: 'Simin Read',
//       category: 'Pet Nutrition'
//     }
//   ];

//   const suggestions = [
//     'Respiratory symptoms',
//     'Coughing in Pets',
//     'Skin Allergies',
//     'Digestive Issues',
//     'Common Vaccinations',
//     'Pet Nutrition',
//   ];

//   const filteredArticles = selectedCategory
//     ? articles.filter(article => article.category === selectedCategory)
//     : articles;

//   return (
//     <div className="bg-purple-950 text-white w-full p-16">
//       <div className="flex justify-between items-center mb-8">
//         <div>
//           <h1 className="text-2xl font-bold">Expert Pet Care Insights</h1>
//           <p className="text-sm mt-1 opacity-80">
//             Your Go-To Resource for Trusted Veterinary Advice and Tips
//           </p>
//         </div>
//         <button className="bg-purple-800/50 hover:bg-purple-800 text-xs px-3 py-1 rounded">
//           View All
//         </button>
//       </div>
//       <div className="container mx-auto py-6 flex flex-col md:flex-row gap-8">
//         <div className="w-full md:w-1/4">
//           <div className="mb-16">
//             <div className="grid grid-cols-1 gap-2">
//               {suggestions.map((suggestion, index) => (
//                 <div
//                   key={index}
//                   onClick={() => setSelectedCategory(suggestion)}
//                   className={`bg-purple-900 bg-opacity-50 py-2 px-3 rounded-md text-sm cursor-pointer hover:bg-purple-800/50
//                     ${selectedCategory === suggestion ? 'bg-purple-700' : ''}`}
//                 >
//                   {suggestion}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="flex-1 space-y-8">
//           {filteredArticles.map((article) => (
//             <div
//               key={article.id}
//               className="flex flex-col md:flex-row gap-4 border-b border-purple-800/50 pb-8"
//             >
//               <div className="min-w-36">
//                 <div className="flex flex-col">
//                   <span className="text-xs font-medium">{article.author}</span>
//                   <span className="text-xs opacity-70">{article.date}</span>
//                 </div>
//               </div>

//               <div className="flex-1">
//                 <h2 className="text-xl font-semibold">{article.title}</h2>
//                 <p className="text-sm text-gray-300 my-2">{article.desc}</p>
//                 <div className="flex justify-end">
//                   <button className="text-xs flex items-center gap-1 text-blue-400 hover:text-blue-300">
//                     Learn More
//                     <ChevronRight size={14} />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PetCareInsights;

import { useState } from 'react';
import { ArrowRightIcon, ChevronRight } from 'lucide-react';

const PetCareInsights = () => {
  const [selectedCategory, setSelectedCategory] = useState<
    | 'Respiratory symptoms'
    | 'Coughing in Pets'
    | 'Skin Allergies'
    | 'Digestive Issues'
    | 'Common Vaccinations'
    | 'Pet Nutrition'
  >('Respiratory symptoms');

  // Articles grouped by category
  const articlesByCategory: {
    'Respiratory symptoms': {
      id: number;
      title: string;
      desc: string;
      date: string;
      author: string;
    }[];
    'Coughing in Pets': {
      id: number;
      title: string;
      desc: string;
      date: string;
      author: string;
    }[];
    'Skin Allergies': {
      id: number;
      title: string;
      desc: string;
      date: string;
      author: string;
    }[];
    'Digestive Issues': {
      id: number;
      title: string;
      desc: string;
      date: string;
      author: string;
    }[];
    'Common Vaccinations': {
      id: number;
      title: string;
      desc: string;
      date: string;
      author: string;
    }[];
    'Pet Nutrition': {
      id: number;
      title: string;
      desc: string;
      date: string;
      author: string;
    }[];
  } = {
    'Respiratory symptoms': [
      {
        id: 1,
        title: 'Understanding Respiratory Problems',
        desc: 'Learn about common respiratory issues affecting pets and how to manage them effectively.',
        date: '16/02/2023',
        author: 'Simin Read',
      },
      {
        id: 7,
        title: 'How to Handle Pet Coughs and Sneezes',
        desc: 'What to do when your pet is sneezing or coughing frequently.',
        date: '17/02/2023',
        author: 'Alex Morgan',
      },
    ],
    'Coughing in Pets': [
      {
        id: 2,
        title: 'Common Coughing Issues in Pets',
        desc: 'A deep dive into why pets develop persistent coughs and possible treatments.',
        date: '16/02/2023',
        author: 'Simin Read',
      },
      {
        id: 7,
        title: 'How to Handle Pet Coughs and Sneezes',
        desc: 'What to do when your pet is sneezing or coughing frequently.',
        date: '17/02/2023',
        author: 'Alex Morgan',
      },
    ],
    'Skin Allergies': [
      {
        id: 3,
        title: 'Managing Pet Skin Allergies',
        desc: 'Identify skin allergies in pets and effective ways to treat them.',
        date: '16/02/2023',
        author: 'Simin Read',
      },
    ],
    'Digestive Issues': [
      {
        id: 4,
        title: 'Pet Digestive Health Guide',
        desc: 'Tips to maintain a healthy digestive system for your pet.',
        date: '16/02/2023',
        author: 'Simin Read',
      },
    ],
    'Common Vaccinations': [
      {
        id: 5,
        title: 'Essential Pet Vaccinations',
        desc: 'A breakdown of the most important vaccinations for pets.',
        date: '16/02/2023',
        author: 'Simin Read',
      },
    ],
    'Pet Nutrition': [
      {
        id: 6,
        title: 'Proper Pet Nutrition Guide',
        desc: 'How to create a balanced diet for your pet to keep them healthy.',
        date: '16/02/2023',
        author: 'Simin Read',
      },
    ],
  };

  // Suggestions should be explicitly typed as the allowed categories
  const suggestions: (
    | 'Respiratory symptoms'
    | 'Coughing in Pets'
    | 'Skin Allergies'
    | 'Digestive Issues'
    | 'Common Vaccinations'
    | 'Pet Nutrition'
  )[] = [
    'Respiratory symptoms',
    'Coughing in Pets',
    'Skin Allergies',
    'Digestive Issues',
    'Common Vaccinations',
    'Pet Nutrition',
  ];


  const filteredArticles = articlesByCategory[selectedCategory] || [];

  return (
    // <div className="bg-purple-950 text-white w-full p-16">
    //   <div className="mx-auto pr-36 pl-36  max-w-full">
    <div className="bg-purple-950 text-white w-full p-16">
    <div className="mx-auto max-w-screen-2xl ">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">Expert Pet Care Insights</h1>
            <p className="text-sm mt-1 opacity-80">
              Your Go-To Resource for Trusted Veterinary Advice and Tips
            </p>
          </div>
          <button className="bg-purple-800/50 hover:bg-purple-800 text-xs px-3 py-1 rounded">
            View All
          </button>
        </div>
        <div className="mx-auto py-6 flex flex-col md:flex-row gap-10">
          <div className="w-full md:w-1/4">
            <div className="mb-16">
              <div className="grid grid-cols-1 gap-4">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedCategory(suggestion)}
                    className={`bg-purple-900 bg-opacity-50 py-4 px-3 flex rounded-md justify-between text-sm cursor-pointer hover:bg-white hover:text-black
              ${selectedCategory === suggestion ? 'bg-purple-700' : ''}`}
                    style={{ minHeight: '50px' }}
                  >
                    {suggestion}
                    
                    <ArrowRightIcon size={20} color="#fff" />
                  </div>
                ))}
              </div>
            </div>
          </div>


          <div className="flex-1 space-y-8">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article) => (
                <div
                  key={article.id}
                  className="flex flex-col md:flex-row gap-4 border-b border-purple-800/50 pb-8"
                >
                  <div className="min-w-36">
                    <div className="flex flex-col">
                      <span className="text-xs font-medium">
                        {article.author}
                      </span>
                      <span className="text-xs opacity-70">{article.date}</span>
                    </div>
                  </div>

                  <div className="flex-1">
                    <h2 className="text-xl font-semibold">{article.title}</h2>
                    <p className="text-sm text-gray-300 my-2">{article.desc}</p>
                    <div className="flex justify-end">
                      <button className="text-xs flex items-center gap-1 text-blue-400 hover:text-blue-300">
                        Learn More
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400">
                No articles found for this category.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetCareInsights;
