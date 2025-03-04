import { WithDrawalRequestPayload } from '@/validations/support-bank'
import api from '@/configs/api'

const prefix = 'instructor/wallet'

export const instructorWalletApi = {
  getWallet: async () => {
    return await api.get(`${prefix}`)
  },
  getWithDrawRequests: async (params?: {
    fromDate?: string | undefined
    toDate?: string | undefined
  }) => {
    return await api.get(`${prefix}/withdraw-requests`, {
      params,
    })
  },
  getWithDrawRequest: async (id: string) => {
    return await api.get(`${prefix}/withdraw-request/${id}`)
  },
  withDrawRequest: async (data: WithDrawalRequestPayload) => {
    return await api.post(`${prefix}/withdraw-request`, data)
  },
  handleConfirmWithDrawRequest: async (id: string, data: any) => {
    return await api.put(`${prefix}/withdraw-request/${id}/handleConfirm`, data)
  },
}
