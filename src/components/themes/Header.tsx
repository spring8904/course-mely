'use client'

import { useAuthStore } from '@/stores/useAuthStore'
import { useWishListStore } from '@/stores/useWishListStore'
import { Bell, CheckCircle, Loader2, Search } from 'lucide-react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

import { Role } from '@/constants/role'
import { useLogOut } from '@/hooks/auth/useLogOut'
import { useGetCategories } from '@/hooks/category/useCategory'
import { useDebounce } from '@/hooks/debounce/useDebounce'
import {
  useGetNotifications,
  useMarkAsRead,
} from '@/hooks/notification/useNotification'
import { useSearch } from '@/hooks/search/userSearch'
import { useGetWishLists } from '@/hooks/wish-list/useWishList'
import echo from '@/lib/echo'
import { cn } from '@/lib/utils'
import { ICourse, IInstructorProfile } from '@/types'
import { ICategory } from '@/types/Category'

import WishListIcon from '@/components/common/WishListIcon'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'

const MobileMenu = dynamic(() => import('./MobileMenu'), {
  ssr: false,
})

const Header = () => {
  const [query, setQuery] = useState('')
  const [inputWidth, setInputWidth] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [notifications, setNotifications] = useState<
    { id: string; message: string; read_at: string | null }[]
  >([])

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetNotifications()
  const { mutate: markAsRead } = useMarkAsRead()

  const { user, isAuthenticated, role } = useAuthStore()
  const { isPending, mutate } = useLogOut()
  const { data: wishListData } = useGetWishLists()
  const setWishList = useWishListStore((state) => state.setWishList)
  useGetWishLists()
  const { data: categoryData } = useGetCategories()
  const debouncedQuery = useDebounce(query, 300)
  const { data: searchResults, isLoading: searchLoading } =
    useSearch(debouncedQuery)
  const router = useRouter()

  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleCategorySelect = (categorySlug: string) => {
    const updatedFilters = { categories: [categorySlug] }
    localStorage.setItem('courseFilters', JSON.stringify(updatedFilters))

    window.dispatchEvent(new Event('courseFiltersUpdated'))

    router.push('/courses')
  }

  useEffect(() => {
    if (!isLoading && data) {
      setNotifications(data?.pages.flatMap((page) => page.notifications) || [])
    }
  }, [user?.id, data, isLoading])

  useEffect(() => {
    if (!user?.id) return

    const privateChannel = echo.private(`member.${user?.id}`)

    privateChannel.notification((notification: any) => {
      // console.log('🔔 Notification for Member:', notification)
      toast.info(notification.message)

      setNotifications((prev) => {
        if (prev.some((noti) => noti.id === notification.id)) {
          // console.log('Duplicate notification detected:', notification.id)
          return prev
        }
        return [
          { id: notification.id, message: notification.message, read_at: null },
          ...prev,
        ]
      })
    })

    return () => {
      echo.leave(`member.${user.id}`)
    }
  }, [user?.id])

  useEffect(() => {
    if (inputRef.current) {
      setInputWidth(inputRef.current.offsetWidth)
    }
  }, [])

  useEffect(() => {
    if (wishListData) {
      const ids = wishListData?.data.map((item: any) => item.course_id)
      setWishList(ids)
    }
  }, [wishListData, setWishList])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
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

  const handleMarkAsRead = (id: string) => {
    markAsRead(id)
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, read_at: new Date().toISOString() } : n
      )
    )
  }

  const filteredNotifications = notifications
    .filter((noti: any) =>
      noti?.data?.message?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, 5)

  const hasUnread = notifications.some((n) => !n.read_at)

  const dropdownMenuLinks = [
    {
      content: (
        <div className="flex items-center space-x-2">
          <Avatar className="size-16">
            <AvatarImage
              src={user?.avatar || '/assets/images/avatar/user-1.png'}
              alt="@shadcn"
            />
            <AvatarFallback>Avatar</AvatarFallback>
          </Avatar>

          <div className="space-y-1">
            <div className="text-lg">{user?.name}</div>
            <div className="text-sm text-gray-400">{user?.email}</div>
          </div>
        </div>
      ),
      href: '/me',
      separator: true,
    },
    {
      content: 'Học tập',
      href: '/my-courses?tab=all',
    },
    {
      content: 'Khóa học yêu thích',
      href: '/my-courses?tab=wishlist',
    },
    {
      content:
        role === Role.INSTRUCTOR
          ? 'Trang người hướng dẫn'
          : 'Trở thành người hướng dẫn',
      href: role === Role.INSTRUCTOR ? '/instructor' : '/become-an-instructor',
      target: role === Role.INSTRUCTOR ? '_blank' : '_self',
      separator: true,
    },
    {
      content: 'Thông báo',
      href: '#',
    },
    {
      content: 'Tin nhắn',
      href: 'chats',
      separator: true,
    },

    {
      content: 'Trợ giúp và Hỗ trợ',
      href: '#',
    },
    {
      content: 'Đăng xuất',
      onClick: handleLogout,
    },
  ]

  return (
    <>
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
                    <a href="#">Danh mục</a>
                    <ul>
                      {categoryData?.data?.map((category: ICategory) => (
                        <li key={category.id}>
                          <Link
                            style={{
                              width: '100%',
                              display: 'block',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                            onClick={(e) => {
                              e.preventDefault()
                              handleCategorySelect(category?.slug)
                            }}
                            href={`/course/${category?.slug}`}
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

              <Popover>
                <PopoverTrigger asChild>
                  <div className="relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-transparent hover:text-primary [&_svg]:size-5"
                    >
                      <Bell
                        className={cn(
                          'stroke-[1.6]',
                          hasUnread && 'animate-bell'
                        )}
                      />
                    </Button>
                    {hasUnread && (
                      <span className="absolute right-[5px] top-px flex size-3">
                        <span className="absolute size-full animate-ping rounded-full bg-red-400/75"></span>
                        <span className="relative size-3 rounded-full bg-red-500"></span>
                      </span>
                    )}
                  </div>
                </PopoverTrigger>
                <PopoverContent
                  align="start"
                  side="bottom"
                  className="w-100 mr-6 p-2"
                >
                  <div className="flex justify-between gap-2">
                    <h4 className="text-sm font-medium">Thông báo</h4>
                    <input
                      type="text"
                      placeholder="Tìm kiếm..."
                      className="w-60 rounded border px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Separator className="my-2" />
                  {isLoading ? (
                    <Loader2 />
                  ) : filteredNotifications.length > 0 ? (
                    <div className="flex w-full flex-col gap-3">
                      {filteredNotifications.map((noti: any) => (
                        <div
                          key={noti.id}
                          className={`flex cursor-pointer items-center gap-4 rounded p-2 ${
                            noti.read_at ? 'bg-gray-100' : 'bg-blue-50'
                          }`}
                          onClick={() => handleMarkAsRead(noti.id)}
                        >
                          <div className="flex size-8 items-center justify-center rounded-full bg-gray-300">
                            {noti?.data.course_thumbnail ? (
                              <Image
                                src={noti?.data.course_thumbnail}
                                alt="thumbnail"
                                className="size-full rounded-full object-cover"
                                width={32}
                                height={32}
                              />
                            ) : (
                              <span className="text-sm font-bold text-white">
                                {noti?.data.sender?.charAt(0) ?? 'N'}
                              </span>
                            )}
                          </div>

                          <div className="flex flex-1 items-center justify-between">
                            <span className="text-sm">
                              {noti?.data.message}
                            </span>
                            {!noti.read_at && (
                              <CheckCircle className="size-4 text-green-500" />
                            )}
                          </div>
                        </div>
                      ))}

                      {hasNextPage && (
                        <button
                          className="mt-2 w-full text-center font-bold text-primary"
                          onClick={() => fetchNextPage()}
                          disabled={!hasNextPage || isFetchingNextPage}
                        >
                          {isFetchingNextPage ? 'Đang tải...' : 'Xem thêm'}
                        </button>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">
                      Không có thông báo mới
                    </p>
                  )}
                </PopoverContent>
              </Popover>

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
                      className="dropdown-menu !py-0 data-[popper-placement=bottom-start]:!-ml-5"
                      aria-labelledby="dropdownMenuLink"
                    >
                      {dropdownMenuLinks.map((link, index) => (
                        <li key={index}>
                          {link.href ? (
                            <Link
                              href={link.href}
                              target={link.target}
                              className="dropdown-item"
                            >
                              {link.content}
                            </Link>
                          ) : (
                            <div
                              onClick={link.onClick}
                              className="dropdown-item cursor-pointer"
                            >
                              {link.content}
                            </div>
                          )}

                          {link.separator && <Separator />}
                        </li>
                      ))}
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
          className="flaticon-close-1 btn-close cursor-pointer"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
          onClick={() => setQuery('')}
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
                      ref={inputRef}
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
                {debouncedQuery.trim() !== '' && (
                  <div
                    className="popover-content mt-2 px-6 py-3"
                    style={{ width: inputWidth }}
                  >
                    <div className="flex items-center space-x-2">
                      {searchLoading ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <Search size={16} />
                      )}
                      <p className="text-base">
                        {searchLoading || searchResults
                          ? `Kết quả cho "${debouncedQuery}"`
                          : `Không có kết quả cho "${debouncedQuery}"`}
                      </p>
                    </div>

                    {searchResults?.courses?.length > 0 && (
                      <>
                        <div className="flex items-center justify-between border-b border-solid border-gray-200 pb-3 pt-6">
                          <h3 className="text-xl uppercase">Khoá học</h3>
                        </div>
                        <ul>
                          {searchResults?.courses?.map((course: ICourse) => (
                            <li key={course?.id} className="py-2">
                              <Link href={`/courses/${course?.slug}`}>
                                <div
                                  className="flex w-fit items-center space-x-3"
                                  data-bs-dismiss="offcanvas"
                                  onClick={() => setQuery('')}
                                >
                                  <Avatar>
                                    <AvatarImage
                                      src={course?.thumbnail ?? undefined}
                                      alt={course?.name}
                                    />
                                    <AvatarFallback>
                                      {course?.name?.charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                  </Avatar>
                                  <p className="text-base">{course?.name}</p>
                                </div>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}

                    {searchResults?.instructors?.length > 0 && (
                      <>
                        <div className="flex items-center justify-between border-b border-solid border-gray-200 pb-3 pt-6">
                          <h3 className="text-xl uppercase">Người hướng dẫn</h3>
                        </div>
                        <ul>
                          {searchResults?.instructors?.map(
                            (instructor: IInstructorProfile) => (
                              <li key={instructor?.id}>
                                <div
                                  className="flex w-fit items-center space-x-3"
                                  data-bs-dismiss="offcanvas"
                                  onClick={() => setQuery('')}
                                >
                                  <Avatar>
                                    <AvatarImage
                                      src={instructor?.avatar ?? ''}
                                      alt={instructor?.name}
                                    />
                                    <AvatarFallback>
                                      {instructor?.name
                                        ?.charAt(0)
                                        .toUpperCase()}
                                    </AvatarFallback>
                                  </Avatar>
                                  <p className="text-base">
                                    {instructor?.name}
                                  </p>
                                </div>
                              </li>
                            )
                          )}
                        </ul>
                      </>
                    )}
                  </div>
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
