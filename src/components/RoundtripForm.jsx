import React, { useState, useEffect, useCallback } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import plus from '../assets/plus-50.png';
import minus from '../assets/minus-50.png';
import cancel from '../assets/cancel-50.png';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { debounce } from 'lodash-es';

// Function to search for airports
const fetchAirports = async (keyword, authToken, apiUrl) => {
  try {
    const response = await axios.get(`${apiUrl}/v1/reference-data/locations`, {
      params: {
        keyword: keyword,
        subType: 'AIRPORT',
        subType: 'CITY'
      },
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    });

    if (response.data && response.data.data) {
      const airports = response.data.data
        .filter(item => item.iataCode && item.name)
        .map(item => ({
          label: `${item.name} (${item.iataCode}), ${item.address.cityName}`,
          value: item.iataCode
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
      <div className="mb-5 w-full p-1 relative">
        <input
          type="text"
          placeholder="From"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
                {suggestion.label}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="mb-5 w-full p-1 relative">
        <input
          type="text"
          placeholder="To"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
                {suggestion.label}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="w-full mb-5 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 flex md:flex-row gap-4">
        <div className="border border-gray-300 rounded-lg p-1 w-1/2">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            placeholderText="Start Date"
            className="p-2.5"
            required
          />
        </div>
        <div className="border border-gray-300 rounded-lg p-1 w-1/2">
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            placeholderText="End Date"
            className="p-2.5"
            required
          />
        </div>
      </div>
      <div className="w-full mb-5 bg-gray-50 border rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500 block p-1">
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
            <div className="w-full">
              <div className="flex justify-between items-center mb-5">
                <img src={cancel} alt="close" onClick={togglePopup} className="cursor-pointer" />
                <h1 className="text-2xl font-semibold">Travelers</h1>
              </div>
              <div className="flex flex-col gap-6 mb-10">
                <div className="flex justify-between px-5 items-center text-center pt-4">
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
                    <p className="pl-5">Infants (L)</p>
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
                    <p className="pl-5">Infants (S)</p>
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
    </form>
  );
}

export default RoundtripForm;
