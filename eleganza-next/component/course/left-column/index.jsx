import React, { useState } from 'react'
import CustomDatePicker from '../CustomDatePicker'
import styles from './leftcolumn.module.scss'

const styleMapping = {
  古典: 'Classical',
  '爵士/藍調': 'Jazz/Blues',
  流行: 'Pop',
}

const experienceMapping = {
  '5年以下': ['0', '1', '2', '3', '4'],
  '5年至10年': ['5', '6', '7', '8', '9', '10'],
  '10年以上': ['11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
}

const musicStyleOptions = ['古典', '爵士/藍調', '流行']
const teachingExperienceOptions = ['5年以下', '5年至10年', '10年以上']

export default function Leftcolumn({ filters, onFilterChange }) {
  const [calendarIsClear, setCalendarIdClear] = useState(true)

  const handleCheckboxChange = (event, category) => {
    const { checked, value } = event.target
    const filterValues =
      category === 'course_style'
        ? styleMapping[value]
        : experienceMapping[value]
    if (checked) {
      onFilterChange(category, filterValues)
    } else {
      onFilterChange(category, null) // 清除此分类的过滤
    }
  }

  const handleStartDateChange = (startDate) => {
    setCalendarIdClear(false)
    onFilterChange('dateSearchRange', { startDate: startDate, endDate: null })
  }

  const handleEndDateChange = (endDate) => {
    setCalendarIdClear(false)
    onFilterChange('dateSearchRange', {
      startDate: filters.dateSearchRange?.startDate,
      endDate: endDate,
    })
  }

  const resetDatePicker = () => {
    setCalendarIdClear(true)
    onFilterChange('dateSearchRange', null)
  }

  return (
    <div>
      <div>
        <div className={styles.datePickerTitleContainer}>
          <p>課程時間</p>
          <button onClick={resetDatePicker} className={styles.resetButton}>
            Reset
          </button>
        </div>
        <CustomDatePicker
          getStartDate={handleStartDateChange}
          getEndDate={handleEndDateChange}
          calendarIsClear={calendarIsClear}
        />
      </div>
      <div className={styles['filter-section']}>
        <p>教學年資</p>
        {teachingExperienceOptions.map((option) => (
          <div key={option}>
            <input
              className={styles['checkbox-style']}
              type="checkbox"
              id={`t_years-${option}`}
              name={`t_years-${option}`}
              value={option}
              onChange={(e) => handleCheckboxChange(e, 't_years')}
            />
            <label htmlFor={`t_years-${option}`}>{option}</label>
          </div>
        ))}
      </div>
      <div className={styles['filter-section']}>
        <p>音樂風格</p>
        {musicStyleOptions.map((option) => (
          <div key={option}>
            <input
              className={styles['checkbox-style']}
              type="checkbox"
              id={`course_style-${option}`}
              name={`course_style-${option}`}
              value={option}
              onChange={(e) => handleCheckboxChange(e, 'course_style')}
            />
            <label htmlFor={`course_style-${option}`}>{option}</label>
          </div>
        ))}
      </div>
    </div>
  )
}
