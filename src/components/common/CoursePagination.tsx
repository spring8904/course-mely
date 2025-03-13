import React from 'react'
import { ICourseDataResponse } from '@/types'

type Props = {
  data: ICourseDataResponse
  handlePageChange: (pageUrl?: string | null) => void
}

export const CoursePagination = ({ data, handlePageChange }: Props) => {
  return (
    <div className="mt-10 flex items-center justify-center">
      <ul className="flex items-center gap-1 rounded-lg">
        {data.links.map((link, index) => {
          const isEllipsis = link.label.includes('...')
          const isPrevious = link.label.includes('&laquo;')
          const isNext = link.label.includes('&raquo;')
          const baseClasses =
            'flex items-center justify-center h-10 min-w-10 rounded-md transition-colors'
          const activeClasses = link.active
            ? 'bg-orange-500 text-white font-medium'
            : 'bg-gray-100 hover:bg-orange-100 text-gray-700'

          return (
            <li key={index}>
              {isEllipsis ? (
                <span className="px-3 text-gray-500">...</span>
              ) : (
                <button
                  className={`${baseClasses} ${activeClasses} ${isPrevious || isNext ? 'px-3' : 'px-4'}`}
                  onClick={() => {
                    if (link.url) {
                      handlePageChange(link.url)
                    }
                  }}
                  disabled={!link.url}
                  aria-label={
                    isPrevious
                      ? 'Previous page'
                      : isNext
                        ? 'Next page'
                        : `Page ${link.label}`
                  }
                >
                  {isPrevious ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m15 18-6-6 6-6" />
                    </svg>
                  ) : isNext ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  ) : (
                    <span>{link.label}</span>
                  )}
                </button>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
