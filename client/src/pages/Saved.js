import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";

class Saved extends Component {
  state = {
    books: []
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res => this.setState({ books: res.data }))
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.author) {
      API.saveBook({
        title: this.state.title,
        author: this.state.author,
        synopsis: this.state.synopsis
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>(React) Google Book Search</h1>
              <h2>Search for and save Books of interest</h2>
            </Jumbotron>
            {/* if there's a list */}
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                    <Row>
                      <Col size="md-10">
                        <h5>{book.title}</h5>
                        <h6>{book.author.toString()}</h6>
                      </Col>
                      <Col size="md-1">
                        <button
                          type="button"
                          onClick={() => this.deleteBook(book._id)}
                          className="btn btn-secondary btn-block"
                          style={{ marginRight: 10 }}
                        >
                          Delete
                        </button>
                      </Col>
                      <Col size="md-1">
                        <a href={book.infoLink} className="btn btn-secondary btn-block">
                          View
                        </a>
                      </Col>
                    </Row>
                    <Row>
                      <Col size="md-2">
                        <img src={book.thumbnail} alt={book.title} />
                      </Col>
                      <Col size="md-10">
                        <p>{book.synopsis}</p>
                      </Col>
                    </Row>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No books saved yet!</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Saved;
