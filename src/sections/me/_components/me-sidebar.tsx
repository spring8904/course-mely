'use client'

import { useEffect, useState } from 'react'
import {
  BookOpen,
  FileQuestion,
  Heart,
  Home,
  LogOut,
  Settings,
  ShoppingCart,
  Star,
} from 'lucide-react'

import MeDashBoard from './dashboard/dashboard'
import MeMyCourses from './my-courses/my-courses'
import MeOrder from './order/order'
import MeQuizzes from './quizzes/quizzes'
import MeReview from './reviews/reviews'
import MeSetting from './settings/settings'
import MeWishList from './wishlist/wishlist'

const menuItems = [
  { icon: Home, label: 'Dashboard', component: <MeDashBoard /> },
  { icon: BookOpen, label: 'My Courses', component: <MeMyCourses /> },
  { icon: Star, label: 'Reviews', component: <MeReview /> },
  { icon: Heart, label: 'Wishlist', component: <MeWishList /> },
  {
    icon: FileQuestion,
    label: 'Quizzes',
    component: <MeQuizzes />,
  },
  { icon: ShoppingCart, label: 'Order', component: <MeOrder /> },
  { icon: Settings, label: 'Settings', component: <MeSetting /> },
  { icon: LogOut, label: 'Logout', component: <div> logout</div> },
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
      <div className="">
        <div className="dashboard-title">STUDENT DASHBOARD</div>
        {/* <a className="dashboard-item active"instructors-dashboard>
          <i className="flaticon-activity"></i>
          Dashboard
        </a> */}
        {menuItems.map((item, index) => {
          const Icon = item.icon
          const isActive = index === activeIndex
          return (
            <button
              key={item.label}
              onClick={() => {
                setActiveIndex(index)
                onSelect(item.component)
              }}
              className={`dashboard-item ${
                isActive ? 'active' : 'hover:bg-blue-900/50'
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default MeSideBar
