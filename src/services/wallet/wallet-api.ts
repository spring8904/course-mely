import { WithDrawalRequestPayload } from '@/validations/support-bank'
import api from '@/configs/api'

const prefix = 'instructor/wallet'

export const instructorWalletApi = {
  getWallet: async () => {
    return await api.get(`${prefix}`)
  },
  withDrawRequest: async (data: WithDrawalRequestPayload) => {
    return await api.post(`${prefix}/withdraw-request`, data)
  },
}
