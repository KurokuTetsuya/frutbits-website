import React from "react";
import "./style.css";

export default function NotFound() {
    return (
        <body>
            <div className="text-center text-white d-flex justify-content-center align-items-center">
                <div id="content">
                    <br></br>
                    <br></br>
                    <h11 className="text-bold">Oops..</h11>
                    <p>404 Not Found</p>
                    <img alt="404" src={process.env.PUBLIC_URL + "/binocular.jpg"} width="200px" height="200px"></img>
                    <br/>
                    <br/>
                    <h2>I don't think this is the right place. Perhaps a typo?</h2>
                    <br></br>
                    <a id="btn" class="btn btn-info" href="/">Go Home</a>
                </div>
            </div>
        </body>
    )
}