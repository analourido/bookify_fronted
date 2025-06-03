export default interface ExternalBook {
    title: string
    author: string
    publishedAt: number
    coverUrl: string | null
    isbn: string | null
    genre: string
    description: string
}