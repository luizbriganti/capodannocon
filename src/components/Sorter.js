import React, { Component } from 'react'

export default class Sorter extends Component {
    constructor(props){
        super(props)

        this.state = {
            
        }
    }

    render() {
        return (
            <div className="sorter">
                <span>Filtra per data:</span>
                <select id="date-selector" onChange={event => this.props.filter(event.target.value)}>
                    <option value="null">Tutte</option>
                    <option value="2021-12-29">29 Dic</option>
                    <option value="2021-12-30">30 Dic</option>
                    <option value="2021-12-31">31 Dic</option>
                    <option value="2022-01-01">01 Gen</option>
                </select>
            </div>
        )
    }
}
