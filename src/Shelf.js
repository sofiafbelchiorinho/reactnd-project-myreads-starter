import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class Shelf extends React.Component {

  render() {
    const { books, title } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
              books.map((book) => (
                <Book key={book.title} title={book.title} authors={book.authors} imageLinks={book.imageLinks}/> 
              ))
            }
          </ol>
        </div>
      </div>
    )
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array //.isRequired,
  }
}

export default Shelf
