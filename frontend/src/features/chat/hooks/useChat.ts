'use client'

import { useState } from 'react'

import { askAi, uploadDocument } from '@/services/api/chat'
import type { ChatMessage } from '@/types/chat'

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  async function sendMessage() {
    if (!input.trim()) return

    const question = input
    const userMessage: ChatMessage = { role: 'user', content: question }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const answer = await askAi(question)
      setMessages((prev) => [...prev, { role: 'assistant', content: answer }])
    } catch (error) {
      console.error(error)
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'Nao consegui conectar com a API local. Verifique se ela esta rodando em http://localhost:8000 ou defina NEXT_PUBLIC_API_URL.',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  async function uploadFile(file: File | null) {
    if (!file) return

    try {
      await uploadDocument(file)
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Arquivo enviado com sucesso.' },
      ])
    } catch (error) {
      console.error(error)
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'Nao consegui enviar o arquivo. Verifique se a API local esta acessivel.',
        },
      ])
    }
  }

  return {
    messages,
    input,
    loading,
    setInput,
    sendMessage,
    uploadFile,
  }
}
