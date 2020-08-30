import { get } from "superagent";
import React from "react";
import "@fortawesome/fontawesome-free/css/all.css";

const roles = {
    owner: "735044850155651093",
    staff: "735062535383810129"
}

class Staff extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            owners: {},
            staff: {}
        }
        
    }

    componentDidMount() {
        get(`https://api.frutbits.xyz/staffList?role=${roles.owner}`).then((resO) => {
            get(`https://api.frutbits.xyz/staffList?role=${roles.staff}`).then((res) => {
                this.setState({
                    isLoaded: true,
                    staff: res.body,
                    owners: resO.body
                });
            }).catch(error => {
                this.setState({
                    isLoaded: false,
                    error
                });
            });
        }).catch(error => {
            this.setState({
                isLoaded: false,
                error
            });
        });
        
    }
    render() {
        const { error, isLoaded, owners, staff } = this.state;
        console.log(this.state);
        if (error) {
            return (
                <div className="jumbotron">
                    <h1 className="display-3">Error</h1>
                    <pre>
                        <code>
                            {error}
                        </code>
                    </pre>
                </div>
            )
        }
        if (!isLoaded) return (
            <div className="container">
                    <div className="staff-list mt-5 mb-5 text-center text-white">
                        <h1>Loading...</h1>
                    </div>
            </div>
        )
        return (
            <body>
                <div className="container">
                    <div className="staff-list mt-5 mb-5 text-center text-white">
                        <h1>Staff Team</h1>
                        <section className="p-md-3 mx-md-5 text-lg-left">
                            <div id={roles.owner} className="row justify-content-center mb-5">
                                {owners.list.map(o => (
                                    <div className="row d-flex align-items-center border rounded py-2 mx-1 my-1 staff-item">
                                        <div className="col-4 avatar w-100 white d-flex justify-content-center align-items-center">
                                            <img src={o.displayAvatarURL} alt={o.username} className="img-fluid rounded-circle z-depth-1"></img>
                                        </div>
                                        <div className="col-8">
                                            <h6 className="font-weight-bold pt-2">{o.username}#{o.discriminator}</h6>
                                            <p>{o.role.name}</p>
                                        </div>
                                    </div>
                                ))}
                                <br/>
                            </div>
                            <div id={roles.staff} className="row justify-content-center mb-5">
                                {staff.list.map(o => (
                                    <div className="row d-flex align-items-center border rounded py-2 mx-1 my-1 staff-item">
                                        <div className="col-4 avatar w-100 white d-flex justify-content-center align-items-center">
                                            <img src={o.displayAvatarURL} alt={o.username} className="img-fluid rounded-circle z-depth-1"></img>
                                        </div>
                                        <div className="col-8">
                                            <h6 className="font-weight-bold pt-2">{o.username}#{o.discriminator}</h6>
                                            <p>{o.role.name}</p>
                                        </div>
                                    </div>
                                ))}
                                <br/>
                            </div>
                        </section>
                    </div>
                </div>
            </body>
        )
        
    }
}
export default Staff;