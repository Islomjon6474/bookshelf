import React, { useContext, useState } from 'react';
import { observer } from "mobx-react-lite";
import { Book } from "../types";
import { BookStoreContext } from "../stores/bookStore";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

type EditBookModalProps = {
    book: Book;
    closeModal: () => void;
};

const EditBookModal: React.FC<EditBookModalProps> = observer(({ book, closeModal }) => {
    const bookStore = useContext(BookStoreContext);
    const [status, setStatus] = useState(book.status);

    const handleSave = () => {
        bookStore.editBook(book.id, { title: book.title, status });
        closeModal();
    };

    return (
        <Modal
            open={true}
            onClose={closeModal}
            aria-labelledby="edit-book-modal-title"
            aria-describedby="edit-book-modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                }}
            >
                <Typography id="edit-book-modal-title" variant="h6" component="h2" sx={{ mb: 2, color: '#5A3E2F' }}>
                    Edit Book
                </Typography>

                <Typography variant="body1" sx={{ mb: 2, color: '#8B5E3C' }}>
                    Title: {book.title}
                </Typography>

                <Select
                    label="Status"
                    value={status}
                    onChange={(e) => setStatus(Number(e.target.value))}
                    fullWidth
                    sx={{
                        mb: 3,
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: '#A0664B',
                            },
                            '&:hover fieldset': {
                                borderColor: '#8B5E3C',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#5A3E2F',
                            },
                        },
                    }}
                >
                    {Object.entries(bookStore.bookStatuses).map(([key, value]) => (
                        <MenuItem key={key} value={Number(key)}>
                            {value}
                        </MenuItem>
                    ))}
                </Select>

                <Box display="flex" justifyContent="space-between">
                    <Button
                        variant="outlined"
                        onClick={closeModal}
                        sx={{
                            color: '#8B5E3C',
                            borderColor: '#8B5E3C',
                            '&:hover': {
                                backgroundColor: '#efeae5',
                            },
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleSave}
                        sx={{
                            backgroundColor: '#8B5E3C',
                            color: '#FFF',
                            '&:hover': {
                                backgroundColor: '#5A3E2F',
                            },
                        }}
                    >
                        Save
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
});

export default EditBookModal;
