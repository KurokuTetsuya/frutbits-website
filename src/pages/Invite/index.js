import { get } from "superagent";
import React from "react";
import "./style.css";

class Invite extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            invites: []
        }
        
    }

    async componentDidMount() {
        const { body } = await get("https://api.frutbits.xyz/invite");
        if (body.invites) {
            body.invites = body.invites.slice(0, 10);
            for (const invite of body.invites) {
                const { body: user } = await get(`https://api.frutbits.xyz/fetchUser?id=${invite.value.user}`);
                invite.user = user.result;
            }
            this.setState({
                isLoaded: true,
                invites: body.invites
            });
        } else {
            this.setState({
                isLoaded: false
            });
        }
    }

    render() {
        const { error, isLoaded, invites } = this.state;
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
                <div className="text-center text-white">
                    <h1>Loading...</h1>
                </div>
            </div>
        )
        return (
            <body>
                <div className="container">
                    <div className="row">
                        <div className="my-4 col-12">
                            <div className="float-center text-center">
                                <h1 className="text-bold">Invite Leaderboard</h1>
                                <br/>
                            </div>
                            <div className="col-12">
                                <table className="table table-stripped">
                                    <thead className="thead-primary">
                                        <tr>
                                            <th className="text-center">No</th>
                                            <th>User</th>
                                            <th className="text-center">Invited</th>
                                            <th className="text-center">Leave</th>
                                            <th className="text-center">Invite Code</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {invites.sort((a, b) => b.value.count - a.value.count).map((x, i) => (
                                            <tr>
                                                <td className="text-center">{i+1}</td>
                                                <td>{x.user.tag}</td>
                                                <td className="text-center">{x.value.count}</td>
                                                <td className="text-center">{x.value.fake}</td>
                                                <td className="text-center"><a href={`https://discord.gg/${x.value.code}`}>{x.value.code}</a></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        )
        
    }
}
export default Invite;