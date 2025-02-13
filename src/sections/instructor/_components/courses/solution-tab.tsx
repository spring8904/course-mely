'use client'

import { useRef } from 'react'
import files from '@/sample/files'
import { ArrowUp, Info, MoveHorizontal, RotateCcw } from 'lucide-react'
import { ImperativePanelHandle } from 'react-resizable-panels'

import { Button } from '@/components/ui/button'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import MonacoEditor from '@/components/shared/monaco-editor'

const SolutionTab = () => {
  const solutionPanelRef = useRef<ImperativePanelHandle>(null)
  const evaluationPanelRef = useRef<ImperativePanelHandle>(null)
  const resultPanelRef = useRef<ImperativePanelHandle>(null)

  const handleResize = ({
    ref,
    size,
  }: {
    ref: { current: ImperativePanelHandle | null }
    size: number
  }) => {
    ref.current?.resize(size)
  }

  return (
    <ResizablePanelGroup direction="vertical" className="mt-0">
      <ResizablePanel minSize={10}>
        <ResizablePanelGroup direction="horizontal" className="mt-0">
          <ResizablePanel minSize={35} ref={solutionPanelRef}>
            <SolutionPanel
              handleResize={() => {
                handleResize({ ref: solutionPanelRef, size: 70 })
              }}
            />
          </ResizablePanel>

          <ResizableHandle />
          <ResizablePanel minSize={30} ref={evaluationPanelRef}>
            <EvaluationPanel
              handleResize={() => {
                handleResize({ ref: evaluationPanelRef, size: 65 })
              }}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>

      <ResizableHandle />
      <ResizablePanel defaultSize={10} minSize={10} ref={resultPanelRef}>
        <div className="flex items-center justify-between border-b border-gray-500 bg-[#0d0d0d] px-4 py-2 text-gray-200">
          <div className="flex items-center gap-2 text-lg font-bold">
            Result
          </div>

          <div className="flex items-center gap-2">
            <ArrowUp
              size={18}
              onClick={() => handleResize({ ref: resultPanelRef, size: 80 })}
            />
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
export default SolutionTab

type PanelProps = {
  handleResize: () => void
}

const SolutionPanel = ({ handleResize }: PanelProps) => {
  return (
    <div className="flex h-full flex-col text-white">
      <div className="flex h-14 items-center justify-between border-b border-gray-500 bg-[#0d0d0d] px-4 py-2">
        <div className="flex items-center gap-2 text-xl font-bold">
          Giải pháp
          <Info size={18} />
        </div>

        <div className="flex items-center gap-2">
          <Button className="border border-white bg-transparent text-white hover:bg-white/10">
            View example
          </Button>
          <RotateCcw size={18} />
          <MoveHorizontal size={18} onClick={handleResize} />
        </div>
      </div>

      <div className="flex-1">
        <MonacoEditor
          files={files}
          onChange={(value, fileName) => {
            console.group('onChange')
            console.log(fileName)
            console.log(value)
            console.groupEnd()
          }}
        />
      </div>
    </div>
  )
}

const EvaluationPanel = ({ handleResize }: PanelProps) => {
  return <SolutionPanel handleResize={handleResize} />
}
