'use client'

import { AppShell, Box, Group, Text } from '@mantine/core'

import { ChatComposer } from '@/features/chat/components/ChatComposer'
import { ChatMessageList } from '@/features/chat/components/ChatMessageList'
import { ChatSidebar } from '@/features/chat/components/ChatSidebar'
import { useChat } from '@/features/chat/hooks/useChat'
import { ApiStatusBadge } from '@/features/system/components/ApiStatusBadge'
import { useApiStatus } from '@/features/system/hooks/useApiStatus'

export default function Home() {
  const {
    conversations,
    activeConversationId,
    messages,
    input,
    selectedFile,
    loading,
    setInput,
    setSelectedFile,
    createConversation,
    selectConversation,
    deleteConversation,
    sendMessage,
  } = useChat()
  const apiStatus = useApiStatus()

  return (
    <AppShell
      padding="md"
      navbar={{
        width: 320,
        breakpoint: 'sm',
      }}
      styles={{
        main: { backgroundColor: '#09090b' },
        navbar: { backgroundColor: '#09090b', borderInlineEnd: '1px solid #27272a' },
      }}
    >
      <AppShell.Navbar p="xs">
        <ChatSidebar
          conversations={conversations}
          activeConversationId={activeConversationId}
          onNewConversation={createConversation}
          onSelectConversation={selectConversation}
          onDeleteConversation={deleteConversation}
        />
      </AppShell.Navbar>

      <AppShell.Main style={{ height: '100vh' }}>
        <Group justify="space-between" mb="md">
          <Text fw={700} size="xl">
            DocMind AI
          </Text>
          <ApiStatusBadge status={apiStatus} />
        </Group>

        <Box style={{ display: 'flex', flexDirection: 'column', height: 'calc(100% - 52px)' }}>
          <Box style={{ flex: 1, minHeight: 0 }}>
            <ChatMessageList messages={messages} loading={loading} />
          </Box>
          <ChatComposer
            input={input}
            selectedFile={selectedFile}
            loading={loading}
            onInputChange={setInput}
            onFileChange={setSelectedFile}
            onSendMessage={sendMessage}
          />
        </Box>
      </AppShell.Main>
    </AppShell>
  )
}
