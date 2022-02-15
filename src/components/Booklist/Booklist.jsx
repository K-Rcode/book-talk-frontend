import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API_URL from '../../apiConfig';

function Booklist(props) {
    const [books, setBooks] = useState();
    useEffect(() => {
        // fetch(`${API_URL.google}flowers+inauthor:keyes&key=${process.env.API_KEY}`)
        // fetch(`${API_URL.url}books`)
        //     .then(res => res.json())
        //     .then(res => {
        //         console.log(res)
        //         setBooks(res)
        //     })
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
           <h1>Books of the Day</h1>
            {books.map((book) => {
                return (
                    <div className="book-card" key={book.id}>
                        <Link to={`/book/${book.id}`}>
                        <h5>{book.title}</h5>
                            <img src={book.image} alt={book.title} />
                        </Link>
                    </div>
                )
            })}
        </div>
    );
}

export default Booklist;