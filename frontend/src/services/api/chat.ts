import { API_BASE_URL } from '@/config/env'

type AskAiResponse = {
  response: string
}

export async function uploadDocument(file: File): Promise<void> {
  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch(`${API_BASE_URL}/upload/`, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    throw new Error('Falha ao enviar arquivo para a API.')
  }
}

export async function askAi(question: string): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/ai`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ question }),
  })

  if (!response.ok) {
    throw new Error('Falha ao consultar a API.')
  }

  const data = (await response.json()) as AskAiResponse
  return data.response
}
