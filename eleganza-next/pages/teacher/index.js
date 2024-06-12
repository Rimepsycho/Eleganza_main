import React, { useState, useEffect } from 'react'
import Breadcrumb from '@/component/teacher/breadcrumb'
import Card from '@/component/teacher/card'
import Pagination from '@/component/course/pagination'
import styles from './teacher.module.scss'
import teacherData from '../../data/teachersData.json'

export default function TeacherList() {
  const [filter, setFilter] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [teachersPerPage] = useState(5)
  const [filteredTeachers, setFilteredTeachers] = useState([])

  useEffect(() => {
    const updatedTeachers = teacherData.map((teacher) => ({
      ...teacher,
      courses: teacher.courses.split(',').map((course) => course.trim()),
    }))
    const filteredData = filter
      ? updatedTeachers.filter((teacher) => teacher.courses.includes(filter))
      : updatedTeachers
    setFilteredTeachers(filteredData)
    setCurrentPage(1)
  }, [filter])

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
    window.scrollTo(0, 0)
  }

  const currentTeachers = filteredTeachers.slice(
    (currentPage - 1) * teachersPerPage,
    currentPage * teachersPerPage,
  )

  return (
    <>
      <Breadcrumb />
      <div className={styles['separator']} />
      <Card teachers={currentTeachers} />
      <Pagination
        currentPage={currentPage}
        totalItems={filteredTeachers.length}
        itemsPerPage={teachersPerPage}
        onChange={paginate}
      />
    </>
  )
}
