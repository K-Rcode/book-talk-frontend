import React, { useEffect } from 'react';
import API_URL from '../../apiConfig';

function Booklist(props) {
    useEffect(() => {
        fetch(`${API_URL.google}flowers+inauthor:keyes&key=${process.env.API_KEY}`)
            .then(res => res.json())
            .then(res => {
                console.log(res)
            })
    }, [])
    return (
        <div>
           Book list 
        </div>
    );
}

export default Booklist;