import React from 'react';

export default function ContentBox(props) {
    return (
        <>
            <div className="border-0 mb-3 bg-dark text-white p-3">

                <div className="lead">
                    {props.header}
                </div>

                <div className="card-body">
                    {props.children}
                </div>

            </div>
        </>
    )
}