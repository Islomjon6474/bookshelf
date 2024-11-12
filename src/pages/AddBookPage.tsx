import React, { useContext, useRef, useState } from 'react';
import { BookStoreContext } from "../stores/bookStore";
import { isValidText, isValidISBN } from '../utils/validation';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';

const AddBookPage: React.FC = () => {
    const bookStore = useContext(BookStoreContext);
    const navigate = useNavigate();
    const isbnRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const isbn = isbnRef.current?.value || '';

        if (!isValidISBN(isbn)) {
            setError('Please enter valid details for Title, Author, and a valid 13-digit ISBN.');
            return;
        }

        bookStore.addBook({ isbn }).then(() => {
            setError('');
            navigate('/');
        }).catch((error) => {
            setError(error.message);
        });
    };

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                backgroundImage: 'url(/add_book_bg.webp)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                p: 4,
            }}
        >
            <Paper
                elevation={4}
                sx={{
                    p: 4,
                    maxWidth: 400,
                    width: '100%',
                    backgroundColor: 'rgba(255, 248, 240, 0.65)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: 2,
                }}
            >
                <Typography
                    variant="h4"
                    align="center"
                    gutterBottom
                    sx={{ color: '#5A3E2F' }}
                >
                    Add a New Book
                </Typography>
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}
                <form onSubmit={handleSubmit}>
                    <TextField
                        inputRef={isbnRef}
                        label="ISBN"
                        placeholder="Enter 13-digit ISBN"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        required
                        InputLabelProps={{
                            style: { color: '#8B5E3C' }
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#8B5E3C',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#A0664B',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#5A3E2F',
                                },
                            },
                        }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{
                            mt: 2,
                            backgroundColor: '#5A3E2F',
                            '&:hover': {
                                backgroundColor: '#A0664B',
                            },
                            color: '#FFFFFF',
                        }}
                    >
                        Add Book
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default AddBookPage;
