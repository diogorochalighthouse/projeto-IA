import { Button, FileInput, Input } from '@mantine/core'
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
    <div className="flex gap-2">
      <FileInput
        onChange={onUploadFile}
        className="flex-1 flex items-center cursor-pointer justify-center"
        leftSection={<FileUp className="w-4 h-4 mr-2 text-gray-500" />}
        disabled={loading}
      />

      <Input
        value={input}
        onChange={(event) => onInputChange(event.target.value)}
        placeholder="Digite sua pergunta..."
        className="w-full"
        disabled={loading}
      />

      <Button onClick={onSendMessage} variant="filled" loading={loading}>
        Enviar
      </Button>
    </div>
  )
}
