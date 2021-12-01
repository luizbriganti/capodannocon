import React, { Component } from 'react'
import Navbar from './Navbar'
import List from './List'
import Form from './Form'
import {v4 as uuid} from 'uuid'
import { getAll, deleteEventFromTheServer, sendEventToTheServer, filterEvent } from '../utils/network'
import { Navigate } from 'react-router'

export default class Application extends Component {

    constructor(props){
        super(props)

        this.state= {
            events: [],
            error: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleDelete = this.handleDelete.bind(this);
        this.handleError = this.handleError.bind(this);
        this._isMounted = false
    }

    handleSubmit(dataObj) {
        if (dataObj.error === false) {
            const {title, description, image, min, max, date, slot} = dataObj.values

            const event = {
                id: uuid(), 
                title, 
                description, 
                image, 
                date, 
                slot, 
                min_subscribers: min,
                max_subscribers: max, 
                subscribers: [], 
                created_by: this.props.user.username, 
                created_at: new Date(), 
                updated_at: new Date()
            };
            const events = [...this.state.events, event];
            this._isMounted && this.setState({events});

            sendEventToTheServer(event)
                .then(() => this.get())
                .catch(this.handleError);
        }
    }
  
    handleDelete(id) {
        let events = this.state.events;
        events = events.filter(event => event.id !== id);
        this.setState({events});
        deleteEventFromTheServer(id)
          .catch(this.handleError);
    }
    
    handleError(error) {
        this.setState({error: `Error: ${error.message}`}, () =>
            setTimeout(() => this.setState({error: ''}), 3000)
        );
    }
    
    componentDidMount() {
        this._isMounted = true
        this._isMounted && this.get()
    }

    componentWillUnmount(){
        this._isMounted = false
    }
    
    async get(filter = false){
        function compare( a, b ) {
            const dateA = new Date(a.date)
            const dateB = new Date(b.date)
    
            if ( dateA < dateB ){
                return -1;
            }
            if ( dateA > dateB ){
                return 1;
            }
            return 0;
        }

        !filter ?
            (getAll()
            .then(data => {
                const events = data.sort(compare)

                this.setState({events: events})
            })
            .catch(this.handleError))
        :
            (filterEvent(filter)
            .then(data => {
                const events = data.sort(compare)

                this.setState({events: events})
            })
            .catch(this.handleError))
    }

    filter(date){
        const {events} = this.state 

        if(date === 'null'){
            this.get()
        } else {
            this.get(date)
        }
    }
    
    render() {
        const {logStatus} = this.props

        return (
            logStatus ?
                <>
                    <Navbar log={ this.props.log.bind(this) } user={this.props.user}/>  
                    <div className="container">
                        <Form onSubmit={this.handleSubmit} filter={this.filter.bind(this)} />
                        <List onDelete={ this.handleDelete } listItems={this.state.events} user={this.props.user} refresh={this.get.bind(this)}/>
                    </div>
                </> :
                <Navigate to="/login" />
        )
    }
}
