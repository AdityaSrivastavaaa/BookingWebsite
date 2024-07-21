import React, { useState, useEffect, useCallback } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import plus from '../assets/plus-50.png';
import minus from '../assets/minus-50.png';
import cancel from '../assets/cancel-50.png';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { debounce } from 'lodash-es';
import flight from '../assets/flight-24.png';

const fetchAirports = async (keyword, authToken, apiUrl) => {
  try {
    const response = await axios.get(`${apiUrl}/v1/reference-data/locations`, {
      params: {
        keyword: keyword,
        subType: 'AIRPORT',
      },
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (response.data && response.data.data) {
      console.log(response.data.data)
      const airports = response.data.data
        .filter((item) => item.iataCode && item.name)
        .map((item) => ({
          label: `${item.address.cityName} (${item.iataCode} - ${item.name})`,
          country : `${item.address.countryName}`,
          value: item.iataCode,
        }));
      return airports;
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error fetching airports:', error);
    throw error;
  }
};

function RoundtripForm() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [totalPassenger, setTotalPassenger] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [adultValue, setAdultValue] = useState(0);
  const [childValue, setChildValue] = useState(0);
  const [infantLValue, setInfantLValue] = useState(0);
  const [infantSValue, setInfantSValue] = useState(0);
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [activeInput, setActiveInput] = useState(null);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [authToken, setAuthToken] = useState('');
  const [apiUrl, setApiUrl] = useState('');
  const maxPassenger = 9;

  useEffect(() => {
    setTotalPassenger(adultValue + childValue + infantLValue + infantSValue);
  }, [adultValue, childValue, infantLValue, infantSValue]);

  useEffect(() => {
    const fetchAuthData = async () => {
      try {
        const response = await axios.get('https://api.siddarthglobal.com/start');
        setAuthToken(response.data.auth_token);
        setApiUrl(response.data.api_url);
      } catch (error) {
        console.error('Error fetching auth data:', error);
      }
    };

    fetchAuthData();
  }, []);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const incrementValue = (setter, value) => {
    if (totalPassenger < maxPassenger) {
      setter(value + 1);
    }
    if (totalPassenger === maxPassenger) {
      toast.error('You can only book up to 9 seats.');
    }
  };

  const decrementValue = (setter, value) => {
    if (value > 0) {
      setter(value - 1);
    }
  };

  const handleDoneClick = () => {
    togglePopup();
  };

  const fetchAirportSuggestions = async (input, type) => {
    if (!authToken || !input.trim() || !apiUrl) return;

    try {
      const airports = await fetchAirports(input, authToken, apiUrl);
      if (type === 'from') {
        setFromSuggestions(airports || []);
      } else if (type === 'to') {
        setToSuggestions(airports || []);
      }
    } catch (error) {
      console.error('Error fetching airport data:', error);
      const errorMessage = error.response?.data?.error || error.message || 'Unknown error occurred';
      toast.error(`Failed to fetch airport suggestions: ${errorMessage}`);
    }
  };

  const debouncedFetchAirportSuggestions = useCallback(
    debounce((input, type) => fetchAirportSuggestions(input, type), 300),
    [authToken, apiUrl]
  );

  const handleInputChange = (setter, value, type) => {
    setter(value);
    if (value) {
      debouncedFetchAirportSuggestions(value, type);
    } else {
      if (type === 'from') {
        setFromSuggestions([]);
      } else if (type === 'to') {
        setToSuggestions([]);
      }
    }
  };

  const handleSuggestionClick = (setter, type, suggestion) => {
    setter(suggestion.label);
    if (type === 'from') {
      setFromSuggestions([]);
    } else if (type === 'to') {
      setToSuggestions([]);
    }
  };

  return (
    <form className="w-full flex flex-col md:flex-row md:items-center md:justify-center md:gap-5 md:text-center">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="mb-5 w-full p-1 relative flex">
  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
    <svg
      version="1.0"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 64 64"
      enableBackground="new 0 0 64 64"
      xmlSpace="preserve"
      width={30}
      className="fill-current text-gray-500"
    >
      <path d="M32,0C18.746,0,8,10.746,8,24c0,5.219,1.711,10.008,4.555,13.93c0.051,0.094,0.059,0.199,0.117,0.289l16,24C29.414,63.332,30.664,64,32,64s2.586-0.668,3.328-1.781l16-24c0.059-0.09,0.066-0.195,0.117-0.289C54.289,34.008,56,29.219,56,24C56,10.746,45.254,0,32,0z M32,32c-4.418,0-8-3.582-8-8s3.582-8,8-8s8,3.582,8,8S36.418,32,32,32z"/>
    </svg>
  </div>
  <input
    type="text"
    placeholder="Leaving from"
    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg block w-full pl-12 p-3 placeholder-gray-600"
    value={from}
    onChange={(e) => {
      setActiveInput('from');
      handleInputChange(setFrom, e.target.value, 'from');
    }}
  />
  {activeInput === 'from' && fromSuggestions.length > 0 && (
    <ul className="absolute bg-white border border-gray-300 w-full mt-1 rounded-lg z-20">
      {fromSuggestions.map((suggestion) => (
        <li
          key={suggestion.value}
         className="p-2 hover:bg-gray-200 cursor-pointer"
          onClick={() => handleSuggestionClick(setFrom, 'from', suggestion)}
        >
          <div className="flex items-start gap-2 py-1">
            <img src={flight} alt="flight logo" className="w-6" />
            <div  className="flex flex-col items-start">
              {suggestion.label}
              <span className="text-xs text-gray-500 font-serif">{suggestion.country}</span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )}
</div>

<div className="mb-5 w-full p-1 relative">
  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
    <svg
      version="1.0"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 64 64"
      enableBackground="new 0 0 64 64"
      xmlSpace="preserve"
      width={30}
      className="fill-current text-gray-500"
    >
      <path d="M32,0C18.746,0,8,10.746,8,24c0,5.219,1.711,10.008,4.555,13.93c0.051,0.094,0.059,0.199,0.117,0.289l16,24C29.414,63.332,30.664,64,32,64s2.586-0.668,3.328-1.781l16-24c0.059-0.09,0.066-0.195,0.117-0.289C54.289,34.008,56,29.219,56,24C56,10.746,45.254,0,32,0z M32,32c-4.418,0-8-3.582-8-8s3.582-8,8-8s8,3.582,8,8S36.418,32,32,32z"/>
    </svg>
  </div>
  <input
    type="text"
    placeholder="Going to"
     className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg block w-full pl-12 p-3 placeholder-gray-600"
    value={to}
    onChange={(e) => {
      setActiveInput('to');
      handleInputChange(setTo, e.target.value, 'to');
    }}
  />
  {activeInput === 'to' && toSuggestions.length > 0 && (
    <ul className="absolute bg-white border border-gray-300 w-full mt-1 rounded-lg z-20">
      {toSuggestions.map((suggestion) => (
        <li
          key={suggestion.value}
         className="p-2 hover:bg-gray-200 cursor-pointer"
          onClick={() => handleSuggestionClick(setTo, 'to', suggestion)}
        >
        <div className="flex items-start gap-2 py-1">
            <img src={flight} alt="flight logo" className="w-10" />
            <div className="flex flex-col items-start">
              {suggestion.label}
              <span className="text-xs text-gray-500 font-serif">{suggestion.country}</span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )}
</div>


      <div className="w-full mb-5 bg-gray-50 flex flex-col md:flex-row gap-2 md:gap-4">
        <div className="border border-gray-300 rounded-lg p-1 w-full md:w-1/2">
        <input type="date"  className=' className="text-base w-full border-none bg-transparent p-3'/>
        </div>
      </div>
      <div className="w-full mb-5 bg-gray-50 border rounded-lg border-gray-300 block p-1">
        <input
          type="text"
          placeholder="Passenger"
          className="py-3 w-full pl-6"
          value={totalPassenger === 0 ? '' : totalPassenger}
          onClick={togglePopup}
          readOnly
        />
      </div>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 w-full z-50" onClick={togglePopup}>
          <div className="bg-white p-8 rounded-lg shadow-lg h-full w-full md:w-1/2 lg:w-1/3" onClick={(e) => e.stopPropagation()}>
            <div className="w-full ">
              <div className="flex justify-between items-center mb-5">
                <img src={cancel} alt="close" onClick={togglePopup} className="cursor-pointer" />
                <h1 className="text-2xl font-semibold">Travelers</h1>
              </div>
              <div className="flex flex-col gap-6 mb-10 ">
                <div className="flex gap-5 justify-between px-5 items-center text-center pt-4">
                  <div>
                    <p className="pl-5">Adults</p>
                  </div>
                  <div className="flex justify-center items-center gap-4">
                    <img
                      src={minus}
                      alt="minus"
                      className="cursor-pointer"
                      onClick={() => decrementValue(setAdultValue, adultValue)}
                    />
                    <span>{adultValue}</span>
                    <img
                      src={plus}
                      alt="plus"
                      className="cursor-pointer"
                      onClick={() => incrementValue(setAdultValue, adultValue)}
                    />
                  </div>
                </div>
                <div className="flex justify-between px-5 items-center text-center">
                  <div>
                    <p className="pl-5">Children</p>
                  </div>
                  <div className="flex justify-center items-center gap-4">
                    <img
                      src={minus}
                      alt="minus"
                      className="cursor-pointer"
                      onClick={() => decrementValue(setChildValue, childValue)}
                    />
                    <span>{childValue}</span>
                    <img
                      src={plus}
                      alt="plus"
                      className="cursor-pointer"
                      onClick={() => incrementValue(setChildValue, childValue)}
                    />
                  </div>
                </div>
                <div className="flex justify-between px-5 items-center text-center">
                  <div>
                    <p className="pl-5">Infants</p>
                    <span className="pl-5">(On Lap)</span>
                  </div>
                  <div className="flex justify-center items-center gap-4">
                    <img
                      src={minus}
                      alt="minus"
                      className="cursor-pointer"
                      onClick={() => decrementValue(setInfantLValue, infantLValue)}
                    />
                    <span>{infantLValue}</span>
                    <img
                      src={plus}
                      alt="plus"
                      className="cursor-pointer"
                      onClick={() => incrementValue(setInfantLValue, infantLValue)}
                    />
                  </div>
                </div>
                <div className="flex justify-between px-5 items-center text-center">
                  <div>
                    <p className="pl-5">Infants</p>
                    <span className='pl-5'>(On Seats)</span>
                  </div>
                  <div className="flex justify-center items-center gap-4">
                    <img
                      src={minus}
                      alt="minus"
                      className="cursor-pointer"
                      onClick={() => decrementValue(setInfantSValue, infantSValue)}
                    />
                    <span>{infantSValue}</span>
                    <img
                      src={plus}
                      alt="plus"
                      className="cursor-pointer"
                      onClick={() => incrementValue(setInfantSValue, infantSValue)}
                    />
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="bg-blue-500 text-white p-2 rounded-lg w-full"
                onClick={handleDoneClick}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
      <div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg w-full md:w-auto mb-5">
        Search
      </button>
      </div>
     
    </form>
  );
}

export default RoundtripForm;
