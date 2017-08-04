import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom';
import Search from './Search'
import Shelf from './Shelf'
import Preview from './Preview'
import './App.css'

class BooksApp extends React.Component {
  state = {  
    myBooks: [],
    shelves: [
      {id: "currentlyReading", title: "Currently Reading", books: []},
      {id: "wantToRead", title: "Want To Read", books: []},
      {id: "read", title: "Read", books: []}
    ]
  }

  componentDidMount() {
    this.setBookshelf();      
  }

  updateBook = (bookId, shelf) => {
    BooksAPI.update(bookId, shelf).then(() => {
      this.setBookshelf();
    });
  }

  setBookshelf= () => {
    BooksAPI.getAll().then((books) => {
      this.setState((prevState) => ({
        myBooks: books,
        shelves: prevState.shelves.map((shelf) => {
          shelf.books = books.filter(book => book.shelf === shelf.id);
          return shelf;
        })
      }))
    });
  }

  render() {
    const { shelves, myBooks } = this.state;

    return (
      <div className="app">
        <Route path='/search' render={() => (
          <Search myBooks={myBooks} addBook={this.updateBook}/>
        )}/>
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {
                  shelves.map((shelf) => {
                    return <Shelf key={shelf.id} 
                      title={shelf.title} 
                      books={shelf.books} 
                      moveBook={this.updateBook}/>
                  })
                }
              </div>
            </div>
            <div className="open-search">
              <Link to='/search' className='add-contact'>Add a book</Link>
            </div>
          </div>
        )}/>  
        <Route path='/book/:bookId' component={Preview}/>   
      </div>
    )
  }
}

export default BooksApp
