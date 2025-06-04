import { useEffect, useState } from "react";
import { ClubService } from "../services/club.service";
import { useAuth } from "../contexts/AuthContext";

interface ClubChatProps {
  clubId: number;
}

interface ClubMessage {
  id: number;
  idUser: number;
  message: string;
  createdAt: string;
  user: { id: number; name: string };
}

function ClubChat({ clubId }: ClubChatProps) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ClubMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMessages();
  }, [clubId]);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const data = await ClubService.getMessages(clubId);
      setMessages(data);
    } catch {
      setError("Error al cargar mensajes.");
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    setSending(true);
    try {
      await ClubService.sendMessage(clubId, newMessage);
      setNewMessage("");
      await fetchMessages();
    } catch {
      setError("Error al enviar el mensaje.");
    } finally {
      setSending(false);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  if (error)
    return <div className="text-error text-center">{error}</div>;

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] bg-base-200 p-4 rounded-lg shadow">
      {/* Mensajes */}
      <div className="flex-1 overflow-y-auto bg-base-100 rounded-lg p-4 mb-4 border">
        {messages.length ? (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`chat ${
                msg.user.id === user?.id ? "chat-end" : "chat-start"
              }`}
            >
              <div
                className={`chat-bubble ${
                  msg.user.id === user?.id
                    ? "chat-bubble-primary"
                    : "chat-bubble-secondary"
                }`}
              >
                <div className="font-semibold">{msg.user.name}</div>
                <div className="text-xs opacity-70">
                  {new Date(msg.createdAt).toLocaleString()}
                </div>
                <p>{msg.message}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-primary-70 text-center">
            No hay mensajes aún.
          </p>
        )}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Escribe un mensaje..."
          className="input input-bordered w-full"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSendMessage();
          }}
        />
        <button
          onClick={handleSendMessage}
          disabled={sending}
          className="btn btn-primary"
        >
          {sending ? (
            <span className="loading loading-spinner"></span>
          ) : (
            "Enviar"
          )}
        </button>
      </div>
    </div>
  );
}

export default ClubChat;
