import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import './assets/styles/App.css';
import NavBar from "./components/content/NavBar";

function App() {
    return (
        <BrowserRouter>
            <NavBar/>
            <div className="container">
                <Switch>
                    {/*<Route exact path="/" component={}/>*/}
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
