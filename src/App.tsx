import React from 'react';
import './App.scss';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {createTheme, ThemeProvider} from "@mui/material";
import CityBuilder from "./components/CityBuilder/CityBuilder";

const theme = createTheme({
    palette: {
        primary: {
            main: '#FF844B',
            contrastText: '#fff',
        },
        secondary: {
            main: '#F7F7F7',
            contrastText: '#000',
        },
        success: {
            main: '#4DA167',
            contrastText: '#fff'
        },
        warning: {
            main: '#384E77',
            contrastText: '#fff'
        },
        info: {
            main: '#AB81CD',
            contrastText: '#fff'
        }
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <BrowserRouter>
                    <div className={"Content"}>
                        <Routes>
                            <Route index element={<Navigate to={"/city-builder"}/>}/>
                            <Route path={"city-builder"} element={<CityBuilder/>}/>
                            <Route path={"*"}
                                   element={<div>We do not know what you are looking for!</div>}/>
                        </Routes>
                    </div>
                </BrowserRouter>
            </div>
        </ThemeProvider>
    );
}

export default App;
