import React from 'react';
import MainLayout from "./components/MainLayout";
import 'antd/dist/antd.css';
import {BrowserRouter} from "react-router-dom";
import moment from "moment";
import {ConfigProvider} from "antd";
import locale from 'antd/es/locale/en_GB';

moment.updateLocale('en-gb', {
    week: {
        dow: 1
    }
});

const App = (): JSX.Element => {
    return (
        <ConfigProvider locale={locale} >
            <BrowserRouter>
                <MainLayout />
            </BrowserRouter>
        </ConfigProvider>
    )
}

export default App;
