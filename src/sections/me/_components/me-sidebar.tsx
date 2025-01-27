'use client'

import { useEffect, useState } from 'react'
import MeDashBoard from './dashboard/dashboard'
import MeMyCourses from './my-courses/my-courses'
import MeReview from './reviews/reviews'
import MeWishList from './wishlist/wishlist'
import MeOrder from './order/order'
import MeQuizzes from './quizzes/quizzes'
import MeSetting from './settings/settings'

const menuItems = [
  {
    icon: <i className="flaticon-activity"></i>,
    label: 'Dashboard',
    component: <MeDashBoard />,
  },
  {
    icon: <i className="flaticon-play-1"></i>,
    label: 'My Courses',
    component: <MeMyCourses />,
  },
  {
    icon: <i className="flaticon-message-1"></i>,
    label: 'Reviews',
    component: <MeReview />,
  },
  {
    icon: <i className="flaticon-heart"></i>,
    label: 'Wishlist',
    href: 'me/settings',
    component: <MeWishList />,
  },
  {
    icon: <i className="flaticon-question"></i>,
    label: 'Quizzes',
    component: <MeQuizzes />,
  },
  {
    icon: <i className="flaticon-bag"></i>,
    label: 'Order',
    component: <MeOrder />,
  },
  {
    icon: <i className="flaticon-setting-1"></i>,
    label: 'Settings',
    component: <MeSetting />,
  },
  {
    icon: <i className="flaticon-export"></i>,
    label: 'Logout',
    component: <div> logout</div>,
  },
]
const MeSideBar = ({
  onSelect,
}: {
  onSelect: (component: React.ReactNode) => void
}) => {
  const [activeIndex, setActiveIndex] = useState(0)
  useEffect(() => {
    onSelect(menuItems[activeIndex].component)
  }, [activeIndex, onSelect])
  return (
    <div className="dashboard_navigationbar">
      <div className="dropbtn">
        <i className="icon-home"></i> Dashboard Navigation
      </div>
      <div className="instructors-dashboard">
        <div className="dashboard-title">STUDENT DASHBOARD</div>
        {menuItems.map((item, index) => {
          const isActive = index === activeIndex
          return (
            <div
              key={item.label}
              onClick={() => {
                setActiveIndex(index)
                onSelect(item.component)
              }}
              className={`dashboard-item cursor-pointer ${
                isActive ? 'active' : 'hover:bg-blue-900/50'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MeSideBar
