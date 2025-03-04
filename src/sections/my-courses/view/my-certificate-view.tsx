'use client'

import React from 'react'
import Image from 'next/image'
import { Loader2 } from 'lucide-react'

import { useGetCertificates } from '@/hooks/user/useUser'

const MyCertificateView = () => {
  const { data: myCertificateData, isLoading } = useGetCertificates()
  return (
    <>
      {isLoading && (
        <div className="mt-20">
          <Loader2 className="mx-auto size-8 animate-spin" />
        </div>
      )}
      <section className="section-inner mt-10">
        {!isLoading && myCertificateData?.data.length > 0 && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {myCertificateData?.data.map((certificate: any) => (
              <div
                key={certificate.id}
                className="rounded-lg border bg-white p-4 shadow-md transition hover:shadow-lg"
              >
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Mã chứng chỉ: {certificate.certificate_code}
                  </h3>
                  <p className="text-gray-500">
                    Ngày cấp:{' '}
                    {new Date(certificate.issued_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="mt-4">
                  <iframe
                    src={certificate.file_path}
                    title={`Certificate-${certificate.certificate_code}`}
                    className="size-full rounded-md border"
                  ></iframe>
                </div>

                <div className="mt-4 text-center">
                  <a
                    href={certificate.file_path}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="w-full">Tải Chứng Chỉ</button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && myCertificateData?.data.length === 0 && (
          <div className="flex h-[60vh] flex-col items-center justify-center">
            <Image
              src="/no-myCertificateData?.data.svg"
              alt="No Certificates"
              width={200}
              height={200}
            />
            <h2 className="mt-4 text-lg font-bold text-gray-700">
              Bạn chưa có chứng chỉ nào
            </h2>
            <p className="mt-2 text-gray-500">
              Chứng chỉ sẽ xuất hiện tại đây sau khi bạn hoàn thành các khóa
              học.
            </p>
          </div>
        )}
      </section>
    </>
  )
}

export default MyCertificateView
