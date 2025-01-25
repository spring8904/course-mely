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
import { useState } from 'react'
import StudentDashBoard from './student-dashboard'
import StudentMyCourses from './student-my-courses'

const menuItems = [
  { icon: Home, label: 'Dashboard', component: <StudentDashBoard /> },
  { icon: BookOpen, label: 'My Courses', component: <StudentMyCourses /> },
  { icon: Star, label: 'Reviews', component: <div>Reviews Content</div> },
  { icon: Heart, label: 'Wishlist', component: <div>Wishlist Content</div> },
  {
    icon: FileQuestion,
    label: 'Quizzes',
    component: <div>Quizzes Content</div>,
  },
  { icon: ShoppingCart, label: 'Order', component: <div>Order Content</div> },
  { icon: Settings, label: 'Settings', component: <div>Settings Content</div> },
  { icon: LogOut, label: 'Logout', component: <div>Logout Content</div> },
]

export default function Sidebar({
  onSelect,
}: {
  onSelect: (component: React.ReactNode) => void
}) {
  console.log('onSelect function:', onSelect)
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="dashboard_navigationbar h-screen bg-[#14183E] p-6 text-white">
      <div className="dropbtn mb-6 flex items-center space-x-3 text-sm font-semibold uppercase">
        <Home size={20} />
        <span>Dashboard Navigation</span>
      </div>
      <div className="instructors-dashboard">
        <div className="dashboard-title mb-4 text-lg font-bold">
          STUDENT DASHBOARD
        </div>
        <nav className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon
            const isActive = index === activeIndex

            return (
              <button
                key={item.label}
                onClick={() => {
                  console.log('Clicked:', item.label)
                  setActiveIndex(index)
                  onSelect(item.component)
                }}
                className={`dashboard-item flex w-full items-center space-x-3 rounded-lg px-4 py-3 transition-colors ${
                  isActive ? 'bg-blue-600' : 'hover:bg-blue-900/50'
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

// phần không có giao diện
// 'use client'

// import {
//   Home,
//   BookOpen,
//   Star,
//   Heart,
//   FileQuestion,
//   ShoppingCart,
//   Settings,
//   LogOut,
// } from 'lucide-react'
// import { useState } from 'react'
// import StudentDashBoard from './student-dashboard'
// import StudentMyCourses from './student-my-courses'
// const menuItems = [
//   { icon: Home, label: 'Dashboard', component: <StudentDashBoard /> },
//   {
//     icon: BookOpen,
//     label: 'My Courses',
//     component: <StudentMyCourses />,
//   },
//   { icon: Star, label: 'Reviews', component: <div>Reviews Content</div> },
//   { icon: Heart, label: 'Wishlist', component: <div>Wishlist Content</div> },
//   {
//     icon: FileQuestion,
//     label: 'Quizzes',
//     component: <div>Quizzes Content</div>,
//   },
//   { icon: ShoppingCart, label: 'Order', component: <div>Order Content</div> },
//   { icon: Settings, label: 'Settings', component: <div>Settings Content</div> },
//   { icon: LogOut, label: 'Logout', component: <div>Logout Content</div> },
// ]

// export default function Sidebar({
//   onSelect,
// }: {
//   onSelect: (component: React.ReactNode) => void
// }) {
//   const [activeIndex, setActiveIndex] = useState(0)

//   return (
//     <div className="h-screen w-64 bg-[#14183E] p-6 text-white">
//       <div className="mb-6 text-sm font-semibold uppercase">
//         Student Dashboard
//       </div>
//       <nav className="space-y-2">
//         {menuItems.map((item, index) => {
//           const Icon = item.icon
//           const isActive = index === activeIndex

//           return (
//             <button
//               key={item.label}
//               onClick={() => {
//                 setActiveIndex(index)
//                 onSelect(item.component)
//               }}
//               className={`flex w-full items-center space-x-3 rounded-lg px-4 py-3 transition-colors ${
//                 isActive ? 'bg-blue-600' : 'hover:bg-blue-900/50'
//               }`}
//             >
//               <Icon size={20} />
//               <span>{item.label}</span>
//             </button>
//           )
//         })}
//       </nav>
//     </div>
//   )
// }
