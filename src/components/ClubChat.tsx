import { useEffect, useState } from "react"
import { ClubService } from "../services/club.service"
import { useAuth } from "../contexts/AuthContext"

interface ClubChatProps {
  clubId: number
}

interface ClubMessage {
  id: number
  idUser: number
  message: string
  createdAt: string
  user: { id: number; name: string }
}

function ClubChat({ clubId }: ClubChatProps) {
  useAuth()
  const [messages, setMessages] = useState<ClubMessage[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchMessages()
  }, [clubId])

  const fetchMessages = async () => {
    setLoading(true)
    try {
      const data = await ClubService.getMessages(clubId)
      setMessages(data)
    } catch {
      setError("Error al cargar mensajes.")
    } finally {
      setLoading(false)
    }
  }

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return
    setSending(true)
    try {
      await ClubService.sendMessage(clubId, newMessage)
      setNewMessage("")
      await fetchMessages()
    } catch{
      setError("Error al enviar el mensaje.")
    } finally {
      setSending(false)
    }
  }

  if (loading) return <div>Cargando mensajes...</div>
  if (error) return <div className="text-red-600">{error}</div>

  return (
    <div className="bg-gray-100 p-4 rounded shadow">
      <div className="h-64 overflow-y-scroll mb-4 bg-white p-2 rounded border">
        {messages.length ? (
          messages.map((msg) => (
            <div key={msg.id} className="mb-2">
              <span className="font-semibold text-primary-85">
                {msg.user.name}
              </span>{" "}
              <span className="text-xs text-gray-500">
                {new Date(msg.createdAt).toLocaleString()}
              </span>
              <p className="text-primary-70">{msg.message}</p>
            </div>
          ))
        ) : (
          <p className="text-primary-70">No hay mensajes aún.</p>
        )}
      </div>

      <div className="flex space-x-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Escribe un mensaje..."
          className="flex-1 border rounded p-2"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSendMessage()
          }}
        />
        <button
          onClick={handleSendMessage}
          disabled={sending}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          {sending ? "Enviando..." : "Enviar"}
        </button>
      </div>
    </div>
  )
}

export default ClubChat
