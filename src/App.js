// Library & CSS
import React from 'react';
import "bootswatch/dist/flatly/bootstrap.min.css"; 
import "bootswatch/dist/superhero/bootstrap.min.css"; 
import "./style.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { get } from "superagent";
import swal from "sweetalert";
import { baseUrl as BASE_URL } from "./config.json";

// Component
import Staff from "./pages/Staff";
import Home from "./pages/Home";
import NotFound from "./pages/404";
import Invite from './pages/Invite';

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

    handleClick(e) {
        e.preventDefault();
        swal({
            title: "Are you sure want to logout?",
            text: "It means, you have to login when you want to access your information.",
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then((yes) => {
            if (yes) {
                swal("Okay, redirecting you...", {
                    icon: "success",
                    timer: 2000
                }).then(() => {
                    window.location = `${BASE_URL}/auth/logout`
                })
            } else {
                swal("Canceled!", {
                    icon: "success",
                    timer: 1000
                });
            }
        })
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
                                <a className="nav-link" href="/invites">Invite Leaderboard</a>
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
        );
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
                                <a className="nav-link" href="/invites">Invite Leaderboard</a>
                            </li>
                            <li className="nav-item-active">
                                <a className="nav-link" href="https://bin.frutbits.xyz" target="_blank" rel="noopener noreferrer">Hastebin</a>
                            </li>
                        </ul>
                    </div>
                    {this.state.authenticated && this.state.user ? (
                        <button id="lglt" onClick={this.handleClick} className="nav-link">{this.state.user.username}#{this.state.user.discriminator}</button>   
                    ) : (<a id="lglt" className="nav-link text-white" href="/auth/login"><b>Login</b></a>)}
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
                            <Route path="/invites">
                                <Invite />
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