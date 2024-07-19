import React, { useState } from 'react';
import SampleImage from '../assets/SampleImage.webp';

function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    SampleImage,
    SampleImage,
    SampleImage,
    SampleImage,
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className='relative w-5/6 mx-auto'>
      <div className='flex overflow-hidden'>
        <div
          className='flex transition-transform duration-1000 gap-10'
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className=' bg-cover w-[300px] h-[300px] bg-center rounded-3xl'
              style={{ backgroundImage: `url(${image})` }}
            ></div>
          ))}
        </div>
        <div
          className='flex transition-transform duration-1000 gap-10'
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className=' bg-cover w-[300px] h-[300px] bg-center rounded-3xl'
              style={{ backgroundImage: `url(${image})` }}
            ></div>
          ))}
        </div>
      </div>

      <button
        onClick={prevSlide}
        className='absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full'
      >
        &lt;
      </button>
      <button
        onClick={nextSlide}
        className='absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full'
      >
        &gt;
      </button>
    </div>
  );
}

export default Carousel;




