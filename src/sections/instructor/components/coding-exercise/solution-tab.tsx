'use client'

import { Info } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

import { UpdateCodingLessonPayload } from '@/validations/course'
import { Language, LANGUAGE_CONFIG } from '@/constants/language'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import MonacoEditor from '@/components/shared/monaco-editor'

const SolutionTab = () => {
  const form = useFormContext<UpdateCodingLessonPayload>()

  const { sampleFileName, version, codeSnippet } =
    LANGUAGE_CONFIG[form.getValues('language') as Language]

  const files = {
    [sampleFileName]: {
      name: sampleFileName,
      language: form.getValues('language'),
      value: codeSnippet,
      version,
    },
  }

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel minSize={35} defaultSize={60}>
        <FormField
          control={form.control}
          name="solution_code"
          render={({ field }) => (
            <FormItem className="flex h-full flex-col space-y-0 text-white">
              <FormLabel className="flex h-14 items-center gap-2 border-b border-gray-500 bg-[#0d0d0d] px-4 py-2 text-lg font-bold">
                <span className="mt-2"> Giải pháp</span>
                <FormMessage className="mt-2" />
              </FormLabel>
              <div className="flex-1">
                <FormControl>
                  <MonacoEditor
                    files={files}
                    onCompile={(code) => {
                      form.setValue('result_code', code, {
                        shouldValidate: true,
                      })
                    }}
                    readOnly={field.disabled}
                    runCode
                    {...field}
                  />
                </FormControl>
              </div>
            </FormItem>
          )}
        />
      </ResizablePanel>
      <ResizableHandle withHandle />

      <ResizablePanel minSize={35}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel minSize={30} defaultSize={70}>
            <FormField
              control={form.control}
              name="sample_code"
              render={({ field }) => (
                <FormItem className="flex h-full flex-col space-y-0 text-white">
                  <FormLabel className="flex h-14 items-center gap-2 border-b border-gray-500 bg-[#0d0d0d] px-4 py-2 text-lg font-bold">
                    <span className="mt-2"> File của học viên</span>
                    <FormMessage className="mt-2" />
                  </FormLabel>

                  <div className="flex-1">
                    <FormControl>
                      <MonacoEditor
                        files={files}
                        readOnly={field.disabled}
                        {...field}
                      />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
          </ResizablePanel>
          <ResizableHandle />

          <ResizablePanel minSize={10}>
            <FormField
              control={form.control}
              name="result_code"
              render={({ field }) => (
                <FormItem className="flex h-full flex-col space-y-0 text-white">
                  <FormLabel className="flex h-14 items-center gap-2 border-b border-gray-500 bg-[#0d0d0d] px-4 py-2 text-lg font-bold">
                    Kết quả
                    <Info size={18} />
                    <FormMessage />
                  </FormLabel>

                  <div className="flex-1 bg-[#1e1e1e] px-6 py-4">
                    {field.value}
                  </div>
                </FormItem>
              )}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
export default SolutionTab
