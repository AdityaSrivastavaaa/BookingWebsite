import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import FlightForm from '../components/FlightForm';
import HotelForm from '../components/HotelForm';
import Coursel from '../components/Coursel';
import Logo from '../assets/brandlogo.svg'
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
    <div>
      <Navigation />
      <section className='pt-12 flex flex-col items-center'>
        <div className='flex justify-center w-11/12 mx-auto gap-10 mt-10 border border-gray-400 py-5'>
          <div
            className={`text-3xl  ${flight ? 'text-sky-800 underline' : 'text-sky-400'} hover:underline hover:text-sky-800 active:underline`}
            onClick={handleFlight}
          >
            Flights
          </div>
          <div
            className={`text-3xl  ${hotels ? 'text-sky-800 underline' : 'text-sky-400'} hover:underline hover:text-sky-800 active:underline`}
            onClick={handleHotel}
          >
            Hotels
          </div>
        </div>
      </section>
      <section className='w-11/12  mx-auto  border border-gray-400 border-t-0'>
      <div className='mx-4'>
      {flight && <FlightForm />}
      {hotels && <HotelForm />}
      </div>
        
      </section>
      <section className='w-full  mx-auto py-10 '>
        <Coursel />
      </section>
      <section>
        <Blog/>
      </section>
      <section>
        <Testimonials/>
      </section>
      <section>
        <ContactForm/>
      </section>
      <section>
        <Footer/>
      </section>
    </div>
  );
}

export default Home;



