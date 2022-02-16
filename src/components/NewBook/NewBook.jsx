import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import API_URL from '../../apiConfig';
import NewBookForm from '../NewBookForm/NewBookForm';

function NewBook({ logInStatus }) {
    const [formState, setFormState] = useState({
        title: '',
        author: '',
        genre: '',
        topic: ''
    })
    const [searchResults, setSearchResults] = useState();
    
    const handleChange = (e) => {
        setFormState({...formState, [e.target.id]: e.target.value})
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        getSearchResults()
    }

    const getSearchResults = async () => {
        // Url is interpolated, checking each of the formState keys for a value. If present the formState value is used, if not, an empty string. 

        let url = `${API_URL.google}${(formState.topic ? formState.topic.replaceAll(' ', '-') : '')}${(formState.author ? API_URL.author + formState.author.replaceAll(' ', '-') : '')}${(formState.title ? API_URL.title + formState.title.replaceAll(' ', '-') : '')}${(formState.genre ? API_URL.genre + formState.genre.replaceAll(' ', '-') : '')}&key=${process.env.REACT_APP_API_KEY}`

        try {
            // const res = await fetch(`${API_URL.google}${formState.topic}+inauthor:${formState.author}+intitle:${formState.title}+subject:${formState.genre}&key=${process.env.REACT_APP_API_KEY}`)

            const res = await fetch(url)
            const data = await res.json()
            console.log(data)
            setSearchResults(data.items)
        } catch (error) {
            console.log(error)
        }
    }

    const handleClick = () => {
        console.log('hi')
    }
    
    return (
        <div className='m-5 w-75 '>
            <NewBookForm
                formState={formState}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
            
            {searchResults ? searchResults.map((result) => {
                return (
                    <div key={result.id} onClick={handleClick}>
                        {/* <Link to={`/book/${result}`} > */}
                        <p>{result.volumeInfo.title}</p>
                            <img src={result.volumeInfo.imageLinks.thumbnail} alt={result.volumeInfo.title} />
                            {/* </Link> */}
                    </div>
                )
            }) :
            ''}
        </div>
        );
    }
    
    export default NewBook;