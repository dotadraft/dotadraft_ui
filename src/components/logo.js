import React from 'react';
import GlobalContext from "../context/globalContext";


export default function Logo() {
    return (
        <>
            <GlobalContext.Consumer>
                {ctx => (
                    <div className="align-self-center m-3">
                        <img src={`../../assets/${ctx.context.minimized ? "icon_16.png" : "icon_64.png"}`}/>
                    </div>
                )}
            </GlobalContext.Consumer>
        </>
    )
}