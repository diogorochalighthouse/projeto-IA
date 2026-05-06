'use client'

import { useEffect, useState } from 'react'

import { askAiAction, uploadDocumentAction } from '@/features/chat/actions'
import type { ChatConversation, ChatMessage } from '@/types/chat'

const STORAGE_KEY = 'docmind:conversations'

function sortByNewest(conversations: ChatConversation[]) {
  return [...conversations].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  )
}

function createConversation(): ChatConversation {
  return {
    id: crypto.randomUUID(),
    title: 'Nova conversa',
    updatedAt: new Date().toISOString(),
    messages: [],
  }
}

export function useChat() {
  const [conversations, setConversations] = useState<ChatConversation[]>([])
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null)
  const [hasHydrated, setHasHydrated] = useState(false)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const raw = window.localStorage.getItem(STORAGE_KEY)

      if (!raw) {
        setHasHydrated(true)
        return
      }

      try {
        const parsed = sortByNewest(JSON.parse(raw) as ChatConversation[])
        setConversations(parsed)
        setActiveConversationId(parsed[0]?.id ?? null)
      } catch {
        setConversations([])
        setActiveConversationId(null)
      } finally {
        setHasHydrated(true)
      }
    }, 0)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [])

  useEffect(() => {
    if (!hasHydrated) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations))
  }, [conversations, hasHydrated])

  const activeConversation =
    conversations.find((item) => item.id === activeConversationId) ?? null

  const messages = activeConversation?.messages ?? []

  function applyConversationUpdate(
    conversationId: string,
    update: (messages: ChatMessage[]) => ChatMessage[]
  ) {
    setConversations((previous) =>
      sortByNewest(
        previous.map((conversation) => {
          if (conversation.id !== conversationId) return conversation

          const nextMessages = update(conversation.messages)
          const firstUserMessage = nextMessages.find((msg) => msg.role === 'user')

          return {
            ...conversation,
            title: firstUserMessage?.content.slice(0, 40) || 'Nova conversa',
            updatedAt: new Date().toISOString(),
            messages: nextMessages,
          }
        })
      )
    )
  }

  function ensureActiveConversationId(): string {
    if (activeConversationId) return activeConversationId

    const newConversation = createConversation()
    setConversations((previous) => sortByNewest([newConversation, ...previous]))
    setActiveConversationId(newConversation.id)
    return newConversation.id
  }

  async function createNewConversation() {
    const newConversation = createConversation()
    setConversations((previous) => sortByNewest([newConversation, ...previous]))
    setActiveConversationId(newConversation.id)
    setInput('')
  }

  function selectConversation(conversationId: string) {
    setActiveConversationId(conversationId)
  }

  async function deleteConversation(conversationId: string) {
    setConversations((previous) => {
      const next = previous.filter((conversation) => conversation.id !== conversationId)

      if (activeConversationId === conversationId) {
        setActiveConversationId(next[0]?.id ?? null)
      }

      return next
    })
  }

  async function sendMessage() {
    if (!input.trim()) return

    const conversationId = ensureActiveConversationId()
    const question = input
    const userMessage: ChatMessage = { role: 'user', content: question }
    applyConversationUpdate(conversationId, (previous) => [...previous, userMessage])
    setInput('')
    setLoading(true)

    try {
      const answer = await askAiAction(question)
      applyConversationUpdate(conversationId, (previous) => [
        ...previous,
        { role: 'assistant', content: answer },
      ])
    } catch (error) {
      console.error(error)
      applyConversationUpdate(conversationId, (previous) => [
        ...previous,
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
    const conversationId = ensureActiveConversationId()

    try {
      await uploadDocumentAction(file)
      applyConversationUpdate(conversationId, (previous) => [
        ...previous,
        { role: 'assistant', content: 'Arquivo enviado com sucesso.' },
      ])
    } catch (error) {
      console.error(error)
      applyConversationUpdate(conversationId, (previous) => [
        ...previous,
        {
          role: 'assistant',
          content:
            'Nao consegui enviar o arquivo. Verifique se a API local esta acessivel.',
        },
      ])
    }
  }

  return {
    conversations,
    activeConversationId,
    messages,
    input,
    loading,
    setInput,
    createConversation: createNewConversation,
    selectConversation,
    deleteConversation,
    sendMessage,
    uploadFile,
  }
}
