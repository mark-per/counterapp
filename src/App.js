import React from 'react'
import {Box} from "@mui/material";
import RenderCounters from "./Components/RenderCounters"
import CustomAppBar from "./Components/CustomAppBar";
import { Route, Routes } from "react-router-dom";
import Counters from "./pages/Counters";
import { BrowserRouter } from 'react-router-dom';
import About from "./pages/About";

function App() {

    return (
        <BrowserRouter>
            <CustomAppBar />
            <Routes>
                <Route path="/" element={<Counters />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </BrowserRouter>
    );

}

export default App;
