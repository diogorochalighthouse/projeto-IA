import type { ChatMessage } from '@/types/chat'

type ChatMessageListProps = {
  messages: ChatMessage[]
  loading: boolean
}

export function ChatMessageList({ messages, loading }: ChatMessageListProps) {
  return (
    <div className="flex-1 overflow-y-auto border p-4 mb-4">
      {messages.map((message, index) => (
        <div key={`${message.role}-${index}`} className="mb-2">
          <strong>{message.role === 'user' ? 'Você' : 'IA'}:</strong>
          <p>{message.content}</p>
        </div>
      ))}

      {loading && <p>IA está pensando...</p>}
    </div>
  )
}
