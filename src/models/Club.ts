import Member from "./Member"

export default interface Club {
    id: number
    name: string
    description: string
    createdAt: string
    updatedAt: string
    admin: { id: number; name: string }
    members: Member[]
    books: unknown[] // Podrás definir más adelante si añades el libro del mes aquí
}