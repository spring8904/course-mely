import { z } from 'zod'

export const quizSubmissionSchema = z.object({
  quiz_id: z.number(),
  answers: z.array(
    z.object({
      question_id: z.number(),
      answer_id: z.array(z.number()),
    })
  ),
})

export type QuizSubmissionInput = z.infer<typeof quizSubmissionSchema>
