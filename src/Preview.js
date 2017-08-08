import React from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'

class Preview extends React.Component {

  state = {
    book: null  
  } 

  componentDidMount() {
    if(this.props.match.params){
      BooksAPI.get(this.props.match.params.bookId).then(book => {
        console.log(book);
        this.setState({book});
      })
    }
  }  

  render() {   

    const { book } = this.state;

    return (
      <div className="list-books">
        {
          book && (
            <div>
              <div className="list-books-title">
                <a className="close-search" href="/"></a>
                <h3>{`${book.title}`} by {`${book.authors && book.authors.join('and ')}`}</h3>
              </div>
              <div className="book-content">
                <div className="book-cover" style={{  backgroundImage: `url(${book.imageLinks.thumbnail || book.imageLinks.smallThumbnail})`}}></div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors && book.authors.join(', ')}</div>   
                <div className="book-description">{book.description}</div>
                <div className="book-categories">
                  {book.categories && book.categories.map(category => (
                    <span key={category}>{category}</span>
                  ))}
                </div>
                { 
                  book.publisher && (<div className="book-publishInfo">Published by {`${book.publisher}`} on {`${book.publishedDate}`}</div> )    
                }
              </div>
            </div>
          )
        }  
      </div>     
    )
  }

  static propTypes = {
    params: PropTypes.object,
  }
}
export default Preview