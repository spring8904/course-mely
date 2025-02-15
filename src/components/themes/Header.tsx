'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useAuthStore } from '@/stores/useAuthStore'
import { useWishListStore } from '@/stores/useWishListStore'
import Swal from 'sweetalert2'

import { useLogOut } from '@/hooks/auth/useLogOut'
import { useGetCategories } from '@/hooks/category/useCategory'
import { useGetWishLists } from '@/hooks/wish-list/useWishList'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import WishListIcon from '@/components/common/WishListIcon'

const MobileMenu = dynamic(() => import('./MobileMenu'), {
  ssr: false,
})

const Header = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const { user, isAuthenticated } = useAuthStore()
  const { isPending, mutate } = useLogOut()
  const [categories, setCategories] = useState<any[]>([])
  const { data: wishListData } = useGetWishLists()
  const setWishList = useWishListStore((state) => state.setWishList)
  useGetWishLists()
  const { data: categoryData } = useGetCategories()

  useEffect(() => {
    if (wishListData) {
      const ids = wishListData?.data.map((item: any) => item.course_id)
      setWishList(ids)
    }
  }, [wishListData, setWishList])

  useEffect(() => {
    if (categoryData) {
      setCategories(categoryData?.data)
    }
  }, [categoryData])

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
      {/*<div className="preload preload-container">*/}
      {/*  <div className="middle"></div>*/}
      {/*</div>*/}
      <div className="tf-top-bar overflow-x-hidden">
        <p className="h-full animate-slide-loop whitespace-nowrap">
          Chào mừng bạn đến với nền tảng học tập trực tuyến tại CourseMeLy
        </p>
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
                  <li className="has-children">
                    <a href="javascript:void(0);">Danh mục</a>
                    <ul>
                      {categories.map((category: any) => (
                        <li key={category.id}>
                          <Link
                            style={{
                              width: '100%',
                              display: 'block',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                            href={`/categories/${category.slug}`}
                          >
                            {category.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
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
            <div className="header-right grow !justify-end">
              <a
                className="header-search-icon flex items-center justify-center"
                href="#canvasSearch"
                data-bs-toggle="offcanvas"
                aria-controls="offcanvasLeft"
              >
                <i className="icon-search fs-20"></i>
              </a>
              <WishListIcon />
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
                      <Avatar className="size-8">
                        <AvatarImage
                          src={
                            user?.avatar || '/assets/images/avatar/user-1.png'
                          }
                          alt="@shadcn"
                        />
                        <AvatarFallback>Avatar</AvatarFallback>
                      </Avatar>
                    </a>
                    <ul
                      className="dropdown-menu !mt-2 !min-w-[240px] !rounded-lg !bg-white !p-0 !text-base *:cursor-pointer"
                      aria-labelledby="dropdownMenuLink"
                    >
                      <li>
                        <Link href={'/me'}>
                          <div className="flex items-center space-x-2 p-[16px]">
                            <Avatar className="size-16">
                              <AvatarImage
                                src={
                                  user?.avatar ||
                                  '/assets/images/avatar/user-1.png'
                                }
                                alt="@shadcn"
                              />
                              <AvatarFallback>Avatar</AvatarFallback>
                            </Avatar>

                            <div className="space-y-1">
                              <div className="text-lg">{user?.name}</div>
                              <div className="text-sm text-gray-400">
                                {user?.email}
                              </div>
                            </div>
                          </div>
                        </Link>
                      </li>

                      <li
                        style={{
                          borderTop: '1px solid #0000002d',
                        }}
                      >
                        <Link
                          href="#"
                          className="dropdown-item !block !w-full !rounded-lg !bg-transparent !px-4 !py-2 !text-sm !font-medium !transition-colors !duration-200 hover:!bg-[#FFEFEA] hover:!text-[#E27447]"
                        >
                          Học tập
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="dropdown-item !block !w-full !rounded-lg !bg-transparent !px-4 !py-2 !text-sm !font-medium !transition-colors !duration-200 hover:!bg-[#FFEFEA] hover:!text-[#E27447]"
                        >
                          Giỏ hàng của tôi
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="dropdown-item !block !w-full !rounded-lg !bg-transparent !px-4 !py-2 !text-sm !font-medium !transition-colors !duration-200 hover:!bg-[#FFEFEA] hover:!text-[#E27447]"
                        >
                          Mong muốn
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/become-an-instructor"
                          className="dropdown-item !block !w-full !rounded-lg !bg-transparent !px-4 !py-2 !text-sm !font-medium !transition-colors !duration-200 hover:!bg-[#FFEFEA] hover:!text-[#E27447]"
                        >
                          Giảng dạy trên CourseMeLy
                        </Link>
                      </li>

                      <li
                        style={{
                          borderTop: '1px solid #0000002d',
                        }}
                      >
                        <Link
                          href="#"
                          className="dropdown-item !block !w-full !rounded-lg !bg-transparent !px-4 !py-2 !text-sm !font-medium !transition-colors !duration-200 hover:!bg-[#FFEFEA] hover:!text-[#E27447]"
                        >
                          Thông báo
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="dropdown-item !block !w-full !rounded-lg !bg-transparent !px-4 !py-2 !text-sm !font-medium !transition-colors !duration-200 hover:!bg-[#FFEFEA] hover:!text-[#E27447]"
                        >
                          Tin nhắn
                        </Link>
                      </li>

                      <li
                        style={{
                          borderTop: '1px solid #0000002d',
                        }}
                      >
                        <Link
                          href="#"
                          className="dropdown-item !block !w-full !rounded-lg !bg-transparent !px-4 !py-2 !text-sm !font-medium !transition-colors !duration-200 hover:!bg-[#FFEFEA] hover:!text-[#E27447]"
                        >
                          Cài đặt tài khoản
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="dropdown-item !block !w-full !rounded-lg !bg-transparent !px-4 !py-2 !text-sm !font-medium !transition-colors !duration-200 hover:!bg-[#FFEFEA] hover:!text-[#E27447]"
                        >
                          Phương thức thanh toán
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="dropdown-item !block !w-full !rounded-lg !bg-transparent !px-4 !py-2 !text-sm !font-medium !transition-colors !duration-200 hover:!bg-[#FFEFEA] hover:!text-[#E27447]"
                        >
                          Thuê bao
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="dropdown-item !block !w-full !rounded-lg !bg-transparent !px-4 !py-2 !text-sm !font-medium !transition-colors !duration-200 hover:!bg-[#FFEFEA] hover:!text-[#E27447]"
                        >
                          Ưu đãi
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="dropdown-item !block !w-full !rounded-lg !bg-transparent !px-4 !py-2 !text-sm !font-medium !transition-colors !duration-200 hover:!bg-[#FFEFEA] hover:!text-[#E27447]"
                        >
                          Lịch sử mua
                        </Link>
                      </li>

                      <li
                        style={{
                          borderTop: '1px solid #0000002d',
                        }}
                      >
                        <Link
                          href="#"
                          className="dropdown-item !block !w-full !rounded-lg !bg-transparent !px-4 !py-2 !text-sm !font-medium !transition-colors !duration-200 hover:!bg-[#FFEFEA] hover:!text-[#E27447]"
                        >
                          Hồ sơ công khai
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="dropdown-item !block !w-full !rounded-lg !bg-transparent !px-4 !py-2 !text-sm !font-medium !transition-colors !duration-200 hover:!bg-[#FFEFEA] hover:!text-[#E27447]"
                        >
                          Chỉnh sửa hồ sơ
                        </Link>
                      </li>

                      <li
                        style={{
                          borderTop: '1px solid #0000002d',
                        }}
                      >
                        <Link
                          href="#"
                          className="dropdown-item !block !w-full !rounded-lg !bg-transparent !px-4 !py-2 !text-sm !font-medium !transition-colors !duration-200 hover:!bg-[#FFEFEA] hover:!text-[#E27447]"
                        >
                          Trợ giúp và Hỗ trợ
                        </Link>
                      </li>
                      <li>
                        <div
                          onClick={handleLogout}
                          className="dropdown-item !block !w-full !rounded-lg !bg-transparent !px-4 !py-2 !text-sm !font-medium !transition-colors !duration-200 hover:!bg-[#FFEFEA] hover:!text-[#E27447]"
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
                    <div className="header-join flex lg:hidden">
                      <Link href="/sign-in" className="fs-15">
                        Join
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <MobileMenu />
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
