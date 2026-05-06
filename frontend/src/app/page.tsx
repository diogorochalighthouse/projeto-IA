'use client'

import { ChatComposer } from '@/features/chat/components/ChatComposer'
import { ChatMessageList } from '@/features/chat/components/ChatMessageList'
import { useChat } from '@/features/chat/hooks/useChat'

export default function Home() {
  const { messages, input, loading, setInput, sendMessage, uploadFile } = useChat()

  return (
    <div className="flex flex-col h-screen p-4">
      <h1 className="text-xl font-bold mb-4">DocMind AI</h1>
      <ChatMessageList messages={messages} loading={loading} />
      <ChatComposer
        input={input}
        loading={loading}
        onInputChange={setInput}
        onSendMessage={sendMessage}
        onUploadFile={uploadFile}
      />
    </div>
  )
}
