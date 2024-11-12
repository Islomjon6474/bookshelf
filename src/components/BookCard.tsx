import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Book } from "../types";
import { BookStoreContext } from "../stores/bookStore";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';

const BookCard: React.FC<{ book: Book, onEdit: () => void }> = observer(({ book, onEdit }) => {
    const bookStore = useContext(BookStoreContext);
    const {bookStatuses} = bookStore;
    const handleDelete = () => bookStore.deleteBook(book.id);

    return (
        <Card
            variant="outlined"
            sx={{
                maxWidth: 345,
                margin: 2,
                backgroundColor: 'rgba(255, 248, 240, 0.85)',
                backdropFilter: 'blur(5px)',
                boxShadow: 3,
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
            }}
        >
            <CardContent>
                <Typography variant="h6" component="div" gutterBottom sx={{ color: '#5A3E2F' }}>
                    {book.title || "Untitled"}
                </Typography>
                <Typography variant="body2" sx={{ color: '#8B5E3C' }}>
                    Author: {book.author || "Unknown"}
                </Typography>
                <Typography variant="body2" sx={{ color: '#8B5E3C' }}>
                    ISBN: {book.isbn || "N/A"}
                </Typography>
                <Typography variant="body2" sx={{ color: '#8B5E3C' }}>
                    Status: {bookStatuses[book.status] || "N/A"}
                </Typography>
            {/*    I want to add status Typography*/}

            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between', paddingX: 2 }}>
                <Button
                    variant="contained"
                    onClick={onEdit}
                    sx={{
                        backgroundColor: '#8B5E3C',
                        color: '#FFF',
                        width: "100%",
                        '&:hover': {
                            backgroundColor: '#5A3E2F',
                        },
                    }}
                >
                    Edit
                </Button>
                <Button
                    variant="contained"
                    onClick={handleDelete}
                    sx={{
                        backgroundColor: '#A0664B',
                        color: '#FFF',
                        width: "100%",
                        '&:hover': {
                            backgroundColor: '#7E4A38',
                        },
                    }}
                >
                    Delete
                </Button>
            </CardActions>
        </Card>
    );
});

export default BookCard;
