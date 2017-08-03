import React from 'react'
import PropTypes from 'prop-types'

class Book extends React.Component {

  handleChange = (e) => {
    if(this.props.moveBook){
      this.props.moveBook(this.props.book, e.target.value);  
    }       
  }

  render() {
    const { title, authors, imageLinks, shelf } = this.props.book;

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url('+ imageLinks.thumbnail +')' }}></div>
            <div className="book-shelf-changer">
              <select value={shelf} onChange={this.handleChange}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{title}</div>
          <div className="book-authors">{authors && authors.join(', ')}</div>
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