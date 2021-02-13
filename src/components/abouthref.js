import React from 'react';

export default function AboutHref(props) {
    return (
        <>
            <div className="mb-3 text-grey">
                <a href={props.link} target={props.target}>
                    <svg className="bi mr-2" width="24" height="24" fill="currentColor">
                        <use xlinkHref={`../../assets/bootstrap-icons.svg#${props.icon}`}/>
                    </svg>
                    <p className="d-inline">{props.text}</p>
                </a>
            </div>
        </>
    )
}