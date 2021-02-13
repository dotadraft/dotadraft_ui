import React from 'react';
import GlobalContext from "../context/globalContext";

class Status extends React.Component {
    constructor(props) {
        super(props);
    }

    icon(status) {
        if (status === "Idling") {
            return "plug-fill"
        } else if (status === "Playing") {
            return "controller"
        } else if (status === "Loading") {
            return "clock-fill"
        }

        return "lightning-fill"
    }

    render() {
        return (
            <>
                <GlobalContext.Consumer>
                    {ctx => (
                        <li className="nav-item mb-1">
                            <GlobalContext.Consumer>
                                {ctx => (
                                    <>
                                        <div className="nav-link text-light">
                                            <svg className="bi mr-2" width="16" height="16" fill="currentColor">
                                                <use xlinkHref={`../../assets/bootstrap-icons.svg#${this.icon(ctx.context.status)}`}/>
                                            </svg>
                                            {!ctx.context.minimized && <p className="d-inline">{ctx.context.status}</p>}
                                        </div>
                                    </>
                                )}
                            </GlobalContext.Consumer>
                        </li>
                    )}
                </GlobalContext.Consumer>
            </>
        );
    }
}

export default Status