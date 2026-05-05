"use client"

import { useState } from "react"

type Message = {
  role: "user" | "assistant"
  content: string
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"

async function uploadFile(file: File) {
  const formData = new FormData()
  formData.append("file", file)

  const res = await fetch(`${API_BASE_URL}/upload/`, {
    method: "POST",
    body: formData
  })

  if (!res.ok) {
    throw new Error("Falha ao enviar arquivo para a API.")
  }
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  async function sendMessage() {
    if (!input) return

    const userMessage: Message = {
      role: "user",
      content: input
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setLoading(true)

    try {
      const res = await fetch(`${API_BASE_URL}/ai/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ question: input })
      })

      if (!res.ok) {
        throw new Error("Falha ao consultar a API.")
      }

      const data = await res.json()

      const aiMessage: Message = {
        role: "assistant",
        content: data.response
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (err) {
      console.error(err)
      const errorMessage: Message = {
        role: "assistant",
        content: "Nao consegui conectar com a API local. Verifique se ela esta rodando em http://localhost:8000 ou defina NEXT_PUBLIC_API_URL."
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-screen p-4">
      <h1 className="text-xl font-bold mb-4">DocMind AI</h1>

      <div className="flex-1 overflow-y-auto border p-4 mb-4">
        {messages.map((msg, i) => (
          <div key={i} className="mb-2">
            <strong>{msg.role === "user" ? "Você" : "IA"}:</strong>
            <p>{msg.content}</p>
          </div>
        ))}

        {loading && <p>IA está pensando...</p>}
      </div>

      <div className="flex gap-2">
      <input
          type="file"
          onChange={async (e) => {
            if (e.target.files?.[0]) {
              try {
                await uploadFile(e.target.files[0])
                const uploadOkMessage: Message = {
                  role: "assistant",
                  content: "Arquivo enviado com sucesso."
                }
                setMessages((prev) => [...prev, uploadOkMessage])
              } catch (err) {
                console.error(err)
                const uploadErrorMessage: Message = {
                  role: "assistant",
                  content: "Nao consegui enviar o arquivo. Verifique se a API local esta acessivel."
                }
                setMessages((prev) => [...prev, uploadErrorMessage])
              }
            }
          }}
        />
        <input
          className="border p-2 flex-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite sua pergunta..."
        />

        <button
          className="bg-blue-500 text-white px-4"
          onClick={sendMessage}
        >
          Enviar
        </button>
      </div>
    </div>
  )
}