import { Paper, ScrollArea, Stack, Text } from '@mantine/core'

import type { ChatMessage } from '@/types/chat'

type ChatMessageListProps = {
  messages: ChatMessage[]
  loading: boolean
}

export function ChatMessageList({ messages, loading }: ChatMessageListProps) {
  return (
    <Paper
      withBorder
      p="md"
      radius="md"
      style={{
        height: '100%',
        borderColor: '#27272a',
        backgroundColor: 'rgba(24, 24, 27, 0.7)',
      }}
    >
      <ScrollArea h="100%" className="custom-scrollbar" type="hover" scrollbarSize={8}>
        <Stack gap="sm">
      {messages.map((message, index) => (
          <Paper
            key={`${message.role}-${index}`}
            p="md"
            radius="xl"
            ml={message.role === 'user' ? 'auto' : 0}
            mr={message.role === 'assistant' ? 'auto' : 0}
            maw="90%"
            bg={message.role === 'user' ? '#f4f4f5' : '#27272a'}
            c={message.role === 'user' ? '#18181b' : '#f4f4f5'}
          >
            <Text size="sm">{message.content}</Text>
          </Paper>
      ))}

          {loading && (
            <Text size="sm" c="dimmed">
              IA esta pensando...
            </Text>
          )}
        </Stack>
      </ScrollArea>
    </Paper>
  )
}
