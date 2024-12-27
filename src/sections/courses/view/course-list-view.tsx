import React from 'react'
import { RxChevronDown, RxStar, RxStarFilled } from 'react-icons/rx'
import {  FaRegCirclePlay, FaRegClock } from "react-icons/fa6";

const CourseListView = () => {
  return (
    <div>
      {/* <!-- Main Content --> */}
      <main className="container mx-auto flex bg-gray-50 px-12 py-8">
        {/* <!-- Sidebar --> */}
        <aside className="w-1/4 pr-4">
          <div className="p-5">
            <h2 className="mb-4 text-lg font-bold">Danh sách khoá học</h2>
            {/* <!-- đánh giá --> */}
            <div className="mb-4 border-t">
              {/* <!-- Toggle Section --> */}
              <label
                htmlFor="toggle-rating"
                className="mb-2 mt-2 flex cursor-pointer items-center justify-between pb-2"
              >
                <span className="font-semibold">Đánh giá</span>
                <RxChevronDown />
              </label>
              <input
                type="checkbox"
                id="toggle-rating"
                className="peer hidden"
              />

              {/* <!-- Rating Section --> */}
              <div className="hidden space-y-2 peer-checked:block">
                <div className="flex items-center">
                  <input type="radio" name="rating" className="mr-2" />
                  <div className="flex text-orange-500">
                    <RxStarFilled />
                    <RxStarFilled />
                    <RxStarFilled />
                    <RxStarFilled />
                    <RxStarFilled />
                  </div>
                </div>
                <div className="flex items-center">
                  <input type="radio" name="rating" className="mr-2" />
                  <div className="flex text-orange-500">
                    <RxStarFilled />
                    <RxStarFilled />
                    <RxStarFilled />
                    <RxStarFilled />
                    <RxStar />
                  </div>
                </div>
                <div className="flex items-center">
                  <input type="radio" name="rating" className="mr-2" />
                  <div className="flex text-orange-500">
                    <RxStarFilled />
                    <RxStarFilled />
                    <RxStarFilled />
                    <RxStar />
                    <RxStar />
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- end đánh giá --> */}

            {/* <!-- cấp độ --> */}
            <div className="mb-4 border-t">
              {/* <!-- Toggle Section --> */}
              <label
                htmlFor="toggle-levels-checkbox"
                className="mb-2 mt-2 flex cursor-pointer items-center justify-between pb-2"
              >
                <span className="font-semibold">Cấp độ</span>
                <RxChevronDown />

              </label>
              <input
                type="checkbox"
                id="toggle-levels-checkbox"
                className="peer hidden"
              />

              {/* <!-- Level Section --> */}
              <div className="hidden space-y-2 peer-checked:block">
                <div className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span>Sơ cấp</span>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span>Trung cấp</span>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span>Nâng cao</span>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span>Chuyên gia</span>
                </div>
              </div>
            </div>
            {/* <!-- end cấp độ --> */}

            {/* <!-- Thời gian học --> */}
            <div className="mb-4 border-t">
              <label
                htmlFor="toggle-learning-time"
                className="mb-2 mt-2 flex cursor-pointer items-center justify-between pb-2"
              >
                <span className="font-semibold">Thời gian học</span>
                <RxChevronDown />

              </label>
              <input
                type="checkbox"
                id="toggle-learning-time"
                className="peer hidden"
              />
              <div className="hidden space-y-2 peer-checked:block">
                <div className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span>Học trực tuyến</span>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span>Học tại lớp</span>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span>Học tự học</span>
                </div>
              </div>
            </div>
            {/* <!-- end thời gian học --> */}

            {/* <!-- Bài tập thực hành --> */}
            <div className="mb-4 border-t">
              <label
                htmlFor="toggle-practice-exercises"
                className="mb-2 mt-2 flex cursor-pointer items-center justify-between pb-2"
              >
                <span className="font-semibold">Bài tập thực hành</span>
                <RxChevronDown />

              </label>
              <input
                type="checkbox"
                id="toggle-practice-exercises"
                className="peer hidden"
              />
              <div
                className="hidden space-y-2 peer-checked:block"
                id="practice-exercises-section"
              >
                <div className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span>Bài tập lý thuyết</span>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span>Bài tập thực hành trên máy</span>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span>Bài tập nhóm</span>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span>Bài tập cá nhân</span>
                </div>
              </div>
            </div>
            {/* <!-- Bài tập thực hành --> */}
          </div>
        </aside>
        {/* <!-- End Sidebar --> */}

        {/* <!-- Course List --> */}
        <section className="w-3/4">
          {/* <!-- selected --> */}
          <div className="mb-4 flex justify-end">
            <select className="rounded-md border border-orange-500 px-3 py-3">
              <option value="default">Mặc định</option>
              <option value="default">Mặc định</option>
              <option value="default">Mặc định</option>
              <option value="default">Mặc định</option>
            </select>
          </div>
          {/* <!-- end selected --> */}
          {/* <!-- Course Item --> */}
          <div className="mt-6 space-y-4">
            <div className="flex flex-col rounded-lg bg-white p-4 shadow-md md:flex-row">
              <img
                alt="Course image showing code on a screen"
                className="mb-4 rounded-lg md:mb-0"
                height="400"
                src="https://storage.googleapis.com/a1aa/image/Phr2fkABHoyzPaFjDhtj2YTniT01wpMIXb5rQxSjKufzwsenA.jpg"
                width="150"
              />
              <div className="flex-1 md:ml-4">
                <h3 className="text-lg font-bold">
                  Khoá học ReactJS, NextJS Pro
                </h3>
                <p className="text-gray-600">Văn Tùng | 200 học viên</p>
                <div className="my-2 flex items-center">
                  <div className="flex text-orange-500">
                  <RxStarFilled />
                  <RxStarFilled />
                  <RxStarFilled />
                  <RxStarFilled />
                  <RxStarFilled />
                  </div>
                  <span className="ml-2  text-gray-600"> 4.3k </span>
                </div>
                <div className="flex space-x-2 items-center text-gray-600">
                <FaRegClock />
                  <span>19h 30m</span>
                  <FaRegCirclePlay />
                  <span>20</span>
                </div>
                <div className="mt-2">
                  <span className="rounded-lg border border-dashed border-gray-300 px-4 py-1 text-gray-600">
                    Sơ cấp
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end justify-between">
                <div className="text-right">
                  <span className="block text-lg font-bold text-orange-600">
                    300.000 đ
                  </span>
                  <span className="block text-gray-500 line-through">
                    590.000 đ
                  </span>
                </div>
                <button className="mt-4 rounded-lg bg-orange-600 px-4 py-2 text-white md:mt-0">
                  Đăng ký ngay
                </button>
              </div>
            </div>
            <div className="flex flex-col rounded-lg bg-white p-4 shadow-md md:flex-row">
              <img
                alt="Course image showing code on a screen"
                className="mb-4 rounded-lg md:mb-0"
                height="400"
                src="https://storage.googleapis.com/a1aa/image/Phr2fkABHoyzPaFjDhtj2YTniT01wpMIXb5rQxSjKufzwsenA.jpg"
                width="150"
              />
              <div className="flex-1 md:ml-4">
                <h3 className="text-lg font-bold">
                  Khoá học ReactJS, NextJS Pro
                </h3>
                <p className="text-gray-600">Văn Tùng | 200 học viên</p>
                <div className="my-2 flex items-center">
                  <div className="flex text-orange-500">
                  <RxStarFilled />
                  <RxStarFilled />
                  <RxStarFilled />
                  <RxStarFilled />
                  <RxStarFilled />
                  </div>
                  <span className="ml-2  text-gray-600"> 4.3k </span>
                </div>
                <div className="flex space-x-2 items-center text-gray-600">
                <FaRegClock />
                  <span>19h 30m</span>
                  <FaRegCirclePlay />
                  <span>20</span>
                </div>
                <div className="mt-2">
                  <span className="rounded-lg border border-dashed border-gray-300 px-4 py-1 text-gray-600">
                    Sơ cấp
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end justify-between">
                <div className="text-right">
                  <span className="block text-lg font-bold text-orange-600">
                    300.000 đ
                  </span>
                  <span className="block text-gray-500 line-through">
                    590.000 đ
                  </span>
                </div>
                <button className="mt-4 rounded-lg bg-orange-600 px-4 py-2 text-white md:mt-0">
                  Đăng ký ngay
                </button>
              </div>
            </div>
            <div className="flex flex-col rounded-lg bg-white p-4 shadow-md md:flex-row">
              <img
                alt="Course image showing code on a screen"
                className="mb-4 rounded-lg md:mb-0"
                height="400"
                src="https://storage.googleapis.com/a1aa/image/Phr2fkABHoyzPaFjDhtj2YTniT01wpMIXb5rQxSjKufzwsenA.jpg"
                width="150"
              />
              <div className="flex-1 md:ml-4">
                <h3 className="text-lg font-bold">
                  Khoá học ReactJS, NextJS Pro
                </h3>
                <p className="text-gray-600">Văn Tùng | 200 học viên</p>
                <div className="my-2 flex items-center">
                  <div className="flex text-orange-500">
                  <RxStarFilled />
                  <RxStarFilled />
                  <RxStarFilled />
                  <RxStarFilled />
                  <RxStarFilled />
                  </div>
                  <span className="ml-2  text-gray-600"> 4.3k </span>
                </div>
                <div className="flex space-x-2 items-center text-gray-600">
                <FaRegClock />
                  <span>19h 30m</span>
                  <FaRegCirclePlay />
                  <span>20</span>
                </div>
                <div className="mt-2">
                  <span className="rounded-lg border border-dashed border-gray-300 px-4 py-1 text-gray-600">
                    Sơ cấp
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end justify-between">
                <div className="text-right">
                  <span className="block text-lg font-bold text-orange-600">
                    300.000 đ
                  </span>
                  <span className="block text-gray-500 line-through">
                    590.000 đ
                  </span>
                </div>
                <button className="mt-4 rounded-lg bg-orange-600 px-4 py-2 text-white md:mt-0">
                  Đăng ký ngay
                </button>
              </div>
            </div>
            <div className="flex flex-col rounded-lg bg-white p-4 shadow-md md:flex-row">
              <img
                alt="Course image showing code on a screen"
                className="mb-4 rounded-lg md:mb-0"
                height="400"
                src="https://storage.googleapis.com/a1aa/image/Phr2fkABHoyzPaFjDhtj2YTniT01wpMIXb5rQxSjKufzwsenA.jpg"
                width="150"
              />
              <div className="flex-1 md:ml-4">
                <h3 className="text-lg font-bold">
                  Khoá học ReactJS, NextJS Pro
                </h3>
                <p className="text-gray-600">Văn Tùng | 200 học viên</p>
                <div className="my-2 flex items-center">
                  <div className="flex text-orange-500">
                  <RxStarFilled />
                  <RxStarFilled />
                  <RxStarFilled />
                  <RxStarFilled />
                  <RxStarFilled />
                  </div>
                  <span className="ml-2  text-gray-600"> 4.3k </span>
                </div>
                <div className="flex space-x-2 items-center text-gray-600">
                <FaRegClock />
                  <span>19h 30m</span>
                  <FaRegCirclePlay />
                  <span>20</span>
                </div>
                <div className="mt-2">
                  <span className="rounded-lg border border-dashed border-gray-300 px-4 py-1 text-gray-600">
                    Sơ cấp
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end justify-between">
                <div className="text-right">
                  <span className="block text-lg font-bold text-orange-600">
                    300.000 đ
                  </span>
                  <span className="block text-gray-500 line-through">
                    590.000 đ
                  </span>
                </div>
                <button className="mt-4 rounded-lg bg-orange-600 px-4 py-2 text-white md:mt-0">
                  Đăng ký ngay
                </button>
              </div>
            </div>
            
          </div>
          {/* <!-- Course Item --> */}
        </section>
      </main>
      {/* <!-- end content --> */}
    </div>
  )
}

export default CourseListView
