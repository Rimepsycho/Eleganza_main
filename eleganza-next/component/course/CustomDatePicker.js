import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import styles from './DateTimePickerButtonStyles.module.css'

function CustomDatePicker({ getStartDate, getEndDate, calendarIsClear }) {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(null)

  const handleDateRangeChange = (dates) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }

  useEffect(() => {
    let allDateElement = document.querySelectorAll('.react-datepicker__day')
    let selectedDateElement = document.querySelector(
      '.react-datepicker__day--keyboard-selected',
    )

    allDateElement.forEach((x) => (x.style.backgroundColor = 'white'))
    allDateElement.forEach((x) => (x.style.color = '#000'))
    selectedDateElement.style.backgroundColor = '#322826'
    selectedDateElement.style.color = '#fff'
    getStartDate(startDate, 'dateSearchRange')
  }, [startDate])

  useEffect(() => {
    let selectedDateElement = document.querySelector(
      '.react-datepicker__day--keyboard-selected',
    )
    let daysInRangeElements = document.querySelectorAll(
      '.react-datepicker__day--in-range',
    )

    selectedDateElement.style.backgroundColor = '#322826'
    selectedDateElement.style.color = '#fff'
    daysInRangeElements.forEach((x) => (x.style.backgroundColor = '#322826'))
    daysInRangeElements.forEach((x) => (x.style.color = '#fff'))
    getEndDate(endDate, 'dateSearchRange')
  }, [endDate])

  useEffect(() => {
    if (calendarIsClear) {
      setStartDate(new Date())
      setEndDate(null)
    }
  }, [calendarIsClear])

  //Work around for calendar styling
  useEffect(() => {
    let headerElement = document.querySelector('.react-datepicker__header')
    let currentMonth = document.querySelector(
      '.react-datepicker__current-month',
    )
    let dayElements = document.querySelectorAll('.react-datepicker__day-name')
    // let selectedDateElement = document.querySelector('.react-datepicker__day--keyboard-selected');
    // let daysInRangeElements = document.querySelectorAll('.react-datepicker__day--in-range');

    if (headerElement) {
      headerElement.style.backgroundColor = '#322826'
      currentMonth.style.color = 'white'
      dayElements.forEach((x) => (x.style.color = 'white'))
      // selectedDateElement.style.backgroundColor = '#322826';
      // selectedDateElement.style.color = '#fff';
      // daysInRangeElements.forEach(x => x.style.backgroundColor = '#322826')
      // daysInRangeElements.forEach(x => x.style.color = '#fff')
    }
  })

  return (
    <div className={styles.reactDatepicker}>
      <DatePicker
        className="test-class"
        wrapperClassName="wrapper-class"
        calendarClassName="calendar-class"
        selectsRange
        startDate={startDate}
        endDate={endDate}
        onChange={handleDateRangeChange}
        inline
      />
    </div>
  )
}

export default CustomDatePicker
