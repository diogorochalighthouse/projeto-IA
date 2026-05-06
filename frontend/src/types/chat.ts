export type MessageRole = 'user' | 'assistant'

export type ChatMessage = {
  role: MessageRole
  content: string
}
