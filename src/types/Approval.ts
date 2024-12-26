export interface IApproval {
  id?: number
  userId?: number
  status?: string
  note?: string
  requestDate?: Date | null
  approvedAt?: Date | null
  rejectedAt?: Date | null
  createdAt?: Date | null
  updatedAt?: Date | null
}
