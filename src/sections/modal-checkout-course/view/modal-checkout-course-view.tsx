import React from 'react'
import { RxCrossCircled } from 'react-icons/rx'

const ModalCheckoutCourseView = () => {
  return (
    <div className='p-4 bg-gray-100'>
      <div className="relative mx-auto flex max-w-7xl flex-col rounded-lg bg-white p-8 shadow-md md:flex-row">
        <div className="flex-1">
          <h2 className="mb-4 text-xl font-bold">Thông tin khoá học</h2>
          <div className="mb-4 border-b"></div>
          <div className="flex flex-col lg:flex-row">
            <div className="mr-5">
              <img
                alt="A set of computer screens displaying code and a desk lamp"
                className="mb-4 h-56 rounded-lg lg:mb-0"
                src="https://storage.googleapis.com/a1aa/image/gpCrZz6nsP4GNJk93IeeBHEFB7okFbJQTdXPExo00NeAeF7PB.jpg"
                width="360"
              />
            </div>
            <div className="mt-6">
              <h2 className="mb-2 text-lg font-bold">
                Khoá học ReactJS cơ bản cho người mới bắt đầu
              </h2>
              <span className="mb-4 inline-block rounded-md border-2 border-dashed border-gray-300 bg-white px-3 py-1 text-sm text-gray-700">
                Công nghệ thông tin
              </span>
              <div className="mb-2 text-xl font-bold text-orange-500">
                300.000 đ
                <span className="text-base text-gray-500 line-through">
                  590.000 đ
                </span>
              </div>
              <div className="flex items-center">
                <img
                  alt="Instructor's profile picture"
                  className="mr-2 h-10 w-10 rounded-full border-2 border-orange-500"
                  height="100"
                  src="https://storage.googleapis.com/a1aa/image/nLwoT89uhxYoGtZCOdc5eX7n7p7SlJY0TZ1aUtgEO5YhvYfTA.jpg"
                  width="100"
                />
                <div>
                  <div className="font-bold">Văn Tùng</div>
                  <div className="text-sm text-gray-500">Tham gia 2021</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="rounded-md bg-blue-50 p-3 lg:ml-3 lg:mt-0"
          style={{ minWidth: 315 }}
        >
          <div className="relative mb-10">
            <h2 className="absolute left-0 top-0 mb-4 text-lg font-bold">
              Thanh toán
            </h2>
            <div className="absolute left-0 top-8 mb-2 w-full border-b"></div>
          </div>
          <div className="mb-2 flex items-center justify-between">
            <input
              type="text"
              className="w-50 rounded-lg border border-gray-300 p-2"
              placeholder="Nhập mã giảm giá..."
            />
            <button className="ml-2 rounded-lg bg-orange-600 px-5 py-2 text-white">
              Áp dụng
            </button>
          </div>
          <a className="inline-block text-sm italic text-orange-500">
            Xem danh sách mã giảm giá
          </a>
          <div className="my-4 border-t border-gray-300"></div>
          <div className="mb-2 flex justify-between">
            <span>Thành tiền:</span>
            <span>300.000 đ</span>
          </div>
          <div className="mb-2 flex justify-between">
            <span>Giảm giá:</span>
            <span>0 đ</span>
          </div>
          <div className="my-4 border-t border-gray-300"></div>
          <div className="mb-4 flex justify-between text-lg font-bold">
            <span>Tổng thanh toán:</span>
            <span>300.000 đ</span>
          </div>
          <button className="w-full rounded-lg bg-orange-600 py-2 text-white">
            Thanh toán
          </button>
        </div>

        {/* <!-- icon "x" --> */}
        <button className="absolute right-3  top-2 text-gray-500 hover:text-gray-700">
        <RxCrossCircled  className='text-2xl'/>
        </button>
      </div>
    </div>
  )
}

export default ModalCheckoutCourseView
