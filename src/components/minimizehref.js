import React from 'react';
import GlobalContext from "../context/globalContext";
import {Link} from "react-router-dom";

class MinimizeHref extends React.Component {
    constructor(props) {
        super(props);
        this.state = {pinned: false};
    }

    render() {
        return (
            <>
                <GlobalContext.Consumer>
                    {ctx => (
                        <li className="nav-item mb-1">
                            <a href="#" className="nav-link" onClick={event => {
                                ctx.updateContext({...ctx.context, minimized: !ctx.context.minimized})
                                event.preventDefault()
                            }}>
                                <svg className="bi mr-2" width="16" height="16" fill="currentColor">
                                    <use xlinkHref={`../../assets/bootstrap-icons.svg#${ctx.context.minimized ? "caret-right-fill" : "caret-left-fill"}`}/>
                                </svg>
                                {!ctx.context.minimized && <p className="d-inline">Min</p>}
                            </a>
                        </li>

                    )}
                </GlobalContext.Consumer>
            </>
        );
    }
}

export default MinimizeHref