'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import confetti from 'canvas-confetti'
import { CirclePlay, Loader2, RotateCcw } from 'lucide-react'

import { cn } from '@/lib/utils'
import { useCompileCode } from '@/hooks/code/use-compile-code'

import { Button } from '../ui/button'

const Editor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
})

type File = {
  name: string
  language: string
  value: string
  version: string
}

type Props = {
  files: { [key: string]: File }
  value?: string
  onChange?: (value?: string, fileName?: string) => void
  onCompile?: (value: any) => void
  theme?: 'light' | 'vs-dark'
  disabled?: boolean
  readOnly?: boolean
  runCode?: boolean
  [key: string]: any
}

const MonacoEditor = ({
  files,
  onChange,
  onCompile,
  theme = 'vs-dark',
  disabled,
  readOnly,
  runCode = false,
  activeFileGroup = 'solution',
  value,
  ...rest
}: Props & { activeFileGroup?: string }) => {
  const firstFileName = Object.keys(files)[0]
  const compileCode = useCompileCode()

  const [fileName, setFileName] = useState<string>(firstFileName)
  const file = files[fileName]

  const [markers, setMarkers] = useState<any>()
  const editorRef = useRef<any>(null)

  useEffect(() => {
    editorRef.current?.focus()
  }, [file.name])

  const handleCompileCode = () => {
    if (markers?.length > 0) return

    compileCode.mutate(
      {
        language: file.language,
        version: file.version,
        files: [{ content: value }],
      },
      {
        onSuccess: (res) => {
          onCompile?.(res.run.output)

          if (res.run.code === 0) {
            confetti({
              particleCount: 100,
              spread: 100,
              origin: { y: 0.9 },
            })
          }

          console.log(
            `File group run: ${activeFileGroup}`,
            `Output: ${res.run.output}`
          )
        },
      }
    )
  }

  return (
    <div className="relative flex h-full flex-col">
      <div
        className={cn(
          'flex items-end justify-start',
          'rounded-none bg-[#151515] pb-0'
        )}
      >
        {Object.values(files).map((file) => {
          return (
            <button
              key={file.name}
              className={cn(
                'px-4 py-2 text-sm text-white opacity-50',
                file.name === fileName &&
                  'border-white bg-[#1e1e1e] opacity-100'
              )}
              disabled={file.name === fileName}
              onClick={() => setFileName(file.name)}
            >
              {file.name}
            </button>
          )
        })}

        <Button
          size="icon"
          className="ml-auto mr-2 bg-transparent hover:bg-transparent"
          onClick={() => {
            onChange?.(files[firstFileName]?.value, fileName)
          }}
        >
          <RotateCcw />
        </Button>
      </div>

      <div className="flex-1 bg-[#1e1e1e] pt-5">
        <Editor
          theme={theme}
          value={value}
          onChange={(value) => {
            onChange?.(value, fileName)
          }}
          path={file.name}
          defaultLanguage={file.language}
          defaultValue={file.value}
          onMount={(editor) => (editorRef.current = editor)}
          onValidate={(markers) => setMarkers(markers)}
          options={{
            readOnly,
          }}
          {...rest}
        />
      </div>

      {runCode && (
        <Button
          variant="secondary"
          className="absolute bottom-6 left-6"
          type="button"
          onClick={handleCompileCode}
          disabled={compileCode.isPending || markers?.length > 0 || disabled}
        >
          {compileCode.isPending ? (
            <Loader2 className="animate-spin" />
          ) : (
            <CirclePlay />
          )}
          Chạy mã
        </Button>
      )}
    </div>
  )
}

export default MonacoEditor
