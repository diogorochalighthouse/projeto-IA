"use client"

import { useState } from "react"

export default function Home() {
  const [question, setQuestion] = useState("")
  const [response, setResponse] = useState("")

  async function askAI() {
    const res = await fetch("http://localhost:8000/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ question })
    })

    const data = await res.json()
    setResponse(data.response)
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>DocMind AI</h1>

      <input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Digite sua pergunta"
      />

      <button onClick={askAI}>Perguntar</button>

      <p>{response}</p>
    </div>
  )
}