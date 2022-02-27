import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_URL from '../../apiConfig';
import NewBookForm from '../NewBookForm/NewBookForm';
import NotFoundModal from '../NotFoundModal/NotFoundModal';
import { Grid } from '@mui/material';
import SearchResults from '../SearchResults/SearchResults';

function NewBook({ logInStatus }) {
    const [modalShow, setModalShow] = React.useState(false)
    const [formState, setFormState] = useState({
        title: '',
        author: '',
        genre: '',
        topic: ''
    })
    const [searchResults, setSearchResults] = useState();
    const [currentPick, setCurrentPick] = useState(null);
    const navigate = useNavigate();
    
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
            const res = await fetch(url)
            const data = await res.json()
            setSearchResults(data.items)
        } catch (error) {
            console.log(error)
        }
    }
    
    const handleClick = (id, result) => {
        getDatabaseExist(id)
        setCurrentPick(result)
    }
    
    const getDatabaseExist = async (id) => {
        try {
            const res = await fetch(`${API_URL.url}books/?search=${id}`)
            const data = await res.json()
            
            if (data.length) {
                navigate(`/book/${data[0].id}`)
            } else {
                setModalShow(true)     
            }
        } catch (error) {
            
        }
    }
    
    return (
        <div className='m-4 w-80'>
        <NewBookForm
        formState={formState}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
            />
            
        <Grid container spacing={2}>
        
        {searchResults && searchResults.map((result) => {
            return (
                <SearchResults result={result} handleClick={handleClick} />
                )
        })}
                </Grid>
            <NotFoundModal
            currentpick={currentPick}
            show={modalShow}
            onHide={() => setModalShow(false)}
            />
            </div>
            );
        }
        
        export default NewBook;