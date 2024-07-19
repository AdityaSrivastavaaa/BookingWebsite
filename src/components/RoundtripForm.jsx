import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import plus from '../assets/plus-50.png'
import minus from '../assets/minus-50.png'
// import usePlacesAutocomplete, {
//   getGeocode,
//   getLatLng,
// } from 'use-places-autocomplete';
// import {
//   Combobox,
//   ComboboxInput,
//   ComboboxPopover,
//   ComboboxList,
//   ComboboxOption,
// } from '@reach/combobox';
// import '@reach/combobox/styles.css';

function RoundtripForm() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [totalpassenger, setTotalPassenger] = useState(0);
  const [isOpen,setISOpen] = useState(false);
  const [adultValue , setAdultValue] = useState(0)
  const [childValue , setChildValue] = useState(0)
  const [infantLValue , setInfantLValue] = useState(0)
  const [infantSValue , setInfatSValue] = useState(0)

  const togglePopup = () =>{
    setISOpen(!isOpen);
  }
 
  const incrementValue = () =>{
    setAdultValue((prevValue)=> prevValue +1);
  }
  const decrementValue = () =>{
    if(adultValue>0){
      setAdultValue((prevValue) => prevValue - 1 ) ;
    }
    setAdultValue((prevValue) => prevValue) ;
   
  }

  return (
    <form className="w-full flex flex-col md:flex-row md:items-center md:justify-center md:gap-5 md:text-center">
      <div className="mb-5 w-full">
        <input type="text" placeholder='from' className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
      </div>
      <div className="mb-5 w-full">
      <input type="text" placeholder='To' className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
      </div>
      <div className="w-full mb-5 bg-gray-50 border rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500 block ">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="Start Date"
          className=" block w-full p-2.5"
          required
        />
      </div>
      <div className="w-full mb-5 bg-gray-50 border rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500 block ">
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          placeholderText="End Date"
          className=" p-2.5"
          required
        />
      </div>
      <div  className="w-full mb-5 bg-gray-50 border rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500 block ">
        <input type="text" placeholder='Passenger' className='py-3' value={totalpassenger} onClick={togglePopup}/>
      </div> 
      <div>
        {isOpen && ( <div
          className="fixed inset-0 bg-black bg-opacity-75 w-full z-50 "
          onClick={togglePopup}
        >
          <div
            className="bg-white p-8 rounded-lg shadow-lg h-full w-full md:w-1/2 lg:w-1/3"
            onClick={(e) => e.stopPropagation()} // Prevent click events from closing the popup
          >
            <div className='w-full'>
              <h1>Travelers</h1>
              <div className='flex gap-6 flex-col mb-10'>

             
                <div className='flex justify-between px-5 items-center text-center pt-4'>
                 <div>
                 <p>Adults</p>
                 </div>
                  
                  <div className='flex justify-center items-center gap-5'>
                    <span onClick={decrementValue}><img src={minus} alt="decrement icon" /></span>
                    <p>{adultValue}</p>
                    <span onClick={incrementValue}><img src={plus} alt="increment icon" /></span>
                  </div>
                </div>
                <div className='flex justify-between px-5 items-center text-center pt-4'>
                <div>
                <p>Children</p>
                <span>Ages 2 to 17</span>
                </div>
               
                  <div className='flex justify-center items-center gap-5'>
                    <span onClick={decrementValue}><img src={minus} alt="decrement icon" /></span>
                    <p>{adultValue}</p>
                    <span onClick={incrementValue}><img src={plus} alt="increment icon" /></span>
                  </div>

                </div>
                <div className='flex justify-between px-5 items-center text-center pt-4'>
                <div>
                <p>Infants on Lap</p>
                <span>Younger than 2</span>
                </div>
             
                  <div className='flex justify-center items-center gap-5'>
                    <span onClick={decrementValue}><img src={minus} alt="decrement icon" /></span>
                    <p>{adultValue}</p>
                    <span onClick={incrementValue}><img src={plus} alt="increment icon" /></span>
                  </div>

                </div>
                <div className='flex justify-between px-5 items-center text-center pt-4'>
                <div>
                <p>Infants in seat</p>
                <span>Younger than 2</span>
                </div>
                  <div className='flex justify-center items-center gap-5'>
                    <span onClick={decrementValue}><img src={minus} alt="decrement icon" /></span>
                    <p>{adultValue}</p>
                    <span onClick={incrementValue}><img src={plus} alt="increment icon" /></span>
                  </div>

                </div>

            </div>
            <button
              onClick={togglePopup}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
            </div> </div>
        </div>
      )}
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-4 text-center w-full md:py-4 text-2xl"
      >
        Search
      </button>
    </form>
  );
}

export default RoundtripForm;

