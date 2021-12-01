import React, { Component } from 'react'
import { Navigate } from 'react-router'
import { appURL } from '../utils/extras'
import { getUsers, verifyUser } from '../utils/network'
export default class VerifyEmail extends Component {

    constructor(props){
        super(props)

        this.state = {
            users: [],
            pathname: window.location.pathname.replace('/verify/', ''),
            verified: false,
            error: false
        }
    }

    componentDidMount(){
        const {pathname} = this.state

        getUsers()
        .then(data => !this.state.verified && this.setState({users: data}))
        .then(() => {
            let user = this.state.users.filter(user => user.email_verified === pathname)

            if(user.length > 0){
                user = user[0]
                user.logStatus = true
                user.email_verified = true
                verifyUser(user)
                .then(() => this.props.log({logStatus: 'verified', user: user}))
                .then(() => this.setState({users: [], verified: true}))
                .catch(() => this.setState({error: 'Provi a fare il furbo?', users: []}))
            }
        })
    }

    componentWillUnmount(){
        this.state.verified && this.setState({verified: false})
    }

    render() {
        const {verified, error} = this.state

        return (
            verified ? 
            <Navigate to="/" /> :
            (
                error ?
                error : 
                <p>Attendi mentre verifichiamo la tua email</p>
            )
        )
    }
}
