import Image from 'next/image'
import React from 'react'
import { AiFillDollarCircle, AiFillWarning } from 'react-icons/ai'

const WalletView = () => {
  return (
    <div className="px-5 py-6">
      <h2 className="mb-4 text-xl font-bold">Nạp tiền vào tài khoản</h2>
      <div className="grid grid-cols-12 gap-4 rounded-lg bg-white p-6 shadow-lg">
        <div className="col-span-4 flex flex-col gap-4">
          {/* <!-- User Info --> */}
          <div className="mr-4 flex w-full rounded-lg border p-4">
            <Image
              alt="User avatar"
              className="mr-4 rounded-full border-2 border-orange-500"
              height={40}
              src="https://storage.googleapis.com/a1aa/image/DCqdFGzcb1rqIdoeHHdr3Zjfo9rbmejO9ixlponF0VG2CmePB.jpg"
              width={40}
            />
            <div>
              <span className="block font-bold">Tran nguyen</span>
              <span className="flex items-center text-gray-500">
                Số dư: <AiFillDollarCircle className="mx-1 text-yellow-500" />
                100
              </span>
            </div>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="mb-2 font-bold">Tỷ lệ quy đổi</h3>
            <ul>
              <li className="mb-2 flex">
                <AiFillDollarCircle className="ml-1 mr-2 mt-1 text-yellow-500" />
                <span>10 = 10.000 VNĐ</span>
              </li>
              <li className="mb-2 flex">
                <AiFillDollarCircle className="ml-1 mr-2 mt-1 text-yellow-500" />
                <span>50 = 50.000 VNĐ</span>
              </li>
              <li className="mb-2 flex">
                <AiFillDollarCircle className="ml-1 mr-2 mt-1 text-yellow-500" />
                <span>100 = 100.000 VNĐ</span>
              </li>
              <li className="mb-2 flex">
                <AiFillDollarCircle className="ml-1 mr-2 mt-1 text-yellow-500" />
                <span>500 = 500.000 VNĐ</span>
              </li>
            </ul>
          </div>
          <div className="mt-4 flex items-start rounded-lg bg-red-100 p-4 text-red-600">
            <span>
              <AiFillWarning className="mr-1 mt-1" />
            </span>
            <span className="block">
              Lưu ý: Chúng tôi không áp dụng chính sách hoàn tiền cho các khoản
              đã nạp. Mọi giao dịch được thực hiện đều do bạn tự quyết định và
              chịu trách nhiệm. Hãy cân nhắc trước khi tiến hành nạp tiền.
            </span>
          </div>
        </div>
        {/* <!-- Deposit Form --> */}
        <div className="col-span-8 rounded-lg border p-4">
          <h3 className="mb-4 font-bold">
            Nạp tiền vào tài khoản của bạn để có thể thanh toán các dịch vụ của
            do chúng tôi cung cấp
          </h3>
          <h4 className="mb-4 font-semibold">Chọn mệnh giá</h4>
          <div className="mb-4 grid grid-cols-3 gap-4">
            <button className="flex flex-col items-center justify-center rounded-lg border p-4">
              <div className="mb-2 flex items-center">
                <AiFillDollarCircle className="mx-1 text-yellow-500" />
                <span>50</span>
              </div>
              <span>50.000 VNĐ</span>
            </button>
            <button className="flex flex-col items-center justify-center rounded-lg border p-4">
              <div className="mb-2 flex items-center">
                <AiFillDollarCircle className="mx-1 text-yellow-500" />

                <span>50</span>
              </div>
              <span>50.000 VNĐ</span>
            </button>
            <button className="flex flex-col items-center justify-center rounded-lg border p-4">
              <div className="mb-2 flex items-center">
                <AiFillDollarCircle className="mx-1 text-yellow-500" />

                <span>50</span>
              </div>
              <span>50.000 VNĐ</span>
            </button>
            <button className="flex flex-col items-center justify-center rounded-lg border p-4">
              <div className="mb-2 flex items-center">
                <AiFillDollarCircle className="mx-1 text-yellow-500" />

                <span>50</span>
              </div>
              <span>50.000 VNĐ</span>
            </button>
            <button className="flex flex-col items-center justify-center rounded-lg border p-4">
              <div className="mb-2 flex items-center">
                <AiFillDollarCircle className="mx-1 text-yellow-500" />

                <span>50</span>
              </div>
              <span>50.000 VNĐ</span>
            </button>
            <button className="flex flex-col items-center justify-center rounded-lg border p-4">
              <div className="mb-2 flex items-center">
                <AiFillDollarCircle className="mx-1 text-yellow-500" />

                <span>50</span>
              </div>
              <span>50.000 VNĐ</span>
            </button>
          </div>
          <div className="relative mb-4">
            <label className="mb-2 block" htmlFor="amount">
              Nhập số tiền bạn muốn nạp
            </label>
            <input
              className="w-full rounded-lg border px-4 py-2 pr-16"
              id="amount"
              placeholder="Nhập số tiền bạn muốn nạp"
              type="text"
            />
            <span className="absolute right-4 top-1/2 translate-y-1/4 text-gray-500">
              VNĐ
            </span>
          </div>
          <div className="mb-4">
            <span className="block font-bold">Tổng tiền: 0 VNĐ</span>
          </div>
          <button className="rounded-lg bg-red-500 px-4 py-2 text-white">
            Nạp tiền
          </button>
        </div>
      </div>
    </div>
  )
}

export default WalletView
