import api from '@/configs/api'
import { Membership, MembershipDetail } from '@/types/membership'
import { MembershipPayload } from '@/validations/membership'

const prefix = '/instructor/member-ship-plans'

export const memberShipApi = {
  getMemberships: async (): Promise<Membership[]> => {
    const res = await api.get(`${prefix}`)
    return res.data
  },

  getMembership: async (code: string): Promise<MembershipDetail> => {
    const res = await api.get(`${prefix}/${code}`)
    return res.data
  },

  createMembership: (
    payload: MembershipPayload
  ): Promise<{ message: string; data: any }> => {
    return api.post(`${prefix}`, payload)
  },

  updateMembership: (
    code: string,
    payload: MembershipPayload
  ): Promise<{ message: string; data: any }> => {
    return api.put(`${prefix}/${code}`, payload)
  },

  toggleStatusMembership: (
    code: string
  ): Promise<{ message: string; data: any }> => {
    return api.put(`${prefix}/${code}/enable`)
  },

  sendMembershipRequest: (
    code: string
  ): Promise<{ message: string; data: any }> => {
    return api.post(`${prefix}/${code}/send-request-membership-plan`)
  },
}
