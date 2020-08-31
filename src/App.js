// Library & CSS
import React from 'react';
import "bootswatch/dist/flatly/bootstrap.min.css"; 
import "bootswatch/dist/superhero/bootstrap.min.css"; 
import "./style.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Component
import Staff from "./pages/Staff";
import Home from "./pages/Home";
import NotFound from "./pages/404";

function App() {
    return (
        <body className="text-white">
            <nav className="navbar navbar-expand-sm navbar-dark">
                <a className="navbar-brand" href="/"><a href="/"><img className="icon" src={process.env.PUBLIC_URL + "/logo512.png"} alt="logo" width="30px" height="30px"></img></a></a>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item-active">
                            <a className="nav-link" href="/">Frutbits <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item-active">
                            <a className="nav-link" href="/staff">Staff</a>
                        </li>
                        <li className="nav-item-active">
                            <a className="nav-link" href="https://bin.frutbits.xyz" target="_blank" rel="noopener noreferrer">Hastebin</a>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="bg-dark">
                <Router>
                    <Switch>
                        <Route path="/" exact={true}>
                            <Home />
                        </Route>
                        <Route path="/staff">
                            <Staff />
                        </Route>
                        <Route path="*">
                            <NotFound />
                        </Route>
                    </Switch>
                </Router>
            </div>
        </body>
    )
} 
export default App;