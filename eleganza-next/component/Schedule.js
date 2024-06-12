import React, { useState } from 'react'
import styles from './Schedule.module.css' // 使用 CSS Modules

const Schedule = ({ availableTimes, onTimeSelect }) => {
  const [selectedWeek, setSelectedWeek] = useState({
    start: new Date('2024-06-02'),
    end: new Date('2024-06-08'),
  })
  const [selectedTime, setSelectedTime] = useState(null)

  const handlePrevWeek = () => {
    const newStart = new Date(selectedWeek.start)
    newStart.setDate(newStart.getDate() - 7)
    const newEnd = new Date(selectedWeek.end)
    newEnd.setDate(newEnd.getDate() - 7)
    setSelectedWeek({ start: newStart, end: newEnd })
  }

  const handleNextWeek = () => {
    const newStart = new Date(selectedWeek.start)
    newStart.setDate(newStart.getDate() + 7)
    const newEnd = new Date(selectedWeek.end)
    newEnd.setDate(newEnd.getDate() + 7)
    setSelectedWeek({ start: newStart, end: newEnd })
  }

  const formatDate = (date) => {
    return date.toISOString().split('T')[0]
  }

  const handleTimeClick = (day, time) => {
    setSelectedTime({ day, time })
    onTimeSelect({ day, time })
  }

  const renderTimes = (day) => {
    const dateKey = day.toDateString()
    const times = availableTimes[dateKey] || []
    const allTimes = [
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
      '19:00',
    ]

    let disabledCount = 0

    return allTimes.map((time, index) => {
      const isAvailable = times.includes(time)
      const isDisabled = !isAvailable && disabledCount < 3

      if (!isAvailable) {
        disabledCount++
      }

      return (
        <div
          key={index}
          className={`${styles.timeSlot} ${isAvailable ? '' : styles.disabled} ${isDisabled ? styles.hidden : ''} ${selectedTime && selectedTime.day.toDateString() === day.toDateString() && selectedTime.time === time ? styles.selected : ''}`}
          onClick={() => isAvailable && handleTimeClick(day, time)}
        >
          {time}
        </div>
      )
    })
  }

  const renderWeekDays = () => {
    const days = []
    for (let i = 0; i < 7; i++) {
      const day = new Date(selectedWeek.start)
      day.setDate(day.getDate() + i)
      days.push(day)
    }
    return days.map((day, index) => (
      <div key={index} className={styles.dayColumn}>
        <div className={styles.dayHeader}>
          {day.toLocaleDateString('zh-TW', { weekday: 'short' })}
          <br />
          {day.getDate()}
        </div>
        {renderTimes(day)}
      </div>
    ))
  }

  return (
    <div className={styles.schedule}>
      <div className={styles.weekNavigation}>
        <button onClick={handlePrevWeek}>{'<'}</button>
        <span>
          {formatDate(selectedWeek.start)} - {formatDate(selectedWeek.end)}
        </span>
        <button onClick={handleNextWeek}>{'>'}</button>
      </div>
      <div className={styles.weekGrid}>{renderWeekDays()}</div>
    </div>
  )
}

export default Schedule
