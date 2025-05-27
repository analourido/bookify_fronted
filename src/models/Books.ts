import { Review } from "./Review"


export default interface Book {
    id: number
    title: string
    author: string
    genre: string
    description?: string
    publishedAt: string
    coverUrl?: string
    idCategory?: number | null
    canReview?: boolean
    reviews: Review[]
    idUser: number
    averageRating?: number
}

