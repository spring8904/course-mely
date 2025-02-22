'use client'

import { useState } from 'react'
import { Trash } from 'lucide-react'
import { useFieldArray, useFormContext } from 'react-hook-form'

import { UpdateCodingLessonPayload } from '@/validations/course'

import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import TinyEditor from '@/components/shared/tiny-editor'

const GuideTab = () => {
  const [activeTab, setActiveTab] = useState<'guide' | 'hints'>('hints')

  const {
    control,
    formState: { disabled, errors },
  } = useFormContext<UpdateCodingLessonPayload>()

  const { fields, append, remove } = useFieldArray({
    name: 'hints',
  })

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel minSize={30}>
        <div
          className={`flex h-14 items-center gap-2 border-b px-4 py-2 text-lg font-bold ${errors?.solution_code?.message && 'text-red-500'}`}
        >
          Nội dung bài học
        </div>
        <FormField
          control={control}
          name="content"
          render={({ field }) => (
            <FormItem className="flex h-full flex-col">
              <div className="flex flex-col p-4">
                <FormDescription className="mb-2 text-base">
                  Cung nội dung bài học chi tiết, bao gồm các hướng dẫn, ví dụ
                  minh hoạ và lý thuyết liên quan.
                </FormDescription>

                <div className="flex-1">
                  <FormControl>
                    <TinyEditor
                      value={field.value}
                      onEditorChange={field.onChange}
                      init={{
                        height: 400,
                        resize: false,
                      }}
                      disabled={field.disabled}
                    />
                  </FormControl>
                </div>
                <FormMessage className="mt-2" />
              </div>
            </FormItem>
          )}
        />
      </ResizablePanel>
      <ResizableHandle withHandle />

      <ResizablePanel minSize={30}>
        <div className="flex h-14 items-center gap-4 border-b px-4 py-2 text-lg font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('hints')}
            className={`rounded-lg px-4 py-1 shadow transition-colors duration-300 ${
              activeTab === 'hints'
                ? 'bg-primary/10 font-bold text-primary'
                : 'text-muted-foreground hover:bg-primary/5 hover:text-primary'
            }`}
          >
            Gợi ý
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('guide')}
            className={`rounded-lg px-4 py-1 shadow transition-colors duration-300 ${
              activeTab === 'guide'
                ? 'bg-primary/10 font-bold text-primary'
                : 'text-muted-foreground hover:bg-primary/5 hover:text-primary'
            } ${errors?.solution_code?.message && 'text-red-500'}`}
          >
            Hướng dẫn
          </button>
        </div>
        <div className="flex h-full flex-col space-y-0">
          {activeTab === 'hints' && (
            <div className="flex-1 space-y-3 overflow-y-auto p-4 scrollbar-thin">
              <p className="text-base text-muted-foreground">
                Các gợi ý sẽ được mở khóa sau lần thực hiện thất bại thứ hai để
                học viên có thể nhận được nhiều hỗ trợ hơn ngoài các bài giảng
                và bài kiểm tra liên quan.
              </p>

              {fields.map((field2, index) => (
                <FormField
                  key={field2.id}
                  control={control}
                  name={`hints.${index}`}
                  render={({ field }) => (
                    <FormItem>
                      <div className="relative">
                        <FormControl>
                          <Input
                            placeholder={`Nhập gợi ý thứ ${index + 1}`}
                            {...field}
                            onChange={(e) => {
                              field.onChange(e)

                              // Kiểm tra nếu nhập vào ô cuối cùng và chưa đủ 10 thì thêm gợi ý mới
                              if (
                                e.target.value.trim() !== '' &&
                                index === fields.length - 1 &&
                                fields.length < 10
                              ) {
                                append('')
                              }
                            }}
                          />
                        </FormControl>

                        {fields.length > 1 && (
                          <button
                            type="button"
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500"
                            onClick={() => {
                              remove(index)
                            }}
                          >
                            <Trash size={16} />
                          </button>
                        )}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}

              <Button
                type="button"
                disabled={fields.length >= 10 || disabled}
                onClick={() => append('')}
              >
                Thêm gợi ý
              </Button>
            </div>
          )}

          {activeTab === 'guide' && (
            <FormField
              control={control}
              name="instruct"
              render={({ field }) => (
                <FormItem className="flex h-full flex-col space-y-0">
                  <div className="flex flex-col space-y-2 p-4">
                    <FormDescription className="text-base">
                      Cung cấp hướng dẫn để người học biết họ đang giải quyết
                      vấn đề gì.
                    </FormDescription>

                    <div className="flex-1">
                      <FormControl>
                        <TinyEditor
                          value={field.value || ''}
                          onEditorChange={field.onChange}
                          init={{
                            height: 400,
                            resize: false,
                          }}
                          disabled={field.disabled}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          )}
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default GuideTab
