import React, { useState, useEffect } from 'react'
import Breadcrumb from '@/component/course/breadcrumb'
import Navbar from '@/component/course/navbar'
import Leftcolumn from '@/component/course/left-column'
import Rightcolumn from '@/component/course/right-column'
import courseData from '../../data/coursesData.json'
import styles from './course.module.scss'

export default function CourseList() {
  const [filters, setFilters] = useState({})
  const [sortOrder, setSortOrder] = useState('priceAsc')
  const [searchCourseList, setSearchCourseList] = useState([])

  const handleCourseFilter = (courseClassId) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      course_class_id: courseClassId,
    }))
  }

  const handleSortChange = (sortType) => {
    setSortOrder(sortType)
  }

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }))
  }

  return (
    <div>
      <Breadcrumb />
      <Navbar
        courseList={courseData}
        onCourseFilter={handleCourseFilter}
        onSortChange={handleSortChange}
        onSearchChange={setSearchCourseList}
      />
      <div className={styles['course-container']}>
        <Leftcolumn filters={filters} onFilterChange={handleFilterChange} />
        <Rightcolumn
          filters={filters}
          sortOrder={sortOrder}
          searchCourseList={searchCourseList}
        />
      </div>
    </div>
  )
}
