export type MessageRole = 'user' | 'assistant'

export type ChatMessage = {
  role: MessageRole
  content: string
}

export type ChatConversation = {
  id: string
  title: string
  updatedAt: string
  messages: ChatMessage[]
}
