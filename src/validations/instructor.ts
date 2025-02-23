import { z } from 'zod'

export const registerInstructorSchema = z.object({
  qa_systems: z
    .object({
      question: z.string().min(1),
      options: z.string().array().nonempty(),
      selected_options: z
        .number()
        .array()
        .min(1, { message: 'Vui lòng chọn câu trả lời' }),
    })
    .array(),
  certificates: z
    .array(
      z.object({
        file: z
          .instanceof(File, { message: 'Vui lòng tải lên tệp hợp lệ' })
          .optional(),
      })
    )
    .optional(),
})

export type RegisterInstructorInput = z.infer<typeof registerInstructorSchema>
