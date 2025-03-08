import Books from "./Books"

export default interface Book {
    id: number
    name: string
    books: Books[]
}