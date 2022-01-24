import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'antd/dist/antd.css';
import "./i18n/configs"
import {Provider} from "react-redux";
import rootStore from "./redux/store";
import axios from "axios";
import {PersistGate} from "redux-persist/integration/react";

axios.defaults.headers['x-icode'] = '97A353F65C796EE2'

ReactDOM.render(
    <Provider store={rootStore.store}>
        <PersistGate persistor={rootStore.persistor} loading={null}>
            <App/>
        </PersistGate>
    </Provider>,
    document.getElementById("root")
);

