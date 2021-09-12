import React, {Component, Fragment} from 'react';
import {BrowserRouter} from "react-router-dom";
import Menu from './components/Menu';
import Example from './components/Example';
import AppRoute from "./route/AppRoute";


class App extends Component {


    render() {

        return (
            <Fragment>
                <BrowserRouter>
                    <AppRoute/>
                </BrowserRouter>
            </Fragment>
        );
    }
}

export default App;
