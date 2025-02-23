'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import confetti from 'canvas-confetti'
import { CirclePlay, Loader2 } from 'lucide-react'

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
  ...rest
}: Props) => {
  const firstFileName = Object.keys(files)[0]
  const compileCode = useCompileCode()

  const [fileName, setFileName] = useState<string>(firstFileName)
  const [markers, setMarkers] = useState<any>()
  const file = files[fileName]

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
        files: [{ content: file.value }],
      },
      {
        onSuccess: (res) => {
          onCompile?.(res.run.output)

          confetti({
            particleCount: 100,
            spread: 100,
            origin: { y: 0.9 },
          })
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
      </div>

      <div className="flex-1 bg-[#1e1e1e] pt-5">
        <Editor
          theme={theme}
          onChange={(value) => {
            onChange?.(value, file.name)
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
