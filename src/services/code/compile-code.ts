import axios from 'axios'

export async function compileCode(requestData: any) {
  const endpoint = 'https://emkc.org/api/v2/piston/execute'

  const response = await axios.post(endpoint, requestData)
  return response.data
}
