'use client'

import { Button } from '@/components/ui/button'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { ArrowUp, Info, MoveHorizontal, RotateCcw } from 'lucide-react'
import { useRef } from 'react'
import { ImperativePanelHandle } from 'react-resizable-panels'

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
    <ResizablePanelGroup
      direction="vertical"
      className="mt-0 min-h-[calc(100vh-68px-68px)]"
    >
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
      <ResizablePanel defaultSize={20} minSize={10} ref={resultPanelRef}>
        <div className="flex items-center justify-between border-b border-gray-500 bg-gray-700 px-4 py-2 text-gray-200">
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
    <div className="h-full text-white">
      <div className="flex h-14 items-center justify-between border-b border-gray-500 bg-gray-700 px-4 py-2">
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

      <Tabs
        defaultValue="file-1"
        className="h-[calc(100%-69px)] scrollbar-track-gray-300 scrollbar-thumb-gray-700"
      >
        <TabsList
          className={cn(
            'h-auto w-full items-center justify-start rounded-none bg-gray-700 px-4 pb-0 [&>*]:!text-white'
          )}
        >
          <TabsTrigger
            value="file-1"
            className={cn(
              'rounded-none border-b border-transparent',
              'data-[state=active]:border-white data-[state=active]:bg-transparent'
            )}
          >
            file-1.ts
          </TabsTrigger>
          <TabsTrigger
            value="file-2"
            className={cn(
              'rounded-none border-b border-transparent',
              'data-[state=active]:border-white data-[state=active]:bg-transparent'
            )}
          >
            file-2.ts
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="file-1"
          className={cn(
            'mt-0 h-full overflow-y-auto bg-slate-900 p-4 scrollbar-thin'
          )}
        >
          file-1.ts <br />
        </TabsContent>
        <TabsContent
          value="file-2"
          className={cn(
            'mt-0 h-full overflow-y-auto bg-slate-900 p-4 scrollbar-thin'
          )}
        >
          {' '}
          file-2.ts <br />
          file-2.ts <br />
          file-2.ts <br />
          file-2.ts <br />
          file-2.ts <br />
          file-2.ts <br />
          file-2.ts <br />
          file-2.ts <br />
          file-2.ts <br />
          file-2.ts <br />
          file-2.ts <br />
          file-2.ts <br />
          file-2.ts <br />
          file-2.ts <br />
          file-2.ts <br />
          file-2.ts <br />
          file-2.ts <br />
          file-2.ts <br />
          file-2.ts <br />
          file-2.ts <br />
          file-2.ts <br />
          file-2.ts <br />
          file-2.ts <br />
          file-2.ts <br />
        </TabsContent>
      </Tabs>
    </div>
  )
}

const EvaluationPanel = ({ handleResize }: PanelProps) => {
  return (
    <div className="h-full text-white">
      <div className="flex h-14 items-center justify-between border-b border-gray-500 bg-gray-700 px-4 py-2">
        <div className="flex items-center gap-2 text-xl font-bold">
          Evaluation
          <Info size={18} />
        </div>

        <div className="flex items-center gap-2">
          <RotateCcw size={18} />
          <MoveHorizontal size={18} onClick={handleResize} />
        </div>
      </div>

      <Tabs
        defaultValue="file-1"
        className="h-[calc(100%-69px)] scrollbar-track-gray-300 scrollbar-thumb-gray-700"
      >
        <TabsList
          className={cn(
            'h-auto w-full items-center justify-start rounded-none bg-gray-700 px-4 pb-0 [&>*]:!text-white'
          )}
        >
          <TabsTrigger
            value="file-1"
            className={cn(
              'rounded-none border-b border-transparent',
              'data-[state=active]:border-white data-[state=active]:bg-transparent'
            )}
          >
            file-1.ts
          </TabsTrigger>
          <TabsTrigger
            value="file-2"
            className={cn(
              'rounded-none border-b border-transparent',
              'data-[state=active]:border-white data-[state=active]:bg-transparent'
            )}
          >
            file-2.ts
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="file-1"
          className={cn(
            'mt-0 h-full overflow-y-auto bg-slate-900 p-4 scrollbar-thin'
          )}
        >
          file-1.ts <br />
        </TabsContent>
        <TabsContent
          value="file-2"
          className={cn(
            'mt-0 h-full overflow-y-auto bg-slate-900 p-4 scrollbar-thin'
          )}
        >
          {' '}
          file-2.ts <br />
          file-2.ts <br />
          file-2.ts <br />
          file-2.ts <br />
          file-2.ts <br />
          file-2.ts <br />
          file-2.ts <br />
          file-2.ts <br />
          file-2.ts <br />
          file-2.ts <br />
          file-2.ts <br />
          file-2.ts <br />
          file-2.ts <br />
          file-2.ts <br />
          file-2.ts <br />
          file-2.ts <br />
          file-2.ts <br />
          file-2.ts <br />
          file-2.ts <br />
          file-2.ts <br />
          file-2.ts <br />
          file-2.ts <br />
          file-2.ts <br />
          file-2.ts <br />
        </TabsContent>
      </Tabs>
    </div>
  )
}
