import { z } from 'zod'

export const codeSubmissionSchema = z.object({
  coding_id: z.number(),
  code: z.string({
    message: 'Vui lòng chạy code trước khi nộp bài',
    required_error: 'Vui lòng chạy code trước khi nộp bài',
  }),
  result: z.string({
    message: 'Vui lòng chạy code trước khi nộp bài',
  }),
})

export type CodeSubmissionPayLoad = z.infer<typeof codeSubmissionSchema>
