import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';

const Details = () => {
  const location = useLocation();
  
  const { image, title, price, category, description } = location.state || {}; 

  return (
    <>
    <Navbar />
    <div className="container mx-auto py-10">
      <div className="flex flex-col md:flex-row items-center md:items-start bg-white p-6 rounded-lg shadow-lg">
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          {image ? (
            <img className="w-48 h-auto mx-auto rounded-lg" src={image} alt={title} />
          ) : (
            <p className="text-center text-gray-500">No image available</p>
          )}
        </div>
        
        <div className="w-full md:w-2/3 md:pl-8">
          {price && <h1 className="text-4xl font-bold text-gray-900 mb-4">${price}</h1>}
          
          {category && (
            <h2 className="text-xl font-medium text-gray-700 mb-2">
              <span className="font-semibold">Category:</span> {category}
            </h2>
          )}
          
          {title && (
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              <span className="font-semibold">Title:</span> {title}
            </h3>
          )}
          
          {description && (
            <p className="text-lg text-gray-600">
              <span className="font-semibold">Description:</span> {description}
            </p>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default Details;
