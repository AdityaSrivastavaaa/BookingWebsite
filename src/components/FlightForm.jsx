import React, { useState } from "react";
import RoundtripForm from "../components/RoundtripForm.jsx";
import OnewayForm from "../components/OnewayForm.jsx";

function FlightForm() {
  const [roundTrip, setRoundTrip] = useState(true);
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
      <section className="flex gap-10 w-5/6 mx-auto items-center justify-center pt-10 flex-wrap">
  <div
    onClick={handleRoundTrip}
    className={`${
      roundTrip ? "text-sky-800 text-2xl underline" : "text-sky-400"
    } hover:underline hover:text-sky-800 active:underline text-2xl`}
  >
    Roundtrip
  </div>
  <div
    onClick={handleOneWay}
    className={`${
      oneWay ? "text-sky-800 text-2xl underline" : "text-sky-400"
    } hover:underline hover:text-sky-800 active:underline text-2xl`}
  >
    One-way
  </div>
  <div className="w-full sm:w-auto items-center">
    <form className="max-w-sm mx-auto pt-5">
      <select
        id="countries"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full sm:w-fit p-2.5"
      >
        <option>Economy</option>
        <option>Premium Economy</option>
        <option>Business Class</option>
        <option>First Class</option>
      </select>
    </form>
  </div>
</section>

      <section className="flex gap-10 w-full mx-auto items-center text-center  justify-center pt-10 md:w-4/5 md:mx-auto">
        {roundTrip && <RoundtripForm />}
        {oneWay && <OnewayForm />}
      </section>
    </div>
  );
}

export default FlightForm;
