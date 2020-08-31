import React from 'react';
import "./style.css";
import "bootswatch/dist/flatly/bootstrap.min.css"; 

export default function Home() {
    return (
        <body className="bg-dark">
            <header id="header">
                <div className="head">
                    <h1>FrutBits Indonesia</h1>
                    <p>Sebuah komunitas Discord dari Indonesia bertemakan<br />
                    general, gaming dan lain lain!</p>
                </div>
                <div>
                    <iframe title="discord" id="widget" src="https://discordapp.com/widget?id=715165490246582313&theme=dark" width="350" height="400" allowtransparency="true" frameBorder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
                </div>
            </header>
            <footer id="footer" className="page-footer text-center py-2">
                <p className="my-1">&copy; Frutbits Indonesia All Right Reserved.</p>
            </footer>
        </body>
    )
}