export default interface Member {
    id: number
    role: string
    user: { id: number; name: string }
}