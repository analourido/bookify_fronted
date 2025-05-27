export interface Review {
    idUser: number
    idBook: number
    content: string
    rating: number
    createdAt: string
    user: {
        name: string
    }
}