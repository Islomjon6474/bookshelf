import React, { useContext, useEffect } from 'react';
import AuthForm from '../components/AuthForm';
import { areCredentialsStored } from '../utils/cookies';
import { observer } from 'mobx-react-lite';
import { BookStoreContext } from '../stores/bookStore';
import Box from '@mui/material/Box';

const RegisterPage: React.FC = observer(() => {

    return (
        <Box
            sx={{
                display: 'flex',
                height: '100vh',
                backgroundColor: 'rgba(255, 248, 240, 0.85)',
            }}
        >
            <Box
                sx={{
                    width: { xs: '100%', lg: '50%' },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(255, 248, 240, 0.85)',
                    backdropFilter: 'blur(10px)',
                }}
            >
                <Box
                    sx={{
                        backgroundColor: 'rgba(248,219,185,0.85)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: 2,
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <AuthForm />
                </Box>
            </Box>

            <Box
                sx={{
                    width: '50%',
                    display: { xs: 'none', lg: 'block' },
                    backgroundImage: `url('/registration_bg.webp')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            ></Box>
        </Box>
    );
});

export default RegisterPage;
