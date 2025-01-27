'use client'

import {
  Home,
  BookOpen,
  Star,
  Heart,
  FileQuestion,
  ShoppingCart,
  Settings,
  LogOut,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import MeDashBoard from './dashboard/dashboard'
import MeMyCourses from './my-courses/my-courses'
import MeReview from './reviews/reviews'
import MeWishList from './wishlist/wishlist'
import MeOrder from './order/order'
import MeQuizzes from './quizzes/quizzes'
import MeSetting from './settings/settings'

const menuItems = [
  { icon: Home, label: 'Dashboard', component: <MeDashBoard /> },
  { icon: BookOpen, label: 'My Courses', component: <MeMyCourses /> },
  { icon: Star, label: 'Reviews', component: <MeReview /> },
  {
    icon: Heart,
    label: 'Wishlist',
    href: 'me/settings',
    component: <MeWishList />,
  },
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
        {/* instructors-dashboard> */}
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
