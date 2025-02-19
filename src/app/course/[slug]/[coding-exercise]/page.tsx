'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'

import CourseCodingView from '@/sections/instructor/_components/courses/course-coding-view'

interface Props {
  params: {
    slug: string
    coding: string
  }
}

const CourseExercisePage = ({ params }: Props) => {
  const searchParams = useSearchParams()
  const { slug } = params
  const coding = searchParams.get('coding')

  return <CourseCodingView slug={slug} coding={coding} />
}

export default CourseExercisePage
