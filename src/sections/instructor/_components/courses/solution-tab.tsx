'use client'

import { useState } from 'react'
import { Info } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'

import { UpdateCodingLessonPayload } from '@/validations/course'
import { Language, LANGUAGE_CONFIG } from '@/constants/language'

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import MonacoEditor from '@/components/shared/monaco-editor'

interface Props {
  form: UseFormReturn<UpdateCodingLessonPayload, any, undefined>
}

const SolutionTab = ({ form }: Props) => {
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

  const [resultCode, setResultCode] = useState(form.getValues('result_code'))

  return (
    <ResizablePanelGroup direction="horizontal" className="mt-0">
      <ResizablePanel minSize={35} defaultSize={65}>
        <div className="flex h-full flex-col text-white">
          <div className="flex h-14 items-center gap-2 border-b border-gray-500 bg-[#0d0d0d] px-4 py-2 text-xl font-bold">
            Giải pháp
            <Info size={18} />
          </div>

          <div className="flex-1">
            <MonacoEditor
              files={files}
              onCompile={(code) => {
                form.setValue('result_code', code)
                setResultCode(code)
              }}
            />
          </div>
        </div>
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
