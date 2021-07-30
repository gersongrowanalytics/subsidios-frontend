import React from 'react';
import {Provider} from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import {Route, Switch} from "react-router-dom";
import generateStore, {history} from './Redux/Store/index';
import App from "./Container/App/App";
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

function NextApp() {

    const store = generateStore()
    

    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Switch>
                    <Route path="/" component={App}/>
                </Switch>
            </ConnectedRouter>
        </Provider>        
    );
}

export default NextApp;
