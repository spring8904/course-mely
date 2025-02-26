'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { ILesson } from '@/types'
import {
  CodeSubmissionPayLoad,
  codeSubmissionSchema,
} from '@/validations/code-submission'
import { Language, LANGUAGE_CONFIG } from '@/constants/language'
import { formatDate } from '@/lib/common'

import { Button } from '@/components/ui/button'
import {
  Form,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import HtmlRenderer from '@/components/shared/html-renderer'
import MonacoEditor from '@/components/shared/monaco-editor'

type Props = {
  lesson: ILesson
}

export const CodingExercise = ({ lesson }: Props) => {
  const { lessonable: codeData } = lesson

  const form = useForm<CodeSubmissionPayLoad>({
    resolver: zodResolver(codeSubmissionSchema),
    defaultValues: {
      coding_id: lesson.lessonable_id,
      code: codeData?.sample_code,
    },
  })

  const language = codeData?.language as Language

  const { sampleFileName, version } = LANGUAGE_CONFIG[language]

  const files = {
    [sampleFileName]: {
      name: sampleFileName,
      language,
      value: codeData?.sample_code || '',
      version,
    },
  }

  const onSubmit = (values: CodeSubmissionPayLoad) => {
    console.log('values submit', values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="relative h-full">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel minSize={30}>
            <Tabs defaultValue="instruct" className="flex h-full flex-col">
              <TabsList variant="outline" className="h-12 px-8">
                <TabsTrigger
                  value="instruct"
                  variant="outline"
                  className="h-12 min-w-32 border-b-2 text-base duration-500 data-[state=active]:text-primary data-[state=active]:focus:bg-primary/5"
                >
                  NỘI DUNG
                </TabsTrigger>
                <TabsTrigger
                  value="hints"
                  variant="outline"
                  className="h-12 min-w-32 border-b-2 text-base duration-500 data-[state=active]:text-primary data-[state=active]:focus:bg-primary/5"
                >
                  GỢI Ý
                </TabsTrigger>
              </TabsList>
              <div className="h-full overflow-y-auto p-8 pb-20 scrollbar-thin lg:px-16">
                <TabsContent value="instruct">
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold">{lesson.title}</h1>
                    <p className="text-sm text-muted-foreground">
                      Cập nhật vào{' '}
                      {formatDate(lesson.updated_at, {
                        dateStyle: 'long',
                      })}
                    </p>
                  </div>

                  <HtmlRenderer html={lesson.content} className="mt-8" />
                  <HtmlRenderer html={codeData?.instruct} className="mt-8" />
                </TabsContent>
                <TabsContent value="hints" className="prose">
                  <ol>
                    {codeData?.hints?.map((hint, index) => (
                      <li key={index}>{hint}</li>
                    ))}
                  </ol>
                </TabsContent>
              </div>
            </Tabs>
          </ResizablePanel>
          <ResizableHandle withHandle />

          <ResizablePanel minSize={20}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel minSize={30} defaultSize={70}>
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem className="h-full text-white">
                      <FormControl>
                        <MonacoEditor
                          files={files}
                          onCompile={(code) => {
                            form.setValue('result', code)
                            form.trigger('result')
                          }}
                          readOnly={field.disabled}
                          activeFileGroup={'solution'}
                          runCode
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </ResizablePanel>
              <ResizableHandle withHandle />

              <ResizablePanel minSize={10}>
                <FormField
                  control={form.control}
                  name="result"
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

        <Button type="submit" className="absolute bottom-5 right-5">
          Nộp bài
        </Button>
      </form>
    </Form>
  )
}
