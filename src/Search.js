import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom';
import Shelf from './Shelf';
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class Search extends Component {
  state = {
    query: '',
    allBooks: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {      
      console.log('books ', books);
      this.setState({ allBooks: books });
    });
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  clearQuery = () => {
    this.setState({ query: '' })
  }

  render() {
    let showingBooks;
    const { query, allBooks } = this.state;
    const { moveBook } = this.props;

    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      showingBooks = allBooks.filter((book) => match.test(book.title))
    } else {
      showingBooks = allBooks
    }

    showingBooks.sort(sortBy('title'))

    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className='close-search'>Add a book</Link>
          <div className="search-books-input-wrapper">
            <input type='text' placeholder='Search books..' value={query} 
                   onChange={(event) => this.updateQuery(event.target.value)}/>               
          </div>
        </div>
        <div className="search-books-results">
          <Shelf books={showingBooks} moveBook={moveBook}/>
        </div>
      </div>
    )
  }

}
export default Search;