import React, { Component } from "react";
import API from "../utils/API";
import axios from "axios";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";


class Search extends Component {
    state = {
        books: []
    }




    componentDidMount() {
    }



    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };



    handleFormSubmit = event => {
        event.preventDefault();

        axios.get("https://www.googleapis.com/books/v1/volumes?q=" + this.state.title)
            .then(response => {

                this.setState({
                    books: response.data.items.map(item => {
                        // console.log(item.volumeInfo)
                        return {
                            title: item.volumeInfo.title,
                            authors: item.volumeInfo.authors,
                            description: item.volumeInfo.description,
                            image: item.volumeInfo.imageLinks.thumbnail,
                            link: item.volumeInfo.infoLink
                        }

                    })
                })
                console.log(this.state.books)
            })
    }

    handleSaveBook = data => {
        // event.preventDefault();
         console.log(data);
          API.saveBook({
            title: data.title,
            authors: data.authors,
            description: data.description,
            image: data.image,
            link: data.link
          })
            // .then(res => this.loadBooks())
            .catch(err => console.log(err));
        
      };


    render() {
        return (<Container fluid>
            {/* <Row> */}


            <form>
                <Input
                    value={this.state.title}
                    onChange={this.handleInputChange}
                    name="title"
                    placeholder="Title (required)"
                />

                <FormBtn
                    onClick={this.handleFormSubmit}
                >
                    Search
                  </FormBtn>
            </form>

            {/* </Row> */}
            {this.state.books.length ? (
                <List>
                    {this.state.books.map(book => (
                        <div>

                            <ListItem key={book._id}>
                                <FormBtn onClick={() => this.handleSaveBook(book)}>
                                    Save
                                </FormBtn>
                                <FormBtn>
                                    Delete
                                </FormBtn>

                                <img src={book.image} />
                                <strong><a href={book.link}>{book.title} by {book.authors}</a></strong>
                                <p>{book.description}</p>
                            </ListItem>

                        </div>
                    ))}
                </List>
            ) : (
                    <h3>No Results to Display</h3>
                )}
        </Container>)
    }
}

export default Search;