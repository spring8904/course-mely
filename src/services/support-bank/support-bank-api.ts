import { WithDrawalRequestPayload } from '@/validations/support-bank'
import api from '@/configs/api'

const prefix = 'support-banks'

export const supportBankApi = {
  getSupportBanks: async () => {
    return await api.get(`${prefix}`)
  },
  generateQr: async (data: WithDrawalRequestPayload) => {
    return await api.post(`${prefix}/generate-qr`, data)
  },
}
