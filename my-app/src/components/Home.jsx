import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ products, search, menu }) => {
  const handleImageScroll = () => {
    
  };

  
  const filteredProducts = products?.filter((product) => {
    const title = product.title?.toLowerCase() || ''; 
    const searchFilter = search ? title.includes(search.toLowerCase()) : true;
    const menuFilter = menu ? title.includes(menu.toLowerCase()) : true;

    return searchFilter && menuFilter; 
  });

  return (
    <div className='grid grid-cols-4 p-5'>
      {filteredProducts.map((product, index) => (
        <Link to="/details" key={index} state={product}>
          <div className='border border-spacing-1 p-2 ml-3 mt-3'>
            <img
              src={product.image}
              alt={product.title || 'Product Image'}
              className='w-60 h-48'
              onScroll={handleImageScroll} 
            />
            <h1 className='font-bold text-xl'>${product.price}</h1>
            <h1>{product.title}</h1>
            <h1>{product.category}</h1>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Home;
