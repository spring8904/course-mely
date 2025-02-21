'use client'

import { Info } from 'lucide-react'
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

  const { sampleFileName, version } =
    LANGUAGE_CONFIG[form.getValues('language') as Language]

  const files = {
    [sampleFileName]: {
      name: sampleFileName,
      language: form.getValues('language'),
      value: form.getValues('sample_code') || '',
      version,
    },
  }

  const resultCode = useWatch({ name: 'result_code' })

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel minSize={35} defaultSize={65}>
        <FormField
          control={form.control}
          name="result_code"
          render={({ field }) => (
            <FormItem className="flex h-full flex-col space-y-0 text-white">
              <FormLabel className="flex h-14 items-center gap-2 border-b border-gray-500 bg-[#0d0d0d] px-4 py-2 text-lg font-bold">
                Hướng dẫn
                <Info size={18} />
                <FormMessage />
              </FormLabel>

              <div className="flex-1">
                <FormControl>
                  <MonacoEditor
                    files={files}
                    onCompile={(code) => {
                      field.onChange(code)
                    }}
                    disabled={field.disabled}
                    readOnly={field.disabled}
                  />
                </FormControl>
              </div>
            </FormItem>
          )}
        />
      </ResizablePanel>
      <ResizableHandle />

      <ResizablePanel minSize={30}>
        <div className="flex h-full flex-col text-white">
          <div className="flex h-14 items-center gap-2 border-b border-gray-500 bg-[#0d0d0d] px-4 py-2 text-xl font-bold">
            Kết quả
            <Info size={18} />
          </div>

          <div className="flex-1 bg-[#1e1e1e] px-6 py-4">{resultCode}</div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
export default SolutionTab
