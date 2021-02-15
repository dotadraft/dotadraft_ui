import React from 'react';
import GlobalContext from "../context/globalContext";

class PinHref extends React.Component {
    constructor(props) {
        super(props);
        this.state = {pinned: false};
    }

    render() {
        return (
            <>
                <GlobalContext.Consumer>
                    {ctx => (
                        <a href="#" className="nav-link" onClick={event => {
                            this.setState({pinned: !this.state.pinned});
                            windowApi.togglePin()
                            event.preventDefault()
                        }}>
                            <svg className="bi mr-2" width="16" height="16" fill="currentColor">
                                <use xlinkHref={`../../assets/bootstrap-icons.svg#${this.state.pinned ? "toggle-on" : "toggle-off"}`}/>
                            </svg>
                            {!ctx.context.minimized && <p className="d-inline">Pin</p>}
                        </a>
                    )}
                </GlobalContext.Consumer>
            </>
        );
    }
}

export default PinHref