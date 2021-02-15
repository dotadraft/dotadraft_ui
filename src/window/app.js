import React from "react"

import NavBar from '../components/navbar';

import {
    HashRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

import Draft from "../views/draft";
import Skills from "../views/skills";
import Heroes from "../views/heroes";
import Settings from "../views/settings";
import About from "../views/about";

import GlobalContext from '../context/globalContext';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            settings: settingsApi.load(),
            data: dataApi.load(),
            draft: undefined,
            status: "Idling",
            minimized: false
        }

        dotadraftApi.registerCallbackRefreshSkills(() => {
            if (this.state.status !== "Loading") {
                this.setState({
                    ...this.state,
                    status: "Loading"
                });

                dotadraftApi.analyseDraft(this.state.settings.dota_window_name)
                    .catch(error => {
                        this.setState({
                            ...this.state,
                            status: "Error"
                        });

                        logger.error("Error analysing draft", error.message)
                    })
            }
        })

        dotadraftApi.registerCallbackResult(result => {
            this.setState({
                ...this.state,
                draft: result,
                status: "Playing"
            });
        })

        dotadraftApi.registerCallbackStartGame(result => {
            this.setState({
                ...this.state,
                status: "Playing"
            });
        })

        dotadraftApi.registerCallbackStopGame(() => {
            this.setState({
                ...this.state,
                status: "Idling"
            });
        })


        dotadraftApi.registerCallbackError(error => {
            this.setState({
                ...this.state,
                status: "Error"
            });

            logger.error("Error analysing draft", error)
        })

        gameStateApi.startServer()
    }

    render() {
        return (
            <>
                <GlobalContext.Provider value={{context: this.state, updateContext: (newContext) => this.setState(newContext)}}>
                    <div className="flex-grow-1 d-flex flex-row overflow-hidden">
                        <Router>
                            <NavBar/>

                            <div className="flex-grow-1 bg-gray-dark p-0 overflow-auto">
                                <Switch>
                                    <Route path="/" exact>
                                        <Draft/>
                                    </Route>
                                    <Route path="/skills" exact>
                                        <Skills/>
                                    </Route>
                                    <Route path="/heroes" exact>
                                        <Heroes/>
                                    </Route>
                                    <Route path="/settings" exact>
                                        <Settings/>
                                    </Route>
                                    <Route path="/about" exact>
                                        <About/>
                                    </Route>
                                </Switch>
                            </div>
                        </Router>
                    </div>
                </GlobalContext.Provider>
            </>
        )
    }
}

export default App