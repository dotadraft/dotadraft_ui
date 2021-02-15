import React from 'react';
import GlobalContext from "../context/globalContext";


export default function Logo() {
    return (
        <>
            <GlobalContext.Consumer>
                {ctx => (
                    <div className={ctx.context.minimized ? "m-3" : "m-3 align-self-center"}>
                        <img src={`../../assets/${ctx.context.minimized ? "icon_16.png" : "icon_64.png"}`}/>
                    </div>
                )}
            </GlobalContext.Consumer>
        </>
    )
}