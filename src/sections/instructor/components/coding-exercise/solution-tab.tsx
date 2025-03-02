'use client'

import { useEffect } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

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

  const language = useWatch({ name: 'language' })

  const { sampleFileName, version, codeSnippet } =
    LANGUAGE_CONFIG[language as Language]

  const files = {
    [sampleFileName]: {
      name: sampleFileName,
      language,
      value: codeSnippet,
      version,
    },
  }

  const studentFiles = {
    [sampleFileName + ' ']: {
      name: sampleFileName + ' ',
      language,
      value: codeSnippet,
      version,
    },
  }

  useEffect(() => {
    form.setValue('solution_code', codeSnippet)
    form.setValue('sample_code', codeSnippet)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language])

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel minSize={35} defaultSize={60}>
        <FormField
          control={form.control}
          name="solution_code"
          render={({ field }) => (
            <FormItem className="flex h-full flex-col space-y-0 text-white">
              <FormLabel className="flex h-14 items-center gap-2 border-b border-gray-500 bg-[#0d0d0d] px-4 py-2 text-lg font-bold">
                <span>Giải pháp</span>
                <FormMessage />
              </FormLabel>
              <div className="flex-1">
                <FormControl>
                  <MonacoEditor
                    files={files}
                    onExecute={(code) => {
                      form.setValue('result_code', code)
                      form.trigger('result_code')
                    }}
                    readOnly={field.disabled}
                    activeFileGroup={'solution'}
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
                    <span> File của học viên</span>
                    <FormMessage />
                  </FormLabel>

                  <div className="flex-1">
                    <FormControl>
                      <MonacoEditor
                        files={studentFiles}
                        readOnly={field.disabled}
                        activeFileGroup={'student'}
                        {...field}
                      />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
          </ResizablePanel>
          <ResizableHandle withHandle />

          <ResizablePanel minSize={10}>
            <FormField
              control={form.control}
              name="result_code"
              render={({ field }) => (
                <FormItem className="flex h-full flex-col space-y-0 text-white">
                  <FormLabel className="flex h-14 items-center gap-2 border-b border-gray-500 bg-[#0d0d0d] px-4 py-2 text-lg font-bold">
                    Kết quả
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
