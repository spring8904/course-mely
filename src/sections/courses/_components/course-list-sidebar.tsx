import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { AccordionContent } from '@radix-ui/react-accordion'
import React from 'react'
import { RxStar, RxStarFilled } from 'react-icons/rx'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'

const CourseListSidebar = () => {
  return (
    <div>
      <h2 className="text-lg font-bold">Danh sách khoá học</h2>
      <Accordion type="single" collapsible className="mt-3 w-full border-t-2">
        <AccordionItem value="item-1" className="mt-2 border-b-2">
          <AccordionTrigger className="mb-4 border-none p-0">
            Đánh giá
          </AccordionTrigger>
          <AccordionContent className="mb-4">
            <RadioGroup defaultValue="comfortable">
              <div className="mb-2 flex items-center space-x-2">
                <RadioGroupItem
                  value="default"
                  className="border-black"
                  id="r1"
                />
                <span className="flex space-x-1 text-orange-500">
                  <RxStarFilled />
                  <RxStarFilled />
                  <RxStarFilled />
                  <RxStarFilled />
                  <RxStarFilled />
                </span>
              </div>
              <div className="mb-2 flex items-center space-x-2">
                <RadioGroupItem
                  value="comfortable"
                  className="border-black"
                  id="r2"
                />
                <span className="flex space-x-1 text-orange-500">
                  <RxStarFilled />
                  <RxStarFilled />
                  <RxStarFilled />
                  <RxStarFilled />
                  <RxStar />
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="compact"
                  className="border-black"
                  id="r3"
                />
                <span className="flex space-x-1 text-orange-500">
                  <RxStarFilled />
                  <RxStarFilled />
                  <RxStarFilled />
                  <RxStar />
                  <RxStar />
                </span>
              </div>
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" className="mt-2 border-b-2">
          <AccordionTrigger className="mb-4 border-none p-0">
            Cấp độ
          </AccordionTrigger>
          <AccordionContent className="mb-4">
            <div className="mb-2 space-x-2">
              <Checkbox id="terms" className="border-gray-300" />
              <Label htmlFor="terms">Sơ cấp</Label>
            </div>
            <div className="mb-2 space-x-2">
              <Checkbox id="terms" className="border-gray-300" />
              <Label htmlFor="terms">Trung cấp</Label>
            </div>
            <div className="mb-2 space-x-2">
              <Checkbox id="terms" className="border-gray-300" />
              <Label htmlFor="terms">Nâng cao</Label>
            </div>
            <div className="space-x-2">
              <Checkbox id="terms" className="border-gray-300" />
              <Label htmlFor="terms">Chuyên gia</Label>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3" className="mt-2 border-b-2">
          <AccordionTrigger className="mb-4 border-none p-0">
            Thời gian học
          </AccordionTrigger>
          <AccordionContent className="mb-4">
            nội dung Thời gian học
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4" className="mt-2 border-b-2">
          <AccordionTrigger className="mb-4 border-none p-0">
            Bài tập thực hành
          </AccordionTrigger>
          <AccordionContent className="mb-4">
            nội dung bài tập thực hành
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default CourseListSidebar
