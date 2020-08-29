import React from 'react';
import "bootswatch/dist/flatly/bootstrap.min.css"; 
import "./style.css";

function Home() {
    return (
        <body className="text-white">
            <nav className="navbar navbar-expand-sm navbar-dark">
                <a className="navbar-brand" href="#"><a><img className="icon" src={process.env.PUBLIC_URL + "/logo512.png"} alt="logo" width="30px" height="30px"></img></a></a>
                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item-active">
                            <a className="nav-link" href="#">Frutbits <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item-active">
                            <a className="nav-link" href="/staff">Staff List</a>
                        </li>
                        <li className="nav-item-active">
                            <a className="nav-link" href="https://bin.frutbits.xyz" target="_blank">Hastebin</a>
                        </li>
                    </ul>
                </div>
            </nav>
            <header id="header">
                <div class="head">
                    <h1>FrutBits Indonesia</h1>
                    <p>Sebuah komunitas Discord dari Indonesia bertemakan<br />
                    general, gaming dan lain lain!</p>
                </div>
                <div>
                    <iframe src="https://discordapp.com/widget?id=715165490246582313&theme=dark" width="350" height="400" allowtransparency="true" frameborder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
                </div>
            </header>
            <footer id="footer">
                <b>&copy; FrutBits 2020 All Right Reserved.</b>
            </footer>
        </body>
    )
} 
export default Home;