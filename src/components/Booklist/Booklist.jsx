import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API_URL from '../../apiConfig';
import { Card, Row, Col } from 'react-bootstrap';
import Divider from '@mui/material/Divider';


const styles = {
    cardImage: {
        objectFit: 'contain',
        width: '80%',
        height: '70%',
        margin: 'auto',
    },
    cardText: {
        textDecoration: 'none',
        color: '#ffecd1',
        fontWeight: 600,

    },
    card: {
        height: 375,
        borderRadius: 15,
        backgroundColor: 'rgb(0, 21, 36, 0.7)',
        width: 275,
        margin: '0 auto'
    }
}

function Booklist() {
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
        
        <h1>Our Booklist</h1>
            <Row xs={1} sm={2} md={2} lg={3} className="g-4 m-4">
        {books.map((book) => (
            <Col md='3' key={book.id}>
            <Link to={`/book/${book.id}`} style={styles.cardText}>
            <Card style={styles.card}>
            <Card.Img
            variant="top"
            src={book.image} 
            className='p-4'
            style={styles.cardImage}
            />
            <Divider style={styles.cardText}></Divider>
            <Card.Body>
            <Card.Title style={styles.cardText}>{book.title}</Card.Title>
            <Card.Text style={styles.cardText}>
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
        