'use client'

import { Trash } from 'lucide-react'
import { useFieldArray, useFormContext } from 'react-hook-form'

import { UpdateCodingLessonPayload } from '@/validations/course'

import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
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
  const {
    control,
    formState: { disabled },
  } = useFormContext<UpdateCodingLessonPayload>()

  const { fields, append, remove } = useFieldArray({
    name: 'hints',
  })

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel minSize={30}>
        <FormField
          control={control}
          name="solution_code"
          render={({ field }) => (
            <FormItem className="flex h-full flex-col space-y-0">
              <FormLabel className="flex h-14 items-center gap-2 border-b px-4 py-2 text-lg font-bold">
                Hướng dẫn
              </FormLabel>

              <div className="flex flex-1 flex-col space-y-2 p-4">
                <FormDescription className="text-base">
                  Cung cấp các hướng dẫn để học viên biết họ đang giải quyết vấn
                  đề gì. Sử dụng ngôn từ chính xác, đúng ngữ pháp và tránh thành
                  kiến.
                </FormDescription>

                <div className="flex-1">
                  <FormControl>
                    <TinyEditor
                      value={field.value}
                      onEditorChange={field.onChange}
                      init={{
                        height: '100%',
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
      </ResizablePanel>
      <ResizableHandle withHandle />

      <ResizablePanel minSize={30}>
        <div className="flex h-full flex-col space-y-0">
          <div className="flex h-14 items-center gap-2 border-b px-4 py-2 text-lg font-bold">
            Gợi ý
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4 scrollbar-thin">
            <p className="text-base text-muted-foreground">
              Các gợi ý sẽ được mở khóa sau lần thực hiện thất bại thứ hai để
              học viên có thể nhận được nhiều hỗ trợ hơn ngoài các bài giảng và
              bài kiểm tra liên quan.
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
                            if (
                              index === fields.length - 1 &&
                              fields.length < 10
                            ) {
                              append('')
                            }
                          }}
                        />
                      </FormControl>
                      <button
                        type="button"
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500"
                        onClick={() => remove(index)}
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <Button
              type="button"
              disabled={fields.length >= 10 || disabled}
              onClick={() => {
                append('')
              }}
            >
              Thêm gợi ý
            </Button>
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default GuideTab
