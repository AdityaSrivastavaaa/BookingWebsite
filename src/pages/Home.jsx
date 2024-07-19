import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import FlightForm from '../components/FlightForm';
import HotelForm from '../components/HotelForm';

function Home() {
  const [flight, setFlight] = useState(false);
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
    <div>
      <Navigation />
      <section className='bg-orange-100 pt-12 flex flex-col items-center pb-12'>
        <h1 className='text-3xl font-semibold pb-5 text-sky-700 underline'>BOOK NOW</h1>
        <div className='flex justify-center w-5/6 mx-auto gap-32'>
          <div
            className={`text-2xl font-serif ${flight ? 'text-sky-800 underline' : 'text-sky-400'} hover:underline hover:text-sky-800 active:underline`}
            onClick={handleFlight}
          >
            Flights
          </div>
          <div
            className={`text-2xl font-serif ${hotels ? 'text-sky-800 underline' : 'text-sky-400'} hover:underline hover:text-sky-800 active:underline`}
            onClick={handleHotel}
          >
            Hotels
          </div>
        </div>
      </section>
      <section>
        {flight && <FlightForm />}
        {hotels && <HotelForm />}
      </section>
    </div>
  );
}

export default Home;



