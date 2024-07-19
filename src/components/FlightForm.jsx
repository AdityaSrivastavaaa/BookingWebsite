import React, { useState } from 'react';
import RoundtripForm from '../components/RoundtripForm.jsx';
import OnewayForm from '../components/OnewayForm.jsx';

function FlightForm() {
  const [roundTrip, setRoundTrip] = useState(false);
  const [oneWay, setOneWay] = useState(false);

  const handleRoundTrip = () => {
    setRoundTrip(true);
    setOneWay(false);
  };

  const handleOneWay = () => {
    setOneWay(true);
    setRoundTrip(false);
  };

  return (
    <div>
      <section className='flex gap-10 w-5/6 mx-auto items-center text-center justify-center pt-10'>
        <div onClick={handleRoundTrip} className={`${roundTrip ? 'text-sky-800 underline' : 'text-sky-400'} hover:underline hover:text-sky-800 active:underline`}>Roundtrip</div>
        <div onClick={handleOneWay} className={`${oneWay ? 'text-sky-800 underline' : 'text-sky-400'} hover:underline hover:text-sky-800 active:underline`}>One-way</div>
      </section>
      <section>

<form className="max-w-sm mx-auto pt-5">
  <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

    <option>Economy</option>
    <option>Permium economy</option>
    <option>Buisness Class</option>
    <option>First Class</option>
  </select>
</form>

      </section>
      <section className='flex gap-10 w-11/12 mx-auto items-center text-center justify-center pt-10'>
        {roundTrip && <RoundtripForm />}
        {oneWay && <OnewayForm />}
      </section>
      
    </div>
  );
}

export default FlightForm;
