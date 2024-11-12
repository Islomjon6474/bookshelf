import React, { useContext, useRef, useState } from 'react';
import { saveCredentials } from '../utils/cookies';
import { isValidText } from '../utils/validation';
import { observer } from "mobx-react-lite";
import { BookStoreContext } from "../stores/bookStore";
import { assertDefined } from "../utils";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import { runInAction } from "mobx";

const AuthForm: React.FC = observer(() => {
    const bookStore = useContext(BookStoreContext);
    const { registerUser } = bookStore;
    const navigate = useNavigate();
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const keyRef = useRef<HTMLInputElement>(null);
    const secretRef = useRef<HTMLInputElement>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        assertDefined(nameRef.current);
        assertDefined(emailRef.current);
        assertDefined(keyRef.current);
        assertDefined(secretRef.current);

        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const key = keyRef.current.value;
        const secret = secretRef.current.value;

        if (!isValidText(name) || !isValidText(email) || !isValidText(key) || !isValidText(secret)) {
            setErrorMessage('Please enter valid credentials.');
            return;
        }

        const response = await registerUser({ name, email, key, secret });
        assertDefined(response);

        if (response.isOk) {
            assertDefined(response.key);
            assertDefined(response.secret);

            saveCredentials(response.key, response.secret);

            runInAction(() => {
                bookStore.isAuthenticated = true;
            });
            navigate('/');
        } else {
            setErrorMessage(response.message || 'Registration failed. Please try again.');
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                width: '80%',
                p: 4,
            }}
        >
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    width: '100%',
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    backgroundColor: 'rgba(255, 248, 240, 0.85)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: 3,
                    borderRadius: 2,
                }}
            >
                <Typography
                    variant="h5"
                    component="h1"
                    sx={{ textAlign: 'center', color: '#5A3E2F', mb: 2 }}
                >
                    Register
                </Typography>

                {errorMessage && (
                    <Typography color="error" sx={{ mb: 2, textAlign: 'center' }}>
                        {errorMessage}
                    </Typography>
                )}

                <TextField
                    inputRef={nameRef}
                    required
                    label="Name"
                    placeholder="Name"
                    variant="outlined"
                    fullWidth
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

                <TextField
                    inputRef={emailRef}
                    required
                    type="email"
                    label="Email"
                    placeholder="Email"
                    variant="outlined"
                    fullWidth
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

                <TextField
                    inputRef={keyRef}
                    required
                    label="Username"
                    placeholder="Username"
                    variant="outlined"
                    fullWidth
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

                <TextField
                    inputRef={secretRef}
                    required
                    type="password"
                    label="Password"
                    placeholder="Password"
                    variant="outlined"
                    fullWidth
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
                        backgroundColor: '#8B5E3C',
                        color: '#FFF',
                        '&:hover': {
                            backgroundColor: '#5A3E2F',
                        },
                    }}
                >
                    Register
                </Button>
            </Box>
        </Box>
    );
});

export default AuthForm;
