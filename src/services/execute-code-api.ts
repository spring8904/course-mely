import { ExecuteRequest, ExecuteResponse } from '@/types/Execute'
import axios from 'axios'

export const executeCode = async (
  payload: ExecuteRequest
): Promise<ExecuteResponse> => {
  const endpoint = 'https://emkc.org/api/v2/piston/execute'

  const response = await axios.post(endpoint, payload)
  return response.data
}
