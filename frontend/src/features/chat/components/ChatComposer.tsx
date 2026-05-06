import { Button, FileInput, Group, Input } from '@mantine/core'
import { FileUp } from 'lucide-react'

type ChatComposerProps = {
  input: string
  loading: boolean
  onInputChange: (value: string) => void
  onSendMessage: () => Promise<void> | void
  onUploadFile: (file: File | null) => Promise<void> | void
}

export function ChatComposer({
  input,
  loading,
  onInputChange,
  onSendMessage,
  onUploadFile,
}: ChatComposerProps) {
  return (
    <Group mt="md" gap="sm" align="center" wrap="nowrap">
      <FileInput
        onChange={onUploadFile}
        w={220}
        placeholder="Enviar arquivo"
        leftSection={<FileUp className="w-4 h-4 mr-2 text-gray-500" />}
        disabled={loading}
      />

      <Input
        value={input}
        onChange={(event) => onInputChange(event.target.value)}
        placeholder="Digite sua pergunta..."
        style={{ flex: 1 }}
        disabled={loading}
      />

      <Button onClick={onSendMessage} variant="filled" loading={loading}>
        Enviar
      </Button>
    </Group>
  )
}
