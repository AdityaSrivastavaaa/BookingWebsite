import React from 'react'
import  { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
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
function OnewayForm() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  // const {
  //   ready,
  //   value: fromValue,
  //   suggestions: { status: fromStatus, data: fromData },
  //   setValue: setFromValue,
  //   clearSuggestions: clearFromSuggestions,
  // } = usePlacesAutocomplete({
  //   requestOptions: {
  //     /* Define search scope here */
  //   },
  //   debounce: 300,
  // });

  // const {
  //   value: toValue,
  //   suggestions: { status: toStatus, data: toData },
  //   setValue: setToValue,
  //   clearSuggestions: clearToSuggestions,
  // } = usePlacesAutocomplete({
  //   requestOptions: {
  //     /* Define search scope here */
  //   },
  //   debounce: 300,
  // });

  // const handleSelectFrom = async (address) => {
  //   setFromValue(address, false);
  //   clearFromSuggestions();

  //   try {
  //     const results = await getGeocode({ address });
  //     const { lat, lng } = await getLatLng(results[0]);
  //     console.log('Coordinates: ', { lat, lng });
  //   } catch (error) {
  //     console.log('Error: ', error);
  //   }
  // };

  // const handleSelectTo = async (address) => {
  //   setToValue(address, false);
  //   clearToSuggestions();

  //   try {
  //     const results = await getGeocode({ address });
  //     const { lat, lng } = await getLatLng(results[0]);
  //     console.log('Coordinates: ', { lat, lng });
  //   } catch (error) {
  //     console.log('Error: ', error);
  //   }
  // };

  return (
    <form className="w-full pt-5">
    <div className="mb-5 w-full">
      <input type="text" placeholder='from' className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
    </div>
    <div className="mb-5 w-full">
    <input type="text" placeholder='To' className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
    </div>
    <div className="w-full mb-5">
     <input type="date" name="departureDate" id="departureDate"  className='datepicker-input shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'/>
    </div>
    <div className="w-full mb-5">
    </div>
    <button
      type="submit"
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full"
    >
      Search
    </button>
  </form>
  )
}

export default OnewayForm
