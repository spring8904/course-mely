'use client'

import React from 'react'
import { useAuthStore } from '@/stores/useAuthStore'
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride'
import { Rabbit } from 'lucide-react'

type LearningTourProps = {
  isRunning: boolean
  onClose: () => void
}

const LearningTour = ({ isRunning, onClose }: LearningTourProps) => {
  const { user } = useAuthStore()

  const steps: Step[] = [
    {
      target: 'body',
      content: (
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex size-20 items-center justify-center rounded-full bg-orange-100">
            <Rabbit className="size-14 text-orange-500" />
          </div>
          <h2 className="mb-3 text-2xl font-bold text-orange-500">Chào cậu!</h2>
          <p className="text-gray-700">
            Mình là <span className="font-semibold text-orange-500">MeLy</span>{' '}
            - hướng dẫn viên tại CourseMeLy.
          </p>
          <p className="mt-2 text-gray-700">
            Mình sẽ đưa cậu đi thăm quan và giới thiệu cho cậu hiểu rõ hơn về
            CourseMely nhé. Đi thôi!
          </p>
        </div>
      ),
      placement: 'center',
      disableBeacon: true,
      disableOverlayClose: true,
      hideFooter: false,
      spotlightClicks: false,
    },
    {
      target: '.course-title',
      content: (
        <div className="space-y-2">
          <h3 className="font-bold text-orange-500">Tên khóa học</h3>
          <p>
            Đây là tên khóa học bạn đang học. Bạn có thể dễ dàng biết mình đang
            học gì!
          </p>
        </div>
      ),
      disableBeacon: true,
    },
    {
      target: '.learning-progress',
      content: (
        <div className="space-y-2">
          <h3 className="font-bold text-orange-500">Tiến độ học tập</h3>
          <p>
            Theo dõi tiến độ học tập của bạn trên khóa học này. Hoàn thành 100%
            để nhận chứng chỉ khoá học!
          </p>
        </div>
      ),
      disableBeacon: true,
    },
    {
      target: '.note-button',
      content: (
        <div className="space-y-2">
          <h3 className="font-bold text-orange-500">Ghi chú</h3>
          <p>
            Nhấn vào đây để xem và tạo ghi chú cho bài học. Ghi chú sẽ giúp bạn
            nhớ những điểm quan trọng!
          </p>
        </div>
      ),
      disableBeacon: true,
    },
    {
      target: '.lesson-content',
      content: (
        <div className="space-y-2">
          <h3 className="font-bold text-orange-500">Nội dung bài học</h3>
          <p>
            Đây là khu vực trung tâm, toàn bộ nội dung các bài học như video,
            hình ảnh, văn bản sẽ được hiển thị ở đây.
          </p>
          <p className="italic text-orange-500">
            {user?.name
              ? `Chúc ${user.name} học tập hiệu quả nhé! ^^`
              : 'Chúc bạn học tập hiệu quả nhé! ^^'}
          </p>
        </div>
      ),
      disableBeacon: true,
    },
    {
      target: '.course-content',
      content: (
        <div className="space-y-2">
          <h3 className="font-bold text-orange-500">Chương trình học tập</h3>
          <p>
            Đây là nơi hiển thị toàn bộ chương trình học. Khi hoàn thành một bài
            học, MeLy sẽ đánh{' '}
            <span className="font-bold text-green-500">`Tích xanh`</span> bên
            cạnh để đánh dấu bạn đã hoàn thành!
          </p>
        </div>
      ),
      disableBeacon: true,
    },
    {
      target: '.navigation-buttons',
      content: (
        <div className="space-y-2">
          <h3 className="font-bold text-orange-500">Di chuyển giữa bài học</h3>
          <p>
            Sử dụng các nút này để di chuyển qua lại giữa các bài học một cách
            dễ dàng.
          </p>
          <p className="mt-3 italic">
            Hẹn gặp lại bạn trong những hướng dẫn tiếp theo!
          </p>
        </div>
      ),
      disableBeacon: true,
    },
  ]

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, action } = data
    if (
      status === STATUS.FINISHED ||
      status === STATUS.SKIPPED ||
      action === 'close'
    ) {
      onClose()
    }
  }

  return (
    <Joyride
      steps={steps}
      run={isRunning}
      continuous={true}
      showSkipButton={true}
      showProgress={true}
      callback={handleJoyrideCallback}
      locale={{
        back: 'Quay lại',
        close: 'Đóng',
        last: 'Tạm biệt',
        next: 'Đi tiếp',
        skip: 'Bỏ qua',
      }}
      styles={{
        options: {
          primaryColor: '#f97316',
          backgroundColor: '#ffffff',
          arrowColor: '#ffffff',
          overlayColor: 'rgba(0, 0, 0, 0.65)',
          textColor: '#333333',
          width: 420,
          zIndex: 1000,
          beaconSize: 36,
        },
        spotlight: {
          borderRadius: 8,
          boxShadow:
            '0 0 0 4px rgba(249, 115, 22, 0.3), 0 0 0 8px rgba(249, 115, 22, 0.2)',
        },
        tooltipContainer: {
          borderRadius: 12,
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        },
        buttonNext: {
          backgroundColor: '#f97316',
          borderRadius: '9999px',
          padding: '8px 18px',
          fontSize: '15px',
          fontWeight: 600,
          boxShadow: '0 4px 6px rgba(249, 115, 22, 0.25)',
        },
        buttonBack: {
          marginRight: 10,
          color: '#f97316',
          fontSize: '15px',
          fontWeight: 500,
        },
        buttonSkip: {
          color: '#718096',
          fontSize: '14px',
        },
        buttonClose: {
          color: '#4A5568',
        },
      }}
      floaterProps={{
        disableAnimation: false,
        styles: {
          floater: {
            filter: 'drop-shadow(0 4px 10px rgba(0, 0, 0, 0.1))',
          },
        },
      }}
    />
  )
}

export default LearningTour
