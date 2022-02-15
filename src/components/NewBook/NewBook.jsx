import React from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button'

function NewBook(props) {
    
    const handleChange = () => {
        console.log('hi')
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('submit')
    }
    
    return (
        <div className='m-5 w-75 '>
        <Form onSubmit={handleSubmit}>
        <FloatingLabel
        controlId="floatingTitle"
        label="Title"
        className="mb-3"
        >
        <Form.Control placeholder="Title" onChange={ handleChange} />
        </FloatingLabel>
        <FloatingLabel controlId="floatingAuthor" label="Author">
        <Form.Control placeholder="Author" />
        </FloatingLabel>
        <Button variant="secondary" type="submit" className='m-3'>
        Submit
        </Button>
        </Form>
        </div>
        );
    }
    
    export default NewBook;