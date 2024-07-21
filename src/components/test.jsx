import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const RoundtripForm = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [totalPassenger, setTotalPassenger] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [activeInput, setActiveInput] = useState('');
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [adultValue, setAdultValue] = useState(0);
  const [childValue, setChildValue] = useState(0);
  const [infantLValue, setInfantLValue] = useState(0);
  const [infantSValue, setInfantSValue] = useState(0);

  const handleInputChange = (setter, value, type) => {
    setter(value);
    // Fetch suggestions from API
    if (type === 'from') {
      // setFromSuggestions(response.data)
    } else {
      // setToSuggestions(response.data)
    }
  };

  const handleSuggestionClick = (setter, type, suggestion) => {
    setter(suggestion.label);
    if (type === 'from') {
      setFromSuggestions([]);
    } else {
      setToSuggestions([]);
    }
  };

  const togglePopup = () => setIsOpen(!isOpen);

  const incrementValue = (setter, value) => setter(value + 1);
  const decrementValue = (setter, value) => setter(value > 0 ? value - 1 : 0);

  const handleDoneClick = () => {
    setTotalPassenger(adultValue + childValue + infantLValue + infantSValue);
    togglePopup();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <form 
      
      onSubmit={handleSubmit}
    >
      <div >
        <div>
          <svg
            version="1.0"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 64 64"
            enableBackground="new 0 0 64 64"
            xmlSpace="preserve"
            width={20}
            className="fill-current text-gray-500"
          >
            <path d="M32,0C18.746,0,8,10.746,8,24c0,5.219,1.711,10.008,4.555,13.93c0.051,0.094,0.059,0.199,0.117,0.289l16,24C29.414,63.332,30.664,64,32,64s2.586-0.668,3.328-1.781l16-24c0.059-0.09,0.066-0.195,0.117-0.289C54.289,34.008,56,29.219,56,24C56,10.746,45.254,0,32,0z M32,32c-4.418,0-8-3.582-8-8s3.582-8,8-8s8,3.582,8,8S36.418,32,32,32z"/>
          </svg>
        </div>
        <input
          type="text"
          aria-label="Leaving from"
          placeholder="Leaving from"
          
          value={from}
          onChange={(e) => {
            setActiveInput('from');
            handleInputChange(setFrom, e.target.value, 'from');
          }}
        />
        {activeInput === 'from' && fromSuggestions.length > 0 && (
          <ul >
            {fromSuggestions.map((suggestion) => (
              <li
                key={suggestion.value}
                
                onClick={() => handleSuggestionClick(setFrom, 'from', suggestion)}
              >
                <div >
                  <img src={flight} alt="flight logo"  />
                  <div>
                    {suggestion.label}
                    <span >{suggestion.country}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div >
        <div >
          <svg
            version="1.0"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 64 64"
            enableBackground="new 0 0 64 64"
            xmlSpace="preserve"
            width={20}
            className="fill-current text-gray-500"
          >
            <path d="M32,0C18.746,0,8,10.746,8,24c0,5.219,1.711,10.008,4.555,13.93c0.051,0.094,0.059,0.199,0.117,0.289l16,24C29.414,63.332,30.664,64,32,64s2.586-0.668,3.328-1.781l16-24c0.059-0.09,0.066-0.195,0.117-0.289C54.289,34.008,56,29.219,56,24C56,10.746,45.254,0,32,0z M32,32c-4.418,0-8-3.582-8-8s3.582-8,8-8s8,3.582,8,8S36.418,32,32,32z"/>
          </svg>
        </div>
        <input
          type="text"
          aria-label="Going to"
          placeholder="Going to"
         
          value={to}
          onChange={(e) => {
            setActiveInput('to');
            handleInputChange(setTo, e.target.value, 'to');
          }}
        />
        {activeInput === 'to' && toSuggestions.length > 0 && (
          <ul >
            {toSuggestions.map((suggestion) => (
              <li
                key={suggestion.value}
                
                onClick={() => handleSuggestionClick(setTo, 'to', suggestion)}
              >
              <div >
                  <img src={flight} alt="flight logo" className="w-6" />
                  <div >
                    {suggestion.label}
                    <span >{suggestion.country}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div >
        <div >
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            placeholderText="Start Date"
            className="text-base w-full border-none bg-transparent p-2"
          />
        </div>
        <div >
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            placeholderText="End Date"
        
          />
        </div>
      </div>

      <div >
        <button
          type="button"
          className="bg-white border border-gray-300 text-gray-900 text-base rounded-lg block w-full p-2"
          onClick={togglePopup}
        >
          Passengers: {totalPassenger}
        </button>
        {isOpen && (
          <div className="absolute z-20 w-full p-4 bg-white border border-gray-300 rounded-lg shadow-lg">
            <div className="flex justify-between items-center py-2">
              <span className="text-sm">Adults</span>
              <div className="flex items-center">
                <button
                  type="button"
                  className="bg-gray-200 p-1 rounded-full w-6 h-6 flex items-center justify-center"
                  onClick={() => decrementValue(setAdultValue, adultValue)}
                >
                  -
                </button>
                <span className="mx-2">{adultValue}</span>
                <button
                  type="button"
                  className="bg-gray-200 p-1 rounded-full w-6 h-6 flex items-center justify-center"
                  onClick={() => incrementValue(setAdultValue, adultValue)}
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm">Children</span>
              <div className="flex items-center">
                <button
                  type="button"
                  className="bg-gray-200 p-1 rounded-full w-6 h-6 flex items-center justify-center"
                  onClick={() => decrementValue(setChildValue, childValue)}
                >
                  -
                </button>
                <span className="mx-2">{childValue}</span>
                <button
                  type="button"
                  className="bg-gray-200 p-1 rounded-full w-6 h-6 flex items-center justify-center"
                  onClick={() => incrementValue(setChildValue, childValue)}
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm">Infants (lap)</span>
              <div className="flex items-center">
                <button
                  type="button"
                  className="bg-gray-200 p-1 rounded-full w-6 h-6 flex items-center justify-center"
                  onClick={() => decrementValue(setInfantLValue, infantLValue)}
                >
                  -
                </button>
                <span className="mx-2">{infantLValue}</span>
                <button
                  type="button"
                  className="bg-gray-200 p-1 rounded-full w-6 h-6 flex items-center justify-center"
                  onClick={() => incrementValue(setInfantLValue, infantLValue)}
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm">Infants (seat)</span>
              <div className="flex items-center">
                <button
                  type="button"
                  className="bg-gray-200 p-1 rounded-full w-6 h-6 flex items-center justify-center"
                  onClick={() => decrementValue(setInfantSValue, infantSValue)}
                >
                  -
                </button>
                <span className="mx-2">{infantSValue}</span>
                <button
                  type="button"
                  className="bg-gray-200 p-1 rounded-full w-6 h-6 flex items-center justify-center"
                  onClick={() => incrementValue(setInfantSValue, infantSValue)}
                >
                  +
                </button>
              </div>
            </div>
            <button
              type="button"
              className="bg-blue-500 text-white p-2 rounded-lg w-full mt-2"
              onClick={handleDoneClick}
            >
              Done
            </button>
          </div>
        )}
      </div>

      
    </form>
  );
};

export default RoundtripForm;
