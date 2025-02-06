import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

const ModalOption = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: any
  setIsOpen: any
}) => {
  const handleInstructorClick = () => {
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-3xl overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-center">
            <h5 className="text-xl font-bold">Chào bạn,</h5>
          </DialogTitle>
          <span className="text-center">
            Bạn hãy dành ra vài giây để xác nhận thông tin dưới đây nhé!
          </span>
          <div className="mt-3 border-t p-6">
            <h5 className="text-center font-bold">
              Để tối ưu tốt nhất cho trải nghiệm của bạn với CourseMeLy, vui
              lòng lựa chọn nhóm phù hợp nhất với bạn.
            </h5>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="flex flex-col items-center">
                <Image
                  src="/images/bussiness.webp"
                  alt=""
                  width={1000}
                  height={300}
                  layout="intrinsic"
                />
                <Button onClick={handleInstructorClick}>
                  Tôi là người hướng dẫn
                </Button>
              </div>
              <div className="flex flex-col items-center">
                <Image
                  src="/images/student.webp"
                  alt=""
                  width={1000}
                  height={300}
                  layout="intrinsic"
                />
                <Link href="/sign-in">
                  <Button>Tôi là học viên</Button>
                </Link>
              </div>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default ModalOption
