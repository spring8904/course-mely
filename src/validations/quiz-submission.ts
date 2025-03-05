import { z } from 'zod'

const answersSchema = z.array(
  z.object({
    question_id: z.number(),
    answer_id: z.union([z.array(z.number()), z.number()]),
  })
)

export type Answers = z.infer<typeof answersSchema>

export const quizSubmissionSchema = z.object({
  quiz_id: z.number(),
  answers: answersSchema,
})

export type QuizSubmissionPayload = z.infer<typeof quizSubmissionSchema>
