import React from 'react';
import './WelcomePage.css';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


type PageType = "LoginPage" | "RegisterForm";

interface WelcomePageProps {
    setPage: (page: PageType) => void;
}

function WelcomePage({setPage}: WelcomePageProps) {
    return (
        <div id="welcomePage">
            <Typography variant="h5" gutterBottom id="frontPageText">Welcome to Dove Chat</Typography>
            <div id="welcomePageButtons">
                <Button id="welcomePageLoginButton" size="large" variant="contained" onClick={() => setPage("LoginPage")}>
                    Login
                </Button>
                <Button id="welcomePageRegisterButton" size="large" variant="outlined" onClick={() => setPage("RegisterForm")}>
                    Register
                </Button>
            </div>
        </div>
    );
}

export default WelcomePage;