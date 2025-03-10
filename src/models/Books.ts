import Review from "./Review"

export default interface Book {
    id: number
    title: string
    author: string
    genre: string
    description?: string
    publishedAt: string
    idCategory?: number | null
    reviews: Review[]
    idUser: number
}

