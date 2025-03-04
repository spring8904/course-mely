import { z } from 'zod'

export const codeSubmissionSchema = z.object({
  code: z.string(),
  result: z.string({
    message: 'Vui lòng chạy code trước khi nộp bài',
  }),
})

export type CodeSubmissionPayLoad = z.infer<typeof codeSubmissionSchema>
