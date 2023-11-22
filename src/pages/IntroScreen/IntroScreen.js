// src/pages/SplashScreen/SplashScreen.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./IntroScreen.css";
import { HashLoader } from "react-spinners";
const IntroScreen = () => {
  const history = useNavigate();

  useEffect(() => {
    // Set timeout to simulate loading
    const timeout = setTimeout(() => {
      history("/home"); // Redirect to the landing page after a certain time
    }, 3000); // Set the timeout duration in milliseconds (e.g., 2000ms or 2 seconds)

    // Clear the timeout when the component unmounts
    return () => clearTimeout(timeout);
  }, [history]);

  return (
    <div className="intro-screen">
      <HashLoader color="#6d1f09" speedMultiplier={1.5} />
    </div>
  );
};

export default IntroScreen;