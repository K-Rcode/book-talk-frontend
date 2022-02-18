import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API_URL from '../../apiConfig';
import { Card, Row, Col } from 'react-bootstrap';
import Divider from '@mui/material/Divider';

function Booklist(props) {
    const [books, setBooks] = useState();
    useEffect(() => {
        getBooks()
    }, [])
    
    const getBooks = async () => {
        try {
            const res = await fetch(`${API_URL.url}books`)
            const data = await res.json()
            setBooks(data)
        } catch (error) {
            console.log(error)
        }
    }
    
    if (!books) {
        return null
    }
    return (
        <div>
        
        <h1>Books</h1>
        <Row xs={1} sm={2} className="g-3 m-4">
        {books.map((book) => (
            <Col md='2' key={book.id}>
            <Link to={`/book/${book.id}`}>
            <Card >
            <Card.Img
            variant="top"
            src={book.image} 
            className='p-4'
            />
            <Divider></Divider>
            <Card.Body>
            <Card.Title>{book.title}</Card.Title>
            <Card.Text>
            by: {book.author}
            </Card.Text>
            </Card.Body>
            </Card>
            </Link>
            </Col>
            ))}
            </Row>
            </div>
            );
        }
        
        export default Booklist;
        