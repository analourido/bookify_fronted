// src/pages/ClubChatPage.tsx
import { useParams } from "react-router-dom"
import ClubChat from "../components/ClubChat"

function ClubChatPage() {
  const { id } = useParams()

  if (!id) return <div>Club no encontrado</div>

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white shadow rounded-lg">
      <h1 className="text-3xl font-bold text-primary-90 mb-4">
        Chat del Club
      </h1>
      <ClubChat clubId={Number(id)} />
    </div>
  )
}

export default ClubChatPage
