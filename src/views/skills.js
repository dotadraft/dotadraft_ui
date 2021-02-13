import React from 'react';
import GlobalContext from "../context/globalContext";
import {ReactTabulator} from "react-tabulator";

class Skills extends React.Component {
    constructor(props) {
        super(props);
    }

    headerFilterEmptyCheck(value) {
        return !value;
    }

    columns(data) {
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
            {
                title: "Ø GPM", field: "avg_gpm", hozAlign: "left",
                widthGrow: 1,
                formatter: "progress",
                formatterParams: {
                    color: ["red", "orange", "yellow", "yellowgreen", "green"],
                    min: stats ? stats.avg_gpm.min * 0.9 : 0,
                    max: stats ? stats.avg_gpm.max : 100,
                }
            },
            {
                title: "Ø",
                field: "avg_gpm",
                headerSort: false,
                widthGrow: 0.5,
                headerFilter: "input",
                headerFilterPlaceholder: "Min GPM",
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

    resolve(data) {
        const skills_table = []

        if (data.data_skills) {
            for (const [key, s] of Object.entries(data.data_skills)) {

                let name = s.name

                if (name.endsWith("_ad")) {
                    name = name.substr(0, name.length - "_ad".length)
                }

                skills_table.push({
                        img: `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/abilities/${name}_md.png`,
                        name: s.name,
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
                            persistenceID: "skillsTable"
                        }}
                        layout={"fitColumns"}
                        className={"table-dark table-striped"}
                    />
                )}
            </GlobalContext.Consumer>
        </>)
    }
}

export default Skills