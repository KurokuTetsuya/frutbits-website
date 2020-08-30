import React from 'react';
import "./style.css";
import "bootswatch/dist/flatly/bootstrap.min.css"; 

export default function Home() {
    return (
        <body class="bg-dark">
            <header id="header">
                <div class="head">
                    <h1>FrutBits Indonesia</h1>
                    <p>Sebuah komunitas Discord dari Indonesia bertemakan<br />
                    general, gaming dan lain lain!</p>
                </div>
                <div>
                    <iframe id="widget" src="https://discordapp.com/widget?id=715165490246582313&theme=dark" width="350" height="400" allowtransparency="true" frameborder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
                </div>
            </header>
            <footer id="footer" className="page-footer text-center py-2">
                <p className="my-1">&copy; Frutbits Indonesia All Right Reserved.</p>
            </footer>
        </body>
    )
}