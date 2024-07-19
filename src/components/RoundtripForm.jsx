import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';
import '@reach/combobox/styles.css';

function RoundtripForm() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const {
    ready,
    value: fromValue,
    suggestions: { status: fromStatus, data: fromData },
    setValue: setFromValue,
    clearSuggestions: clearFromSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });

  const {
    value: toValue,
    suggestions: { status: toStatus, data: toData },
    setValue: setToValue,
    clearSuggestions: clearToSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });

  const handleSelectFrom = async (address) => {
    setFromValue(address, false);
    clearFromSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      console.log('Coordinates: ', { lat, lng });
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  const handleSelectTo = async (address) => {
    setToValue(address, false);
    clearToSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      console.log('Coordinates: ', { lat, lng });
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  return (
    <div>
      <form className="w-full border mx-auto p-4">
        <div className="mb-5">
          <Combobox onSelect={handleSelectFrom}>
            <ComboboxInput
              value={fromValue}
              onChange={(e) => setFromValue(e.target.value)}
              disabled={!ready}
              placeholder="Leaving From"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            <ComboboxPopover>
              {fromStatus === 'OK' && (
                <ComboboxList>
                  {fromData.map(({ place_id, description }) => (
                    <ComboboxOption key={place_id} value={description} />
                  ))}
                </ComboboxList>
              )}
            </ComboboxPopover>
          </Combobox>
        </div>
        <div className="mb-5">
          <Combobox onSelect={handleSelectTo}>
            <ComboboxInput
              value={toValue}
              onChange={(e) => setToValue(e.target.value)}
              disabled={!ready}
              placeholder="Going To"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            <ComboboxPopover>
              {toStatus === 'OK' && (
                <ComboboxList>
                  {toData.map(({ place_id, description }) => (
                    <ComboboxOption key={place_id} value={description} />
                  ))}
                </ComboboxList>
              )}
            </ComboboxPopover>
          </Combobox>
        </div>
        <div className="mb-5">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            placeholderText="Start Date"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div className="mb-5">
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            placeholderText="End Date"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default RoundtripForm;

