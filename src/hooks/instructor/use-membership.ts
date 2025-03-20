import { useQuery } from '@tanstack/react-query'

import QueryKey from '@/constants/query-key'
import { memberShipApi } from '@/services/instructor/membership-api'
import { MembershipPayload } from '@/validations/membership'
import { useToastMutation } from '../use-toast-mutation'

export const useGetMemberships = () => {
  return useQuery({
    queryKey: [QueryKey.MEMBERSHIPS],
    queryFn: memberShipApi.getMemberships,
  })
}

export const useGetMembership = (code: string) => {
  return useQuery({
    queryKey: [QueryKey.MEMBERSHIPS, code],
    queryFn: () => memberShipApi.getMembership(code),
  })
}

export const useCreateMembership = () => {
  return useToastMutation({
    mutationFn: (payload: MembershipPayload) =>
      memberShipApi.createMembership(payload),
    queryKey: [QueryKey.MEMBERSHIPS],
  })
}

export const useUpdateMembership = (code: string) => {
  return useToastMutation({
    mutationFn: (payload: MembershipPayload) =>
      memberShipApi.updateMembership(code, payload),
    queryKey: [QueryKey.MEMBERSHIPS],
  })
}

export const useToggleStatusMembership = () => {
  return useToastMutation({
    mutationFn: memberShipApi.toggleStatusMembership,
    queryKey: [QueryKey.MEMBERSHIPS],
  })
}

export const useSendMembershipRequest = (code: string) => {
  return useToastMutation({
    mutationFn: () => memberShipApi.sendMembershipRequest(code),
    queryKey: [QueryKey.MEMBERSHIPS],
  })
}
