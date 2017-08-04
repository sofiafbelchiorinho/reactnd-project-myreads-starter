import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class Shelf extends React.Component {

  render() {
    const { books, title, moveBook } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
              books.map((book) => (
                <Book key={book.id} book={book} moveBook={moveBook} /> 
              ))
            }
          </ol>
        </div>
      </div>
    )
  }

  static propTypes = {
    title: PropTypes.string,
    books: PropTypes.array.isRequired,
    moveBook: PropTypes.func.isRequired
  }
}

export default Shelf
