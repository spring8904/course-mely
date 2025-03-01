import { z } from 'zod'

export const quizSubmissionSchema = z.object({
  quiz_id: z.number(),
  answers: z.array(
    z.object({
      question_id: z.number(),
      answer_id: z.array(z.number()).or(z.number()),
    })
  ),
})

export type QuizSubmissionPayload = z.infer<typeof quizSubmissionSchema>
