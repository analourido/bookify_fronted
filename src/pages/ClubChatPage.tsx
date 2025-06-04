import { useParams } from "react-router-dom"
import ClubChat from "../components/ClubChat"

function ClubChatPage() {
  const { id } = useParams()

  if (!id) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-error text-error-content">
        <div className="bg-base-100 p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold">Club no encontrado</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen m-3 ">
      <header className="p-4 text-primary-content ">
        <h1 className="text-2xl font-bold text-center">Chat del Club</h1>
      </header>
      <main className="flex-1 overflow-y-auto p-4 mx-20">
        <ClubChat clubId={Number(id)} />
      </main>
    </div>
  )
}

export default ClubChatPage
