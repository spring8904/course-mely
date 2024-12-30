import React from 'react'
import { RxChevronDown, RxStar, RxStarFilled } from 'react-icons/rx'

const CourseListSidebar = () => {
  return (
    
        <div className="p-5">
          <h2 className="mb-4 text-lg font-bold">Danh sách khoá học</h2>
          {/* <!-- đánh giá --> */}
          <div className="mb-4 border-t">
            <label
              htmlFor="toggle-rating"
              className="mb-2 mt-2 flex cursor-pointer items-center justify-between pb-2"
            >
              <span className="font-semibold">Đánh giá</span>
              <RxChevronDown />
            </label>
            <input type="checkbox" id="toggle-rating" className="peer hidden" />

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
          {/* <!-- end Bài tập thực hành --> */}
        </div>
  
   
  )
}

export default CourseListSidebar
