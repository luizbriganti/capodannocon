import React, { Component } from 'react'
import { deleteUser, getUsers } from '../utils/network'
import Icon from '@mdi/react'
import { mdiTrashCan } from '@mdi/js'

export default class Users extends Component {
    constructor(props){
        super(props)

        this.state = {
            users: [],
            deletion: false,
            toDelete: false
        }

        this._isMounted = false
    }

    componentDidMount(){
        this._isMounted = true 

        this.get()
    }

    get(){
        getUsers()
        .then(data => this._isMounted && this.setState({users: data}))
    }

    componentWillUnmount(){
        this._isMounted = false
    }

    delete(userid){
        this.setState({deletion: true, toDelete: userid})
    }

    render() {
        const {users, deletion, toDelete} = this.state

        return (
            <div className="container users-container">
                <table>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Azioni</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.length > 0 ?
                            users.map(user => <tr key={user.id}>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td><button type="button" className="btn btn-danger" onClick={() => this.delete(user.id)}><Icon path={mdiTrashCan} size="20px" /></button></td>
                            </tr>) : 
                            ''
                        }
                    </tbody>
                </table>
                <SweetAlert
                    show={deletion}
                    showConfirm
                    confirmBtnText="Ok"
                    title="Attenzione!"
                    onConfirm={() => deleteUser(toDelete).then(() => this.setState({deletion: false, toDelete: false})).then(() => this.get()) }         
                >
                    <p>Si è sicuri di voler cancellare questo utente? L'operazione non è reversibile.</p>
                </SweetAlert>
            </div>
        )
    }
}
