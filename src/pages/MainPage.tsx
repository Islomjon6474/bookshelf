import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import BookCard from '../components/BookCard';
import EditBookModal from '../components/EditBookModal';
import { Book } from "../types";
import { BookStoreContext } from "../stores/bookStore";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import * as r from 'ramda';

const MainPage: React.FC = observer(() => {
    const bookStore = useContext(BookStoreContext);
    const { books } = bookStore;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);


    const [isEditing, setIsEditing] = useState(false);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await bookStore.fetchBooks();
            setLoading(false);
        };

        fetchData();
    }, [bookStore]);

    const openEditModal = (book: Book) => {
        setSelectedBook(book);
        setIsEditing(true);
    };

    const closeEditModal = () => {
        setSelectedBook(null);
        setIsEditing(false);
    };

    if (loading) {
        return (
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                height="100vh"
                sx={{
                    backgroundImage: 'url(/path-to-background-image.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <CircularProgress color="primary" />
            </Box>
        );
    }

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            sx={{
                minHeight: '100vh',
                padding: 4,
                backgroundImage: 'url(/add_book_bg.webp)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {!r.isEmpty(books) && (
                <Button
                variant="contained"
                onClick={() => navigate('/add-book')}
                sx={{
                    alignSelf: 'flex-start',
                    marginBottom: 2,
                    backgroundColor: '#8B5E3C',
                    color: '#FFF',
                    '&:hover': {
                        backgroundColor: '#5A3E2F',
                    },
                }}
            >
                Add Book
            </Button>
            )}

            {!Object.keys(books).length ? (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        padding: 3,
                        maxWidth: 500,
                        backgroundColor: 'rgba(255, 248, 240, 0.85)',
                        backdropFilter: 'blur(5px)',
                        boxShadow: 3,
                        borderRadius: 2,
                        marginTop: 4,
                    }}
                >
                    <img
                        src="/no_books.webp"
                        alt="No books available"
                        style={{ width: '180px', marginBottom: '16px', borderRadius: "8px" }}
                    />

                    <Button
                        variant="contained"
                        onClick={() => navigate('/add-book')}
                        sx={{
                            backgroundColor: '#8B5E3C',
                            color: '#FFF',
                            '&:hover': {
                                backgroundColor: '#5A3E2F',
                            },
                        }}
                    >
                        Add a Book
                    </Button>
                </Box>
            ) : (
                <Grid container spacing={3} justifyContent="center" sx={{ padding: 2 }}>
                    {Object.values(books).map((book: Book) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
                            <BookCard book={book} onEdit={() => openEditModal(book)} />
                        </Grid>
                    ))}
                </Grid>
            )}

            {isEditing && selectedBook && (
                <EditBookModal book={selectedBook} closeModal={closeEditModal} />
            )}
        </Box>
    );
});

export default MainPage;
