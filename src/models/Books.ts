export default interface Offer {
    id: number
    title: string
    author: string
    genre: string
    description?: string
    published: string
    idCategory?: number | null
    // review
}