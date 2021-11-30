import { mdiFloppy, mdiTrashCan } from '@mdi/js'
import Icon from '@mdi/react'
import React, { Component } from 'react'
import {deleteEventFromTheServer, editEvent} from '../utils/network'
import SweetAlert from 'react-bootstrap-sweetalert'

export default class Edit extends Component {

    constructor(props){
        super(props)

        this.state = {
            item: props.item,
            edited: false,
            delete: false
        }
    }

    async edit(e){
        e.preventDefault()
        const {item} = this.state

        editEvent(item)
        .then(data => this.setState({edited: true}))
        .then(() => this.props.refresh())
    }

    async delete(){
        const {item} = this.state 

        deleteEventFromTheServer(item.id)
        .then(() => this.setState({delete: false}))
        .then(() => this.props.refresh())
        .then(() => this.props.close())
    }

    render() {
        const {item} = this.state

        return (
            <>
                <form id="item-edit" className="item-edit">
                    <div className="item-image">
                        <img src={item.image} alt={item.title} />
                    </div>
                    <div className="item-infos">
                        <table>
                            <tbody>
                                <tr>
                                    <td><label htmlFor="title"><strong>Titolo:</strong></label> <input type="text" id="title" value={item.title} onChange={event => this.setState({item: {...item, title: event.target.value}})}/></td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="description"><strong>Descrizione:</strong></label>
                                        <textarea id="description" rows="8" value={item.description} onChange={event => this.setState({item: {...item, description: event.target.value}})}></textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="date"><strong>Data:</strong></label>
                                        <select id="date" onChange={event => this.setState({item: {...item, date: event.target.value}})} value={item.date}>
                                            <option value="null">Seleziona una</option>
                                            <option value="2021-12-29">29 Dicembre</option>
                                            <option value="2021-12-30">30 Dicembre</option>
                                            <option value="2021-12-31">31 Dicembre</option>
                                            <option value="2022-01-01">1 Gennaio</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="slot"><strong>Slot:</strong></label>
                                        <select id="slot" value={item.slot} onChange={event => this.setState({item: {...item, slot: event.target.value}})}>
                                            <option value="null">Seleziona uno</option>
                                            <option value="diurno">Diurno (10-15)</option>
                                            <option value="pomeridiano">Pomeridiano (15-20)</option>
                                            <option value="serale">Serale (21 in poi)</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="min_subscribers"><strong>Min. partecipanti:</strong></label> 
                                        <input type="number" id="min_subscribers" value={item.min_subscribers} onChange={event => this.setState({item: {...item, min_subscribers: event.target.value}}) } />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="max_subscribers"><strong>Max. partecipanti:</strong></label> 
                                        <input type="number" id="max_subscribers" value={item.max_subscribers} onChange={event => this.setState({item: {...item, max_subscribers: event.target.value}}) } />
                                    </td>
                                </tr>
                                <tr><td><strong>Iscritti:</strong> {item.subscribers.join(', ')}</td></tr>

                                <tr className="actions">
                                    <td><button type="button" className="btn btn-success" onClick={event => this.edit(event)}><Icon path={mdiFloppy} size="15px" /> Salva modifiche</button></td>
                                    <td><button type="button" className="btn btn-danger" onClick={event => this.setState({delete: !this.state.delete})}><Icon path={mdiTrashCan} size="15px" /> Elimina</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </form>
                <SweetAlert
                    show={this.state.edited}
                    showConfirm
                    confirmBtnText="Ok"
                    title="Successo!"
                    onConfirm={() => this.setState({edited: !this.state.edited})}         
                >
                    <p>L'evento è stato modificato con successo!</p>
                </SweetAlert>
                <SweetAlert
                    show={this.state.delete}
                    showConfirm
                    showCancel
                    cancelBtnText="Annulla"
                    confirmBtnText="Procedi"
                    title="Attenzione!"
                    onConfirm={() => this.delete()}         
                    onCancel={() => this.setState({delete: false})}         
                >
                    <p>Stai per eliminare questo evento. Il processo non è reversibile. Sei sicuro?</p>
                </SweetAlert>
            </>
        )
    }
}
