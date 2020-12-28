import { gql } from '@apollo/client'

const ALL_AUTHORS = gql`
query {
  allAuthors  {
    name,
    born,
    bookCount
  }
}
`
const ALL_BOOKS = gql`
query {
  allBooks  {
    title,
    published,
    author
  }
}
`

const CREATE_BOOK = gql`
  mutation createBook( $title: String!, $published: Int!, $author: String!, $genres: [String]! ) {
    addBook(
      title: $title,
      published: $published,
      author: $author,
      genres: $genres
    ) {
      title,
      published,
      author
    }
  }
`

const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $year: Int!) {
    editAuthor(name: $name, born: $year)  {
      name,
      born,
      bookCount
    }
  }
`

export { ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK, EDIT_AUTHOR }