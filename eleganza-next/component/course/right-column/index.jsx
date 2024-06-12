import React, { useState, useEffect } from 'react'
import Card from '../card'
import Pagination from '../pagination'
import courseData from '../../../data/coursesData.json'
import teachersData from '../../../data/teachersData.json'
import { useRouter } from 'next/router'
import styles from './right-column.module.scss'

export default function Rightcolumn({ filters, sortOrder, searchCourseList }) {
  const [courseToFilter, setCourseToFilter] = useState(courseData)
  const [courses, setCourses] = useState(courseData)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalCourses, setTotalCourses] = useState(0) // 新增 totalCourses state
  const coursesPerPage = 6
  const router = useRouter()

  const applyFilters = (courses, filters) => {
    return courses.filter((course) => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true
        if (key === 'dateSearchRange') {
          const { startDate, endDate } = value
          if (!!startDate && !!endDate) {
            const courseStartDate = new Date(course.start_date)
            const startDateObj = new Date(startDate)
            const endDateObj = new Date(endDate)
            return (
              courseStartDate >= startDateObj && courseStartDate <= endDateObj
            )
          }
          return true
        }
        if (key === 't_years') {
          return value.includes(String(course.t_years))
        }
        if (key === 'course_style') {
          return value.includes(course.course_style)
        }
        return course[key] == value
      })
    })
  }

  const sortCourses = (courses, sortOrder) => {
    if (sortOrder === 'priceAsc') {
      return courses.slice().sort((a, b) => a.course_price - b.course_price)
    } else if (sortOrder === 'priceDesc') {
      return courses.slice().sort((a, b) => b.course_price - a.course_price)
    }
    return courses
  }

  const paginateCourses = (courses, currentPage, coursesPerPage) => {
    const indexOfLastCourse = currentPage * coursesPerPage
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage
    return courses.slice(indexOfFirstCourse, indexOfLastCourse)
  }

  const generateCourseData = (courseData, teachersData) => {
    const teacherMap = teachersData.reduce((map, teacher) => {
      map[teacher.teacher_id] = {
        t_years: teacher.t_years,
        t_name: teacher.t_name,
      }
      return map
    }, {})

    return courseData.map((course) => {
      const teacher = teacherMap[course.teacher_id]
      return {
        ...course,
        teacher_name: teacher ? teacher.t_name : '未指定',
        t_years: teacher ? teacher.t_years : null,
      }
    })
  }

  const updateCourses = (
    courseData,
    teachersData,
    filters,
    sortOrder,
    currentPage,
    coursesPerPage,
  ) => {
    const enhancedCourses = generateCourseData(courseData, teachersData)
    let filteredCourses = applyFilters(enhancedCourses, filters)
    filteredCourses = sortCourses(filteredCourses, sortOrder)
    const totalCourses = filteredCourses.length
    const currentCourses = paginateCourses(
      filteredCourses,
      currentPage,
      coursesPerPage,
    )
    return { totalCourses, currentCourses }
  }

  useEffect(() => {
    const { totalCourses, currentCourses } = updateCourses(
      courseToFilter,
      teachersData,
      filters,
      sortOrder,
      currentPage,
      coursesPerPage,
    )
    setTotalCourses(totalCourses)
    setCourses(currentCourses)
    const totalPages = Math.ceil(totalCourses / coursesPerPage)
    if (currentPage > totalPages) {
      setCurrentPage(1)
    }
  }, [courseToFilter, teachersData, filters, sortOrder, currentPage])

  useEffect(() => {
    if (searchCourseList.length > 0) {
      setCourseToFilter(searchCourseList)
      setCourses(searchCourseList)
    }
  }, [searchCourseList])

  const handleCardClick = (courseId) => {
    router.push(`/course/${courseId}`)
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className={styles['right-column']}>
      {courses.map((course, index) => (
        <Card
          key={index}
          course={course}
          onClick={() => handleCardClick(course.course_id)}
        />
      ))}
      {totalCourses > 0 && (
        <Pagination
          currentPage={currentPage}
          totalCourses={totalCourses} // 传递 totalCourses
          coursesPerPage={coursesPerPage}
          onChange={handlePageChange}
        />
      )}
    </div>
  )
}
