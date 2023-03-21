import React from "react";
import "./RegisterSuccessPage.css";

interface RegisterSuccessPageProps {
    setPage: React.Dispatch<React.SetStateAction<string>>;
}

function RegisterSuccessPage({setPage}: RegisterSuccessPageProps) {
    return(
        <div>
            <p id="success">Registration successful</p>
            <button onClick={() => setPage("LoginPage")}>
                Log in now!
            </button>
        </div>
    )
}

export default RegisterSuccessPage;