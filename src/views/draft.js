import React from 'react';
import GlobalContext from "../context/globalContext";
import {ReactTabulator} from "react-tabulator";
import {Alert, ProgressBar} from "react-bootstrap";

class Draft extends React.Component {
    constructor(props) {
        super(props);
    }

    headerFilterEmptyCheck(value) {
        return !value;
    }

    columns(draft, data) {
        let min_adv = -1
        let max_adv = 1

        let min_est = -1
        let max_est = 1

        if (draft) {
            const list_adv = []
            const list_est = []

            for (const [key, s] of Object.entries(draft.abilities)) {
                list_adv.push(Number(s.win_rate_advantage).toFixed(2))
                list_est.push(Number(s.win_rate_estimated).toFixed(2))
            }

            min_adv = Math.min.apply(null, list_adv) - 0.01
            max_adv = Math.max.apply(null, list_adv) + 0.01

            min_est = Math.min.apply(null, list_est) - 0.01
            max_est = Math.max.apply(null, list_est) + 0.01
        }

        const stats = data.stats_skills

        return [
            {
                title: "Img",
                field: "img",
                formatter: "image",
                formatterParams: {width: 32},
                headerSort: false,
                width: "32"
            },
            {title: "Name", field: "name", widthGrow: 1},
            {
                title: "Win",
                field: "win_ratio",
                hozAlign: "left",
                widthGrow: 1,
                formatter: "progress",
                formatterParams: {
                    color: ["red", "orange", "yellow", "yellowgreen", "green"],
                    min: stats ? stats.win_ratio.min * 0.9 : 0,
                    max: stats ? stats.win_ratio.max : 100
                }
            },
            {
                title: "%",
                field: "win_ratio",
                headerSort: false,
                widthGrow: 0.5,
                headerFilter: "input",
                headerFilterPlaceholder: "Min Win",
                headerFilterFunc: ">="
            },
            {
                title: "Estimated",
                field: "win_rate_estimated",
                hozAlign: "left",
                widthGrow: 1,
                formatter: "progress",
                formatterParams: {
                    color: ["red", "orange", "yellow", "yellowgreen", "green"],
                    min: min_est,
                    max: max_est
                }
            },
            {
                title: "%",
                field: "win_rate_estimated",
                headerSort: false,
                widthGrow: 0.5,
                headerFilter: "input",
                headerFilterPlaceholder: "Min Est",
                headerFilterFunc: ">="
            },
            {
                title: "Advantage",
                field: "win_rate_advantage",
                hozAlign: "left",
                widthGrow: 1,
                formatter: "progress",
                formatterParams: {
                    color: ["red", "orange", "yellow", "yellowgreen", "green"],
                    min: min_adv,
                    max: max_adv
                }
            },
            {
                title: "%",
                field: "win_rate_advantage",
                headerSort: false,
                widthGrow: 0.5,
                headerFilter: "input",
                headerFilterPlaceholder: "Min Adv",
                headerFilterFunc: ">="
            },
            {
                title: "K/D",
                field: "kd_ratio",
                hozAlign: "left",
                widthGrow: 1,
                formatter: "progress",
                formatterParams: {
                    color: ["red", "orange", "yellow", "yellowgreen", "green"],
                    min: stats ? stats.kd_ratio.min * 0.9 : 0,
                    max: stats ? stats.kd_ratio.max : 100,
                }
            },
            {
                title: "/",
                field: "kd_ratio",
                headerSort: false,
                widthGrow: 0.5,
                headerFilter: "input",
                headerFilterPlaceholder: "Min KD",
                headerFilterFunc: ">="
            },
            {
                title: "Scepter",
                field: "has_scepter",
                hozAlign: "center",
                formatter: "tickCross",
                widthGrow: 1,
                headerFilter: true,
                headerFilterEmptyCheck: this.headerFilterEmptyCheck
            },
            {
                title: "Shard",
                field: "has_shard",
                hozAlign: "center",
                formatter: "tickCross",
                widthGrow: 1,
                headerFilter: true,
                headerFilterEmptyCheck: this.headerFilterEmptyCheck
            },
        ];
    }

    resolve(draft) {
        const skills_table = []

        if (draft) {
            for (const [key, s] of Object.entries(draft.abilities)) {

                let name = s.name

                if (name.endsWith("_ad")) {
                    name = name.substr(0, name.length - "_ad".length)
                }

                skills_table.push({
                        img: `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/abilities/${name}_md.png`,
                        name: s.name,
                        win_rate_advantage: Number(s.win_rate_advantage).toFixed(2),
                        win_rate_estimated: Number(s.win_rate_estimated).toFixed(2),
                        win_ratio: Number(s.win_ratio).toFixed(2),
                        kd_ratio: Number(s.kd_ratio).toFixed(2),
                        avg_kills: Number(s.avg_kills).toFixed(2),
                        avg_gpm: Number(s.avg_gpm).toFixed(2),
                        has_scepter: s.has_scepter_upgrade,
                        has_shard: s.has_shard_upgrade || s.has_shard_skill
                    }
                )
            }
        }


        return skills_table
    }

    getWinRate(draft) {
        return draft ? Math.floor(Number(draft.match_win_rate) * 100) : 50
    }

    getAlerts(draft) {
        if (draft && draft.messages) {
            return draft.messages.map((msg, idx) => (
                <Alert key={idx} variant={msg.level}>
                    {msg.text}
                </Alert>
            ))
        }

        return null
    }

    render() {
        return (<>
            <GlobalContext.Consumer>
                {ctx => (
                    <>
                        {this.getAlerts(ctx.context.draft)}
                        <ProgressBar now={this.getWinRate(ctx.context.draft)} label={`${this.getWinRate(ctx.context.draft)}%`}/>
                        <ReactTabulator
                            columns={this.columns(ctx.context.draft, ctx.context.data)}
                            data={this.resolve(ctx.context.draft)}
                            options={{
                                pagination: 'local',
                                paginationSize: 50,
                                layoutColumnsOnNewData: true,
                                virtualDom: false,
                                persistence: {
                                    sort: true,
                                    filter: true,
                                },
                                persistenceMode: true,
                                persistenceID: "draftTable"
                            }}
                            layout={"fitColumns"}
                            className={"table-dark table-striped"}
                        />
                    </>
                )}
            </GlobalContext.Consumer>
        </>)
    }

}

export default Draft