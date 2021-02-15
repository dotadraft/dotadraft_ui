import React from 'react';
import {Link} from 'react-router-dom';
import GlobalContext from "../context/globalContext";

export default function NavLink(props) {
    return (
        <>
            <GlobalContext.Consumer>
                {ctx => (
                    <Link className="nav-link" to={props.link}>
                        <svg className="bi mr-2" width="16" height="16" fill="currentColor">
                            <use xlinkHref={`../../assets/bootstrap-icons.svg#${props.icon}`}/>
                        </svg>
                        {!ctx.context.minimized && <p className="d-inline">{props.text}</p>}
                    </Link>
                )}
            </GlobalContext.Consumer>
        </>
    )
}