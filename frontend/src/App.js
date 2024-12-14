import React from "react";
import HomeScreen from "./screen/HomeScreen";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "'Outfit', sans-serif",
    h1: {
      fontFamily: "'Raleway', sans-serif",
    },
    h2: {
      fontFamily: "'Raleway', sans-serif",
    },
  },
});

function App() {
  return (
      <ThemeProvider theme={theme}>
        <HomeScreen />
        <ToastContainer />
      </ThemeProvider>

  );
}

export default App;
