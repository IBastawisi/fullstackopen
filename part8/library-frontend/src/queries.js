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

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title,
    published,
    genres,
    author {
      name
    }
  }
`

const ALL_BOOKS = gql`
  query {
    allBooks  {
      ...BookDetails
    }
  }
    
  ${BOOK_DETAILS}
`
const RECOMMENDED_BOOKS = gql`
  query {
    recommendedBooks  {
      ...BookDetails
    }
  }
  
  ${BOOK_DETAILS}
`

const CREATE_BOOK = gql`
  mutation createBook( $title: String!, $published: Int!, $author: String!, $genres: [String]! ) {
    addBook(
      title: $title,
      published: $published,
      author: $author,
      genres: $genres
    ) {
      ...BookDetails
    }
  }
  
  ${BOOK_DETAILS}
`

const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  
  ${BOOK_DETAILS}
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

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export { ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK, EDIT_AUTHOR, LOGIN, RECOMMENDED_BOOKS, BOOK_ADDED }