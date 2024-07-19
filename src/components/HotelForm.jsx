import React from 'react'
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import calender from "../assets/calendar.png"
import location from "../assets/location.png"
function HotelForm() {
    const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  return (
    <div>
      <form action="/submit" className='w-11/12 mx-auto text-center justify-center flex  flex-col items-center pt-10'>
      <div  className='border border-black w-4/5 flex items-center text-center'>
      <img src={location} alt=""  className='w-10'/>
      <span>Where to</span>
      </div>
      <div className="date-range-picker w-4/5 flex mx-auto border border-black items-center justify-center px-2">
       <div className='w-12'><img src={calender} alt="" /></div>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        placeholderText="Start Date"
      className='w-1/2 border-r-black'/>
      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        placeholderText="End Date"
      className='w-1/2'/>
    </div>
      </form>
    </div>
  )
}

export default HotelForm
