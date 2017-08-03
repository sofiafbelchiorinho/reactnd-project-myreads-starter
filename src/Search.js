import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom';
import Shelf from './Shelf';
import sortBy from 'sort-by'

class Search extends Component {
  state = {
    query: '',
    allBooks: [],
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {      
      console.log('books ', books);
      this.setState({ books: books });
    });
  }

  updateQuery = (query) => {        
    //this.setState({ query: query.trim() })
    BooksAPI.search(query).then((books) => {
      console.log('books ', books);
      this.setState({ allBooks: books });
      this.state.allBooks.sort(sortBy('title'));
    });        
  }

  clearQuery = () => {
    this.setState({ query: '' })
  }

  getAll = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({books: books})      
    });
  }

  render() {
    const { query, books } = this.state;
    const { moveBook } = this.props;
   
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
          <Shelf books={allBooks} moveBook={moveBook}/>
        </div>
      </div>
    )
  }

}
export default Search;