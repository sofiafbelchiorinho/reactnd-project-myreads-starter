import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

class Book extends React.Component {

  handleChange = (e) => {
    if(this.props.moveBook){
      this.props.moveBook(this.props.book, e.target.value);  
    }       
  }

  render() {
    const { book } = this.props;

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" 
                 style={{ width: 128, height: 193, 
                   backgroundImage: 'url('+ book.imageLinks.thumbnail || book.imageLinks.smallThumbnail +')' 
                }}>
            </div>
            <Link to={`/book/${book.id}`} className="book-shelf-preview" alt="See book details"></Link>
            <div className="book-shelf-changer">
              <select value={book.shelf} onChange={this.handleChange} alt="Add to bookshelf">
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors && book.authors.join(', ')}</div>
        </div>
      </li>
    )
  }

   static propTypes = {
    book: PropTypes.object.isRequired,
    moveBook: PropTypes.func.isRequired
  }

}

export default Book