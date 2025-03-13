import { WithDrawalRequestPayload } from '@/validations/support-bank'
import api from '@/configs/api'
import { SupportBank } from '@/types/bank'

const prefix = 'support-banks'

export const supportBankApi = {
  getSupportBanks: async (): Promise<SupportBank[]> => {
    const res = await api.get(`${prefix}`)
    return res.data
  },
  generateQr: async (data: WithDrawalRequestPayload) => {
    return await api.post(`${prefix}/generate-qr`, data)
  },
}
