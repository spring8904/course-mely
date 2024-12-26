export interface IWallet {
  id?: number
  userId?: number
  balance: number
  status?: 0 | 1
  createdAt?: Date | null
  updatedAt?: Date | null
}

export interface ITransaction {
  id?: number
  amount: number
  coin: number
  status: string
  createdAt?: Date | null
  updatedAt?: Date | null
}

export interface IWithdrawalRequest {
  id?: number
  walletId?: number
  coin: number
  amount: number
  bankName: string
  accountNumber: string
  accountHolder: string
  note?: string | null
  status?: string
  requestDate?: Date | null
  completedDate?: Date | null
  createdAt?: Date | null
  updatedAt?: Date | null
}
