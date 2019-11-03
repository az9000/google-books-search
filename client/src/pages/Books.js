import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";
import ls from 'local-storage';

class Books extends Component {
  state = {
    books: [],
    title: ""
  };

  componentDidMount() {
    let tmpBooks = ls.get('books');
    if (!tmpBooks) {
      return
    }
    this.setState({
      books: tmpBooks
    });
  }
  

  

  saveBook = info => {
    API.saveBook(info)
      .then(res => {
        console.log("success:", res.data._id);
      })
      .catch(err => console.log(err));
  };

  viewBook = info => {
    API.viewBook(info)
      .then(res => {
        console.log("success!");
      })
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
    if (this.state.title) {
      let empty = [];
      this.setState({
        books: empty
      });
      API.findBook(this.state.title)
        .then(res => {
          ls.set('books', res.data)
          this.setState({
            books: res.data,
            title: ""
          });
        })
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
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Book Search</h5>
                <form>
                  <Input
                    value={this.state.title}
                    onChange={this.handleInputChange}
                    name="title"
                    placeholder="Book title (required)"
                  />

                  <FormBtn
                    disabled={!this.state.title}
                    onClick={this.handleFormSubmit}
                  >
                    Submit Search
                  </FormBtn>
                </form>
              </div>
            </div>
          </Col>
        </Row>
        {/* List goes here */}
        <Row>
          <Col size="md-12">
            {/* if there's a list */}
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book.volumeInfo.publishedDate}>
                    <Row>
                      <Col size="md-10">
                        <h5>{book.volumeInfo.title}</h5>
                        <h6>{book.volumeInfo.authors.toString()}</h6>
                      </Col>
                      <Col size="md-1">
                        <button
                          type="button"
                          onClick={() => this.saveBook(book.volumeInfo)}
                          className="btn btn-secondary btn-block"
                          style={{ marginRight: 10 }}
                        >
                          Save
                        </button>
                      </Col>
                      <Col size="md-1">                                              
                          <a
                            href={book.volumeInfo.infoLink}
                            className="btn btn-secondary btn-block"                            
                          >
                          View
                          </a>
                      </Col>
                    </Row>
                    <Row>
                      <Col size="md-2">
                        <img
                          alt={book.title}
                          src={
                            book.volumeInfo.imageLinks
                              ? book.volumeInfo.imageLinks.thumbnail
                              : ""
                          }
                        />
                      </Col>
                      <Col size="md-10">
                        <p>{book.volumeInfo.description}</p>
                      </Col>
                    </Row>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
