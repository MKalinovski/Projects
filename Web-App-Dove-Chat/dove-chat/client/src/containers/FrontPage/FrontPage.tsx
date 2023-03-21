import { useState } from "react";
import RegisterForm from "../RegisterForm/RegisterForm";
import WelcomePage from "../WelcomePage/WelcomePage";
import LoginPage from "../LoginPage/LoginPage";
import RegisterSuccessPage from "../RegisterSuccessPage/RegisterSuccessPage";
import ChatPage from "../ChatPage/ChatPage";
import "./FrontPage.css";

const FrontPage = () => {
  const [page, setPage] = useState("WelcomePage");

  const renderPage = () => {
    switch (page) {
      case "WelcomePage":
        return <WelcomePage setPage={setPage} />;
      case "LoginPage":
        return <LoginPage setPage={setPage} />;
      case "RegisterForm":
        return <RegisterForm setPage={setPage} />;
      case "RegisterSuccessPage":
        return <RegisterSuccessPage setPage={setPage} />;
      default:
        return null;
    }
  };

  return <div id="frontPage">{renderPage()}</div>;
};

export default FrontPage;
