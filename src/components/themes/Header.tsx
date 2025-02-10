'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useAuthStore } from '@/stores/useAuthStore'
import Swal from 'sweetalert2'

import { useLogOut } from '@/hooks/auth/logout'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const Header = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const { user, isAuthenticated } = useAuthStore()
  const { isPending, mutate } = useLogOut()

  const data: any = [
    { type: 'course', name: 'Next.js Basics' },
    { type: 'course', name: 'React Advanced' },
    { type: 'article', name: 'Introduction to JavaScript' },
    { type: 'article', name: 'Understanding APIs' },
    { type: 'instructor', name: 'John Doe' },
    { type: 'instructor', name: 'Jane Smith' },
  ]

  const handleSearch = (e: any) => {
    const value = e.target.value
    setQuery(value)

    if (value.trim() === '') {
      setResults([])
    } else {
      const filteredResults = data.filter((item: any) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      )
      setResults(filteredResults)
    }
  }

  const handleLogout = () => {
    if (isPending) return

    Swal.fire({
      title: 'Bạn có chắc muốn đăng xuất?',
      text: 'Bạn sẽ cần đăng nhập lại để tiếp tục!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#E27447',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Đăng xuất',
      cancelButtonText: 'Hủy',
    }).then((result: any) => {
      if (result.isConfirmed) {
        mutate()
      }
    })
  }

  return (
    <>
      <div className="preload preload-container">
        <div className="middle"></div>
      </div>
      <div className="tf-top-bar flex items-center justify-center">
        <div className="whitespace-nowrap">
          <p className="inline-block animate-slideLoop">
            Chào mừng bạn đến với nền tảng học tập trực tuyến tại CourseMeLy
          </p>
        </div>
      </div>
      <header id="header_main" className="header">
        <div className="header-inner">
          <div className="header-inner-wrap">
            <div className="header-left">
              <a
                className="mobile-nav-toggler mobile-button d-lg-none flex"
                href="#menu"
              ></a>
              <div id="site-logo">
                <Link href="/" rel="home">
                  <Image
                    id="logo-header"
                    src="/images/logo/logo.svg"
                    width={100}
                    height={100}
                    style={{ width: '100%' }}
                    alt=""
                  />
                </Link>
              </div>
              <nav className="main-menu">
                <ul className="navigation">
                  <li className="current">
                    <Link href="/">Trang chủ</Link>
                  </li>
                  <li className="">
                    <Link href="/courses">Khoá học</Link>
                  </li>
                  <li className="">
                    <Link href="/blogs">Bài viết</Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="header-right grow justify-end">
              <a
                className="header-search-icon flex items-center justify-center"
                href="#canvasSearch"
                data-bs-toggle="offcanvas"
                aria-controls="offcanvasLeft"
              >
                <i className="icon-search fs-20"></i>
              </a>
              <a
                href="#"
                className="header-cart flex items-center justify-center"
              >
                <i className="icon-shopcart fs-18"></i>
              </a>
              {isAuthenticated ? (
                <>
                  <div className="dropdown">
                    <a
                      href="#"
                      role="button"
                      id="dropdownMenuLink"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <Avatar className="size-12">
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="@shadcn"
                        />
                        <AvatarFallback>SC</AvatarFallback>
                      </Avatar>
                    </a>
                    <ul
                      className="dropdown-menu !mt-2 !w-[240px] !rounded-lg !bg-white !p-4 !text-base *:cursor-pointer"
                      aria-labelledby="dropdownMenuLink"
                    >
                      <div>
                        <span className="text-xl">Xin chào:</span>
                        <span className="ml-2 text-xl text-orange-500">
                          {user?.name}
                        </span>
                      </div>
                      <li className="mt-4">
                        <a
                          href="#"
                          className="dropdown-item !block !w-full !rounded-lg !bg-transparent !p-4 !font-medium !transition-colors !duration-200 hover:!bg-[#FFEFEA] hover:!text-[#E27447]"
                        >
                          Thông tin cá nhân
                        </a>
                        <a
                          href="#"
                          className="dropdown-item !block !w-full !rounded-lg !bg-transparent !p-4 !font-medium !transition-colors !duration-200 hover:!bg-[#FFEFEA] hover:!text-[#E27447]"
                        >
                          Khoá học của tôi
                        </a>
                        <a
                          href="#"
                          className="dropdown-item !block !w-full !rounded-lg !bg-transparent !p-4 !font-medium !transition-colors !duration-200 hover:!bg-[#FFEFEA] hover:!text-[#E27447]"
                        >
                          Bảng điều khiển giảng viên
                        </a>
                        <div
                          onClick={handleLogout}
                          className="dropdown-item !block !w-full !rounded-lg !bg-transparent !p-4 !font-medium !transition-colors !duration-200 hover:!bg-[#FFEFEA] hover:!text-[#E27447]"
                        >
                          Đăng xuất
                        </div>
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <div className="header-btn">
                    <div className="header-login">
                      <Link
                        href="/sign-up"
                        className="tf-button-default header-text"
                      >
                        Đăng ký
                      </Link>
                    </div>
                    <div className="header-register">
                      <Link
                        href="/sign-in"
                        className="tf-button-default active header-text"
                      >
                        Đăng nhập
                      </Link>
                    </div>
                    <div className="header-join d-lg-none flex">
                      <a href="login.html" className="fs-15">
                        Join
                      </a>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <nav className="d-lg-none" id="menu">
          <a className="close" aria-label="Close menu" href="#wrapper">
            <i className="flaticon-close-1"></i>
          </a>
          <ul>
            <li>
              <span>Categories</span>
              <ul>
                <li>
                  <span>Graphics & Design</span>
                  <ul>
                    <li>
                      <a href="#">Human Resources</a>
                    </li>
                    <li>
                      <a href="#">Operations</a>
                    </li>
                    <li>
                      <a href="#">Supply Chain Management</a>
                    </li>
                    <li>
                      <a href="#">Customer Service</a>
                    </li>
                    <li>
                      <a href="#">Manufacturing</a>
                    </li>
                    <li>
                      <a href="#">Health And Safety</a>
                    </li>
                    <li>
                      <a href="#">Quality Management</a>
                    </li>
                    <li>
                      <a href="#">E-commerce</a>
                    </li>
                    <li>
                      <a href="#">Management</a>
                    </li>
                    <li>
                      <a href="#">Sales</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <span>Digital Marketing</span>
                  <ul>
                    <li>
                      <a href="#">Human Resources</a>
                    </li>
                    <li>
                      <a href="#">Operations</a>
                    </li>
                    <li>
                      <a href="#">Supply Chain Management</a>
                    </li>
                    <li>
                      <a href="#">Customer Service</a>
                    </li>
                    <li>
                      <a href="#">Manufacturing</a>
                    </li>
                    <li>
                      <a href="#">Health And Safety</a>
                    </li>
                    <li>
                      <a href="#">Quality Management</a>
                    </li>
                    <li>
                      <a href="#">E-commerce</a>
                    </li>
                    <li>
                      <a href="#">Management</a>
                    </li>
                    <li>
                      <a href="#">Sales</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <span>Business</span>
                  <ul>
                    <li>
                      <a href="#">Human Resources</a>
                    </li>
                    <li>
                      <a href="#">Operations</a>
                    </li>
                    <li>
                      <a href="#">Supply Chain Management</a>
                    </li>
                    <li>
                      <a href="#">Customer Service</a>
                    </li>
                    <li>
                      <a href="#">Manufacturing</a>
                    </li>
                    <li>
                      <a href="#">Health And Safety</a>
                    </li>
                    <li>
                      <a href="#">Quality Management</a>
                    </li>
                    <li>
                      <a href="#">E-commerce</a>
                    </li>
                    <li>
                      <a href="#">Management</a>
                    </li>
                    <li>
                      <a href="#">Sales</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <span>Music & Audio</span>
                  <ul>
                    <li>
                      <a href="#">Human Resources</a>
                    </li>
                    <li>
                      <a href="#">Operations</a>
                    </li>
                    <li>
                      <a href="#">Supply Chain Management</a>
                    </li>
                    <li>
                      <a href="#">Customer Service</a>
                    </li>
                    <li>
                      <a href="#">Manufacturing</a>
                    </li>
                    <li>
                      <a href="#">Health And Safety</a>
                    </li>
                    <li>
                      <a href="#">Quality Management</a>
                    </li>
                    <li>
                      <a href="#">E-commerce</a>
                    </li>
                    <li>
                      <a href="#">Management</a>
                    </li>
                    <li>
                      <a href="#">Sales</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <span>Data</span>
                  <ul>
                    <li>
                      <a href="#">Human Resources</a>
                    </li>
                    <li>
                      <a href="#">Operations</a>
                    </li>
                    <li>
                      <a href="#">Supply Chain Management</a>
                    </li>
                    <li>
                      <a href="#">Customer Service</a>
                    </li>
                    <li>
                      <a href="#">Manufacturing</a>
                    </li>
                    <li>
                      <a href="#">Health And Safety</a>
                    </li>
                    <li>
                      <a href="#">Quality Management</a>
                    </li>
                    <li>
                      <a href="#">E-commerce</a>
                    </li>
                    <li>
                      <a href="#">Management</a>
                    </li>
                    <li>
                      <a href="#">Sales</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <span>Video & Animation</span>
                  <ul>
                    <li>
                      <a href="#">Human Resources</a>
                    </li>
                    <li>
                      <a href="#">Operations</a>
                    </li>
                    <li>
                      <a href="#">Supply Chain Management</a>
                    </li>
                    <li>
                      <a href="#">Customer Service</a>
                    </li>
                    <li>
                      <a href="#">Manufacturing</a>
                    </li>
                    <li>
                      <a href="#">Health And Safety</a>
                    </li>
                    <li>
                      <a href="#">Quality Management</a>
                    </li>
                    <li>
                      <a href="#">E-commerce</a>
                    </li>
                    <li>
                      <a href="#">Management</a>
                    </li>
                    <li>
                      <a href="#">Sales</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <span>Photography</span>
                  <ul>
                    <li>
                      <a href="#">Human Resources</a>
                    </li>
                    <li>
                      <a href="#">Operations</a>
                    </li>
                    <li>
                      <a href="#">Supply Chain Management</a>
                    </li>
                    <li>
                      <a href="#">Customer Service</a>
                    </li>
                    <li>
                      <a href="#">Manufacturing</a>
                    </li>
                    <li>
                      <a href="#">Health And Safety</a>
                    </li>
                    <li>
                      <a href="#">Quality Management</a>
                    </li>
                    <li>
                      <a href="#">E-commerce</a>
                    </li>
                    <li>
                      <a href="#">Management</a>
                    </li>
                    <li>
                      <a href="#">Sales</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <span>Lifestyle</span>
                  <ul>
                    <li>
                      <a href="#">Human Resources</a>
                    </li>
                    <li>
                      <a href="#">Operations</a>
                    </li>
                    <li>
                      <a href="#">Supply Chain Management</a>
                    </li>
                    <li>
                      <a href="#">Customer Service</a>
                    </li>
                    <li>
                      <a href="#">Manufacturing</a>
                    </li>
                    <li>
                      <a href="#">Health And Safety</a>
                    </li>
                    <li>
                      <a href="#">Quality Management</a>
                    </li>
                    <li>
                      <a href="#">E-commerce</a>
                    </li>
                    <li>
                      <a href="#">Management</a>
                    </li>
                    <li>
                      <a href="#">Sales</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <span>Writing & Translation</span>
                  <ul>
                    <li>
                      <a href="#">Human Resources</a>
                    </li>
                    <li>
                      <a href="#">Operations</a>
                    </li>
                    <li>
                      <a href="#">Supply Chain Management</a>
                    </li>
                    <li>
                      <a href="#">Customer Service</a>
                    </li>
                    <li>
                      <a href="#">Manufacturing</a>
                    </li>
                    <li>
                      <a href="#">Health And Safety</a>
                    </li>
                    <li>
                      <a href="#">Quality Management</a>
                    </li>
                    <li>
                      <a href="#">E-commerce</a>
                    </li>
                    <li>
                      <a href="#">Management</a>
                    </li>
                    <li>
                      <a href="#">Sales</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <span>Programming & Tech</span>
                  <ul>
                    <li>
                      <a href="#">Human Resources</a>
                    </li>
                    <li>
                      <a href="#">Operations</a>
                    </li>
                    <li>
                      <a href="#">Supply Chain Management</a>
                    </li>
                    <li>
                      <a href="#">Customer Service</a>
                    </li>
                    <li>
                      <a href="#">Manufacturing</a>
                    </li>
                    <li>
                      <a href="#">Health And Safety</a>
                    </li>
                    <li>
                      <a href="#">Quality Management</a>
                    </li>
                    <li>
                      <a href="#">E-commerce</a>
                    </li>
                    <li>
                      <a href="#">Management</a>
                    </li>
                    <li>
                      <a href="#">Sales</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li className="current">
              <span>Home</span>
              <ul>
                <li className="current">
                  <a href="index.html">Home Page 01</a>
                </li>
                <li>
                  <a href="home-02.html">Home Page 02</a>
                </li>
                <li>
                  <a href="home-03.html">Home Page 03</a>
                </li>
                <li>
                  <a href="home-04.html">Home Page 04</a>
                </li>
                <li>
                  <a href="home-05.html">Home Page 05</a>
                </li>
                <li>
                  <a href="home-06.html">Home Page 06</a>
                </li>
                <li>
                  <a href="home-07.html">Home Page 07</a>
                </li>
                <li>
                  <a href="home-08.html">Home Page 08</a>
                </li>
                <li>
                  <a href="home-09.html">Home Page 09</a>
                </li>
                <li>
                  <a href="home-10.html">Home Page 10</a>
                </li>
              </ul>
            </li>
            <li>
              <span>Courses</span>
              <ul>
                <li>
                  <span>Course List</span>
                  <ul>
                    <li>
                      <a href="#">Course Grid Basic</a>
                    </li>
                    <li>
                      <a href="#">Course Grid Modern</a>
                    </li>
                    <li>
                      <a href="#">Course Grid Left Sidebar</a>
                    </li>
                    <li>
                      <a href="#">Course Grid Right Sidebar</a>
                    </li>
                    <li>
                      <a href="course-list-sidebar.html">Course List Sidebar</a>
                    </li>
                    <li>
                      <a href="all-list-style.html">Course All List Style</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <span>Course Single</span>
                  <ul>
                    <li>
                      <a href="#">Course Single 01</a>
                    </li>
                    <li>
                      <a href="#">Course Single 02</a>
                    </li>
                    <li>
                      <a href="#">Course Single 03</a>
                    </li>
                    <li>
                      <a href="#">Course Single 04</a>
                    </li>
                    <li>
                      <a href="#">Course Single 05</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <span>Course Category</span>
                  <ul>
                    <li>
                      <a href="#">Coaching</a>
                    </li>
                    <li>
                      <a href="#">Categories</a>
                    </li>
                    <li>
                      <a href="#">Online Business</a>
                    </li>
                    <li>
                      <a href="#">Photography</a>
                    </li>
                    <li>
                      <a href="#">Music & Audio</a>
                    </li>
                    <li>
                      <a href="#">Photography</a>
                    </li>
                    <li>
                      <a href="#">Programming & Tech</a>
                    </li>
                    <li>
                      <a href="#">Graphics & Design</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <span>Pages</span>
              <ul>
                <li>
                  <a href="instructor-list.html">Instructor List</a>
                </li>
                <li>
                  <a href="instructor-single.html">Instructor Single</a>
                </li>
                <li>
                  <a href="become-teacher.html">Become a Teacher</a>
                </li>
                <li>
                  <a href="event-list.html">Event List </a>
                </li>
                <li>
                  <a href="event-single.html">Event Single</a>
                </li>
                <li>
                  <a href="about.html">About</a>
                </li>
                <li>
                  <a href="contact.html">Contact</a>
                </li>
                <li>
                  <a href="help-center.html">Help Center</a>
                </li>
                <li>
                  <a href="pricing.html">Pricing</a>
                </li>
                <li>
                  <a href="faq.html">Faq</a>
                </li>
                <li>
                  <a href="terms.html">Terms</a>
                </li>
                <li>
                  <a href="404.html">404</a>
                </li>
                <li>
                  <a href="login.html">Login</a>
                </li>
                <li>
                  <a href="register.html">Register</a>
                </li>
                <li>
                  <a href="instructor-dashboard.html">Instructor Dashboard</a>
                </li>
                <li>
                  <a href="student-dashboard.html">Student Dashboard</a>
                </li>
                <li>
                  <a href="ui-elements.html">UI elements</a>
                </li>
              </ul>
            </li>
            <li>
              <span>Blog</span>
              <ul>
                <li>
                  <a href="blog-grid.html">Blog Grid</a>
                </li>
                <li>
                  <a href="blog-list-v1.html">Blog List 01</a>
                </li>
                <li>
                  <a href="blog-list-v2.html">Blog List 02</a>
                </li>
                <li>
                  <a href="blog-single.html">Blog Single</a>
                </li>
              </ul>
            </li>
            <li>
              <span>Shop</span>
              <ul>
                <li>
                  <a href="shop-list.html">Shop List</a>
                </li>
                <li>
                  <a href="shop-single.html">Shop Single</a>
                </li>
                <li>
                  <a href="shop-cart.html">Shop Cart</a>
                </li>
                <li>
                  <a href="shop-checkout.html">Shop Checkout</a>
                </li>
                <li>
                  <a href="shop-order.html">Shop Order</a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </header>
      <div
        className="offcanvas offcanvas-top offcanvas-search"
        id="canvasSearch"
      >
        <i
          className="flaticon-close-1 btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></i>
        <div className="tf-container">
          <div className="row">
            <div className="col-12">
              <div className="offcanvas-body">
                <form action="#" className="form-search-courses">
                  <div className="icon">
                    <i className="icon-keyboard"></i>
                  </div>
                  <fieldset>
                    <input
                      className=""
                      type="text"
                      placeholder="Tìm kiếm khoá học, bài viết, người hướng dẫn..."
                      name="text"
                      value={query}
                      onChange={handleSearch}
                      aria-required="true"
                    />
                  </fieldset>
                  <div className="button-submit">
                    <button
                      className=""
                      type="submit"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="icon-search fs-20"></i>
                    </button>
                  </div>
                </form>
                {results.length > 0 && (
                  <ul>
                    {results.map((result: any, index) => (
                      <li key={index}>
                        <strong>{result?.type}:</strong> {result?.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
