import React from 'react';

import AboutHref from '../components/abouthref';
import ContentBox from '../components/contentbox';

export default function About() {
    return (
        <>
            <ContentBox header="Contacts">
                <AboutHref text="Report issues or request features" link="https://github.com/dotadraft" icon="bug" target="_blank"/>
                <AboutHref text="https://www.dotadraft.com" link="https://www.dotadraft.com" icon="house" target="_blank"/>
                <AboutHref text="https://github.com/dotadraft" link="https://github.com/dotadraft" icon="github" target="_blank"/>
                <AboutHref text="mail@dotadraft.com" link="mailto:mail@dotadraft.com" icon="envelope" target="_blank"/>
            </ContentBox>

            <ContentBox header="How do I configure Dotadraft?">
                <ul>
                    <li>Defaults should work fine</li>
                    <li>Just hit the configure button and select your dota folder</li>
                    <li>Press refresh hotkey to analyse draft</li>
                    <li>If you have a one monitor setup, use the focus hotkey to bring the Dotadraft window up</li>
                </ul>
            </ContentBox>

            <ContentBox header="Who is responsible for this?">
                <ul>
                    <li>My name is Sascha Lippert</li>
                    <li>I am a german software engineer (Java backend - I hope it does not show)</li>
                    <li>I have a lot of spare time because of corona crisis</li>
                    <li>When not getting owned in ability draft, I do weird software projects</li>
                    <li>I am funding this project on my own (server and hosting costs)</li>
                    <li>To keep everything free, donations need to cover the bills</li>
                    <li>You may contribute on github</li>
                </ul>
            </ContentBox>

            <ContentBox header="Do I get banned for using this?">
                <ul>
                    <li>No Dota 2 game files are modified</li>
                    <li>The used game state update mechanism is part of Dota 2</li>
                    <li>Officially approved applications like Overwolf work in a similar way</li>
                    <li>The official approval from Valve is yet outstanding</li>
                    <li>Use at own risk</li>
                </ul>
            </ContentBox>

            <ContentBox header="How does it work?">
                <ol>
                    <li>Dota 2 sends game state updates to Dotadraft</li>
                    <li>When pressing the Refresh Hotkey, Dotadraft takes a screenshot from Dota 2 window while drafting</li>
                    <li>Refreshing the draft view will send game state and screenshot to Dotadraft API</li>
                    <li>Dotadraft API responds with draft analysis after a few seconds</li>
                    <li>The draft analysis helps you picking your skills</li>
                    <li>Profit</li>
                </ol>
            </ContentBox>

            <ContentBox header="What happens to the data?">
                <ul>
                    <li>Only the current game state and a screenshot of Dota 2 is uploaded to the server</li>
                    <li>No sensitive or personal data is sent to the Dotadraft server</li>
                    <li>The submitted data will remain on the Dotadraft server for bugfixing purposes</li>
                    <li>The application is open source, so you can verify what is going on</li>
                </ul>
            </ContentBox>
        </>
    )
}