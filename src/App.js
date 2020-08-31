// Library & CSS
import React from 'react';
import "bootswatch/dist/flatly/bootstrap.min.css"; 
import "bootswatch/dist/superhero/bootstrap.min.css"; 
import "./style.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { get } from "superagent";

// Component
import Staff from "./pages/Staff";
import Home from "./pages/Home";
import NotFound from "./pages/404";

const BASE_URL ="http://localhost:8081";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            error: null,
            authenticated: false,
            isLoaded: false
        }
    }

    componentDidMount() {
        get(`${BASE_URL}/auth/info`).set({
            "Access-Control-Allow-Origin": true
        }).then(res => {
            this.setState({
                authenticated: true,
                user: res.body,
                isLoaded: true
            });
        }).catch(e => {
            this.setState({
                authenticated: false,
                error: e
            });
        });
    }

    render() {
        if (!this.state.isLoaded) return (
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
                    <a className="btn btn-secondary my-2 my-sm-0">Loading..</a>
                </nav>
                <div className="justify-content-center text-center">
                    <h1>Loading...</h1>
                </div>
            </body>
        )
        console.log(this.state.user);
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
                    {this.state.authenticated ? (
                        <div>
                    <h1>{this.state.user.username}#{this.state.user.discriminator}</h1>
                    <a className="btn btn-secondary my-2 my-sm-0" href="/auth/login">Login</a></div>) : (<a className="btn btn-secondary my-2 my-sm-0" href="/auth/logout">Logout</a>)}
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
}

export default App;