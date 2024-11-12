import React, { useEffect, useState, useMemo } from 'react';
import {BrowserRouter as Router, Route, Routes, Navigate, useNavigate} from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import MainPage from './pages/MainPage';
import AddBookPage from './pages/AddBookPage';
import { BookStore, BookStoreContext } from './stores/bookStore';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const App: React.FC = () => {
    const bookStore = useMemo(() => new BookStore(), []);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuthentication = async () => {
            const authenticated = await bookStore.checkUser();
            setIsAuthenticated(authenticated);
            if (!authenticated) {
                if(window.location.pathname !== '/register') {
                    window.location.pathname = '/register';
                }
            } else {
                if(window.location.pathname === '/register') {
                    window.location.pathname = '/';
                }
            }
            setLoading(false);
        };

        checkAuthentication();
    }, [bookStore]);

    if (loading) {
        return (
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                height="100vh"
                sx={{
                    backgroundColor: 'rgba(255, 248, 240, 0.85)',
                }}
            >
                <CircularProgress color="primary" />
            </Box>
        );
    }

    return (
        <BookStoreContext.Provider value={bookStore}>
            <Router>
                <div className="App">
                    <Routes>
                        <Route
                            path="/"
                            element={<MainPage />}
                        />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/add-book" element={isAuthenticated ? <AddBookPage /> : <Navigate to="/register" />} />
                    </Routes>
                </div>
            </Router>
        </BookStoreContext.Provider>
    );
};

export default App;
