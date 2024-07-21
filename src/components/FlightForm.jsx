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
      <section className="flex flex-wrap gap-5 sm:gap-10 w-11/12 sm:w-5/6 mx-auto items-center justify-center pt-10">
        <div
          onClick={handleRoundTrip}
          className={`${
            roundTrip ? "text-sky-800 underline" : "text-sky-400"
          } hover:underline hover:text-sky-800 active:underline text-lg sm:text-2xl cursor-pointer`}
        >
          Roundtrip
        </div>
        <div
          onClick={handleOneWay}
          className={`${
            oneWay ? "text-sky-800 underline" : "text-sky-400"
          } hover:underline hover:text-sky-800 active:underline text-lg sm:text-2xl cursor-pointer`}
        >
          One-way
        </div>
        <div className="w-full sm:w-auto items-center">
          <form className="max-w-sm mx-auto pt-5">
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option>Economy</option>
              <option>Premium Economy</option>
              <option>Business Class</option>
              <option>First Class</option>
            </select>
          </form>
        </div>
      </section>

      <section className="w-11/12 md:w-4/5 mx-auto flex justify-center pt-10">
        {roundTrip && <RoundtripForm />}
        {oneWay && <OnewayForm />}
      </section>
    </div>
  );
}

export default FlightForm;
