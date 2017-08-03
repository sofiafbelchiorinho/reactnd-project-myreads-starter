import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom';
import Search from './Search'
import Shelf from './Shelf'
import './App.css'

class BooksApp extends React.Component {
  state = {  
    currentlyReading: [],
    wantToRead: [],
    read: []
  }

  componentDidMount() {
    this.getAll();
  }

  update = (bookId, shelf) => {
    BooksAPI.update(bookId, shelf).then(() => {
      this.getAll();
    });
  }

  getAll= () => {
    BooksAPI.getAll().then((books) => {
      console.log('books --> ', books);
      this.setState({
        currentlyReading: books.filter(book => book.shelf === 'currentlyReading'),
        wantToRead: books.filter(book => book.shelf === 'wantToRead'),
        read: books.filter(book => book.shelf === 'read')    
      });
    });
  }

  render() {
    const { read, wantToRead, currentlyReading } = this.state;

    return (
      <div className="app">
        <Route path='/search' render={() => (
          <Search />
        )}/>
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Shelf title="Currently Reading" books={currentlyReading} moveBook={this.update}/>
                <Shelf title="Want To Read" books={wantToRead} moveBook={this.update}/>
                <Shelf title="Read" books={read} moveBook={this.update}/>
              </div>
            </div>
            <div className="open-search">
              <Link to='/search' className='add-contact'>Add a book</Link>
            </div>
          </div>
        )}/>     
      </div>
    )
  }
}

export default BooksApp
