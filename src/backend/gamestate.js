const jp = require('jsonpath');
const express = require('express');

let log = require('./logger').getLogger()

class GameState {
    constructor(state, matchId, playerName, playerTeam, heroName) {
        this.state = state
        this.matchId = matchId
        this.playerName = playerName
        this.playerTeam = playerTeam
        this.heroName = heroName
    }
}

class GameStateServer {
    constructor(port, startGame, stopGame) {
        this.port = port
        this.sever = express();
        this.sever.use(express.json());

        this.sever.post('/', (req, res) => this.handlePost(req, res))

        this.startGame = startGame
        this.stopGame = stopGame

        this.gameState = null
    }

    handlePost(req, res) {
        let gameState = jp.value(req.body, "$.map.game_state")
        let matchId = jp.value(req.body, "$.map.matchid")
        let playerName = jp.value(req.body, "$.player.name")
        let playerTeam = jp.value(req.body, "$.player.team_name")
        let heroName = jp.value(req.body, "$.hero.name")

        if (gameState === "DOTA_GAMERULES_STATE_HERO_SELECTION") {
            if (this.gameState) {
                if (this.gameState.matchId !== matchId) {
                    this.stopGame(this.gameState)

                    this.gameState = new GameState(gameState, matchId, playerName, playerTeam, heroName)
                    this.startGame(this.gameState)
                }
            } else {
                this.gameState = new GameState(gameState, matchId, playerName, playerTeam, heroName)
                this.startGame(this.gameState)
            }
        } else {
            if (this.gameState) {
                this.stopGame(this.gameState)
            }

            this.gameState = null
        }

        res.status(200).send("");
    }

    start() {
        const host = '127.0.0.1'
        this.sever.listen(this.port, host, () => {
            log.info(`GameStateServer listening at http://${host}:${this.port}`)
        })
    }

    stop() {
        this.server.close()
    }
}

module.exports = {GameStateServer, GameState}