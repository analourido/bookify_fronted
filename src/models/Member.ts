import Club from "./Club";

export default interface Member {
    id: number
    idClub: number
    role: string
    user: { id: number; name: string }
    club: Club[]
}