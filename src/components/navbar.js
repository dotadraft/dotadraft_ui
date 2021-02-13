import React from 'react';
import NavLink from './navlink';
import NavHref from './navhref';
import PinHref from './pinhref';
import Status from "./status";
import MinimizeHref from "./minimizehref";
import Logo from "./logo";

export default function NavBar() {
    return (
        <>
            <div className="flex-shrink-0 d-flex flex-column">
                <Logo/>

                <ul className="nav d-flex flex-column">
                    <NavLink text="Draft" link="/" icon="bar-chart-fill"/>
                    <NavLink text="Skills" link="/skills" icon="pie-chart-fill"/>
                    <NavLink text="Heroes" link="/heroes" icon="people-fill"/>
                    <NavLink text="Settings" link="/settings" icon="tools"/>
                    <NavLink text="About" link="/about" icon="patch-question-fill"/>

                    <NavHref text="Donate" link="https://www.paypal.com/donate?hosted_button_id=DM426FKQMXSRA" icon="cash" target="_blank"/>
                </ul>
                <div className="flex-grow-1"></div>

                <ul className="nav d-flex flex-column">
                    <PinHref/>
                    <MinimizeHref/>
                    <Status/>
                </ul>
            </div>
        </>
    )
}