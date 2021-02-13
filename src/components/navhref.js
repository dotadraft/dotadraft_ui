import React from 'react';
import GlobalContext from "../context/globalContext";
import {Link} from "react-router-dom";

export default function NavHref(props) {
    return (
        <>
            <GlobalContext.Consumer>
                {ctx => (
                    <li className="nav-item mb-1">
                        <a href={props.link} className="nav-link" target={props.target}>
                            <svg className="bi mr-2" width="16" height="16" fill="currentColor">
                                <use xlinkHref={`../../assets/bootstrap-icons.svg#${props.icon}`}/>
                            </svg>
                            {!ctx.context.minimized && <p className="d-inline">{props.text}</p>}
                        </a>
                    </li>
                )}
            </GlobalContext.Consumer>
        </>
    )
}