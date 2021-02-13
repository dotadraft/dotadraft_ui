import React from 'react';
import GlobalContext from "../context/globalContext";
import {ReactTabulator} from "react-tabulator";

class Heroes extends React.Component {
    constructor(props) {
        super(props);


    }

    columns(data) {
        const stats = data.stats_heroes

        return [
            {
                title: "Img",
                field: "img",
                formatter: "image",
                formatterParams: {width: 24},
                headerSort: false,
                width: "64"
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
                    max: stats ? stats.win_ratio.max : 100,
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
                title: "Ø Kills", field: "avg_kills", hozAlign: "left",
                widthGrow: 1,
                formatter: "progress",
                formatterParams: {
                    color: ["red", "orange", "yellow", "yellowgreen", "green"],
                    min: stats ? stats.avg_kills.min * 0.9 : 0,
                    max: stats ? stats.avg_kills.max : 100,
                }
            },
            {
                title: "Ø",
                field: "avg_kills",
                headerSort: false,
                widthGrow: 0.5,
                headerFilter: "input",
                headerFilterPlaceholder: "Min Kills",
                headerFilterFunc: ">="
            },
        ];
    }

    resolve(data) {
        const heroes_table = []

        if (data.data_heroes) {
            for (const [key, h] of Object.entries(data.data_heroes)) {
                heroes_table.push({
                        name: h.name,
                        img: `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/heroes/${h.name}_icon.png`,
                        win_ratio: Number(h.win_ratio).toFixed(2),
                        kd_ratio: Number(h.kd_ratio).toFixed(2),
                        avg_kills: Number(h.avg_kills).toFixed(2)
                    }
                )
            }
        }

        return heroes_table
    }

    render() {
        return (<>
            <GlobalContext.Consumer>
                {ctx => (
                    <ReactTabulator
                        columns={this.columns(ctx.context.data)}
                        data={this.resolve(ctx.context.data)}
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
                            persistenceID: "heroesTable"
                        }}
                        layout={"fitColumns"}
                        className={"table-dark table-striped"}
                    />
                )}
            </GlobalContext.Consumer>
        </>)
    }
}

export default Heroes