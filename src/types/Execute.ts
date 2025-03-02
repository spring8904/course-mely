export interface ExecuteRequest {
  language: string
  version: string
  files: File[]
  stdin?: string
  args?: string[]
  run_timeout?: number
  compile_timeout?: number
  compile_memory_limit?: number
  run_memory_limit?: number
}

interface File {
  name?: string
  content: string
  encoding?: 'base64' | 'hex' | 'utf-8'
}

export interface ExecuteResponse {
  run: Run
  language: string
  version: string
}

interface Run {
  stdout: string
  stderr: string
  code: number
  signal: null
  output: string
}
