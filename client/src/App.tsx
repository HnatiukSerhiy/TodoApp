import React from 'react';
import MainLayout from "./components/MainLayout";
import 'antd/dist/antd.css';
import {BrowserRouter} from "react-router-dom";

const App = (): JSX.Element => {
    return (
        <BrowserRouter>
            <MainLayout />
        </BrowserRouter>
    )
}

export default App;
