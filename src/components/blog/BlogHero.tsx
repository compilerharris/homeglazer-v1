import React from 'react';

const BlogHero: React.FC = () => {
  return (
    <section className="relative bg-cover bg-center h-[500px] w-full flex items-center justify-center overflow-hidden">
      {/* Overlay with semi-transparent background */}
      <div className="absolute inset-0 bg-black bg-opacity-75 z-1"></div>
      
      {/* Background image */}
      <img 
        src="https://images.unsplash.com/photo-1606744824163-985d376605aa?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=80" 
        alt="Elegant Living Room Interior"
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Content */}
      <div className="container mx-auto px-4 z-10 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
          Painting Blogs
        </h1>
        <p className="text-xl md:text-2xl text-white max-w-2xl mx-auto drop-shadow-md">
          Stay updated with the latest trends, tips, and insights about home painting and decoration.
          Our experts share their knowledge to help you make informed decisions for your space.
        </p>
      </div>
    </section>
  );
};

export default BlogHero; 