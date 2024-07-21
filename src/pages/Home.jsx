import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import FlightForm from '../components/FlightForm';
import HotelForm from '../components/HotelForm';
import Coursel from '../components/Coursel';
import Blog from '../components/Blog';
import ContactForm from '../components/ContactForm';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

function Home() {
  const [flight, setFlight] = useState(true);
  const [hotels, setHotels] = useState(false);

  const handleFlight = () => {
    setFlight(true);
    setHotels(false);
  };

  const handleHotel = () => {
    setHotels(true);
    setFlight(false);
  };

  return (
    <div className='max-w-full sm:max-w-fit'>
      <Navigation />
      <section className='w-full sm:w-11/12 pt-12 flex flex-col items-center'>
        <div className='flex flex-row justify-center w-full sm:w-11/12 mx-auto gap-5 sm:gap-10 mt-5 sm:mt-10 border border-gray-300 py-5 rounded-t-3xl'>
          <div
            className={`text-lg sm:text-3xl ${flight ? 'text-sky-800 underline' : 'text-sky-400'} hover:underline hover:text-sky-800 active:underline cursor-pointer`}
            onClick={handleFlight}
          >
            Flights
          </div>
          <div
            className={`text-lg sm:text-3xl ${hotels ? 'text-sky-800 underline' : 'text-sky-400'} hover:underline hover:text-sky-800 active:underline cursor-pointer`}
            onClick={handleHotel}
          >
            Hotels
          </div>
        </div>
      </section>
      <section className='w-full sm:w-11/12 mx-auto border border-gray-300 border-t-0 rounded-b-3xl mb-4'>
        <div className='mx-4'>
          {flight && <FlightForm />}
          {hotels && <HotelForm />}
        </div>
      </section>
      <section className="w-full sm:w-11/12 mx-auto">
        <Coursel />
      </section>
      <section className="w-full sm:w-11/12 mx-auto">
        <Blog />
      </section>
      <section className="w-full sm:w-11/12 mx-auto">
        <Testimonials />
      </section>
      <section className="w-full sm:w-11/12 mx-auto">
        <ContactForm />
      </section>
      <section className="w-full sm:w-11/12 mx-auto">
        <Footer />
      </section>
    </div>
  );
}

export default Home;




