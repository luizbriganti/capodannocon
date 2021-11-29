import React, { Component } from 'react'
import {editEvent} from '../utils/network'

export default class Detail extends Component {

    constructor(props){
        super(props) 

        this.state = {
            item: props.item
        }
    }

    async handleSubscribe(type){
        const {item} = this.state 
        const {currentUser} = this.props 

        const newItem = {...item}

        switch(type){
            case 'subscribe':
                newItem.subscribers.push(currentUser)
                break;
            case 'unsubscribe':
                newItem.subscribers = newItem.subscribers.filter(sub => sub !== currentUser)
                break;
        }

        editEvent(newItem)
        .then(() => this.setState({item: newItem}))
        .then(() => this.props.refresh())
    }

    render() {
        const {currentUser} = this.props
        const {item} = this.state

        return (
            <div className="item-detail">
                <div className="item-image">
                    <img src={item.image} alt={item.title} />
                </div>
                <div className="item-infos">
                    <table>
                        <tbody>
                            <tr>
                                <td>Titolo: {item.title}</td>
                            </tr>
                            <tr>
                                <td>Descrizione: {item.description}</td>
                            </tr>   
                            <tr>
                                <td>Facilitatore: {item.created_by}</td>
                            </tr>
                            <tr><td>Data: {new Date(item.date).toLocaleDateString()}</td></tr>
                            <tr><td>Slot: {item.slot}</td></tr>
                            <tr><td>Min. partecipanti: {item.min_subscribers}</td></tr>
                            <tr><td>Max. partecipanti: {item.max_subscribers}</td></tr>
                            <tr><td>Iscritti: {item.subscribers.join(', ')}</td></tr>
                            <tr>
                                <td>
                                    {
                                        item.subscribers.includes(currentUser) ? 
                                        <><span>Sei iscritto!</span> <a href="#" onClick={event => this.handleSubscribe('unsubscribe')}>Disiscriviti</a></> :
                                        (
                                            item.subscribers.length === parseInt(item.max_subscribers) ?
                                            'Numero massimo di iscritti raggiunto' :
                                            <button type="button" className="btn btn-primary" onClick={() => this.handleSubscribe('subscribe')}>Iscriviti</button>
                                        )
                                    }
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
