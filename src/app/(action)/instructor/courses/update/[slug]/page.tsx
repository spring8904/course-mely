'use client'
import React from 'react'
import CourseUpdateView from '@/sections/instructor/view/course-update-view'
import { useParams } from 'next/navigation'

const CourseUpdatePage = () => {
  const { slug } = useParams()
  return <CourseUpdateView slug={slug as string} />
}

export default CourseUpdatePage
