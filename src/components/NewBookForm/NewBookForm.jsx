import React from 'react';
import { Form, FloatingLabel, Button } from 'react-bootstrap';

function NewBookForm({formState, handleChange, handleSubmit}) {
    return (
        <>
        <h2>Search for a Book Here</h2>
        <Form onSubmit={handleSubmit}>
            <FloatingLabel
                controlId="title"
                label="Title"
                className="mb-3"
            >
            <Form.Control
                placeholder="Title"
                value={formState.title}
                onChange={handleChange}
                    />
            </FloatingLabel>
            <FloatingLabel
                controlId="author"
                label="Author"
                className="mb-3"
            >
            <Form.Control
                placeholder="Author"
                value={formState.author}
                onChange={handleChange}
            />
            </FloatingLabel>
            <FloatingLabel
                controlId="genre"
                label="Genre"
                className="mb-3"
            >
            <Form.Control 
                placeholder="Genre"
                value={formState.genre} 
                onChange={handleChange}
            />
                </FloatingLabel>
            <FloatingLabel
                controlId="topic"
                label="Topic"
                className="mb-3"
            >
            <Form.Control 
                placeholder="Topic"
                value={formState.topic} 
                onChange={handleChange}
            />
            </FloatingLabel>
                <Button
                    variant="secondary"
                    type="submit"
                    className='m-3'
                >
                    Submit
                </Button>
            </Form>
        </>
    );
}

export default NewBookForm;