import React from 'react';
import {Button, Form, Col} from "react-bootstrap";
import ContentBox from "../components/contentbox";
import GlobalContext from "../context/globalContext";

class Settings extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    handleSubmit(event) {
        if (window.confirm('Save settings and restart?')) {
            const formData = new FormData(event.target)
            const formDataObj = Object.fromEntries(formData.entries())
            settingsApi.save(formDataObj)
        }

        event.preventDefault();
    }

    handleReset(event) {
        if (window.confirm('Reset settings and restart?')) {
            settingsApi.reset()
        }

        event.preventDefault();
    }

    install(event) {
        settingsApi.install()

        event.preventDefault();
    }


    render() {
        return (<>
            <GlobalContext.Consumer>
                {ctx => (
                    <ContentBox header="Settings">
                        <Form onSubmit={this.handleSubmit} onReset={this.handleReset}>
                            <Form.Row>
                                <Col>
                                    <Form.Group controlId="formHotkeyFocus">
                                        <Form.Label>Focus Toggle Hotkey</Form.Label>
                                        <Form.Control name="hotkey_focus_toggle" type="text" defaultValue={ctx.context.settings.hotkey_focus_toggle}/>
                                        <Form.Text className="text-muted">
                                            Hotkey toggles window focus
                                        </Form.Text>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="formHotkeyRefresh">
                                        <Form.Label>Draft Refresh Hotkey</Form.Label>
                                        <Form.Control name="hotkey_draft_refresh" type="text" defaultValue={ctx.context.settings.hotkey_draft_refresh}/>
                                        <Form.Text className="text-muted">
                                            Hotkey refreshes draft view
                                        </Form.Text>
                                    </Form.Group>
                                </Col>
                            </Form.Row>

                            <Form.Group controlId="formDotaWindowName">
                                <Form.Label>Dota 2 Window Name</Form.Label>
                                <Form.Control name="dota_window_name" type="text" defaultValue={ctx.context.settings.dota_window_name}/>
                                <Form.Text className="text-muted">
                                    Window name screenshot for screen scraping will be taken from
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formGameStateServerPort">
                                <Form.Label>Dota Gamestate Server Port</Form.Label>
                                <Form.Control name="dota_game_state_server_port" type="text" defaultValue={ctx.context.settings.dota_game_state_server_port}/>
                                <Form.Text className="text-muted">
                                    Port Dota will send Gamestate updates to (required for gamestate integration)
                                </Form.Text>
                            </Form.Group>

                            <Form.Row>
                                <Col>
                                    <Button variant="primary" type="submit" block>
                                        Save
                                    </Button>
                                </Col>
                                <Col>
                                    <Button variant="danger" type="reset" block>
                                        Reset
                                    </Button>
                                </Col>
                            </Form.Row>

                            <Form.Text className="text-muted">
                                Restarting the application is required to use updated settings
                            </Form.Text>

                            <Form.Row>
                                <Col>
                                    <Button variant="primary" onClick={this.install} block>
                                        Configure Dota Gamestate updates (required)
                                    </Button>
                                </Col>
                            </Form.Row>

                            <Form.Text className="text-muted">
                                Select Dota 2 folder (reapply manually after port change)
                            </Form.Text>

                            <Form.Text className="text-muted">
                                Example "C:/Program Files/Steam/Steamapps/Common/Dota 2 beta"
                            </Form.Text>
                        </Form>
                    </ContentBox>
                )}
            </GlobalContext.Consumer>
        </>)
    }
}

export default Settings