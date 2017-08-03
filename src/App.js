import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom';
import Search from './Search'
import Shelf from './Shelf'
import './App.css'

class BooksApp extends React.Component {
  state = {  
    shelves: [
      {id: "currentlyReading", title: "Currently Reading", books: []},
      {id: "wantToRead", title: "Want To Read", books: []},
      {id: "read", title: "Read", books: []}
    ]
  }

  componentDidMount() {
    this.setBookshelf();
      
  }

  update = (bookId, shelf) => {
    BooksAPI.update(bookId, shelf).then(() => {
      this.setBookshelf();
    });
  }

  setBookshelf= () => {
    BooksAPI.getAll().then((books) => {
      console.log('books ', books);
      this.setState((prevState) => ({
        shelves: prevState.shelves.map((shelf) => {
          shelf.books = books.filter(book => book.shelf === shelf.id);
          return shelf;
        })
      }))
    });
  }

  render() {
    const { shelves } = this.state;

    return (
      <div className="app">
        <Route path='/search' render={() => (
          <Search moveBook={this.update}/>
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
                    return <Shelf key={shelf.title} title={shelf.title} books={shelf.books} moveBook={this.update}/>
                  })
                }
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
