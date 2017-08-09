import React, { Component } from 'react';
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom';
import Shelf from './Shelf';
import sortBy from 'sort-by'
import _ from 'lodash';

class Search extends Component {
  state = {
    query: '',
    allBooks: []
  }

  updateQuery = (query) => {        
    this.setState({ query: query.trim() })
    BooksAPI.search(query).then((books) => {
      if(books && !books.error){
        this.setState({ 
          allBooks: this.matchWithMyReads(books)
        });
      }      
    });        
  }

  clearQuery = () => {
    this.setState({ query: '' })
  }

  matchWithMyReads = (books) => {
    return books.map((book) => {
             let match = _.find(this.props.myBooks, {id: book.id});
             book.shelf = match ? match.shelf : 'none';     
             return book;
          }).sort(sortBy('title'));
 }

  render() {
    let { allBooks } = this.state;
    const { query} = this.state;
    const { addBook } = this.props;

    allBooks = this.matchWithMyReads(allBooks);
  
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className='close-search'>Add a book</Link>
          <div className="search-books-input-wrapper">
            <input type='text' placeholder='Search books..' value={query} onChange={(event) => this.updateQuery(event.target.value)}/>               
          </div>
        </div>
        <div className="search-books-results">
          <Shelf books={allBooks} moveBook={addBook}/>
        </div>
      </div>
    )
  }

  static propTypes = {
    myBooks: PropTypes.array.isRequired,
    addBook: PropTypes.func.isRequired
  }

}
export default Search;